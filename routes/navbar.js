const express = require('express');
const router = express.Router();

const getFrontPageData = require('../controllers/frontPageController');

// Route to handle the root URL
router.get('/', getFrontPageData);

// Corrected route with a proper handler
router.get('/vaibhavi', (req, res) => {
    res.send('helloooo');
});

module.exports = router;
