const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// 🧱 Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save files to 'uploads/' folder
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

// 🛠️ Handle POST request to /api/traditions
router.post("/", upload.single("image"), (req, res) => {
  const { title, description, category } = req.body;
  const image = req.file;

  if (!title || !description || !category || !image) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // For now, log the data
  const newTradition = {
    title,
    description,
    category,
    imagePath: image.path,
  };

  console.log("🆕 New Tradition:", newTradition);

  // In future: Save to MongoDB
  res.status(201).json({
    message: "Tradition added successfully!",
    data: newTradition,
  });
});

module.exports = router;