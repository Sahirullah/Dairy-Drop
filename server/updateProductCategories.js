const mongoose = require("mongoose");
const Item = require("./models/itemsModel");
require("dotenv").config();

const updateProductCategories = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        // Map of product names to correct categories
        const categoryMap = {
            // Drinks
            'chocolate': 'drinks',
            'strawberry': 'drinks',
            'drink': 'drinks',
            
            // Milk
            'milk': 'milk',
            'whole': 'milk',
            'low fat': 'milk',
            
            // Yogurt
            'yogurt': 'yogurt',
            'greek': 'yogurt',
            'fruit': 'yogurt',
            
            // Cheese
            'cheese': 'cheese',
            'cheddar': 'cheese',
            'mozzarella': 'cheese',
            
            // Butter
            'butter': 'butter',
            'salted': 'butter',
            'unsalted': 'butter',
            
            // Cream
            'cream': 'cream',
            'heavy': 'cream',
            'whipping': 'cream',
        };

        // Get all products
        const allProducts = await Item.find({});
        console.log(`\n📋 Found ${allProducts.length} products`);

        let updated = 0;

        // Update each product based on name matching
        for (const product of allProducts) {
            const nameLower = product.name.toLowerCase();
            let newCategory = product.category;

            // Find matching category from the map
            for (const [keyword, category] of Object.entries(categoryMap)) {
                if (nameLower.includes(keyword)) {
                    newCategory = category;
                    break;
                }
            }

            // If category changed, update it
            if (newCategory !== product.category) {
                console.log(`✏️  Updating: "${product.name}" from "${product.category}" to "${newCategory}"`);
                await Item.findByIdAndUpdate(product._id, { category: newCategory });
                updated++;
            }
        }

        console.log(`\n✅ Updated ${updated} products`);

        // Show final distribution
        const updatedProducts = await Item.find({});
        const finalCounts = {};
        updatedProducts.forEach(product => {
            const cat = (product.category || '').toLowerCase().trim();
            finalCounts[cat] = (finalCounts[cat] || 0) + 1;
        });

        console.log("\n📊 Final category distribution:");
        Object.entries(finalCounts).forEach(([cat, count]) => {
            console.log(`- "${cat}": ${count} products`);
        });

        process.exit();
    } catch (error) {
        console.error("Error:", error.message);
        process.exit(1);
    }
};

updateProductCategories();
