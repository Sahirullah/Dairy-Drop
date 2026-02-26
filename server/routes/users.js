const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    updateUser,
} = require("../controllers/userController");
const { protect, protectUser } = require("../middlewares/authMiddleware");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// User routes
router.route("/profile")
    .get(protectUser, getUserProfile)
    .put(protectUser, updateUserProfile);

// Admin routes
router.route("/")
    .get(protect, getUsers);

router.route("/:id")
    .delete(protect, deleteUser)
    .put(protect, updateUser);

module.exports = router;
