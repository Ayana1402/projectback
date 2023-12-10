// Your router file
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Weekdata = require('../Models/Weekdata.js');

// ... (other middleware and functions)

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5 MB
  },
});

router.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }
  
    try {
      // Create a new document in Weekdata model to store file information
      const newFile = new Weekdata({
        file: {
          data: req.file.buffer, // Store the file buffer
          contentType: req.file.mimetype, // Store the file's MIME type
          originalName: req.file.originalname, // Store the original filename
        },
        // Add other fields related to the uploaded file or report if needed
        // ...
      });
  
      // Save the file data into the database
      await newFile.save();
  
      // Sending a success message back to the client
      return res.status(200).send('File uploaded successfully and processed.');
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).send('Failed to upload file.');
    }
  });
  

 

router.get('/submission/:id', async (req, res) => {
  try 
  {
      const id=req.params.id;
      //console.log('Query:', await Weekdata.find({ userid: id }));
      const totalDocuments  = await Weekdata.countDocuments({"userid": id});
      //const userIdExists = totalDocuments > 0;

      //console.log("total submsn :"+totalDocuments)
      res.status(200).send({message:'total',total:totalDocuments});
  }
  catch (error) 
  {
      console.log("error is :"+error)
      res.status(404).send('Error!!');
  }
})



module.exports = router;
