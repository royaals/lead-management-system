# KAM Lead Management System

## Overview

The KAM Lead Management System is a comprehensive web-based platform designed for Key Account Managers (KAMs) in the restaurant industry. This system streamlines lead management, interaction tracking, and performance monitoring processes.

## Features

### Core Functionality

- **Lead Management**

  - Create and track restaurant leads
  - Update lead status (NEW, ACTIVE, INACTIVE)
  - Assign leads to KAMs

- **Contact Management**

  - Store multiple contact points per lead
  - Track contact details and roles
  - Contact history maintenance

- **Interaction Tracking**
  - Log calls, visits, and orders
  - Schedule follow-ups
  - Track interaction outcomes

## Assignment Questions Answers

[System Design & Data modelling Answers](https://docs.google.com/document/d/1UJpG_Kz0ZD4fYY7OXEwDWM5V-kHTsdBQdr68xeVIOvI/edit?usp=sharing)

## Demonstration Video
[Demonstration Video](https://drive.google.com/file/d/13sL6iI673InuaWAPsBbj1iPgocwvqi5y/view?usp=sharing)

## Hosted Link

You can access the live application at [keyleadmanager.devprojects.world](https://keyleadmanager.devprojects.world).

## Tech Stack

### Frontend

- React.js (v18)
- Tailwind CSS
- ShadCN

### Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn
- Git
- Docker (optional)

## Database Setup

1. **Pull the PostgreSQL Docker Image**

   Run the following command to download the PostgreSQL Docker image:

   ```bash
   docker pull postgres
   ```

2. **Run a PostgreSQL Container**

   Use the following command to create and start a PostgreSQL container:

   ```bash
   docker run --name postgres-container \
     -e POSTGRES_USER=myuser \
     -e POSTGRES_PASSWORD=mypassword \
     -e POSTGRES_DB=mydatabase \
     -p 5432:5432 \
     -d postgres
   ```

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/royaals/lead-management-system.git

cd lead-management-system

# Navigate to backend directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure environment variables
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydatabase"


# Run migrations
npx prisma migrate dev

# Start the server
npm start
```

#### 2. Frontend setup

```bash

# Navigate to frontend directory
cd client
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure environment variables
VITE_REACT_APP_BACKEND_URL="http://localhost:3000"

# run the development server
npm run dev
```

### Testing

```bash
cd server

npm test
```

### API Documentation

The API documentation is available at `http://localhost:3000/api-docs` after starting the application. It includes detailed information about each endpoint, request parameters, and response formats.

## Sample Usage Examples

### 1. **Add a New Lead**

**Request**:

```bash
curl -X POST "http://localhost:3000/api/leads" \
-H "Authorization: Bearer your_jwt_token" \
-H "Content-Type: application/json" \
-d '{
    "name": "Restaurant Name",
    "contact": "Contact Name",
    "phone": "Phone Number",
    "email": "email@example.com"
}'
```

### 2. **Retrieve All Leads**

**Request**:

```bash
curl -X GET "http://localhost:3000/api/leads" \
-H "Authorization: Bearer your_jwt_token"
```

### 3. **Add a Point of Contact (POC)**

```bash
curl -X POST "http://localhost:3000/api/leads/1/pocs" \
-H "Authorization: Bearer your_jwt_token" \
-H "Content-Type: application/json" \
-d '{
    "name": "POC Name",
    "role": "POC Role",
    "phone": "POC Phone",
    "email": "poc@example.com"
}'
```

### 4. **4. Retrieve All Points of Contact (POC)**

```bash
curl -X GET "http://localhost:3000/api/leads/1/pocs" \
-H "Authorization: Bearer your_jwt_token"
```

### 5. **Add a Call Plan for a Lead**

```bash
curl -X POST "http://localhost:3000/api/call-plans" \
-H "Authorization: Bearer your_jwt_token" \
-H "Content-Type: application/json" \
-d '{
    "leadId": 1,
    "frequency": 7,
    "nextCallDate": "2024-12-30",
    "time": "10:00:00"
}'
```

### 6. **Retrieve Call Plans for a Lead**

```bash
curl -X GET "http://localhost:3000/api/call-plans/1" \
-H "Authorization: Bearer your_jwt_token"
```

### 7. **Update a Call Plan**

```bash
curl -X PUT "http://localhost:3000/api/call-plans/1" \
-H "Authorization: Bearer your_jwt_token" \
-H "Content-Type: application/json" \
-d '{
    "leadId": 1,
    "frequency": 14,
    "nextCallDate": "2025-01-05",
    "time": "14:00:00"
}'
```

### 8. **Delete a Call Plan**

```bash
curl -X DELETE "http://localhost:3000/api/call-plans/1" \
-H "Authorization: Bearer your_jwt_token"
```
