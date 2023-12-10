const express = require('express');
const router = express.Router();
const cors = require('cors');


const student=require('../Models/StudentTopic');
const app=new express();
const jwt = require('jsonwebtoken');


router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cors()); // Should be under express.json always

router.get('/', async (req, res) => {
  try {
    const data = await student.find();
    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.json(data);
  } catch (error) {
    console.error('Error occurred while fetching data:', error);
    res.status(500).json({ error: 'Error occurred while fetching data' });
  }
});

router.post('/topic', async (req, res) => {
  try {
    const { projectId } = req.body; // Assuming projectId is used to identify the selected topic

    console.log('Received projectId:', projectId); // Check if projectId is being received

    // Find the topic by projectId and update its status to true
    const updatedTopic = await student.findOneAndUpdate(
      { _id: projectId },
      { project_status: true },
      { new: true } // To get the updated document back
    );

    if (!updatedTopic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    return res.status(200).json(updatedTopic);
  } catch (error) {
    console.error('Error updating topic status:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/getData/:id',async(req,res)=>{
  try {
      const id=req.params.id;
      //console.log('topicid is '+id)
      const data = await student.findById(id);
      //console.log("topic data is:"+data)
      res.status(200).send(data);
  } catch (error) {
      console.log("error is :"+error)
      res.status(400).send(error);
  }
})

module.exports = router;
