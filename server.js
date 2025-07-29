// server.js
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointment');
const cors = require('cors');

const app = express();

app.use(cookieParser())
app.use(bodyParser.json());
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN, // process.env.ALLOWED_ORIGIN
  credentials: true, // Only if using cookies or auth headers
}));

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Dental API running on port ${PORT}`);
});
