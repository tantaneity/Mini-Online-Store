# Mini Online Store

> Full-stack e-commerce platform with NestJS backend and React frontend

Test it: https://api.tantane.me/mini-store/api/docs


## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Documentation](#documentation)
- [Testing](#testing)
- [License](#license)
- [Authors](#authors)

## About

Mini Online Store is a modern e-commerce application built with TypeScript, featuring a RESTful API backend powered by NestJS and a responsive React frontend.

## Features

- **Authentication & Authorization** - JWT-based auth with role management (Admin/Customer)
- **Product Management** - Full CRUD operations for products and categories
- **Shopping Cart** - Add, update, and remove items with real-time calculations
- **Order Processing** - Complete order management system
- **User Management** - User profiles and account management
- **Admin Panel** - Comprehensive admin dashboard
- **GDPR Compliance** - Cookie consent and privacy policy
- **API Documentation** - Swagger/OpenAPI and Compodoc
- **Component Library** - Storybook for UI components

## Tech Stack

### Backend (API)
- **Framework:** NestJS 11
- **Language:** TypeScript 5.9
- **Database:** PostgreSQL with TypeORM
- **Authentication:** JWT, Passport
- **Validation:** class-validator, class-transformer
- **Documentation:** Swagger/OpenAPI, Compodoc
- **Testing:** Jest

### Frontend (Client)
- **Framework:** React 19
- **Language:** TypeScript 5.9
- **Routing:** React Router v7
- **State Management:** Zustand
- **HTTP Client:** Axios
- **Styling:** TailwindCSS 3.4
- **Build Tool:** Vite 7
- **Component Docs:** Storybook
- **Cookie Consent:** react-cookie-consent

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.x
- **npm** >= 9.x
- **PostgreSQL** >= 14.x
- **Git**

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/tantaneity/Mini-Online-Store.git
cd Mini-Online-Store
```

### 2. Install Backend Dependencies

```bash
cd api
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

## Configuration

### Backend Configuration

1. Create a `.env` file in the `api` directory:

```bash
cd api
cp .env.example .env
```

2. Configure your environment variables in `api/.env`:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=mini_store

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=1d

# Application
PORT=3000
NODE_ENV=development
```

### Database Setup

1. Create the PostgreSQL database:

```sql
CREATE DATABASE mini_store;
```

2. The application will automatically run migrations on startup.

### Frontend Configuration

The frontend is pre-configured to connect to the backend at `http://localhost:3000/api`.

If you need to change this, update the `baseURL` in `client/src/api/client.ts`.

## Running the Application

### Development Mode

#### Start Backend (Terminal 1)

```bash
cd api
npm run start:dev
```

The API will be available at: `http://localhost:3000/api`

#### Start Frontend (Terminal 2)

```bash
cd client
npm run dev
```

The frontend will be available at: `http://localhost:5173`

### Production Mode

#### Backend

```bash
cd api
npm run build
npm run start:prod
```

#### Frontend

```bash
cd client
npm run build
npm run preview
```

## Documentation

### API Documentation

#### Swagger UI
- **URL:** `http://localhost:3000/api/docs`
- **Description:** Interactive API documentation with try-it-out feature
- Browse and test all API endpoints directly from your browser

#### Compodoc
Generate and view comprehensive code documentation:

```bash
cd api
npm run docs:generate
npm run docs:serve
```

Access at: `http://localhost:8080`

### Component Documentation

#### Storybook
View and interact with UI components:

```bash
cd client
npm run storybook
```

Access at: `http://localhost:6006`

### Privacy & Legal

- **Privacy Policy:** See [PRIVACY_POLICY.md](./PRIVACY_POLICY.md)
- **License:** See [LICENSE](./LICENSE)
- **License Report:** See [LICENSE_REPORT.md](./LICENSE_REPORT.md)

## Testing

### Backend Tests

```bash
cd api

# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

### Frontend Tests

```bash
cd client
npm run test
```

## Available Scripts

### Backend (api/)

| Command | Description |
|---------|-------------|
| `npm run start:dev` | Start development server with hot reload |
| `npm run start:prod` | Start production server |
| `npm run build` | Build for production |
| `npm run lint` | Lint and fix code |
| `npm run format` | Format code with Prettier |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run E2E tests |
| `npm run test:cov` | Run tests with coverage |
| `npm run docs:generate` | Generate Compodoc documentation |
| `npm run docs:serve` | Serve documentation |

### Frontend (client/)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Lint code |
| `npm run storybook` | Start Storybook |
| `npm run build-storybook` | Build Storybook |


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

The MIT License is a permissive license that allows commercial use, modification, distribution, and private use, while providing no warranty.

## Authors

**Tantaneity**
- GitHub: [@tantaneity](https://github.com/tantaneity)

