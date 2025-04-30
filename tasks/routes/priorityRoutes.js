const express = require('express');
const router = express.Router();
const priorityController = require('../controllers/priorityController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/', authenticateToken, priorityController.add);
router.put('/', authenticateToken, priorityController.change);
router.get('/', authenticateToken, priorityController.get);
router.delete('/', authenticateToken, priorityController.delete);

module.exports = router;