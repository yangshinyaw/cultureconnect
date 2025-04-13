const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON data
app.use(express.urlencoded({ extended: true })); // to parse form data
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // serve image files

// Routes
const traditionRoutes = require('./routes/traditions');
app.use('/api/traditions', traditionRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to CultureConnect API');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log("Connected to MongoDB");
  app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
  });
})
.catch(err => console.error(err));
