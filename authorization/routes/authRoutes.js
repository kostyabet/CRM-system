const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('./upload');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/register', upload.single('photoURL'), authController.register);
router.post('/login', authController.login);
router.get('/me', authenticateToken, authController.me);
router.post('/refresh', authController.refreshToken);
router.put('/me', authenticateToken, authController.update)

module.exports = router;