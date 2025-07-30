const db = require('../config/db');

exports.createAppointment = async (req, res) => {
  const { date, time, service, dentistId } = req.body;
  const userId = req.user.id;

  try {
    await db.query(
      'INSERT INTO appointments (user_id, date, time, service, dentist_id) VALUES (?, ?, ?, ?, ?)',
      [userId, date, time, service, dentistId]
    );
    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAppointments = async (req, res) => {
  const userId = req.user.id;

  try {
    const [appointments] = await db.query(
      'SELECT apt.id, dts.id as dentistId, dts.name as dentistName, apt.date, apt.time, apt.service, apt.status, patient.id as patientID, patient.name AS patientName, patient.email AS patientEmail FROM appointments AS apt LEFT JOIN dentists AS dts ON apt.dentist_id = dts.id LEFT JOIN users as patient ON apt.user_id = patient.id WHERE user_id = ? ORDER BY apt.date, apt.time',
      [userId]
    );
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancelAppointment = async (req, res) => {
  const { appointmentId } = req.body;
  
  try {

    await db.query(
      'UPDATE appointments SET status = ? WHERE id = ?',
      ['cancelled', appointmentId]
    );

    res.status(200).json({message: 'Appointment has been cancelled'})
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


exports.rescheduleAppointment = async (req, res) => {
  const { appointmentId, resched_date, resched_time } = req.body;

  try {

    await db.query(
      'UPDATE appointments SET date = ?, time = ?, status = ? WHERE id = ?',
      [resched_date, resched_time, 'rescheduled', appointmentId]
    );

    res.status(200).json({message: 'Appointment rescheduled successfully!'});
    
  } catch (error) {

    res.status(500).json({error: error.message});
  }
}
