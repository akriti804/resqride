<p align="center">
  <img src="./screenshots/resqride-logo.png" width="160" alt="ResQRide Logo"/>
</p>

<h1 align="center">🚗 ResQRide</h1>

<p align="center">
  Roadside Vehicle Assistance & Mechanic Booking Platform
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React.js-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8"/>
  <img src="https://img.shields.io/badge/Spring_Boot-1B5E20?style=for-the-badge&logo=springboot&logoColor=6DB33F"/>
  <img src="https://img.shields.io/badge/MySQL-003B57?style=for-the-badge&logo=mysql&logoColor=FFFFFF"/>
</p>


## 📌 Project Overview

**ResQRide** is a full-stack roadside vehicle assistance and mechanic booking platform designed to help vehicle owners quickly request emergency services during vehicle breakdowns.

The platform connects users with verified mechanics and towing partners. Users can add vehicle details, create roadside assistance requests, detect their current location, track service status, and view invoices. Mechanics can accept service requests and update job status. Admins can verify mechanics, monitor users, view service requests, and track platform analytics.


## ✨ Key Features

### 👤 User Module
- User registration and login
- Add and manage vehicles
- Create roadside assistance requests
- Auto location detection
- Live service tracking timeline
- Service history
- Invoice / service summary

### 🔧 Mechanic Module
- Mechanic dashboard
- Load mechanic profile
- View pending service requests
- Accept or reject requests
- Update job status
- View accepted jobs

### 🛡️ Admin Module
- Admin dashboard analytics
- View all users
- View all mechanics
- Verify mechanics
- Monitor all service requests
- Track completed requests and estimated revenue



## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router DOM
- Axios

### Backend
- Java
- Spring Boot
- Spring Security
- JWT Authentication
- REST APIs

### Database
- MySQL



## 📁 Project Structure

```bash
resqride/
│
├── frontend/
│   ├── public/
│   ├── screenshots/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   ├── README.md
│   └── package.json
│
├── src/main/java/com/resqride/
│   ├── config/
│   ├── controller/
│   ├── dto/
│   ├── exception/
│   ├── model/
│   ├── repository/
│   ├── security/
│   └── service/
│
├── src/main/resources/
│   └── application.properties
│
├── pom.xml
└── PROJECT_DOCUMENTATION.md
```


## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/akriti804/resqride.git
```

```bash
cd resqride
```


## Backend Setup

### 2. Create MySQL Database

```sql
CREATE DATABASE resqride;
```

### 3. Configure Database

Open:

```txt
src/main/resources/application.properties
```

Update your MySQL username and password:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/resqride
spring.datasource.username=root
spring.datasource.password=your_password
server.port=8081
```

### 4. Run Backend

```bash
mvn spring-boot:run
```

Backend runs on:

```txt
http://localhost:8081
```


## Frontend Setup

### 5. Go to Frontend Folder

```bash
cd frontend
```

### 6. Install Dependencies

```bash
npm install
```

### 7. Run Frontend

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```



## 🔐 Demo Credentials

### User Login

```txt
Email: priyauser@example.com
Password: 123456
```

### Mechanic Login

```txt
Email: mechanicraj@example.com
Password: 123456
```

### Admin Login

```txt
Email: adminresqride@example.com
Password: 123456
```



## 📸 Project Screenshots

### Home Page
![Home Page](./screenshots/home-page.png)



### User Dashboard
![User Dashboard](./screenshots/user-dashboard.png)



### Mechanic Dashboard
![Mechanic Dashboard](./screenshots/mechanic-dashboard.png)



### Admin Dashboard
![Admin Dashboard](./screenshots/admin-dashboard.png)



### Invoice System
![Invoice System](./screenshots/invoice.png)



## 🚀 Future Enhancements

- Google Maps integration
- Online payment system
- Real-time mechanic tracking
- Push notifications
- Mobile application
- AI-based ETA and cost estimation
- Rating and feedback system


## 👩‍💻 Developed By

**Akriti Kumari**

Full Stack Developer | Java + React Developer


## 📌 Project Status

✅ Completed for internship submission  
✅ Full-stack project  
✅ Role-based dashboards  
✅ Backend API integration  
✅ Database connected  
✅ GitHub ready