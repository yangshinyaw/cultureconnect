const express = require('express');
const router = express.Router();
const Tradition = require('../models/Tradition');

// Create a new tradition
router.post('/', async (req, res) => {
  try {
    const tradition = new Tradition(req.body);
    await tradition.save();
    res.status(201).json(tradition);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all traditions
router.get('/', async (req, res) => {
  try {
    const traditions = await Tradition.find().sort({ createdAt: -1 });
    res.json(traditions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single tradition by ID
router.get('/:id', async (req, res) => {
  try {
    const tradition = await Tradition.findById(req.params.id);
    if (!tradition) return res.status(404).json({ message: 'Not found' });
    res.json(tradition);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update tradition
router.put('/:id', async (req, res) => {
  try {
    const updated = await Tradition.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete tradition
router.delete('/:id', async (req, res) => {
  try {
    await Tradition.findByIdAndDelete(req.params.id);
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
