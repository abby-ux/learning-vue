// server.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Load environment variables from .env file
dotenv.config();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
// connectDB();
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/', {
// mongoose.connect('mongodb://localhost:27017/algobeats', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err));

// Define User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true }
});

// Create User model
const User = mongoose.model('User', userSchema);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the home/landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to serve login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login', 'login.html'));
});
  
  // Route to serve signup page
// app.get('/signup', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'login', 'signup.html'));
// });  

// POST route for signup form submission
app.post('/signup', async (req, res) => {
  console.log(req.body); // Check the incoming form data
  const { username, password, name } = req.body;

    // Check if any fields are missing
  if (!username || !password || !name) {
    return res.status(400).send('Missing required fields.');
  }

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username already taken.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      name
    });

    // Save the user to the database
    await newUser.save();

    // Send success response
    res.status(201).send('User registered successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering user.');
  }
});

// // Handle login form submission
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
  
//   // Placeholder logic: check credentials (this would query your database)
//   if (username === 'testuser' && password === 'password123') {
//     res.send('Login successful');
//   } else {
//     res.status(401).send('Invalid credentials');
//   }
// });

// // Handle signup form submission
// app.post('/signup', (req, res) => {
//   const { username, email, password } = req.body;
  
//   // Placeholder logic: create new user (this would save to your database)
//   if (username && email && password) {
//     res.send('Signup successful');
//   } else {
//     res.status(400).send('Missing required fields');
//   }
// });


// Set the server to listen on a specific port (e.g., 3000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
