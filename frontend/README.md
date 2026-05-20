# 🚗 ResQRide – Roadside Vehicle Assistance & Mechanic Booking Platform

ResQRide is a full-stack roadside vehicle assistance and mechanic booking platform built for internship/project submission.

Users can request emergency roadside help, mechanics can accept jobs and update live status, and admins can monitor the entire platform.

---

# ✨ Features

## 👤 User Module
- User Registration & Login
- Add & Manage Vehicles
- Create Roadside Assistance Requests
- Auto Location Detection
- Live Tracking Timeline
- Service History
- Invoice / Service Summary

## 🔧 Mechanic Module
- Mechanic Profile
- View Pending Requests
- Accept / Reject Requests
- Update Job Status
- Track Accepted Jobs

## 🛡️ Admin Module
- Dashboard Analytics
- View Users
- View Mechanics
- Verify Mechanics
- Monitor All Requests
- Revenue Tracking

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM

## Backend
- Spring Boot
- Spring Security
- JWT Authentication
- REST APIs

## Database
- MySQL

---

# 📁 Project Structure

```bash
resqride/
│
├── frontend/          # React Frontend
│
├── src/main/java/     # Spring Boot Backend
│
├── src/main/resources/
│   └── application.properties
│
└── pom.xml
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone <your-github-link>
```

---

## 2️⃣ Backend Setup

### Open project

```bash
cd resqride
```

### Run backend

```bash
mvn spring-boot:run
```

Backend runs on:

```txt
http://localhost:8081
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# 🗄️ Database Setup

Create MySQL database:

```sql
CREATE DATABASE resqride;
```

Update:

```properties
src/main/resources/application.properties
```

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/resqride
spring.datasource.username=root
spring.datasource.password=yourpassword
```

---

# 🔐 Demo Credentials

## User

```txt
Email: priyauser@example.com
Password: 123456
```

## Mechanic

```txt
Email: mechanicraj@example.com
Password: 123456
```

## Admin

```txt
Email: adminresqride@example.com
Password: 123456
```

---

# 📸 Project Screenshots

- Home Page
- Login/Register
- User Dashboard
- Mechanic Dashboard
- Admin Dashboard
- Live Tracking Timeline
- Invoice System

---

# 🚀 Future Improvements

- Google Maps Integration
- Real-Time Socket Tracking
- Online Payments
- Push Notifications
- AI-Based Mechanic Recommendation
- Mobile Application

---

# 👨‍💻 Developed By

Nandani Dev

Full Stack Developer | Java + React Developer