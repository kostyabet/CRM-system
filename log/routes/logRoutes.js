const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/', authenticateToken, logController.setNewLog);

module.exports = router;