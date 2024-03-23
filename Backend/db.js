const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://127.0.0.1:27017/RecipeApp'
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected with Database Successfully");
    }
    catch (error) {
        console.log("Connection Failed")
    }
}
module.exports = connectDB;