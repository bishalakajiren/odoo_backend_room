const express = require('express');
const router = express.Router();
const sessionController = require('../Controllers/sessionController');

// Generate a session token
router.post('/generateToken', sessionController.generateToken);

// Get all sessions
router.get('/getAllSession', sessionController.getAllSession);

module.exports = router;