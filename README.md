## Banking Transactions API (Ledger System)

### Overview

Build a banking ledger system that handles financial transactions with ACID compliance and double-entry accounting using MongoDB transactions.


## 🚀 Features
- User authentication (Signup, Login, JWT Authentication)
- Wallet management (Deposit, Withdraw, Transactions)
- Database integration using Mongoose
- Unit and integration testing with Jest & Supertest
- Containerized with Docker for easy deployment

## 🏗️ Project Structure
```
mainstack/
│── src/
│   ├── controllers/        # Request handlers
│   ├── middlewares/         # Authentication & error-handling middleware
│   ├── models/             # Database models & Prisma client
│   ├── routes/             # Express route definitions
│   ├── services/           # Business logic & service layer
│   ├── __tests__/          # Unit & integration tests
│   ├── index.ts            # Entry point for the backend server
│   ├── server.ts           # Entry point for the backend server
│   ├── config.ts           # Env configuration
│── Dockerfile              # Docker container setup
│── .env.example            # Environment variables template
│── package.json            # Project dependencies and scripts
│── tsconfig.json           # TypeScript configuration
│── eslintrc.json           # Lint configuration
│── .prettierrc.js          # Prettier configuration
│── tsconfig.json           # TypeScript configuration

```

## 🔧 Setup & Installation
### 1️⃣ Clone the repository
```sh
git clone https://github.com/bosiiipo/mainstack.git
cd mainstack
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 3️⃣ Set up environment variables
Create a `.env` file from `.env.example` and configure your database & JWT settings:
```env
DATABASE_URL=database_url
PORT=9001
SECRET=your_jwt_secret
NODE_ENV=development
```

### 4️⃣ Start the development server
```sh
npm run dev
```

## 🧪 Running Tests
```sh
npm run test
```

## 🐳 Running with Docker
```sh
docker-compose up --build
```

## 📖 API Documentation
API documentation is available using Postman collections:


https://universal-astronaut-73296.postman.co/workspace/Team-Workspace~351a2681-ee46-4bed-8368-aac884e2f7b5/collection/43581026-36e59e34-7b6d-4026-8b3d-7b2dfe602506?action=share&creator=43581026

---
