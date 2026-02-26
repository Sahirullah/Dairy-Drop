const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB().catch(err => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Routes
app.use("/api/admin", require("./routes/admin"));
app.use("/api/products", require("./routes/products"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/users", require("./routes/users"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/items", require("./routes/items"));
app.use("/api/payment", require("./routes/payment"));

// Health check route
app.get("/", (req, res) => {
    res.json({ message: "HuluShop API is running..." });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!", error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});