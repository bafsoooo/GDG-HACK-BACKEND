require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
     await mongoose.connect(process.env.DATABASE_URL)
        console.log("MongoDB connected successfully");
    }catch (error) {
        console.error("MongoDB connection faild:", error);
    }
}

const schema = mongoose.Schema
const userSchema = new schema({
    name: String,
    email: String,
    password: String
}) 

const User = mongoose.model('User', userSchema);
module.exports = {connectDB, User};