const express = require("express");
const router = express.Router();
const {
    getCategories,
    getFeaturedCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/categoryController");
const { protect } = require("../middlewares/authMiddleware");
const { upload } = require("../config/cloudinary");

// Public routes
router.get("/", getCategories);
router.get("/featured", getFeaturedCategories);
router.get("/:id", getCategoryById);

// Protected admin routes
router.post("/", protect, upload.single("image"), createCategory);
router.put("/:id", protect, upload.single("image"), updateCategory);
router.delete("/:id", protect, deleteCategory);

module.exports = router;
