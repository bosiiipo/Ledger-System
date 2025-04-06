# Mainstack Backend

Mainstack is a backend service that provides authentication and wallet management functionalities. Built with TypeScript, Node.js, Express and MongoDB it follows a modular architecture with clean code separation.

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
│   ├── tests/              # Unit & integration tests
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
DATABASE_URL=postgresql://user:password@localhost:5432/mainstack
JWT_SECRET=your_secret_key
```

### 4️⃣ Apply database migrations
```sh
npx prisma migrate dev
```

### 5️⃣ Generate Prisma Client
```sh
npx prisma generate
```

### 6️⃣ Start the development server
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
API documentation is available using Swagger (if implemented) or Postman collections.

## 🤝 Contributing
1. Fork the repo & create a new branch.
2. Make your changes & commit.
3. Push to your fork & submit a PR.

---

### 🔗 Connect
For any issues, feel free to create an issue in this repository or reach out.

