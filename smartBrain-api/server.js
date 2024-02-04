const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const { MongoClient} = require('mongodb');

const app = express();

app.use(bodyParser.json());
app.use(cors()); 

const client = new MongoClient("mongodb+srv://smartBrain:VNVLH56ljxVxVxsW@cluster0.qaomdha.mongodb.net/?retryWrites=true&w=majority");
client.connect((err, client) =>{
    if (err) throw err;
    console.log("Connected to MongoDB Atlas!");
});


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

app.get('/profile/:_id', (req, res) => {
  const { _id } = req.params;

  db.collection('smartBrain').findOne({ _id: _id }, (err, user) => {
    if (err || !user) {
      res.status(400).json('not found');
    } else {
      res.json(user);
    }
  });
});

app.post('/image', (req, res) => {
  const { _id } = req.body;

  db.collection('smartBrain').findOneAndUpdate(
    { _id: _id },
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