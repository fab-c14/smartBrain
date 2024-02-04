const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

app.use(bodyParser.json());
app.use(cors()); 

const uri = "mongodb+srv://smartBrain:VNVLH56ljxVxVxsW@cluster0.qaomdha.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

client.connect((err) => {
  if (err) {
    console.error('Error connecting to MongoDB Atlas:');
    return;
  }

});


const db = client.db();

app.get('/', (req, res) => {
  res.send('Welcome to your app!');
});

app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("Invalid Credentials");
  }

  db.collection('smartBrain').findOne({ email: email }, (err, user) => {
    if (err || !user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json('Invalid Credentials');
    } else {
      res.json(user);
    }
  });
});

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json("Please Type In Your Details To Register");
  }

  const hash = bcrypt.hashSync(password);

  db.collection('smartBrain').insertOne({
    name: name,
    email: email,
    password: hash,
    entries: 0,
    joined: new Date(),
  }, (err, result) => {
    if (err) {
      return res.status(500).json('Error registering user');
    } else {
      res.json(result.ops[0]);
    }
  });
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;

  db.collection('smartBrain').findOne({ id: id }, (err, user) => {
    if (err || !user) {
      res.status(400).json('not found');
    } else {
      res.json(user);
    }
  });
});

app.post('/image', (req, res) => {
  const { id } = req.body;

  db.collection('smartBrain').findOneAndUpdate(
    { id: id },
    { $inc: { entries: 1 } },
    { returnOriginal: false },
    (err, result) => {
      if (err || !result.value) {
        res.status(400).json('not found');
      } else {
        res.json(result.value.entries);
      }
    }
  );
});

app.listen(3000, () => {
  console.log(`app is running on http://localhost:3000`);
});