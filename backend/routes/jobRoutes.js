// routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const { getAllJobDescriptions } = require('../controllers/jobController');

router.get('/all-job-descriptions', getAllJobDescriptions);

module.exports = router;
