const mongoose = require("mongoose")

const connectDB = (url) => {
  mongoose.set("strictQuery", false)
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB connected successfully")
    })
    .catch((err) => console.log("DB connection not found!"))
}

module.exports = connectDB
