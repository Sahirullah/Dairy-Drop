const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

// @desc    Register admin (for initial setup only)
// @route   POST /api/admin/register
// @access  Public (should be protected in production)
const registerAdmin = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Check if admin exists
        const adminExists = await Admin.findOne({ email });

        if (adminExists) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        // Create admin
        const admin = await Admin.create({
            email,
            password,
            name,
        });

        if (admin) {
            res.status(201).json({
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                token: generateToken(admin._id),
            });
        } else {
            res.status(400).json({ message: "Invalid admin data" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Login admin
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for admin email
        const admin = await Admin.findOne({ email });

        if (admin && (await admin.matchPassword(password))) {
            res.json({
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                token: generateToken(admin._id),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private
const getAdminProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin._id).select("-password");
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerAdmin,
    loginAdmin,
    getAdminProfile,
};
