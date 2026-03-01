const Order = require("../models/orderModel");
const User = require("../models/userModel");

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            name,
            email,
            phone,
        } = req.body;

        console.log('Creating order with data:', {
            userId: req.user?._id,
            orderItemsCount: orderItems?.length,
            shippingAddress,
            totalPrice,
            customerName: name,
            customerEmail: email,
            customerPhone: phone,
            phoneIsEmpty: !phone || phone.trim() === '',
        });

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: "No order items" });
        }

        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        // Validate and normalize order items
        const normalizedOrderItems = orderItems.map(item => {
            // Ensure image is a string, not an array
            let imageValue = item.image;
            if (Array.isArray(imageValue)) {
                imageValue = imageValue[0] || '';
            }

            // Ensure size is a string, not an array
            let sizeValue = item.size;
            if (Array.isArray(sizeValue)) {
                sizeValue = sizeValue[0] || '';
            }

            return {
                product: item.product,
                name: item.name,
                quantity: item.quantity,
                image: String(imageValue),
                price: item.price,
                size: String(sizeValue || ''),
                color: String(item.color || ''),
            };
        });

        const order = await Order.create({
            user: req.user._id,
            customerInfo: {
                name: name || req.user.name || '',
                email: email || req.user.email || '',
                phone: (phone && phone.trim()) || req.user.phone || '',
            },
            orderItems: normalizedOrderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        // Update user's phone if provided and not empty
        if (phone && phone.trim()) {
            await User.findByIdAndUpdate(
                req.user._id,
                { phone: phone.trim() },
                { new: true }
            );
        }

        // Add order to user's orders array
        await User.findByIdAndUpdate(
            req.user._id,
            { $push: { orders: order._id } },
            { new: true }
        );

        console.log('Order created successfully:', order._id);
        res.status(201).json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email phone");

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate("user", "name email phone")
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            };

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order to delivered (Admin)
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
            order.status = "delivered";

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.status = req.body.status || order.status;

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete order (Admin)
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            await Order.findByIdAndDelete(req.params.id);
            res.json({ message: "Order removed" });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createOrder,
    getOrderById,
    getMyOrders,
    getOrders,
    updateOrderToPaid,
    updateOrderToDelivered,
    updateOrderStatus,
    deleteOrder,
};
