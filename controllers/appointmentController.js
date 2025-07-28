const db = require('../config/db');

exports.createAppointment = async (req, res) => {
  const { date, time, service } = req.body;
  const userId = req.user.id;

  try {
    await db.query(
      'INSERT INTO appointments (user_id, date, time, service) VALUES (?, ?, ?, ?)',
      [userId, date, time, service]
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
      'SELECT * FROM appointments WHERE user_id = ? ORDER BY date, time',
      [userId]
    );
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
