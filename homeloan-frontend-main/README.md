
# 📄 LoanApp Frontend

This is the **frontend** for a responsive Loan Application platform. It includes an animated homepage, EMI calculator, registration & login pages, and product cards.


## 🚀 Features

- 🔹 Responsive UI with Tailwind CSS
- 🔹 Smooth animations using Framer Motion
- 🔹 EMI Calculator with real-time chart
- 🔹 Register/Login forms with validation
- 🔹 Modular component-based architecture
- 🔹 React Router for navigation

---

## 📁 Folder Structure

```
loan-app/
├── public/
│   └── robo_with_bubble.png, logo.png ...
├── src/
│   ├── assets/               # Static images
│   ├── components/           # Reusable UI components
│   ├── hooks/                # Custom React hooks (e.g. useEMICalculator)
│   ├── pages/                # Page components (Home, Register, Login)
|   |     └──Admin/
|   |      |    └──AdminDashboard.jsx
|   |      └──user/
|   |           └──BankLoanPage.jsx
|   |           └──ComparedLoanPage.jsx
|   |           └──EligibilityFormPage.
|   |           └──Home.jsx
|   |           └──Login.jsx
|   |           └──notFound.jsx
|   |           └──Register.jsx
│   ├── App.jsx               # App entry with Routes
│   ├── main.jsx              # ReactDOM rendering
│   └── index.css             # Tailwind base styles
├── tailwind.config.js        # Tailwind setup
├── package.json              # Project metadata and dependencies
└── README.md                 # You're here!
```

---

## 🛠️ Installation

### 1. **Clone the repo**
```bash
git clone https://github.com/Rajkumarpandey1200/homeloan-frontend.git
cd homeloan-frontend
```

### 2. **Install dependencies**
```bash
npm install
```

### 3. **Start development server**
```bash
npm run dev
```

Your app should now be running on [http://localhost:5173](http://localhost:5173)

---

## ⚙️ Technologies Used

- **React** – Frontend Framework
- **Tailwind CSS** – Styling
- **React Router DOM** – Routing
- **Framer Motion** – Animation
- **Recharts** – Chart rendering (used in EMI calculator)
- **Vite** – Fast dev build tool

---

## 📦 Available Scripts

| Command         | Description                     |
|----------------|---------------------------------|
| `npm run dev`  | Start dev server (`localhost`)  |
| `npm run build`| Build production-ready app      |
| `npm run preview` | Preview built app locally    |

---

## 🔐 API Integration

- The frontend assumes a backend is running (e.g., at `http://localhost:8080`).
- API endpoints used (example):
  - `POST /api/register` → Register user
  - `POST /api/login` → Login
  - You can update base URLs in `fetch()` calls inside `Register.jsx` and `Login.jsx`

---


## 🙋‍♂️ Questions?

If you have any questions, feel free to [open an issue](https://github.com/your-username/loan-app/issues) or contact the developer.

---

## 📄 License

This project is in the developing stage and private do not change anything without any authorize permission!!!
