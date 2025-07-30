const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const dentistController = require('../controllers/dentistController');


router.get('/', auth, dentistController.getDentists);

module.exports = router;