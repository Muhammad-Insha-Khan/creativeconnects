const express = require('express');
const { requestProject, getProjectRequests } = require('../controllers/requestController');
const router = express.Router();

// Send a proposal to a buyer's project
router.post('/project-request', requestProject);

// Buyer views all project requests (notifications)
router.get('/project-requests', getProjectRequests);

module.exports = router;
