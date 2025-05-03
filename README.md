# SmartExamPlanner-Backend

# 📦 Smart Exam Planner – Backend

This is the backend service for the *Smart Exam Planner* application, developed using *Node.js, **Express.js, **MySQL*, and an ORM drizzle.

---

## 🚀 Getting Started

Follow these steps to set up and run the backend on your local machine.

---

## 🗃️ Prerequisites

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)


---

## ⚙️ Step-by-Step Setup

### 1. Clone the Repository


### 2. Install Dependencies
bash
npm install

### 3. Run the Xampp server

### 4. Database Configuration
bash
DATABASE_URL = mysql://root:root@127.0.0.1:3308/smartexamplanner


change the port, username and password according to your credentials. Then create a database with the name smartexamplanner.


### 5. Run these codes in the backend. It will create the tables of the database.

bash
npm run db:generate
npm run db:migrate


### 6. Run the query below in the user table of the database
bash
INSERT INTO users(username, password_hash, role, email, phone) VALUES ('admin','$2b$12$0tA.BEgJvTtYfKfgh8Wciufd47b063iitwQeEPTv0pFvVHV.Xoqj.','admin','admin@gmail.com','0776045980')

### 6. Start the Server
bash
npm run dev




BITBELLES - SC052