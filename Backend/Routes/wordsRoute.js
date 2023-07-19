//importing packages & Router & Controllers
const express = require('express');
const router = express.Router();
const { getRandomWords } = require('../Controllers/wordsController');

// ------------------ Get Methods ------------------
// http://localhost:3000/words/
router.get('/',getRandomWords);

module.exports = router;