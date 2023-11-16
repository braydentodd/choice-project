const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://braydentodd12:blCH12CHEESE@choiceproject.kfvuyuq.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema for comments
const commentSchema = new mongoose.Schema({
  verse: String,
  comment: String,
});

const Comment = mongoose.model('Comment', commentSchema);

// Routes
app.post('/api/comments', async (req, res) => {
  const { verse, comment } = req.body;

  try {
    const newComment = new Comment({ verse, comment });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/comments/:verse', async (req, res) => {
  const { verse } = req.params;

  try {
    const comments = await Comment.find({ verse });
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
