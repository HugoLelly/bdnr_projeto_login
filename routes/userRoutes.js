const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/me', userController.getUserProfile);
router.put('/me', userController.updateUserProfile);
router.delete('/me', userController.deleteUserProfile);

module.exports = router;
