const express = require("express");
const router = new express.Router();
const Story = require("../models/stories");
const upload = require('../middleware/upload');
const fs = require('fs');
const cors = require('cors');

router.use(cors());

//  add data
router.post("/story",upload.single('file'), async(req, res) => {
   const { name } = req.body; 
   if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    try {
      const file = new Story({
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
        mimetype: req.file.mimetype,
        name: name
      });
      await file.save();
      res.status(201).send(file);
    } catch (err) {
      res.status(500).send(err);
    }
}) 
//  get data
router.get("/story", async(req, res) => {
   try{
      const storyData = await Story.find();
      res.send(storyData);
   }catch(err){
       res.status(400).send(err);
   }
})
//  get by id data
router.get("/story/:id", async(req, res) => {
   try{
      const _id = req.params.id;
      const singleStory = await Story.findById(_id);
      if(!singleStory){
         res.status(400).send();
      }else {
         res.status(200).send(singleStory);
      }
   }catch(err){
      res.status(400).send(err);
   }
})
//  update story data
router.patch("/story/:id",upload.single('file'), async(req, res) => {
   try {
      // Find the document by ID
      const story = await Story.findById(req.params.id);
      if (!story) {
        return res.status(404).json({ message: 'Story not found' });
      }
  
      // Update metadata fields from req.body
      const { name } = req.body;
      if (name) story.name = name;
      // If a new file is uploaded, replace the existing file
      if (req.file) {
        // Delete the old file from the server
        if (fs.existsSync(story.path)) {
          fs.unlinkSync(story.path);
        }
  
        // Update with new file information
        story.filename = req.file.filename;
        story.path = req.file.path;
        story.size = req.file.size;
        story.mimetype = req.file.mimetype;
      }
      // Save the updated document
      await story.save();
      res.status(200).send(story);
    } catch (err) {
      res.status(500).send(err);
    }
}) 
// delete story
router.delete("/story/:id", async(req, res) => {
   try{
      const _id = req.params.id;
      const storyId = await Story.findByIdAndDelete(_id);
      if(!storyId){
         return res.status(400).send();
      }else{
         return res.status(200).send(storyId);
      }
   }catch(err){
       res.status(400).send(err);
   }
})


module.exports = router; 