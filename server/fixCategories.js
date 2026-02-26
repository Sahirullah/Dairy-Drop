const mongoose = require("mongoose");
const Item = require("./models/itemsModel");
require("dotenv").config();

const fixCategories = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        // Get all products to see what categories exist
        const allProducts = await Item.find({});
        console.log("\n📋 Current products and their categories:");
        allProducts.forEach(product => {
            console.log(`- ${product.name}: "${product.category}"`);
        });

        // Count by category
        const categoryCounts = {};
        allProducts.forEach(product => {
            const cat = (product.category || '').toLowerCase().trim();
            categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
        });

        console.log("\n📊 Category distribution:");
        Object.entries(categoryCounts).forEach(([cat, count]) => {
            console.log(`- "${cat}": ${count} products`);
        });

        process.exit();
    } catch (error) {
        console.error("Error:", error.message);
        process.exit(1);
    }
};

fixCategories();
