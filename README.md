# 🚀 Imagino

**Imagino** is a powerful, full-stack AI image generation platform built with the **MERN** stack (MongoDB, Express.js, React.js, Node.js). Leveraging state-of-the-art AI models, Imagino allows users to generate stunning, high-resolution images from simple text prompts.


## ✨ Features

- 🎨 **AI-Powered Image Generation** — Turn natural language prompts into high-quality images.
- ⚙️ **Full-Stack Architecture** — Built with React, Node.js, Express, and MongoDB.
- 🔐 **User Authentication** — Secure login and token-based session management.
- 📦 **Image Download** — Download the generated images.
- ⚡ **Responsive UI** — Clean, modern interface with mobile-first design.


## 🛠️ Tech Stack

| Frontend        | Backend        | AI Integration       | Database        |
|-----------------|----------------|----------------------|-----------------|
| React.js        | Node.js        | OpenAI / Stability AI| MongoDB Atlas   |
| Tailwind CSS    | Express.js     |   | dotenv, cors    |


## 📸 Demo

> 🖼️  Live Demo: [https://imagino.vercel.app](https://imagino-five.vercel.app/) <!-- Replace with your deployed URL -->

### 🔢 Step 1: Clone the Repository
---
```bash
git clone https://github.com/yourusername/imagino.git
cd imagino
```
### 🧰 Step 2: Install Dependencies
---
Backend
```bash
cd server
npm install
```

Frontend
```bash
cd client
npm install
```
### 🔐 Step 3: Set Up Environment Variables
---
Create .env files in both the server and client directories.

server/.env
```bash
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLIPDROP_API=your_openai_key
```
client/.env
```bash
VITE_BACKEND_URL=http://localhost:5000
```

### 🧪 Step 4: Run the Application
---
Start both the backend and frontend servers:

Start Backend
```bash
cd server
npm run dev
```
Start Frontend
```bash
cd ../client
npm run dev
```

### 🧮 Step 5: Use the App
---
Open your browser and go to: http://localhost:5173

Sign up or log in

Enter a prompt like “A black car in a high-tech city”

Click generate and watch your AI-generated image appear!

