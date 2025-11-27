# 🔗 TinyLink – Full Stack URL Shortener  
A clean and simple URL shortener similar to Bit.ly — built using **Node.js + Express (Backend)** and **React + Vite (Frontend)** with **Neon PostgreSQL** as the database.  
Supports creating short links, tracking click stats, deleting links, and viewing per-link analytics.

---

## 🚀 Live Demo

👉 **Frontend:** https://tiny-link-full-stack-app.vercel.app/

---

## 📸 Screenshots

### 🏠 Dashboard Page
![Dashboard](https://github.com/Satyam19711/TinyLink-Full-Stack-App/blob/main/TinyLink-Frontend/src/assets/dash.JPG)

### 📄 Stats Page
![Stats Page](https://github.com/Satyam19711/TinyLink-Full-Stack-App/blob/main/TinyLink-Frontend/src/assets/stats.JPG)

### 🔎 Search page
![Search page](https://github.com/Satyam19711/TinyLink-Full-Stack-App/blob/main/TinyLink-Frontend/src/assets/search.JPG)

### ❌ Error page
![Error page](https://github.com/Satyam19711/TinyLink-Full-Stack-App/blob/main/TinyLink-Frontend/src/assets/error.JPG)
---

## 🌟 Features

### ✅ Core Functionalities
- Create short URLs with optional custom codes  
- Auto-generate unique short codes  
- Secure server-side URL validation  
- Redirect using short code  
- Track click statistics:
  - total clicks  
  - last clicked time  
- Delete any short link  
- Dedicated stats page `/code/:code`  
- Health check route `/healthz`

### 🎨 Frontend Features
- Clean, responsive UI  
- Dashboard with table + mobile card view  
- Ellipsis for long URLs  
- Inline errors & toast notifications  
- Loading states  
- Fully responsive on mobile/tablet  
- Copy short URL button  
- Modern minimal design

### ⚙ Backend Features
- REST APIs  
- Postgres database (Neon)  
- Express middleware  
- Rate-limit safe  
- CORS-enabled  
- Robust validation  
- Error handling for duplicate codes  
- Redirect system with click tracking

---

## 🛠 Tech Stack

### 🖥️ Frontend

- React + Vite

- React Router

- Axios

- React-Toastify

- CSS (custom)

### 🧠 Backend

- Node.js

- Express

- PostgreSQL

- pg library

- CORS

- dotenv

### 🛢 Database

- Neon PostgreSQL

### 🎉 Deployments

- Render (Backend Hosting)

- Vercel (Frontend Hosting)

---

##🧪 Testing Checklist

- /healthz returns 200

- Creating link returns short code

- Duplicate code → returns 409

- Visiting (/code) → redirects

- Click count updates

- Deleting link removes redirect

- Stats page loads properly

- UI responsive on mobile + laptop

- Copy buttons work

- Errors displayed correctly

---

# Built with ❤️ by Satyam.
