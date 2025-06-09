# E-commerce Application

This project consists of a Spring Boot backend and an Angular frontend, connected to a PostgreSQL database running in Docker.

---

## Prerequisites

- Docker (to run PostgreSQL)
- Java 17 or newer (for backend)
- Node.js and npm (for frontend)
- Angular CLI (optional)

---

## Setup and Run Instructions

### 1. Start PostgreSQL Database

Run the Docker command script to create and start a PostgreSQL instance:

```bash
/back/postgresDbDocker.cmd
```

### 2. Run Backend Application

On startup, the backend will:

- Create an admin user with email admin@admin.com and password admin.

- Load dummy product data from the provided CSV file into the database (back\src\main\resources\products.csv) .

### 3. Run FrontEnd Application

- npm install
- npm start or ng server
- Open a browser at http://localhost:4200