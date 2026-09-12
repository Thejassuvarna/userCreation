const mongoose = require('mongoose')

mongoose.connect(`mongodb://127.0.0.1:27017/mongoDBPractice`);

const userSchema = mongoose.Schema({
    img: String,
    userName: String,
    email: String
})

module.exports = mongoose.model("user", userSchema);