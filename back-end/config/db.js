const mongoose = require('mongoose')
require("dotenv").config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DBConnectionString);
        console.log("Database connected successfully....");
    }
    catch(err){
        console.log("Database connection failed due to", err.message);
    }
}

module.exports = connectDB;