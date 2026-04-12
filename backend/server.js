require('dotenv').config();

const connectDB = require("./config/db");
connectDB();

const express = require('express');
const app = express();

app.use(express.json());

const cors = require("cors");
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://project1-peach-eight.vercel.app"
    ]
}));

// ✅ all routes
const listingRoutes = require("./routes/listingroutes");
const userRoutes = require("./routes/userroutes");
const ownerRoutes = require("./routes/ownerroutes");
const bookingRoutes = require("./routes/bookingroutes");
const reviewRoutes = require("./routes/reviewroutes");

app.use("/airbnb", listingRoutes);
app.use("/airbnb", userRoutes);
app.use("/airbnb", ownerRoutes);
app.use("/airbnb", reviewRoutes);
app.use("/booking", bookingRoutes);

// server start
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});