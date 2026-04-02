const mongoose = require('mongoose');
const { Schema } = mongoose;
const ownerSchema = new Schema({
    name:String,
    age:String,
    username:String,
    password:String,
    contactno:String,
    email:String
})
const Owner =mongoose.model('owners',ownerSchema); 
module.exports = Owner;
