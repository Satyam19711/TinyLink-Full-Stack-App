# 🔗 TinyLink – Full Stack URL Shortener  
A clean and simple URL shortener similar to Bit.ly — built using **Node.js + Express (Backend)** and **React + Vite (Frontend)** with **Neon PostgreSQL** as the database.  
Supports creating short links, tracking click stats, deleting links, and viewing per-link analytics.

---

## 🚀 Live Demo

👉 **Frontend:** https://tiny-link-full-stack-app.vercel.app/

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



