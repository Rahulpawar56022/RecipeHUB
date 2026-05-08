# 🍳 RecipeHub — AI Powered Social Recipe Platform

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Backend-SpringBoot-green?style=for-the-badge&logo=springboot" />
  <img src="https://img.shields.io/badge/Database-MySQL-orange?style=for-the-badge&logo=mysql" />
  <img src="https://img.shields.io/badge/Auth-JWT-red?style=for-the-badge" />
  <img src="https://img.shields.io/badge/AI-OpenAI-black?style=for-the-badge" />
</p>

<p align="center">
  <b>A modern full-stack recipe sharing platform with AI-powered meal planning 🍽️</b>
</p>

---

## 📌 Overview

**RecipeHub** is a premium full-stack web application designed for food lovers, home chefs, and health-conscious users.

It combines **social recipe sharing**, **community engagement**, and **AI-powered recipe generation** into one beautiful platform.

Users can:

✅ Discover recipes
✅ Share cooking ideas
✅ Generate recipes using AI
✅ Plan weekly meals
✅ Create shopping lists automatically
✅ Connect with other food lovers

---

## ✨ Features

### 🔐 Authentication & Security

* Secure JWT Authentication
* User Registration & Login
* Password Encryption using Spring Security
* Protected Routes
* Role-based Access (User / Admin)

---

### 🍲 Recipe Management

* Create Recipes
* Upload Food Images
* Add Ingredients & Cooking Steps
* Category Filtering
* Difficulty Level Filtering
* Cooking Time Estimation
* Search Recipes by Name

---

### 🤖 AI Recipe Generator

Generate recipes instantly using AI by entering:

* Available Ingredients
* Cuisine Preference
* Meal Type
* Calories Goal
* Dietary Preference (Veg / Vegan / Keto / High Protein)

**Example:**
*Input:* `Tomato, Cheese, Onion, Bread`
*Output:* AI creates a complete recipe 🍕

---

### 📅 Smart Meal Planner

* Weekly Meal Planning
* Breakfast / Lunch / Dinner Scheduling
* Auto Grocery List Generation
* Nutrition Tracking
* Healthy Meal Suggestions

---

### 🌍 Community Features

* Like Recipes ❤️
* Save Recipes 🔖
* Comment on Recipes 💬
* Follow Other Chefs 👨‍🍳
* Trending Recipes
* Leaderboard System 🏆

---

### 👨‍💼 Admin Dashboard

* Manage Users
* Moderate Recipes
* Approve New Posts
* Analytics Dashboard
* Remove Spam / Fake Accounts

---

## 🛠 Tech Stack

| Layer       | Technology            |
| ----------- | --------------------- |
| Frontend    | React (Vite)          |
| Styling     | Tailwind CSS v4       |
| Animation   | Framer Motion         |
| Backend     | Java Spring Boot      |
| Security    | Spring Security + JWT |
| Database    | MySQL                 |
| AI          | OpenAI API            |
| Build Tool  | Maven                 |
| API Testing | Postman               |

---

## 🏗 System Architecture

```text
Frontend (React + Tailwind)
        ↓
REST API (Spring Boot)
        ↓
Authentication (JWT + Spring Security)
        ↓
Service Layer
        ↓
Repository Layer (JPA/Hibernate)
        ↓
MySQL Database
        ↓
OpenAI Integration (AI Recipe Generation)
```

---

## 🚀 Installation Guide

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/recipehub.git
cd recipehub
```

---

## 2️⃣ Setup Database

Create MySQL Database:

```sql
CREATE DATABASE recipehub;
```

---

## 3️⃣ Configure Backend

Navigate to:

```bash
backend/src/main/resources/application.properties
```

Update:

```properties
spring.datasource.username=root
spring.datasource.password=your_password
openai.api.key=your_openai_api_key
```

---

## 4️⃣ Run Backend

```bash
cd backend
.\mvnw.cmd spring-boot:run
```

Runs on:

```bash
http://localhost:8080
```

---

## 5️⃣ Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on:

```bash
http://localhost:5173
```

---

## 📸 Screenshots

Add screenshots here:
<h2>Home Page</h2>
<img width="1918" height="1078" alt="homepage" src="https://github.com/user-attachments/assets/459bdba7-9cfa-415c-9028-6600d90bb27e" />

<h2>Recipe Page</h2>
<img width="1918" height="1078" alt="recipe-page" src="https://github.com/user-attachments/assets/3e70d07a-80c6-4724-b1db-5470716153bb" />

<h2>AI recipe-generator</h2>
<img width="1918" height="1078" alt="ai-generator" src="https://github.com/user-attachments/assets/22fd72f1-d022-4872-b83b-e8d9ec4276c7" />

<h2>Dashboard</h2>
<img width="1918" height="1078" alt="dashboard" src="https://github.com/user-attachments/assets/317dfb1d-ae3f-470b-8e7a-a9bbe1526c68" />

<h2>For more Screenshots check <Strong>AllScreenshots.md</Strong> file</h2>

## API Modules

* Authentication API
* User API
* Recipe API
* AI Recipe API
* Meal Planner API
* Admin API

---

## Future Improvements

* Mobile App Version 📱
* Video Recipe Upload 🎥
* Voice-based Cooking Assistant 🎙️
* AI Nutrition Coach 🥗
* Smart Kitchen IoT Integration 🍳
* Multi-language Support 🌍

---

## 🤝 Contributing

Pull requests are welcome.

For major changes:

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push branch
5. Open Pull Request

---

## 📜 License

MIT License

---

## 👨‍💻 Developer

**Rahul Pawar**

Java Full Stack Developer | AI Enthusiast | Problem Solver 🚀

---

<p align="center">
⭐ If you like this project, give it a star on GitHub ⭐
</p>
