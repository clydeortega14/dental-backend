// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/logout', authController.logout);


router.post('/update/profile', auth, authController.updateProfile);
module.exports = router;
