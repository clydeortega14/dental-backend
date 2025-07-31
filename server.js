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
const allowedOrigins = [
  'http://localhost:5173',
  'https://dt47nb2edopot.cloudfront.net',
  'http://dental-app-s3.s3-website-ap-southeast-1.amazonaws.com'
]
app.use(cors({

  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for this origin'));
    }
  },
  credentials: true, // Only if using cookies or auth headers
}));

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/dentists', dentistRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Dental API running on port ${PORT}`);
});
