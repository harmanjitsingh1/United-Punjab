# United Punjab

United Punjab is a full-stack web application built to connect and serve the community of Punjab through a centralized platform.  
It includes secure **user authentication, admin approvals, and service management** with a clean and responsive UI.  

---

## Features

- **User Authentication**
  - Signup, Login, Email Verification
  - Admin approval system before access

- **Role-based Access**
  - Users → can register, request services
  - Admins → approve/reject users & manage platform

- **Secure Backend**
  - REST APIs with validation and JWT authentication
  - Protected routes with role-based middleware

- **Modern Frontend**
  - Responsive, mobile-first design
  - Built with React + Tailwind/ShadCN components

- **Scalable Architecture**
  - Separate **client** (frontend) and **server** (backend) folders
  - Easy deployment on any hosting platform

---

## Project Structure

## 📂 Project Structure

```bash
united-punjab/
│── client/           # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
│── server/           # Node.js backend
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── package.json
│
│── .gitignore
│── README.md
```

---

##  Tech Stack

**Frontend (Client):**
- React (Vite or CRA)
- TailwindCSS + ShadCN UI
- Axios for API calls

**Backend (Server):**
- Node.js + Express
- MongoDB (Mongoose) or SQL DB
- JWT Authentication

**Other Tools:**
- Git & GitHub
- Postman for API testing
- Deployment: Netlify/Vercel (frontend), Render/Heroku/AWS (backend)

---

## ⚙️ Installation & Setup

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/united-punjab.git
cd united-punjab
```

### 2. Setup the backend (server)
```bash
cd server
npm install
cp .env.example .env   # fill DB_URI, JWT_SECRET, etc.
npm run dev
```

### 3. Setup the frontend (client)
```bash
cd ../client
npm install
cp .env.example .env   # fill API_URL
npm run dev
```


