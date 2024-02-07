const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB Atlas with Mongoose
mongoose.connect("mongodb+srv://smartBrain:dYOhi7Za333yFX4H@cluster0.qaomdha.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB Atlas!");
}).catch((err) => {
  console.error("Failed to connect to MongoDB Atlas:", err);
});

// Define Mongoose Schema
const smartBrainSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  entries: Number,
  joined: Date
});

const SmartBrain = mongoose.model('SmartBrain', smartBrainSchema);

// Routes
app.get('/', (req, res) => {
  res.json("Welcome to the App")
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("Invalid Credentials");
  }

  try {
    const smartBrain = await SmartBrain.findOne({ email: email });
    if (!smartBrain || !bcrypt.compareSync(password, smartBrain.password)) {
      return res.status(400).json('Invalid Credentials');
    } else {
      res.json(smartBrain);
    }
  } catch (err) {
    console.error("Error finding user in signin:", err);
    return res.status(500).json('Internal Server Error');
  }
});

app.post('/register', async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json("Please Type In Your Details To Register");
  }

  const hash = bcrypt.hashSync(password);

  try {
    const newUser = await SmartBrain.create({
      name: name,
      email: email,
      password: hash,
      entries: 0,
      joined: new Date(),
    });
    res.json(newUser);
  } catch (err) {
    console.error("Error registering user:", err);
    return res.status(500).json('Error registering smartBrain');
  }
});

app.get('/profile/:_id', async (req, res) => {
  const { _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json('Invalid _id');
  }

  try {
    const smartBrain = await SmartBrain.findById(_id);
    if (!smartBrain) {
      return res.status(404).json('User not found');
    }
    res.json(smartBrain);
  } catch (err) {
    console.error("Error finding user profile:", err);
    return res.status(500).json('Internal Server Error');
  }
});

app.post('/image', async (req, res) => {
  const { _id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json('Invalid _id');
  }

  try {
    const updatedUser = await SmartBrain.findByIdAndUpdate(_id, { $inc: { entries: 1 } }, { new: true });
    if (!updatedUser) {
      return res.status(404).json('User not found');
    }
    res.json(updatedUser.entries);
  } catch (err) {
    console.error("Error updating image count:", err);
    return res.status(500).json('Internal Server Error');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
