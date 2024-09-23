const express = require("express");
require("./db/conn");
const tagData = require("./routers/tag");
const storyData = require("./routers/story.js");

const app = express();
const port = process.env.PORT || 8080;


app.use(express.json());
app.use(tagData);
app.use(storyData);

app.listen(port, ()=>{
    console.log(`connection setup at ${port}`);
}) 