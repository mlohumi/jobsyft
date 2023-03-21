/* TODO 

naukri.js - default variable values(maybe null) if data from api response is missing
Implement per page data & lazy load

Protect API routes

- logo
- cname
- designation
- salary
- location
- experience

*/

/* For Testing

After cloning the repo please make a .env file in the root dir and add:

DB_URL = "Get this value from your mongo atlas setup"
PORT = ""

naukri.js - Change cron scheduler value b/w line no. 75 - 85 to 1.

*/

const dotenv = require("dotenv")
const express = require("express")
const app = express()
const connectDB = require("./server/db/conn")
const job = require("./server/routes/job")
require("dotenv").config()
require("./server/utils/naukri")

const PORT = process.env.PORT || 8003
const DB = process.env.DB_URL

app.use(express.json())

app.use("/api/v1/jobs", job)

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
