Modern SaaS Authentication Flow with WhatsApp OTP 🚀

A full-stack web application showcasing a modern, secure, and passwordless authentication flow designed for SaaS products.
Instead of traditional email/password logins, users authenticate via One-Time Passwords (OTPs) delivered directly to their WhatsApp using Twilio.

✨ Features

Stunning UI/UX – Gradient backgrounds, modern fonts, smooth animations with Framer Motion.

Passwordless Authentication – OTP-based login via WhatsApp (no password hassle).

Smart User Flow – Detects new vs. returning users:

New → Registration form

Returning → Personalized dashboard

Animated Splash Screen – Engaging welcome screen on load.

Personalized Welcome – Returning users greeted with animated messages.

Responsive Design – Looks amazing on mobile, tablet, and desktop.

Scalable Codebase – Clear separation between frontend & backend with modern JS (ESM) and modular components.

💻 Tech Stack
Frontend

React (+ Vite)

React Router

Tailwind CSS

Framer Motion

Axios

React Toastify

Backend

Node.js + Express.js

MongoDB (Mongoose)

Twilio (WhatsApp OTP service)

Dotenv

CORS

⚙️ Setup & Installation
Prerequisites

Node.js (v18+)

npm or yarn

MongoDB (local or Atlas cloud instance)

Twilio account with WhatsApp Sandbox configured

1. Backend Setup

# Navigate to backend directory

cd backend

# Install dependencies

npm install

# Copy environment variables

# Windows

copy .env.example .env

# macOS/Linux

cp .env.example .env

Edit backend/.env with your credentials:

# MongoDB Connection String

MONGO_URI=your_mongodb_connection_string

# Server Port

PORT=8080

# Twilio Credentials

TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp: Twilio sandbox number

Start the backend:

node index.js

Expected output:

MongoDB Connected!
Server running on port 8080

2. Frontend Setup

# Navigate to frontend directory

cd frontend

# Install dependencies

npm install

VITE_API_URL=http://localhost:8080

Start the frontend:

npm run dev

Expected output: your app runs at
👉 http://localhost:5173

▶️ Running the App

Backend: Runs on http://localhost:8080

Frontend: Runs on http://localhost:5173

Open the frontend in your browser and log in with your phone number. OTPs will be delivered via WhatsApp (Twilio Sandbox). 🎉

📂 Project Structure
project-root/
│
├── backend/ # Node.js + Express.Js
│ ├── models/ # Mongoose models
│ └── index.js # App entry point
│
├── frontend/ # React + Vite client
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # App pages (Login, Register, Home)
│ │ └── App.jsx
│ └── index.html
│
└── README.md
