const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/', authenticateToken, tasksController.create);
router.put('/', authenticateToken, tasksController.change);
router.get('/', authenticateToken, tasksController.get);
router.delete('/', authenticateToken, tasksController.delete);

router.put('/state', authenticateToken, tasksController.changeState);
router.put('/priority', authenticateToken, tasksController.changePriority);
router.put('/date', authenticateToken, tasksController.changeDate);

router.post('/files', authenticateToken, tasksController.attachFile);
router.delete('/files', authenticateToken, tasksController.deleteFile);

router.post('/users', authenticateToken, tasksController.addUsers);
router.delete('/users', authenticateToken, tasksController.deleteUsers);

module.exports = router;