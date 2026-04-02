const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    comment: String,
    rating: Number,

    user: {
        type: Schema.Types.ObjectId,
        refPath: "userModel"   // 🔥 dynamic
    },

    userModel: {
        type: String,
        required: true,
        enum: ["Users", "owners"]   // 🔥 EXACT model names
    },

    listing: {
        type: Schema.Types.ObjectId,
        ref: "Cards"
    }
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;