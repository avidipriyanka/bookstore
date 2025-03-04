// backend/model.js

const express = require('express');
const router = express.Router();

// Define your route for /items
router.get('/', (req, res) => {
  res.send('Item routes are working');
});

// You can also define your MongoDB model logic here if needed
// Example: const Item = mongoose.model('Item', new mongoose.Schema({ name: String }));

module.exports = router;
