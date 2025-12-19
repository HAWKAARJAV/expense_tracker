# Expense Tracker

<p>
  <a href="https://trackifyfinance.netlify.app">
    <img src="https://img.shields.io/badge/Live-Netlify-00C7B7?logo=netlify" alt="Live: Netlify" />
  </a>
  <a href="https://expense-tracker-backend-cp7v.onrender.com/health">
    <img src="https://img.shields.io/badge/API-Render-764ABC?logo=render" alt="API: Render" />
  </a>
  <img src="https://img.shields.io/badge/DB-MongoDB%20Atlas-13AA52?logo=mongodb" alt="DB: MongoDB Atlas" />
</p>

Live Project
- Frontend: https://trackifyfinance.netlify.app
- Backend API: https://expense-tracker-backend-cp7v.onrender.com

Overview
- React + Vite frontend with Tailwind
- Node/Express backend with MongoDB Atlas

Quick Start
- Backend
  - Set environment variables on Render: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, `PORT`
  - Local: `cd backend && npm install && npm run dev`
- Frontend
  - Update `frontend/Mine/src/utils/apipaths.js` `BASE_URL` to your backend URL
  - Local: `cd frontend/Mine && npm install && npm run dev`

Deployment
- Frontend hosted on Netlify
- Backend hosted on Render

Demo Login
- Email: hawk@gmail.com
- Password: 1234

Author
- Aarjav Jain