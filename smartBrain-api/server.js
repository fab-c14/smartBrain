const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: '987',
      hash: '', // Fix the typo here from 'has' to 'hash'
      email: 'john@gmail.com',
    },
  ],
};

app.get('/', (req, res) => {
  res.send(database.users);
});

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    res.json('success');
  } else {
    res.status(400).json('error logging in');
  }
});

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;

  // Add bcrypt hash generation for the password
  const hash = bcrypt.hashSync(password);

  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: hash, // Save the hashed password
    entries: 0,
    joined: new Date(),
  });

  res.json(database.users[database.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params; // Use params instead of body for the ID
  let found = false;

  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });

  if (!found) {
    res.status(400).json('not found');
  }
});

app.post('/image', (req, res) => {
  const { id } = req.body;
  let found = false;

  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });

  if (!found) {
    res.status(400).json('not found');
  }
});

app.listen(3000, () => {
  console.log(`app is running on http://localhost:3000`);
});
