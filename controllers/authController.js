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

    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = users[0];

    const client_visible_data_only = {id: user.id, name: user.name, email: user.email}

    const token = jwt.sign(client_visible_data_only, process.env.JWT_SECRET, {expiresIn: '1d'});
    
    // HTTP-Only cookies
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.HTTP_ONLY_COOKIE_SECURE,
      sameSite: process.env.HTTP_ONLY_COOKIE_SAMESITE,
      maxAge: 20 * 60 * 60 * 1000 
    });

    res.status(201).json({ message: 'User registered successfully', user: client_visible_data_only });

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
      secure: process.env.HTTP_ONLY_COOKIE_SECURE,
      sameSite: process.env.HTTP_ONLY_COOKIE_SAMESITE,
      maxAge: 20 * 60 * 60 * 1000 
    });

    res.status(200).json({ 
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email } 
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};


exports.logout = (req, res) => {

  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.HTTP_ONLY_COOKIE_SECURE,
    sameSite: process.env.HTTP_ONLY_COOKIE_SAMESITE
  });

  return res.status(200).json({message: 'Logged out successfully'});
}

exports.updateProfile = async (req, res) => {

  const userId = req.user.id;
  const { newName, newEmail} = req.body;

  try{

    await db.query(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [newName, newEmail, userId]
    );

    const [users] = await db.query(
      'SELECT users.name, users.email FROM users where id = ?',
      [userId]
    );

    res.status(200).json({
      message: 'Profile Updated Successfully',
      user: users[0]
    })

  } catch (error) {

    res.status(500).json({error: 'Update failed!', message: error.message});
  }
}
