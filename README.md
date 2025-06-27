# 🎒 FindIt - MUST Lost & Found Platform

> A comprehensive lost and found management system for the Mbeya University of Science and Technology (MUST) community

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)]()

## 📋 Overview

**FindIt** is a digital platform for the MUST community to efficiently report, track, and reclaim lost and found items. The system connects people who have lost items with those who have found them, with administrative verification to ensure secure item recovery.

## ✨ Features

- **Report Lost Items:** Users can report lost items with detailed descriptions and contact info
- **Report Found Items:** Community members can register found items and upload images
- **Search & Browse:** Search and filter lost/found items by category, date, or location
- **Admin Verification:** Admins verify claims and facilitate item handover
- **Responsive UI:** Works on desktop and mobile
- **User Authentication:** Secure login for users and admins

## 🛠️ Technology Stack

- **Frontend:** React (Vite), Tailwind CSS, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Other:** Axios, JWT (for authentication), Multer (for image upload)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Stark-Priver/Findit
   cd FindIt
   ```

2. **Install dependencies for both client and server**
   ```bash
   npm install
   cd server && npm install
   cd ..
   ```

3. **Environment Setup**
   - Copy `.exampleenv` to `.env` in both root and `server/` directories as needed
   - Set your MongoDB URI and any secrets in `.env`

4. **Run the backend server**
   ```bash
   cd server
   npm run dev
   # or
   npm start
   ```

5. **Run the frontend (in another terminal)**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5000](http://localhost:5000)

## 📁 Project Structure

```
FindIt/
├── public/                # Static assets (images, icons)
├── src/                   # React frontend source code
│   ├── components/        # Reusable UI components
│   ├── screens/           # Page-level components (Home, Report, Search, etc.)
│   ├── App.tsx            # Main app component
│   └── ...
├── server/                # Express backend API
│   ├── controllers/       # Route controllers
│   ├── models/            # Mongoose schemas
│   ├── routes/            # Express routes
│   ├── middleware/        # Auth, upload, etc.
│   └── server.js          # Entry point
├── tailwind.config.js     # Tailwind CSS config
├── package.json           # Project dependencies (frontend)
├── README.md              # Project documentation
└── ...
```

## 🎮 Usage

### For Users
- **Report Lost/Found Items:** Fill out the form with details and (optionally) upload images
- **Browse/Search:** Use filters to find items by category, date, or location
- **Claim Items:** Contact the finder or submit a claim for admin verification

### For Admins
- **Verify Claims:** Review and approve/reject item claims
- **Manage Listings:** Oversee all reported items and user activity

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "Add: your feature description"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Create a Pull Request

- Please follow code style, test your changes, and update documentation as needed.

## 👨‍💻 Developer

**Privertus Cosmas**
- GitHub: [@Stark-Priver](https://github.com/Stark-Priver)
- Affiliation: Mbeya University of Science and Technology

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments
- Mbeya University of Science and Technology
- Open Source Community
- React, Vite, Express, MongoDB, Tailwind CSS

---

<div align="center">
Made with ❤️ for the MUST Community
</div>
