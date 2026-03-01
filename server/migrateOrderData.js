const mongoose = require('mongoose');
const Order = require('./models/orderModel');
const User = require('./models/userModel');
require('dotenv').config();

const migrateOrderData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dairy-drop');
        console.log('Connected to MongoDB');

        // Find all orders without customerInfo
        const ordersWithoutCustomerInfo = await Order.find({
            $or: [
                { customerInfo: { $exists: false } },
                { customerInfo: null }
            ]
        }).populate('user', 'name email phone');

        console.log(`Found ${ordersWithoutCustomerInfo.length} orders to migrate`);

        let updated = 0;
        for (const order of ordersWithoutCustomerInfo) {
            if (order.user) {
                order.customerInfo = {
                    name: order.user.name || '',
                    email: order.user.email || '',
                    phone: order.user.phone || '',
                };
                await order.save();
                updated++;
                console.log(`Updated order ${order._id}`);
            }
        }

        console.log(`Successfully migrated ${updated} orders`);
        process.exit(0);
    } catch (error) {
        console.error('Migration error:', error);
        process.exit(1);
    }
};

migrateOrderData();
