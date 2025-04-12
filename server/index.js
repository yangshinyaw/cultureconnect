const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const traditionRoutes = require('./routes/traditions');
app.use('/api/traditions', traditionRoutes);

// Routes placeholder
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
