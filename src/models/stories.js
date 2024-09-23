const mongoose = require("mongoose");

const dtorySchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    name: {  // New field for custom file name
        type: String,
        required: true
    }
})

const Story = new mongoose.model("Story", dtorySchema);
module.exports = Story; 