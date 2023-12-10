const express = require('express');
const router = express.Router();
const cors = require('cors');
const Topic = require('../Models/Topicdetails');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cors());

// Fetch all topics
router.get('/', async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (error) {
    console.error('Error fetching topics:', error);
    res.status(500).json({ error: 'Error fetching topics' });
  }
});

// Fetch a specific topic by ID
router.get('/view/:topicId', async (req, res) => {
  try {
    const topicId = req.params.topicId;

    // Find all topics associated with a specific student ID
    const topics = await Topic.find({  topicId: topicId});

    if (!topics || topics.length === 0) {
      return res.status(404).json({ message: 'No topics found for this student ID' });
    }

    res.json(topics);
  } catch (error) {
    console.error('Error fetching topics by student ID:', error);
    res.status(500).json({ error: 'Error fetching topics by student ID' });
  }
});

module.exports = router;
