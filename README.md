# Product Management System

A full-stack CRUD application built with **Angular** and **ASP.NET Core Web API** for managing products with complete CRUD functionality.

## Tech Stack

### Frontend
- Angular
- TypeScript
- HTML
- CSS

### Backend
- ASP.NET Core Web API
- C#
- Dependency Injection
- RESTful APIs

## Features

- View all products
- View product details
- Add a new product
- Edit an existing product
- Delete a product

## Project Structure

```text
FullStackAssessment/
│
├── frontend/
│   └── product-management/
│
└── backend/
    └── ProductManagement.Api/
```

## Getting Started

### Run the Backend

```bash
cd backend/ProductManagement.Api
dotnet restore
dotnet run
```

The API will be available at:

```text
http://localhost:5207
```

### Run the Frontend

```bash
cd frontend/product-management
npm install
ng serve
```

The Angular application will be available at:

```text
http://localhost:4200
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Retrieve all products |
| GET | `/api/products/{id}` | Retrieve a product by ID |
| POST | `/api/products` | Create a new product |
| PUT | `/api/products/{id}` | Update an existing product |
| DELETE | `/api/products/{id}` | Delete a product |

## Author

**Dharmik Darji**