const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Tag = new mongoose.model("Tag", tagSchema);
module.exports = Tag; 