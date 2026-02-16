const express = require('express')
const app = express()

app.get("/", (req, res)=>{
    res.json({message :"Your website is running"})
})

app.listen(3000, ()=>{
    console.log("Server started running on port 3000");
})