# Task Management System

A full-stack task management application with Angular 19.2.22 frontend and Spring Boot 3.5.11 backend.

## 🚀 Quick Start

### Prerequisites
- **Java 17+** - [Download](https://www.oracle.com/java/technologies/downloads/)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **MySQL 8.0+** - [Download](https://www.mysql.com/downloads/)
- **Angular CLI 17+** - `npm install -g @angular/cli`
  
## 📦 Database Setup

### Step 1: Create Database
Open MySQL and run:

```sql
CREATE DATABASE IF NOT EXISTS task_manager_db;
CREATE USER IF NOT EXISTS 'taskuser'@'localhost' IDENTIFIED BY 'taskpass123';
GRANT ALL PRIVILEGES ON task_manager_db.* TO 'taskuser'@'localhost';
FLUSH PRIVILEGES;
```

### Step 2: Database Credentials
```
Host: localhost
Port: 3306
Database: task_manager_db
Username: root
Password: Thiba35*
```

The tables will be created automatically when the backend starts.

---

## 🔧 Backend Setup & Run

### Step 1: Navigate to Backend
```bash
cd backend/task-manager-api
```

### Step 2: Update Configuration (if needed)
Edit `src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/task_manager_db
spring.datasource.username=root
spring.datasource.password=Thiba35*

# Server Configuration
server.port=8080
server.servlet.context-path=/api

# JWT Configuration
app.jwt.secret=your-super-secret-key-change-this-in-production-at-least-32-characters-long
app.jwt.expiration=86400000

# CORS Configuration
app.cors.allowed-origins=http://localhost:4200
```

### Step 3: Build Backend
```bash
mvn clean install
```

### Step 4: Run Backend
```bash
mvn spring-boot:run
```

Backend will start at: **http://localhost:8080/api**

✅ You should see:
```
Started TaskManagerApplication in X.XXX seconds
```

---

## 💻 Frontend Setup & Run

### Step 1: Navigate to Frontend
```bash
cd frontend/task-manager-frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run Frontend
```bash
ng serve --open
```

Or manually open: **http://localhost:4200**

✅ You should see the login page with blue gradient background.

---

## 🔐 JWT Authentication

JWT (JSON Web Token) authentication is implemented. Here's how it works:

### Token Details
- **Algorithm**: HS256
- **Expiration**: 24 hours
- **Automatic Storage**: Token saved in browser localStorage
- **Auto Attachment**: Token automatically sent with API requests

### How JWT Works
1. **Login** → Backend generates JWT token
2. **Token Storage** → Frontend stores in localStorage
3. **API Requests** → Token automatically included in headers
4. **Validation** → Backend validates token on each request
5. **Logout** → Token cleared from localStorage

---

## 👤 Demo Credentials

### Quick Login (Already in Database)

**Username**: `Thiba`  
**Password**: `password25`

### How to Use Demo Credentials
1. Go to http://localhost:4200
2. Click **"Use Demo Credentials"** button
3. Click **"Login"**
4. You're logged in! ✅

### Create New Account
1. Click **"Register here"** link
2. Enter username and password
3. Click **"Register"**
4. Auto login to dashboard

---

## 📡 API Endpoints

All endpoints require JWT token in header:
```
Authorization: Bearer <token>
```

### Authentication
```
POST /api/auth/register
POST /api/auth/login
```

### Tasks
```
GET    /api/tasks                    (Get all tasks)
POST   /api/tasks                    (Create task)
GET    /api/tasks/{id}               (Get single task)
PUT    /api/tasks/{id}               (Update task)
DELETE /api/tasks/{id}               (Delete task)
GET    /api/tasks/status/{status}    (Filter by status)
```

---

## ✨ Features

### Login Page
- ✅ Username & password fields
- ✅ Password visibility toggle (eye icon)
- ✅ Demo credentials section
- ✅ **"Use Demo Credentials"** button for quick testing
- ✅ Blue gradient background

### Task Management
- ✅ Create new tasks
- ✅ Edit existing tasks
- ✅ Delete tasks (with confirmation)
- ✅ Filter by status (To Do, In Progress, Done)
- ✅ View task details

### User Interface
- ✅ Modern blue gradient design (#0066ff → #0099ff)
- ✅ Professional Segoe UI font throughout
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Confirmation dialogs for delete/logout
- ✅ Loading states and error messages
- ✅ Color-coded status badges

---

## 🎯 How to Test

### Using Demo Credentials
1. Start backend: `mvn spring-boot:run`
2. Start frontend: `ng serve --open`
3. Click **"Use Demo Credentials"**
4. Click **"Login"**
5. You're in the task list! 🎉

### Create New Task
1. Click **"+ Add New Task"**
2. Fill in title and description
3. Select status (TO_DO, IN_PROGRESS, DONE)
4. Click **"Create Task"**

### Edit Task
1. Click **"Edit"** button on any task
2. Modify title, description, or status
3. Click **"Update Task"**
4. Back button to return to list

### Delete Task
1. Click **"Delete"** button
2. Confirm deletion in popup dialog
3. Task is deleted

### Logout
1. Click **"Logout"** button (top right)
2. Confirm logout in popup dialog
3. Redirected to login page

---

## Demo Screen Shots

<img width="1512" height="982" alt="Login" src="https://github.com/user-attachments/assets/5b1f947b-d356-44c7-b325-9704fa7f0cd3" />

<img width="1512" height="982" alt="Register-2" src="https://github.com/user-attachments/assets/99aa4502-4b59-4e70-82f9-b97e9ccd720e" />

<img width="1512" height="982" alt="Register-1" src="https://github.com/user-attachments/assets/2bf8db5b-a5ba-491d-abe4-6a9f32acd600" />

<img width="1512" height="982" alt="Main Dashboard_1" src="https://github.com/user-attachments/assets/e436c4fe-72e6-47fa-8d6d-8ec6492c24c0" />

<img width="1512" height="982" alt="Main Dashboard_2" src="https://github.com/user-attachments/assets/b3232ee0-07b4-4071-8c85-d2a852250abe" />

<img width="1512" height="982" alt="Create Task-2" src="https://github.com/user-attachments/assets/dbc68c4f-30c4-4f51-a665-176497a476d6" />

<img width="1512" height="982" alt="Create Task-1" src="https://github.com/user-attachments/assets/f12d2365-e85b-4c89-90db-e215a3a4fb36" />

---

## 🗄️ Database Tables

### Users Table
```
- id (Long, Primary Key)
- username (String, Unique)
- password (String, Encrypted)
- created_at (Timestamp)
- updated_at (Timestamp)
```

### Tasks Table
```
- id (Long, Primary Key)
- title (String)
- description (Text)
- status (Enum: TO_DO, IN_PROGRESS, DONE)
- user_id (Foreign Key to Users)
- created_at (Timestamp)
- updated_at (Timestamp)
```

---

## 🐛 Troubleshooting

### Backend Issues

**MySQL Connection Error**
```
Solution:
1. Verify MySQL is running
2. Check database exists: task_manager_db
3. Check user: taskuser with password taskpass123
4. Restart MySQL service
```

**Port 8080 Already in Use**
```bash
# Kill process using port 8080
# macOS/Linux:
lsof -i :8080
kill -9 <PID>

# Windows:
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Or change port in application.properties:
server.port=8081
```

### Frontend Issues

**CORS Error**
```
Solution:
1. Ensure backend is running (http://localhost:8080/api)
2. Clear browser cache (Ctrl+Shift+Delete)
3. Check CORS is enabled in SecurityConfig
```

**401 Unauthorized**
```
Solution:
1. Clear localStorage: localStorage.clear()
2. Re-login
3. Check token in browser DevTools → Application → localStorage
```

**ng serve command not found**
```bash
npm install -g @angular/cli
ng version
```
---

## 🔄 Development Workflow

### Start Both Services (Recommended: 2 Terminals)

**Terminal 1 - Backend:**
```bash
cd backend/task-manager-api
mvn spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
cd frontend/task-manager-frontend
ng serve --open
```

---

## 👨‍💻 Author

**S.Thibakar**

---

## 📞 Contact

For questions or support: thibakarsri33@gmail.com

---

## ✨ Summary

1. **Setup Database** - Create database and user
2. **Run Backend** - Start Spring Boot server on port 8080
3. **Run Frontend** - Start Angular dev server on port 4200
4. **Login** - Use demo credentials (Thiba / password25)
5. **Manage Tasks** - Create, edit, delete tasks
6. **Logout** - Confirm and return to login

