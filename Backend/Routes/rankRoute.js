//importing packages & Router & Controllers
const express = require('express');
const router = express.Router();
const { getUserRank } = require('../Controllers/rankController');

// ------------------ Post Methods ------------------
// http://localhost:3000/rank/
router.post('/',getUserRank);

module.exports = router;