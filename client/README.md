Modern SaaS Authentication Flow with WhatsApp OTP 🚀
This project is a full-stack web application designed to demonstrate a modern, secure, and user-friendly authentication flow suitable for today's SaaS products. It replaces traditional email/password logins with a seamless, passwordless system using One-Time Passwords (OTPs) sent via WhatsApp.

The entire user interface is built with a mobile-first, responsive design approach using React and Tailwind CSS, featuring smooth animations powered by Framer Motion. The backend is a robust Node.js and Express API that integrates with Twilio for WhatsApp messaging and MongoDB for data persistence.

✨ Project Highlights
Stunning UI/UX: A visually engaging interface with gradient backgrounds, modern fonts, and fluid animations to create a professional user experience.

Passwordless Authentication: Secure, passwordless login using One-Time Passwords (OTP) sent directly to the user's WhatsApp, enhancing both security and convenience.

Smart User Flow: The application intelligently distinguishes between new and existing users after OTP verification, directing them to either a registration form or their personalized home page.

Animated Splash Screen: A beautiful, animated welcome screen that provides an engaging entry point to the application.

Personalized Welcome: Registered users are greeted with a personalized, animated welcome message on the home page.

Responsive Design: The UI is fully responsive and looks great on all devices, from mobile phones to desktops.

Modular & Scalable Codebase: The project is structured with a clear separation between the frontend and backend, using modern JavaScript (ESM) and a modular component-based architecture.

💻 Tech Stack
Frontend Backend
React (+ Vite) Node.js
React Router for routing Express.js for the REST API
Tailwind CSS for styling MongoDB with Mongoose for the database
Framer Motion for animations Twilio for WhatsApp OTP service
Axios for API requests Dotenv for environment variables
React Toastify for notifications CORS for cross-origin requests
⚙️ Setup and Installation
To get this project up and running on your local machine, follow these steps.

Prerequisites
Node.js (v18.x or higher)

npm (or yarn)

MongoDB (a local instance or a free cloud instance from MongoDB Atlas)

A Twilio account with WhatsApp Sandbox configured.

1. Backend Setup
   First, let's get the server running.

Bash

# 1. Navigate to the backend directory

cd backend

# 2. Install the required dependencies

npm install

# 3. Create an environment file from the example

# On Windows: copy .env.example .env

# On macOS/Linux: cp .env.example .env

Now, open the newly created .env file and add your credentials:

backend/.env

Code snippet

# MongoDB Connection String

MONGO_URI=your_mongodb_connection_string

# Server Port

PORT=8080

# Twilio Credentials

TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886 # Twilio's sandbox number 2. Frontend Setup
Next, set up the React client.

Bash

# 1. Navigate to the frontend directory from the root folder

cd frontend

# 2. Install the required dependencies

npm install

# 3. Create a local environment file from the example

# On Windows: copy .env.local.example .env.local

# On macOS/Linux: cp .env.local.example .env.local

The .env.local file tells your frontend where to find the backend API. The default is already set up for local development.

frontend/.env.local

Code snippet

VITE_API_URL=http://localhost:8080
▶️ Running the Application
You will need to run the backend and frontend servers in two separate terminal windows.

Terminal 1: Start the Backend Server

Bash

cd backend
node index.js
You should see MongoDB Connected! and Server running on port 8080 in the console.

Terminal 2: Start the Frontend Development Server

Bash

cd frontend
npm run dev
Your browser should automatically open to http://localhost:5173 (or a similar port).

You can now use the application!
