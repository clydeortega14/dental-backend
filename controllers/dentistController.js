const db = require('../config/db');

exports.getDentists = async (req, res) => {
  const userId = req.user.id;
  try {
    const [allDentists] = await db.query(
      'SELECT d.id, d.name, d.specialty, d.image, d.experience, d.rating FROM dentists AS d'
    );
    res.status(201).json(allDentists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
