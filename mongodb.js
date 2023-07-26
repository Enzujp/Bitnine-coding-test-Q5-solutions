const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/BitnineQ5")
.then(() => {
    console.log("Database connected!")
})
.catch(() => {
    console.log("Failed to connect to database")
})

const LogInSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})


const collection = new mongoose.model("firstCollection", LogInSchema);

module.exports = collection;