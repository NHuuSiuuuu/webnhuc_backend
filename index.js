const express = require("express")
const  dotenv = require("dotenv")

// Cấu hình env
dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.get("/", (req, res)=> {
    res.send("hrj hrj r")
})

app.listen(port, ()=>{
    console.log("Server running in port", port)
})