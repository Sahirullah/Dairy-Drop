const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            retryWrites: true,
            w: "majority"
        })
        console.log("Mongo DB Connected: ", conn.connection.host)
    }
    catch(err) {
        console.error("MongoDB Connection Error:", err.message)
        console.error("Full error:", err)
        process.exit(1)
    }
}

module.exports = connectDB