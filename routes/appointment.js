const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const appointmentController = require('../controllers/appointmentController');

router.post('/', auth, appointmentController.createAppointment);
router.get('/', auth, appointmentController.getAppointments);
router.patch('/cancel', auth, appointmentController.cancelAppointment);
router.patch('/reschedule', auth, appointmentController.rescheduleAppointment);

module.exports = router;
