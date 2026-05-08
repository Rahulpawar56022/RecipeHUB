-- ============================================
-- RecipeHub Database Schema
-- Run this to create the database manually
-- (Spring Boot auto-creates via ddl-auto=update)
-- ============================================

CREATE DATABASE IF NOT EXISTS recipehub;
USE recipehub;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(500),
    bio VARCHAR(500),
    role ENUM('USER', 'ADMIN', 'CHEF') DEFAULT 'USER',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Recipes Table
CREATE TABLE IF NOT EXISTS recipes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    video_url VARCHAR(500),
    prep_time VARCHAR(50),
    cook_time VARCHAR(50),
    difficulty ENUM('EASY', 'MEDIUM', 'HARD'),
    servings INT,
    calories INT,
    protein VARCHAR(20),
    carbs VARCHAR(20),
    fat VARCHAR(20),
    category ENUM('VEG', 'NON_VEG', 'DESSERTS', 'HEALTHY', 'FAST_FOOD'),
    cuisine VARCHAR(100),
    approved BOOLEAN DEFAULT FALSE,
    featured BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Ingredients Table
CREATE TABLE IF NOT EXISTS ingredients (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quantity VARCHAR(50),
    unit VARCHAR(50),
    recipe_id BIGINT NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);

-- Steps Table
CREATE TABLE IF NOT EXISTS steps (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    step_number INT NOT NULL,
    title VARCHAR(255),
    instruction TEXT NOT NULL,
    recipe_id BIGINT NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id BIGINT NOT NULL,
    recipe_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);

-- Saved Recipes (Many-to-Many)
CREATE TABLE IF NOT EXISTS saved_recipes (
    user_id BIGINT NOT NULL,
    recipe_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, recipe_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);

-- Follows (Many-to-Many)
CREATE TABLE IF NOT EXISTS follows (
    follower_id BIGINT NOT NULL,
    followed_id BIGINT NOT NULL,
    PRIMARY KEY (follower_id, followed_id),
    FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (followed_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Recipe Tags
CREATE TABLE IF NOT EXISTS recipe_tags (
    recipe_id BIGINT NOT NULL,
    tag VARCHAR(100),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);

-- ============================================
-- Seed Data (Optional Demo Data)
-- ============================================
INSERT INTO users (username, email, password, bio, role) VALUES
('admin', 'admin@recipehub.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'RecipeHub Administrator', 'ADMIN'),
('priya_chef', 'priya@recipehub.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Indian cuisine specialist 🍛', 'CHEF'),
('marco_cook', 'marco@recipehub.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Italian food lover 🍝', 'USER');
-- Note: Password for all seed users is "password123"
