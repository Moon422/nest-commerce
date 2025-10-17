# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Essential Commands
```bash
# Install dependencies
npm install

# Development server with hot reload
npm run start:dev

# Build for production
npm run build

# Production server
npm run start:prod

# Format code with Prettier
npm run format

# Lint and fix code issues
npm run lint
```

### Testing Commands
```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:cov

# Run E2E tests
npm run test:e2e

# Debug tests
npm run test:debug

# Run specific test file
npm run test -- users.service.spec.ts
```

## Architecture Overview

### Core Structure
This is a NestJS application with a modular architecture following these key patterns:

**Database Layer**: Uses TypeORM with SQLite (db.sqlite) for data persistence. Configured for auto-synchronization in development.

**Module Pattern**: The application is organized into feature modules:
- **UsersModule**: User management with authentication (bcrypt hashing)
- **ReportsModule**: Price/financial reporting functionality  
- **MessagesModule**: Message handling (repository pattern, no ORM)

**Entity Design**:
- `User`: Basic user with email/password (TypeORM entity)
- `Report`: Simple price tracking entity (TypeORM entity)
- `Message`: Plain TypeScript class (no ORM integration)

### Key Architectural Decisions

**Validation**: Global ValidationPipe with whitelist enabled - automatically strips unknown properties from DTOs.

**Mixed Data Patterns**: Uses both TypeORM (Users/Reports) and repository pattern (Messages), suggesting experimental or transitional architecture.

**Port Configuration**: Defaults to port 3000, respects PORT environment variable.

### Module Organization
Each module follows NestJS conventions:
- `*.controller.ts` - HTTP endpoint handlers
- `*.service.ts` - Business logic layer
- `*.module.ts` - Module definitions and dependencies  
- `*.entity.ts` - Data models
- `dtos/` - Data Transfer Objects for validation
- `*.spec.ts` - Unit tests (8 test files present)

### Dependencies of Note
- **Authentication**: bcrypt for password hashing
- **Validation**: class-transformer + class-validator for DTOs
- **Database**: TypeORM + SQLite
- **Testing**: Jest with supertest for E2E

## Development Environment

The project uses modern tooling:
- **TypeScript**: Strict configuration with path mapping
- **ESLint**: TypeScript-aware linting with Prettier integration
- **Prettier**: Configured for single quotes, no semicolons, trailing commas
- **Jest**: Unit and E2E test framework

Database file (`db.sqlite`) is committed, indicating development/demo database.