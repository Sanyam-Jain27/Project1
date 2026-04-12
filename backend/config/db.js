const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const dbUrl = process.env.MONGO_URI;

        console.log("Connecting to DB:", dbUrl);

        await mongoose.connect(dbUrl);

        console.log("MongoDB Connected");
    } catch (err) {
        console.log("DB Error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;