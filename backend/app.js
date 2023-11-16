const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const cors = require('cors');

const mongoUri = 'mongodb+srv://braydentodd12:blCH12./CHEESE@choiceproject.kfvuyuq.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors({ origin: '*' }));
app.use(express.json());

app.post('/api/comments', async (req, res) => {
  const { verse, comment } = req.body;

  try {
    await client.connect();
    const database = client.db('your_database_name');
    const collection = database.collection('comments');

    const newComment = { verse, comment };
    const result = await collection.insertOne(newComment);

    res.status(201).json(result.ops[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.get('/api/comments/:verse', async (req, res) => {
  const { verse } = req.params;

  try {
    await client.connect();
    const database = client.db('your_database_name');
    const collection = database.collection('comments');

    const comments = await collection.find({ verse }).toArray();

    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

const PORT = 5500;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
