// server.js
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointment');
const dentistRoutes = require('./routes/dentist');

const cors = require('cors');

const app = express();

app.use(cookieParser())
app.use(bodyParser.json());

// allowed origins
// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://dt47nb2edopot.cloudfront.net',
//   ''
// ]

const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// app.options('*', cors(corsOptions));

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/dentists', dentistRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Dental API running on port ${PORT}`);
});
