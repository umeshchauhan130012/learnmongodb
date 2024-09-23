const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/newsdb").then(() => console.log("connection is ready")).catch((error)=>console.log(error)); 