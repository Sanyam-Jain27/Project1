const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    name:String,
    age:String,
    username:String,
    password:String, 
})
const User =mongoose.model('Users',userSchema);

module.exports = User;
