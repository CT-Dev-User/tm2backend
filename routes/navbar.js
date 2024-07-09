<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const getFrontPageData = require('../controllers/frontPageController');

// Route to handle the root URL
router.get('/', getFrontPageData);

// Route with incorrect handler
// router.get('/chaitvik','dubaunnhkhatayet')  // This line is incorrect

// Corrected route with a proper handler
router.get('/vaibhavi', (req, res) => {
    res.send('helloooo');
});

module.exports = router;
=======
const express = require('express');
const router = express.Router();

const getFrontPageData = require('../controllers/frontPageController');

// Route to handle the root URL
router.get('/', getFrontPageData);


module.exports = router;
>>>>>>> 3b349a2e16d5b226d453fe009a41f6a3bc452aa2
