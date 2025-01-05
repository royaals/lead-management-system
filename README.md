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
DATABASE_URL="postgresql://username:password@localhost:5432/kam_db"

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

# run the development server
npm run dev
```
### Testing
```bash
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
