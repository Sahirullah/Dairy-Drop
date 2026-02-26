const Item = require("../models/itemsModel");
const { cloudinary } = require("../config/cloudinary");

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const products = await Item.find({}).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Item.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    try {
        const { name, category, color, type, description, price, comparePrice, size, highlights, detail } = req.body;

        // Handle image uploads
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            imageUrls = req.files.map((file) => file.path);
        }

        const product = await Item.create({
            name,
            category,
            color,
            type,
            description,
            price,
            comparePrice: comparePrice ? Number(comparePrice) : null,
            size: Array.isArray(size) ? size : JSON.parse(size || "[]"),
            highlights: Array.isArray(highlights) ? highlights : JSON.parse(highlights || "[]"),
            detail,
            image: imageUrls,
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    try {
        const product = await Item.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const { name, category, color, type, description, price, comparePrice, size, highlights, detail, existingImages } = req.body;

        // Handle new image uploads
        let imageUrls = [];
        if (existingImages) {
            imageUrls = Array.isArray(existingImages) ? existingImages : JSON.parse(existingImages);
        }

        if (req.files && req.files.length > 0) {
            const newImages = req.files.map((file) => file.path);
            imageUrls = [...imageUrls, ...newImages];
        }

        // Update product fields
        product.name = name || product.name;
        product.category = category || product.category;
        product.color = color || product.color;
        product.type = type || product.type;
        product.description = description || product.description;
        product.price = price || product.price;
        product.comparePrice = comparePrice ? Number(comparePrice) : null;
        product.size = size ? (Array.isArray(size) ? size : JSON.parse(size)) : product.size;
        product.highlights = highlights ? (Array.isArray(highlights) ? highlights : JSON.parse(highlights)) : product.highlights;
        product.detail = detail || product.detail;
        product.image = imageUrls.length > 0 ? imageUrls : product.image;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await Item.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Delete images from Cloudinary
        if (product.image && product.image.length > 0) {
            for (const imageUrl of product.image) {
                const publicId = imageUrl.split("/").slice(-2).join("/").split(".")[0];
                try {
                    await cloudinary.uploader.destroy(publicId);
                } catch (err) {
                    console.log("Error deleting image:", err);
                }
            }
        }

        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: "Product removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete product image
// @route   DELETE /api/products/:id/image
// @access  Private/Admin
const deleteProductImage = async (req, res) => {
    try {
        const { imageUrl } = req.body;
        const product = await Item.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Remove image from product
        product.image = product.image.filter((img) => img !== imageUrl);
        await product.save();

        // Delete from Cloudinary
        const publicId = imageUrl.split("/").slice(-2).join("/").split(".")[0];
        await cloudinary.uploader.destroy(publicId);

        res.json({ message: "Image deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    deleteProductImage,
};
