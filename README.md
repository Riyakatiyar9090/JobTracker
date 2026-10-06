
# 💼 Job Tracker – MERN Stack

A full-stack **Job Tracking Web Application** built using the **MERN Stack** that helps users organize, track, and manage their job applications from a single dashboard.

## 🚀 Project Overview

Job Tracker allows users to maintain a record of their job applications and monitor their application progress.

Instead of managing job applications using spreadsheets or notes, users can add, update, search, filter, and delete job application records through an easy-to-use web interface.

The project includes a React frontend, Node.js/Express backend, and MongoDB database.

## ✨ Features

- 🔐 User Login & Registration
- 📊 Dashboard with application statistics
- ➕ Add new job applications
- ✏️ Edit existing job applications
- 🗑️ Delete job applications
- 🔍 Search jobs by company or job title
- 🎯 Filter applications by status
- 📋 View all job applications
- 💾 Store application data in MongoDB
- 🔄 REST API integration
- 📱 Responsive user interface
- ⚡ Fast frontend powered by Vite

## 📊 Dashboard

The dashboard provides an overview of the user's job applications, including application statistics and current application status.

Example statistics:

- Total Applications
- Applied
- Interview
- Selected
- Rejected

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- Axios

### Backend
- Node.js
- Express.js
- REST API

### Database
- MongoDB
- Mongoose

### Development Tools
- Git
- GitHub
- VS Code
- Nodemon

## 📁 Project Structure

```text
Job-Tracker/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── StatCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Jobs.jsx
│   │   │   ├── AddJob.jsx
│   │   │   └── EditJob.jsx
│   │   │
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   │   └── jobRoutes.js
│   ├── middleware/
│   ├── app.js
│   └── package.json
│
├── .gitignore
└── README.md
