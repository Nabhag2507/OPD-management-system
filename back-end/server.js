const express = require('express')
const cors = require('cors');
const connectDB = require('./config/db');

const app = express()

connectDB();

app.use(cors());
app.use(express.json());

require('dotenv').config();

app.get("/", (req, res)=>{
    res.json({message :"Your website is running"})
})

app.listen(3000, ()=>{
    console.log("Server started running on port 3000");
})