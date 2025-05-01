const express = require('express');
const router = express.Router();
const stateController = require('../controllers/stateController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/', authenticateToken, stateController.add);
router.get('/', authenticateToken, stateController.get);
router.delete('/', authenticateToken, stateController.delete);

module.exports = router;