// backend/model/routes/itemRoutes.js

const express = require('express');
const router = express.Router();

// Example route
router.get('/', (req, res) => {
  res.send('Item routes are working');
});

module.exports = router;
