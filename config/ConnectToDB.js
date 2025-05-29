const mongoose = require("mongoose");

const connectToDB = async () => {
    const MONGO_URL = process.env.ATLASDB_URL;
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

module.exports = connectToDB;
