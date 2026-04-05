import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    contact:{
        type: String,
        required:true
    },
    listingsdetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Card"
    },
    datein:{
        type:Date,
        required:true
    },
    dateout:{
        type:Date,
        required:true
    }
})

module.exports =mongoose.model("Booking",bookingSchema);