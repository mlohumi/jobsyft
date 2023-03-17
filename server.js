const dotenv = require("dotenv")
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const connectDB = require("./src/db/conn")
require("dotenv").config()

const PORT = process.env.PORT || 8003
const DB = process.env.DB_URL

app.use(express.json())

app.use("/", (req, res) => {
  res.send("API RUNNING")
})

const start = async () => {
  try {
    await connectDB(DB)
    app.listen(PORT, console.log(`Server is up and running on port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start()
