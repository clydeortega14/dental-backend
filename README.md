# Dental Appointment Scheduling System 🦷

A full-stack web application that allows patients to register, log in, schedule dental appointments, and view appointment details. Built using React, Node.js, Express, MySQL, and JWT for authentication.

## 🌐 Live Demo

![Watch the Video](https://drive.google.com/file/d/1SzbbnHciE6ormqt7BRheNjGLd8gaywaI/view?usp=sharing)

## Deployed URL
 - Frontend: https://dt47nb2edopot.cloudfront.net/
 - Backend API: https://api.rent-hive.co/

## 🚀 Features

- User registration and login with JWT authentication
- Secure password hashing with bcrypt
- Schedule new appointments
- View existing appointments
- Admin panel (optional)
- CORS and cookie-based authentication support
- Hosted on AWS (EC2, S3, CloudFront, RDS)

## 🧰 Tech Stack

**Frontend:**
- React
- Vite
- Axios
- Tailwind CSS

**Backend:**
- Node.js
- Express
- MySQL
- JWT (JSON Web Tokens)
- bcrypt

**Deployment:**
- AWS EC2 (backend)
- AWS S3 + CloudFront (frontend)
- Cloudflare (DNS & SSL)

## 📦 Installation

## Prerequisites

- Node.js and npm
- MySQL

### Frontend Setup
```bash
git clone https://github.com/clydeortega14/dental-office-online-scheduling-system-frontend.git
cd dental-office-online-scheduling-system-frontend
```

#### Create a .env file
```bash

VITE_API_URL=https://api.rent-hive.co/api
VITE_APP_NAME=DENTALAPP
```
#### install npm and run dev
```bash
npm install && npm run dev
```

#### Production build
```bash
production
npm run build
```

### Backend Setup


```bash
git clone https://github.com/clydeortega14/dental-backend.git
cd dental-backend
npm install
```

Create a .env file

```bash
#Database Connection
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=_DentalApp07!
DB_NAME=dentaluser
DB_PORT=3307
PORT=3000

#JWT
JWT_SECRET=33AF2B13E19F667F5BF44DF452379

# CORS ORIGIN
ALLOWED_ORIGIN=https://dt47nb2edopot.cloudfront.net/

```

#### serve the app
```bash
nodemon server.js OR node server.js
```
## 📸 Screenshots
![Database Schema](./public/images/databaseschema.png).
![Home Page 01](./public/images/homepage01.png)
![Home Page 02](./public/images/homepage02.png)
![Login Page](./public/images/loginpage.png).
![Register Page](./public/images/registerpage.png)
![Dashboard Page](./public/images/dashboard01.png).
![Dashboard Page 02](./public/images/dashboard02.png).
![Appointment Page 01](./public/images/select-dentist.png).
![Appointment Page 02](./public/images/chooseservice.png).
![Appointment Page 02](./public/images/pickdatetime.png).
![Appointment Page 02](./public/images/confirmdetails.png).
![Appointment Page 02](./public/images/appointmentbook.png).


