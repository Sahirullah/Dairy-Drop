const express = require("express");
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    deleteProductImage,
} = require("../controllers/productController");
const { protect } = require("../middlewares/authMiddleware");
const { upload } = require("../config/cloudinary");

// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Protected admin routes
router.post("/", protect, upload.array("images", 10), createProduct);
router.put("/:id", protect, upload.array("images", 10), updateProduct);
router.delete("/:id", protect, deleteProduct);
router.delete("/:id/image", protect, deleteProductImage);

module.exports = router;
