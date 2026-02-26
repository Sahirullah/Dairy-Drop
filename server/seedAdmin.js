const mongoose = require("mongoose");
const Admin = require("./models/adminModel");
require("dotenv").config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        // Check if admin exists
        const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });

        if (adminExists) {
            console.log("Admin already exists");
            process.exit();
        }

        // Create admin
        const admin = await Admin.create({
            name: "Admin",
            email: process.env.ADMIN_EMAIL || "admin@hulushop.com",
            password: process.env.ADMIN_PASSWORD || "admin123",
        });

        console.log("Admin created successfully:", admin.email);
        process.exit();
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

seedAdmin();
