// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const saltRounds = 10;

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [
      name,
      email,
      hashedPassword,
    ]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) return res.status(400).json({ message: 'Invalid email or password' });

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET, {expiresIn: '1d'});


    // HTTP-Only cookies
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      simeSite: 'Strict',
      maxAge: 20 * 60 * 60 * 1000 
    })

    res.status(200).json({ 
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email } 
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};
