const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("bufferCommands", false);

const connectDB = async () => {
    const connectionString = process.env.DBConnectionString;

    if (!connectionString) {
        throw new Error("DBConnectionString is missing in .env");
    }

    await mongoose.connect(connectionString, {
        serverSelectionTimeoutMS: 5000,
    });

    console.log("Database connected successfully.");
    return mongoose.connection;
};

module.exports = connectDB;
