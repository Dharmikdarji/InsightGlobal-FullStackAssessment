# Product Management System

A full-stack CRUD application built with Angular and ASP.NET Core Web API.

## Tech Stack

Frontend
- Angular
- TypeScript
- HTML/CSS

Backend
- ASP.NET Core Web API
- C#
- Dependency Injection
- REST API

## Features

- View all products
- View product details
- Add a product
- Edit a product
- Delete a product

## Project Structure

FullStackAssessment/
│
├── frontend/
│   └── product-management/
│
└── backend/
    └── ProductManagement.Api/

## Running the Backend

```bash
cd backend/ProductManagement.Api
dotnet restore
dotnet run
```

The API runs on:

```
http://localhost:5207
```

## Running the Frontend

```bash
cd frontend/product-management
npm install
ng serve
```

The Angular application runs on:

```
http://localhost:4200
```

## API Endpoints

GET /api/products

GET /api/products/{id}

POST /api/products

PUT /api/products/{id}

DELETE /api/products/{id}