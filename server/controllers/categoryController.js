const Category = require("../models/categoryModel");
const { cloudinary } = require("../config/cloudinary");

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ isActive: true }).sort({ order: 1 });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get featured categories
// @route   GET /api/categories/featured
// @access  Public
const getFeaturedCategories = async (req, res) => {
    try {
        const categories = await Category.find({ isFeatured: true, isActive: true }).sort({ order: 1 });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ message: "Category not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req, res) => {
    try {
        const { name, description, isFeatured, order } = req.body;

        // Create slug from name
        const slug = name.toLowerCase().replace(/\s+/g, '-');

        // Check if category already exists
        const categoryExists = await Category.findOne({ slug });
        if (categoryExists) {
            return res.status(400).json({ message: "Category already exists" });
        }

        // Handle image upload
        let imageUrl = '';
        if (req.file) {
            imageUrl = req.file.path;
        }

        const category = await Category.create({
            name,
            slug,
            description,
            image: imageUrl,
            isFeatured: isFeatured === 'true' || isFeatured === true,
            order: order || 0,
        });

        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const { name, description, isFeatured, isActive, order } = req.body;

        // Update fields
        if (name) {
            category.name = name;
            category.slug = name.toLowerCase().replace(/\s+/g, '-');
        }
        category.description = description || category.description;
        category.isFeatured = isFeatured !== undefined ? (isFeatured === 'true' || isFeatured === true) : category.isFeatured;
        category.isActive = isActive !== undefined ? (isActive === 'true' || isActive === true) : category.isActive;
        category.order = order !== undefined ? order : category.order;

        // Handle new image upload
        if (req.file) {
            // Delete old image from Cloudinary
            if (category.image) {
                const publicId = category.image.split("/").slice(-2).join("/").split(".")[0];
                try {
                    await cloudinary.uploader.destroy(publicId);
                } catch (err) {
                    console.log("Error deleting old image:", err);
                }
            }
            category.image = req.file.path;
        }

        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Delete image from Cloudinary
        if (category.image) {
            const publicId = category.image.split("/").slice(-2).join("/").split(".")[0];
            try {
                await cloudinary.uploader.destroy(publicId);
            } catch (err) {
                console.log("Error deleting image:", err);
            }
        }

        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: "Category removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCategories,
    getFeaturedCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
