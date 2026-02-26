const mongoose = require("mongoose");
const Category = require("./models/categoryModel");
const Item = require("./models/itemsModel");
require("dotenv").config();

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        // Check if data already exists
        const existingCategories = await Category.countDocuments();
        const existingProducts = await Item.countDocuments();

        if (existingCategories > 0 && existingProducts > 0) {
            console.log("Data already exists. Skipping seed.");
            process.exit();
        }

        // Clear existing data
        await Category.deleteMany({});
        await Item.deleteMany({});
        console.log("Cleared existing data");

        // Create categories with local image paths
        const categories = await Category.insertMany([
            {
                name: "Men",
                slug: "men",
                description: "Men's Fashion Collection",
                image: "http://localhost:5000/men/images-1661697129697.jpg",
                isFeatured: true,
                isActive: true,
                order: 1,
            },
            {
                name: "Women",
                slug: "women",
                description: "Women's Fashion Collection",
                image: "http://localhost:5000/women/images-1661733644240.jpg",
                isFeatured: true,
                isActive: true,
                order: 2,
            },
            {
                name: "Kids",
                slug: "kids",
                description: "Kids' Fashion Collection",
                image: "http://localhost:5000/kids/images-1661736021736.jpg",
                isFeatured: true,
                isActive: true,
                order: 3,
            },
        ]);

        console.log("Categories created:", categories.length);

        // Create sample products with local image paths
        const products = await Item.insertMany([
            {
                name: "Balenciaga Jacket",
                category: "men",
                color: "Black",
                type: "Jacket",
                description: "Premium Balenciaga jacket with modern design",
                price: 1200,
                comparePrice: 1500,
                size: ["XS", "S", "M", "L", "XL", "XXL"],
                highlights: ["Premium Quality", "Designer Brand", "Modern Design"],
                detail: "High-quality Balenciaga jacket perfect for any occasion",
                image: [
                    "http://localhost:5000/featured/balenciaga-jacket-1.jpg",
                    "http://localhost:5000/featured/balenciaga-jacket-2.jpg",
                ],
            },
            {
                name: "Valentino Dress",
                category: "women",
                color: "Red",
                type: "Dress",
                description: "Elegant Valentino dress for special occasions",
                price: 1800,
                comparePrice: 2200,
                size: ["XS", "S", "M", "L", "XL"],
                highlights: ["Elegant Design", "Premium Fabric", "Designer"],
                detail: "Beautiful Valentino dress perfect for evening events",
                image: [
                    "http://localhost:5000/featured/valentino-1.jpg",
                    "http://localhost:5000/featured/valentino-2.jpg",
                ],
            },
            {
                name: "Jacquemus Shirt",
                category: "men",
                color: "White",
                type: "Shirt",
                description: "Stylish Jacquemus shirt with unique design",
                price: 650,
                comparePrice: 850,
                size: ["XS", "S", "M", "L", "XL", "XXL"],
                highlights: ["Unique Design", "Comfortable", "Premium"],
                detail: "Contemporary Jacquemus shirt for modern style",
                image: [
                    "http://localhost:5000/featured/jacquemus-1.jpg",
                    "http://localhost:5000/featured/jacquemus-2.jpg",
                ],
            },
            {
                name: "Versace Blazer",
                category: "women",
                color: "Navy",
                type: "Blazer",
                description: "Sophisticated Versace blazer for professional look",
                price: 1400,
                comparePrice: 1800,
                size: ["XS", "S", "M", "L", "XL"],
                highlights: ["Professional", "Elegant", "Designer"],
                detail: "Premium Versace blazer for business and casual wear",
                image: [
                    "http://localhost:5000/featured/versace-2.jpg",
                    "http://localhost:5000/featured/versace-3.jpg",
                ],
            },
            {
                name: "Zegna Trousers",
                category: "men",
                color: "Gray",
                type: "Trousers",
                description: "Premium Zegna trousers with perfect fit",
                price: 800,
                comparePrice: 1000,
                size: ["28", "30", "32", "34", "36", "38"],
                highlights: ["Perfect Fit", "Premium Fabric", "Comfortable"],
                detail: "High-quality Zegna trousers for everyday wear",
                image: [
                    "http://localhost:5000/featured/zegna-1.jpg",
                    "http://localhost:5000/featured/zegna-2.jpg",
                ],
            },
            {
                name: "Mugler Top",
                category: "women",
                color: "Black",
                type: "Top",
                description: "Modern Mugler top with contemporary design",
                price: 550,
                comparePrice: 750,
                size: ["XS", "S", "M", "L", "XL"],
                highlights: ["Modern Design", "Comfortable", "Stylish"],
                detail: "Contemporary Mugler top for fashion-forward style",
                image: [
                    "http://localhost:5000/featured/mugler-1.jpg",
                    "http://localhost:5000/featured/mugler-2.jpg",
                ],
            },
            {
                name: "Classic Men's Shirt",
                category: "men",
                color: "Blue",
                type: "Shirt",
                description: "Timeless classic men's shirt",
                price: 450,
                comparePrice: 600,
                size: ["S", "M", "L", "XL", "XXL"],
                highlights: ["Classic Style", "Comfortable", "Versatile"],
                detail: "Perfect for casual and formal occasions",
                image: [
                    "http://localhost:5000/men/images-1661697129774.jpg",
                    "http://localhost:5000/men/images-1661697129795.jpg",
                ],
            },
            {
                name: "Women's Summer Dress",
                category: "women",
                color: "White",
                type: "Dress",
                description: "Light and breezy summer dress",
                price: 350,
                comparePrice: 500,
                size: ["XS", "S", "M", "L", "XL"],
                highlights: ["Summer Collection", "Breathable", "Stylish"],
                detail: "Perfect for warm weather and casual outings",
                image: [
                    "http://localhost:5000/women/images-1661733644460.jpg",
                    "http://localhost:5000/women/images-1661733644521.jpg",
                ],
            },
            {
                name: "Kids' Casual Outfit",
                category: "kids",
                color: "Colorful",
                type: "Outfit",
                description: "Fun and comfortable kids' outfit",
                price: 200,
                comparePrice: 300,
                size: ["2-3Y", "3-4Y", "4-5Y", "5-6Y"],
                highlights: ["Comfortable", "Durable", "Fun Design"],
                detail: "Perfect for active kids",
                image: [
                    "http://localhost:5000/kids/images-1661736021737.jpg",
                    "http://localhost:5000/kids/images-1661736457211.jpg",
                ],
            },
        ]);

        console.log("Products created:", products.length);
        console.log("Data seeding completed successfully!");
        process.exit();
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

seedProducts();
