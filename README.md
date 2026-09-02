<div align="center">

  <h1>🌍 WanderLust</h1>
  <p><b>Full-Stack Travel Discovery, Accommodation Booking & Review Platform</b></p>

  <p>
    <a href="https://offends.onrender.com"><img src="https://img.shields.io/badge/Live_Demo-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Live Demo"/></a>
    <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
    <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
    <img src="https://img.shields.io/badge/EJS_Mate-Templates-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="EJS"/>
    <img src="https://img.shields.io/badge/Cloudinary-Media-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary"/>
  </p>

</div>

---

## 📌 Overview

**WanderLust** is a comprehensive full-stack travel listing and hospitality marketplace built with **Node.js**, **Express**, and **MongoDB**. Inspired by platforms like Airbnb, it enables users to explore destinations globally, publish and manage rental listings with image uploads, leave validated star reviews, and interact with geolocation data.

---

## ✨ Key Features

- 🏡 **Listing Management (Full CRUD)**: Create, browse, update, and delete property listings with automated image processing.
- 🔐 **Authentication & Authorization**: Secure session-based user authentication using **Passport.js** with protected routes and role permissions.
- ⭐ **Reviews & Rating System**: Leave detailed ratings and user reviews with cascading deletion support.
- ☁️ **Cloudinary Image Storage**: Seamless cloud media uploads and responsive thumbnail generation.
- 🛡️ **Schema Validation**: Server-side payload sanitization and schema validation powered by **Joi**.
- 💬 **Flash Notifications**: Contextual alerts for user feedback using `connect-flash`.

---

## 🏗️ Architecture & Directory Structure

```text
WanderLust/
├── config/             # Cloudinary and MongoDB configurations
├── controllers/        # Listing, Review, and User business logic
├── middleware/         # Authentication, ownership validation, and Joi middleware
├── models/             # Mongoose schemas (Listing, Review, User)
├── public/             # CSS stylesheets, client scripts, and assets
├── routes/             # RESTful API route declarations
├── schema.js           # Joi validation schemas
├── views/              # EJS templates, partials, and boilerplate layouts
└── app.js              # Application entry point & middleware pipeline
```

---

## 🚀 Quickstart & Local Setup

### 1. Prerequisites
- **Node.js**: `v16.0` or higher
- **MongoDB**: Local MongoDB server or Atlas connection string
- **Cloudinary Account**: API credentials for image storage

### 2. Clone & Install
```bash
git clone https://github.com/Kunal-Gupta28/WanderLust.git
cd WanderLust
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
PORT=3000
NODE_ENV=development
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRECT=your_cloudinary_api_secret
ADMIN_EMAIL=admin@example.com
```

### 4. Start Server
```bash
node app.js
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🌐 Live Deployment

* **Live on Render**: [https://offends.onrender.com](https://offends.onrender.com)

---

## 👤 Author

**Kunal Gupta**
* Website: [Portfolio](https://portfolio-website-chi-gilt.vercel.app)
* GitHub: [@Kunal-Gupta28](https://github.com/Kunal-Gupta28)
* Email: [kunal.gmail.91165@gmail.com](mailto:kunal.gmail.91165@gmail.com)
