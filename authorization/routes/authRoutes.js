const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/', authController.validateUser);
router.post('/updatejwt', authController.updateToken);
router.post('/register', authController.register);
router.post('/reset', authController.reset);
router.get('/role', authController.getRoles);

module.exports = router;