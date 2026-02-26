const mongoose = require('mongoose');
const Item = require('./models/itemsModel');
require('dotenv').config();

const checkProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const items = await Item.find({});
        console.log('\nTotal products:', items.length);
        console.log('\nProducts by category:');
        
        const grouped = {};
        items.forEach(item => {
            if (!grouped[item.category]) {
                grouped[item.category] = [];
            }
            grouped[item.category].push(item.name);
        });

        Object.entries(grouped).forEach(([cat, products]) => {
            console.log(`${cat}: ${products.length} products`);
            products.forEach(p => console.log(`  - ${p}`));
        });

        process.exit();
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

checkProducts();
