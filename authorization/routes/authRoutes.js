const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../middleware/upload');
const { authenticateToken } = require('../middleware/authMiddleware');

// router.post('/register', upload.single('photoURL'), authController.register);
router.post('/register', upload.single('photoURL'), authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);

router.get('/me', authenticateToken, authController.me);
router.put('/me', authenticateToken, authController.update);
router.post('/isExists', authController.isExists);

router.get('/getAllUsers', authenticateToken, authController.getAllUsers);
router.get('/getUser/:id', authenticateToken, authController.getUserById);

module.exports = router;