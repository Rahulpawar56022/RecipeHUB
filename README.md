# RecipeHub 🍳

RecipeHub is a full-stack, modern social recipe sharing and AI-powered meal planning platform. It features a premium UI, user authentication, recipe discovery, community engagement, and AI-generated recipes.

## Tech Stack
*   **Frontend**: React (Vite), Tailwind CSS v4, Framer Motion
*   **Backend**: Java Spring Boot, Spring Security, JWT Auth
*   **Database**: MySQL
*   **AI Integration**: OpenAI API

---

## 🚀 Getting Started Guide

Follow these steps to run the complete application on your local machine.

### Step 1: Set up the MySQL Database

You need MySQL installed and running on your machine.

1. Open your MySQL command-line client or a GUI tool like MySQL Workbench.
2. Log in to MySQL (e.g., `mysql -u root -p`).
3. Create the database by running:
   ```sql
   CREATE DATABASE recipehub;
   ```
*(Note: Spring Boot will automatically create the required tables when you start the backend, thanks to the `spring.jpa.hibernate.ddl-auto=update` setting).*

### Step 2: Configure the Backend

1. Navigate to the backend properties file: `backend/src/main/resources/application.properties`
2. Update your MySQL username and password if they differ from the defaults (`root` / `root`).
   ```properties
   spring.datasource.username=YOUR_MYSQL_USERNAME
   spring.datasource.password=YOUR_MYSQL_PASSWORD
   ```
3. *(Optional)* If you want to test the AI Recipe Generator, add your OpenAI API key in the same file:
   ```properties
   openai.api.key=sk-your-openai-api-key
   ```

### Step 3: Run the Backend (Spring Boot)

1. Open a new terminal.
2. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
3. Run the Spring Boot application using Maven:
   ```bash
   .\mvnw.cmd spring-boot:run
   ```
   *(For Mac/Linux use: `./mvnw spring-boot:run`)*
4. The backend API will start running at **http://localhost:8080**.

### Step 4: Run the Frontend (React Vite)

1. Open a second new terminal.
2. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
5. The frontend will start running at **http://localhost:5173**. Open this URL in your browser.

---

## 🛠️ Features

*   **User Authentication**: JWT-based secure login and registration.
*   **Discover Recipes**: Browse, search, and filter recipes by category or difficulty.
*   **AI Recipe Generator**: Input your available ingredients and let AI craft a recipe for you.
*   **Meal Planner**: Plan your weekly meals and auto-generate grocery shopping lists.
*   **Community**: Engage with other chefs, like recipes, and climb the leaderboard.
*   **Admin Dashboard**: Manage users and approve new recipe submissions.

## 🤝 Demo Accounts

Once the database is set up, you can manually seed it using the SQL script in `database/schema.sql` or create new accounts via the frontend Sign Up page.
