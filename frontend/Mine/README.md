# Expense Tracker (React + Vite)

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
- Full-stack expense tracking app with authentication, analytics, and export.
- React (Vite) frontend, Express + MongoDB (Atlas) backend.

Getting Started (Local)
- Backend
	- Copy backend/.env and set `MONGO_URI`, `JWT_SECRET`, `PORT`.
	- Run:
		- `cd backend`
		- `npm install`
		- `npm run dev`
- Frontend
	- Update `src/utils/apipaths.js` `BASE_URL` to your backend URL.
	- Run:
		- `cd frontend/Mine`
		- `npm install`
		- `npm run dev`

Deployment Notes
- Frontend deployed on Netlify.
- Backend deployed on Render with Atlas `MONGO_URI` and `CLIENT_URL` set to Netlify domain.

Tech
- React 19, Vite, Tailwind CSS
- Express, Mongoose, JWT, Multer
- Recharts, Axios

Author
- Built by Aarjav Jain (NSUT CSAI)
