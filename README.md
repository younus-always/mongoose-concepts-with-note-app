# Mongoose Note App

A backend note-taking application built using **Node.js**, **Express**, and **MongoDB** via **Mongoose**. The app is designed to handle user data securely and validate inputs using **Zod** and **Validator**.

---

## 📑 Table of Contents

- [Introduction](#-introduction)
- [Features](#-features)
- [Installation](#%EF%B8%8F-installation)
- [Usage](#-usage)
- [Configuration](#-configuration)
- [Scripts](#-scripts)
- [Dependencies](#-dependencies)
- [Development](#-development)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

---

## 🧭 Introduction

This project serves as a backend API for a note-taking app. It uses Mongoose for MongoDB integration and includes modern validation, authentication (with bcrypt), and environment configuration using dotenv.

---

## ✨ Features

- CRUD operations for notes
- User authentication (login, registration) with bcrypt
- Input validation with Zod and Validator.js
- Environment-based configuration using dotenv
- Written in TypeScript
- Hot-reloading development setup using `ts-node-dev`

---

## ⚙️ Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/younus-always/mongoose-concepts-with-note-app.git
   cd mongoose-concepts-with-note-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Create a .env file:**

   ```ini
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   ```

⚠️ Do not commit your .env file to version control. Add .env to your .gitignore.

# 🚀 Usage

To start the development server:

```bash
npm run dev
```

The server will start using ts-node-dev with hot reloading. By default, it runs on http://localhost:5000.

# 🛠 Configuration

- PORT: Server port

- MONGODB_URI: Connection URI for MongoDB

All configuration should go in a .env file in the project root.

# 📜 Scripts

- npm run dev: Run the development server using ts-node-dev

- npm test: Placeholder for tests (currently not implemented)

# 📦 Dependencies

Runtime

- express – Web framework

- mongoose – MongoDB ODM

- dotenv – Load environment variables

- bcryptjs – Password hashing

- validator – Data validation

- zod – Type-safe schema validation

# Development

- ts-node-dev – TypeScript execution with hot reload

- @types/express – TypeScript definitions for Express

- @types/validator – TypeScript definitions for Validator

# 🧪 Development

This app uses TypeScript and CommonJS modules. Source files are likely stored in the src/ directory. Main entry point: src/server.ts.

Ensure you have a local MongoDB instance running or update the MONGODB_URI to connect to your database.

# 🛠 Troubleshooting

- Mongoose connection error: Make sure MongoDB is running and the URI is correct in .env.

- TypeScript errors: Run tsc --noEmit to check for TypeScript issues.

- Environment not loading: Ensure .env is present and properly formatted.

# 📄 License

This project is licensed under the ISC License. See the LICENSE file for details.
