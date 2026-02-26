const mongoose = require('mongoose');
const Item = require('./models/itemsModel');
require('dotenv').config();

const fixProductCategories = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Find all products and fix their categories
        const items = await Item.find({});
        console.log('Found', items.length, 'products');

        for (const item of items) {
            const originalCategory = item.category;
            const fixedCategory = (item.category || '').toLowerCase().trim();
            
            if (originalCategory !== fixedCategory) {
                item.category = fixedCategory;
                await item.save();
                console.log(`Fixed: "${originalCategory}" -> "${fixedCategory}"`);
            }
        }

        console.log('\n✅ All product categories fixed!');
        
        // Show final state
        const updatedItems = await Item.find({});
        const grouped = {};
        updatedItems.forEach(item => {
            if (!grouped[item.category]) {
                grouped[item.category] = [];
            }
            grouped[item.category].push(item.name);
        });

        console.log('\nFinal products by category:');
        Object.entries(grouped).forEach(([cat, products]) => {
            console.log(`${cat}: ${products.length} products`);
        });

        process.exit();
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

fixProductCategories();
