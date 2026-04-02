const mongoose = require('mongoose');
const { Schema } = mongoose;
const listingSchema = new Schema({
    img:String,
    tittle:String,
    description:String,
    price:Number,
    country:String,
    location:String,
    avgRating: {
        type: Number,
        default: 0
    },
    review:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"owners"
    }
})
const Card =mongoose.model('Cards',listingSchema);

module.exports = Card;