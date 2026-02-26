const express = require("express");
const router = express.Router();
const {
    createOrder,
    getOrderById,
    getMyOrders,
    getOrders,
    updateOrderToPaid,
    updateOrderToDelivered,
    updateOrderStatus,
    deleteOrder,
} = require("../controllers/orderController");
const { protect, protectUser } = require("../middlewares/authMiddleware");

// User routes
router.route("/").post(protectUser, createOrder);
router.route("/myorders").get(protectUser, getMyOrders);
router.route("/:id").get(protectUser, getOrderById);
router.route("/:id/pay").put(protectUser, updateOrderToPaid);

// Admin routes
router.route("/admin/all").get(protect, getOrders);
router.route("/:id/deliver").put(protect, updateOrderToDelivered);
router.route("/:id/status").put(protect, updateOrderStatus);
router.route("/admin/:id").delete(protect, deleteOrder);

module.exports = router;
