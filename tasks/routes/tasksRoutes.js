const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/', authenticateToken, tasksController.create);
router.get('/', authenticateToken, tasksController.get);
router.get('/:id', authenticateToken, tasksController.getById);
router.put('/:id', authenticateToken, tasksController.change);
router.delete('/:id', authenticateToken, tasksController.delete);

router.put('/:id/state', authenticateToken, tasksController.changeState);
router.put('/:id/priority', authenticateToken, tasksController.changePriority);
router.put('/:id/date', authenticateToken, tasksController.changeDate);

router.post('/files', authenticateToken, tasksController.attachFile);
router.delete('/files', authenticateToken, tasksController.deleteFile);

router.post('/:id/users', authenticateToken, tasksController.addUsers);
router.delete('/:id/users', authenticateToken, tasksController.deleteUsers);

module.exports = router;