# 🎓 Alumni Connect — Full Stack Application

A full-stack platform for connecting students and alumni, built with:

* **Frontend:** Next.js 15 (App Router), TypeScript
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose, Atlas)
* **Real-time:** Socket.io
* **Auth:** JWT Authentication
* **Email:** SMTP (Gmail App Password)

---

# 📁 Project Structure

```
alumni-connect/
│
├── backend/                 # Express backend
│   ├── src/                 # API routes, controllers, models
│   ├── .env                 # 🔒 Real backend env variables (ignored)
│   ├── .env.example         # ⭐ Template for backend env
│   ├── package.json
│
├── frontend/                # Next.js frontend
│   ├── app/                 # App router pages
│   ├── components/
│   ├── services/            # Axios API services
│   ├── public/
│   ├── .env.local           # 🔒 Real frontend env variables (ignored)
│   ├── .env.local.example   # ⭐ Template for frontend env
│   ├── package.json
│
├── .gitignore               # Protects all secrets + node_modules
├── README.md                # You are here (root readme)
└── package.json             # (optional root tooling)
```

---

# 🔐 Environment Variables (IMPORTANT)

This project uses environment variables for both backend and frontend.

Real `.env` files are **never committed** — only example files are.

---

## 🟦 Backend (`backend/.env`)

Create it by copying:

```bash
cd backend
cp .env.example .env
```

### 📄 Example backend `.env.example`:

```env
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<db>?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRE=7d

# Email Configuration (SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-app-password

# Optional for future decentralization
IPFS_GATEWAY_URL=fs.infura.io:5001
```

---

## 🟩 Frontend (`frontend/.env.local`)

Create it by copying:

```bash
cd frontend
cp .env.local.example .env.local
```

### 📄 Example frontend `.env.local.example`:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Socket.io URL
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

> ⚠ All frontend environment variables must start with `NEXT_PUBLIC_`
> Or Next.js will not expose them to the browser.

---

# 🛠️ Installation

Clone the repo:

```bash
git clone https://github.com/<your-username>/alumni-connect.git
cd alumni-connect
```

---

# 📦 Install Dependencies

## Backend

```bash
cd backend
npm install
```

## Frontend

```bash
cd ../frontend
npm install
```

---

# ▶️ Running the Application

## 1. Start Backend

From the `backend` folder:

```bash
npm run dev
```

Backend runs on:

> [http://localhost:5000](http://localhost:5000)

---

## 2. Start Frontend

From the `frontend` folder:

```bash
npm run dev
```

Frontend runs on:

> [http://localhost:3000](http://localhost:3000)

---

# 🔗 API & Socket Details

### API Base URL

```
http://localhost:5000/api
```

### Socket.io URL

```
http://localhost:5000
```

---

# 🔒 Security Notes

✔ `.env`, `.env.local`, and all sensitive files are ignored using `.gitignore`
✔ Only `.env.example` and `.env.local.example` are committed
✔ Never store secrets in code or push them to GitHub
✔ If a credential leaks, immediately rotate it (MongoDB, JWT, email)

---

# 🧪 Tech Stack

### Frontend

* Next.js 15
* TypeScript
* React
* Tailwind / CSS Modules (your chosen styling)
* Axios

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Auth
* Bcrypt
* Nodemailer
* Socket.io

---

# 🤝 Contributing (Team Workflow)

1. Clone repo
2. Create your own `.env` or `.env.local` from the example
3. Create feature branch
4. Commit changes
5. Open pull request

---

