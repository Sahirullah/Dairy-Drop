const mongoose = require("mongoose");
const Category = require("./models/categoryModel");
const Item = require("./models/itemsModel");
require("dotenv").config();

const seedDairyProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        // Clear existing data
        await Category.deleteMany({});
        await Item.deleteMany({});
        console.log("Cleared existing data");

        // Create dairy categories
        const categories = await Category.insertMany([
            {
                name: "Drinks",
                slug: "drinks",
                description: "Dairy Drinks Collection",
                image: "http://localhost:5000/drinks.jpg",
                isFeatured: true,
                isActive: true,
                order: 1,
            },
            {
                name: "Milk",
                slug: "milk",
                description: "Fresh Milk Products",
                image: "http://localhost:5000/milk.jpg",
                isFeatured: true,
                isActive: true,
                order: 2,
            },
            {
                name: "Yogurt",
                slug: "yogurt",
                description: "Yogurt Collection",
                image: "http://localhost:5000/yogurt.jpg",
                isFeatured: true,
                isActive: true,
                order: 3,
            },
            {
                name: "Cheese",
                slug: "cheese",
                description: "Cheese Products",
                image: "http://localhost:5000/cheese.jpg",
                isFeatured: true,
                isActive: true,
                order: 4,
            },
            {
                name: "Butter",
                slug: "butter",
                description: "Butter Collection",
                image: "http://localhost:5000/butter.jpg",
                isFeatured: true,
                isActive: true,
                order: 5,
            },
            {
                name: "Cream",
                slug: "cream",
                description: "Cream Products",
                image: "http://localhost:5000/cream.jpg",
                isFeatured: true,
                isActive: true,
                order: 6,
            },
        ]);

        console.log("Categories created:", categories.length);

        // Create sample dairy products
        const products = await Item.insertMany([
            {
                name: "Fresh Whole Milk",
                category: "milk",
                color: "White",
                type: "Milk",
                description: "Premium fresh whole milk",
                price: 150,
                comparePrice: 200,
                size: ["500ml", "1L", "2L"],
                highlights: ["Fresh", "Whole Milk", "Premium Quality"],
                detail: "High-quality fresh whole milk from local farms",
                image: ["http://localhost:5000/milk-1.jpg"],
            },
            {
                name: "Low Fat Milk",
                category: "milk",
                color: "White",
                type: "Milk",
                description: "Healthy low fat milk",
                price: 140,
                comparePrice: 180,
                size: ["500ml", "1L", "2L"],
                highlights: ["Low Fat", "Healthy", "Fresh"],
                detail: "Nutritious low fat milk for health-conscious consumers",
                image: ["http://localhost:5000/milk-2.jpg"],
            },
            {
                name: "Greek Yogurt",
                category: "yogurt",
                color: "White",
                type: "Yogurt",
                description: "Creamy Greek yogurt",
                price: 200,
                comparePrice: 250,
                size: ["200g", "400g", "800g"],
                highlights: ["Greek Style", "Creamy", "Protein Rich"],
                detail: "Delicious Greek yogurt with high protein content",
                image: ["http://localhost:5000/yogurt-1.jpg"],
            },
            {
                name: "Fruit Yogurt",
                category: "yogurt",
                color: "Mixed",
                type: "Yogurt",
                description: "Yogurt with mixed fruits",
                price: 180,
                comparePrice: 220,
                size: ["200g", "400g"],
                highlights: ["Fruity", "Delicious", "Natural"],
                detail: "Tasty yogurt with natural fruit flavors",
                image: ["http://localhost:5000/yogurt-2.jpg"],
            },
            {
                name: "Cheddar Cheese",
                category: "cheese",
                color: "Yellow",
                type: "Cheese",
                description: "Aged cheddar cheese",
                price: 350,
                comparePrice: 450,
                size: ["200g", "500g", "1kg"],
                highlights: ["Aged", "Premium", "Flavorful"],
                detail: "Premium aged cheddar cheese with rich flavor",
                image: ["http://localhost:5000/cheese-1.jpg"],
            },
            {
                name: "Mozzarella Cheese",
                category: "cheese",
                color: "White",
                type: "Cheese",
                description: "Fresh mozzarella cheese",
                price: 300,
                comparePrice: 400,
                size: ["200g", "500g"],
                highlights: ["Fresh", "Soft", "Creamy"],
                detail: "Fresh mozzarella perfect for cooking and salads",
                image: ["http://localhost:5000/cheese-2.jpg"],
            },
            {
                name: "Salted Butter",
                category: "butter",
                color: "Yellow",
                type: "Butter",
                description: "Premium salted butter",
                price: 250,
                comparePrice: 320,
                size: ["200g", "500g"],
                highlights: ["Salted", "Premium", "Rich Flavor"],
                detail: "High-quality salted butter for cooking and baking",
                image: ["http://localhost:5000/butter-1.jpg"],
            },
            {
                name: "Unsalted Butter",
                category: "butter",
                color: "Yellow",
                type: "Butter",
                description: "Pure unsalted butter",
                price: 240,
                comparePrice: 310,
                size: ["200g", "500g"],
                highlights: ["Unsalted", "Pure", "Premium"],
                detail: "Pure unsalted butter ideal for baking",
                image: ["http://localhost:5000/butter-2.jpg"],
            },
            {
                name: "Heavy Cream",
                category: "cream",
                color: "White",
                type: "Cream",
                description: "Rich heavy cream",
                price: 200,
                comparePrice: 260,
                size: ["200ml", "500ml"],
                highlights: ["Heavy", "Rich", "Premium"],
                detail: "Premium heavy cream for cooking and desserts",
                image: ["http://localhost:5000/cream-1.jpg"],
            },
            {
                name: "Whipping Cream",
                category: "cream",
                color: "White",
                type: "Cream",
                description: "Whipping cream for desserts",
                price: 180,
                comparePrice: 240,
                size: ["200ml", "500ml"],
                highlights: ["Whippable", "Smooth", "Creamy"],
                detail: "Perfect whipping cream for cakes and desserts",
                image: ["http://localhost:5000/cream-2.jpg"],
            },
            {
                name: "Chocolate Milk Drink",
                category: "drinks",
                color: "Brown",
                type: "Drink",
                description: "Delicious chocolate milk drink",
                price: 120,
                comparePrice: 160,
                size: ["200ml", "500ml", "1L"],
                highlights: ["Chocolate", "Tasty", "Nutritious"],
                detail: "Delightful chocolate milk drink for all ages",
                image: ["http://localhost:5000/drink-1.jpg"],
            },
            {
                name: "Strawberry Milk Drink",
                category: "drinks",
                color: "Pink",
                type: "Drink",
                description: "Fresh strawberry milk drink",
                price: 130,
                comparePrice: 170,
                size: ["200ml", "500ml", "1L"],
                highlights: ["Strawberry", "Fresh", "Delicious"],
                detail: "Refreshing strawberry milk drink with natural flavor",
                image: ["http://localhost:5000/drink-2.jpg"],
            },
        ]);

        console.log("Products created:", products.length);
        console.log("\n✅ Dairy products seeding completed successfully!");
        console.log(`Created ${categories.length} categories and ${products.length} products`);
        process.exit();
    } catch (error) {
        console.error("Error:", error.message);
        process.exit(1);
    }
};

seedDairyProducts();
