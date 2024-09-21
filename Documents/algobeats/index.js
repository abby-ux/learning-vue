const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');


const path = require('path'); // Make sure to import path

// Load environment variables from .env file
dotenv.config();

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse incoming JSON requests
app.use(express.json()); // Uncomment this line to use JSON parsing

// STATIC VERSION
app.use(express.static(path.join(__dirname, 'public')));



// Define a simple route
app.get('/', (req, res) => {
  res.send('Welcome to AlgoBeats API');
});

app.get('/users', async (req, res) => {
    const users = await users.find();
    res.json(users);
    res.json({mssg: 'welcome to the users API'}); 
  });
  

// Define the port to listen on
const PORT = process.env.PORT || 5000;

// Start the server
// app.listen(3000, () => {
//     console.log("App listening on port 3000")
// })
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
