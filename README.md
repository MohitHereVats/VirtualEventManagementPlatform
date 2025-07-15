# Virtual Event Management Platform

## 📋 Project Overview

A comprehensive backend system for managing virtual events with secure user authentication, event management, and participant registration. Built with Node.js and Express.js using in-memory data structures for demonstration purposes.

## 🚀 Features Implemented

### ✅ User Authentication & Authorization
- **User Registration** with bcrypt password hashing
- **JWT-based Login** system
- **Role-based access control** (Organizers vs Attendees)
- **Secure password validation** (minimum 6 characters)
- **Email validation** with regex patterns

### ✅ Event Management (CRUD Operations)
- **Create Events** (Organizers only)
- **Read/View Events** (All authenticated users)
- **Update Events** (Event creators only)
- **Delete Events** (Event creators only)
- **Event Registration** for attendees

### ✅ Email Notifications
- **Automated email notifications** on event registration
- **SendGrid integration** for email delivery
- **HTML email templates** with event details

### ✅ Security & Validation
- **JWT token-based authentication**
- **Request validation middleware**
- **Authorization checks** for protected routes
- **Input sanitization** and validation

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT + bcrypt
- **Email Service**: Nodemailer + SendGrid
- **Database**: In-memory data structures (Maps)
- **Development**: Nodemon for auto-reload

## 📁 Project Structure

```
VirtualEventManagementPlatform/
├── App.js                          # Main application entry point
├── package.json                    # Dependencies and scripts
├── constants.js                    # Application constants
├── utils.js                        # Utility functions
├── controllers/
│   ├── authControllers.js          # Authentication logic
│   └── eventControllers.js         # Event management logic
├── middlewares/
│   ├── isAuthenticated.js          # JWT authentication middleware
│   ├── validationChecks.js         # Input validation middleware
│   └── organizerChecks.js          # Role-based authorization
├── models/
│   ├── user.js                     # User data model
│   └── event.js                    # Event data model
└── routes/
    ├── auth.js                     # Authentication routes
    └── events.js                   # Event management routes
```

## 🌐 API Endpoints

### Authentication Endpoints

#### 1. User Registration
- **URL**: `POST /users/register`
- **Description**: Register a new user
- **Authentication**: Not required
- **Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "profile": "ORGANIZER" // or "ATTENDEE"
}
```
- **Response**: 
```json
{
  "message": "User registered successfully",
  "userId": "unique_user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "profile": "ORGANIZER"
}
```

#### 2. User Login
- **URL**: `POST /users/login`
- **Description**: Authenticate user and get JWT token
- **Authentication**: Not required
- **Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response**:
```json
{
  "message": "Login successful",
  "token": "jwt_token_here"
}
```

### Event Management Endpoints

#### 3. Get All Events
- **URL**: `GET /events`
- **Description**: Retrieve all events
- **Authentication**: Required (JWT token)
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Response**:
```json
[
  {
    "eventId": "unique_event_id",
    "name": "Tech Conference 2025",
    "description": "Annual technology conference",
    "organizerId": "organizer_user_id",
    "date": "2025-08-15T10:00:00.000Z"
  }
]
```

#### 4. Create Event
- **URL**: `POST /events`
- **Description**: Create a new event (Organizers only)
- **Authentication**: Required (JWT token + Organizer role)
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Request Body**:
```json
{
  "name": "Tech Conference 2025",
  "description": "Annual technology conference",
  "date": "2025-08-15T10:00:00.000Z"
}
```
- **Response**:
```json
{
  "name": "Tech Conference 2025",
  "description": "Annual technology conference",
  "organizerId": "organizer_user_id",
  "date": "2025-08-15T10:00:00.000Z",
  "eventId": "unique_event_id",
  "attendees": []
}
```

#### 5. Get Event by ID
- **URL**: `GET /events/:id`
- **Description**: Get specific event details
- **Authentication**: Required (JWT token)
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Response**:
```json
{
  "eventId": "unique_event_id",
  "name": "Tech Conference 2025",
  "description": "Annual technology conference",
  "organizerId": "organizer_user_id",
  "date": "2025-08-15T10:00:00.000Z",
  "attendees": ["user_id_1", "user_id_2"]
}
```

#### 6. Update Event
- **URL**: `PUT /events/:id`
- **Description**: Update event (Event creator only)
- **Authentication**: Required (JWT token + Event creator)
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Request Body**:
```json
{
  "name": "Updated Event Name",
  "description": "Updated description",
  "date": "2025-09-15T10:00:00.000Z"
}
```
- **Response**:
```json
{
  "message": "Event updated successfully",
  "eventId": "unique_event_id"
}
```

#### 7. Delete Event
- **URL**: `DELETE /events/:id`
- **Description**: Delete event (Event creator only)
- **Authentication**: Required (JWT token + Event creator)
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Response**:
```json
{
  "message": "Event deleted successfully",
  "event": {
    "eventId": "unique_event_id",
    "name": "Deleted Event",
    "description": "Event description",
    "organizerId": "organizer_user_id",
    "date": "2025-08-15T10:00:00.000Z",
    "attendees": []
  }
}
```

#### 8. Register for Event
- **URL**: `POST /events/:id/register`
- **Description**: Register user for an event
- **Authentication**: Required (JWT token)
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Response**:
```json
{
  "message": "User registered successfully",
  "event": {
    "eventId": "unique_event_id",
    "name": "Tech Conference 2025",
    "description": "Annual technology conference",
    "organizerId": "organizer_user_id",
    "date": "2025-08-15T10:00:00.000Z",
    "attendees": ["user_id_1", "new_user_id"]
  }
}
```

## 🔒 Security Features

### Authentication Middleware
- **JWT Token Validation**: All protected routes require valid JWT tokens
- **Token Expiration**: Tokens have configurable expiration times
- **Secure Headers**: Authorization header format: `Bearer <token>`

### Authorization Levels
1. **Public Routes**: Registration, Login
2. **Authenticated Routes**: View events, Register for events
3. **Organizer Only**: Create events
4. **Event Creator Only**: Update/Delete specific events

### Input Validation
- **Email Format**: Valid email regex validation
- **Password Strength**: Minimum 6 characters
- **Profile Types**: Must be "ORGANIZER" or "ATTENDEE"
- **Event Data**: Name, description, and valid date required

## 📧 Email Notification System

### Features
- **Automatic Email**: Sent upon successful event registration
- **HTML Templates**: Rich email formatting with event details
- **SendGrid Integration**: Reliable email delivery service
- **Async Operations**: Non-blocking email sending with promises

### Email Content Includes
- Registration confirmation
- Event name and description
- Event date
- Professional HTML formatting

## 🗂️ Data Models

### User Model
```javascript
{
  userId: "unique_id",
  name: "User Name",
  email: "user@example.com",
  password: "hashed_password",
  profile: "ORGANIZER" | "ATTENDEE"
}
```

### Event Model
```javascript
{
  eventId: "unique_id",
  name: "Event Name",
  description: "Event Description",
  organizerId: "creator_user_id",
  date: "ISO_date_string",
  attendees: ["user_id_1", "user_id_2"]
}
```

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- SendGrid account (for email functionality)

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository_url>
cd VirtualEventManagementPlatform
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env` file in the root directory:
```env
port=3000
jwtSecret=your_jwt_secret_key
jwtExpiration=1h
saltRounds=10
sendGridApiKey=your_sendgrid_api_key
```

4. **Start the server**
```bash
npm start
```

The server will run on `http://localhost:3000`

## 🧪 Testing the API

### Using cURL Examples

#### Register a User
```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "profile": "ORGANIZER"
  }'
```

#### Login
```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Create Event (with JWT token)
```bash
curl -X POST http://localhost:3000/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Tech Conference 2025",
    "description": "Annual technology conference",
    "date": "2025-08-15T10:00:00.000Z"
  }'
```

## 🎯 Key Implementation Highlights

### 1. In-Memory Database
- Uses JavaScript Maps for efficient data storage
- Separate maps for users (by ID) and user emails for quick lookups
- Events stored with unique IDs and cross-referenced with organizers

### 2. Security Best Practices
- Password hashing with bcrypt and configurable salt rounds
- JWT tokens with expiration
- Role-based access control
- Input validation and sanitization

### 3. Error Handling
- Comprehensive error responses
- Try-catch blocks for async operations
- Proper HTTP status codes
- Detailed error messages for debugging

### 4. Middleware Architecture
- Modular middleware for authentication
- Separate validation middleware
- Authorization checks for protected operations
- Reusable utility functions

### 5. Asynchronous Operations
- Promise-based email sending
- Async/await pattern for better code readability
- Non-blocking operations for better performance

## 📝 Requirements Fulfillment Checklist

✅ **Project Setup**
- ✅ Node.js project with Express.js
- ✅ All necessary NPM packages installed
- ✅ In-memory data structures (Maps) instead of database

✅ **User Authentication**
- ✅ User registration with bcrypt password hashing
- ✅ JWT token-based authentication
- ✅ User profiles (Organizers vs Attendees)
- ✅ In-memory user management

✅ **Event Management**
- ✅ Event data model with required fields
- ✅ CRUD operations for events
- ✅ Authorization for event management
- ✅ In-memory event storage

✅ **Participant Management**
- ✅ Event registration functionality
- ✅ Attendee list management
- ✅ Registration validation (no duplicates)

✅ **RESTful API Endpoints**
- ✅ POST /users/register
- ✅ POST /users/login
- ✅ GET /events
- ✅ POST /events
- ✅ GET /events/:id
- ✅ PUT /events/:id
- ✅ DELETE /events/:id
- ✅ POST /events/:id/register

✅ **Asynchronous Operations**
- ✅ Async/await for email operations
- ✅ Promises for email notifications
- ✅ Non-blocking email sending

✅ **Email Notifications**
- ✅ Email sent on successful event registration
- ✅ HTML email templates
- ✅ SendGrid integration

## 🔧 Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Event categories and filtering
- [ ] User dashboard and profile management
- [ ] Event capacity limits
- [ ] Calendar integration
- [ ] Real-time notifications
- [ ] File upload for event images
- [ ] Advanced search and filtering
- [ ] Event analytics and reporting

## 👨‍💻 Author

**Mohit Verma**
- GitHub: [MohitHereVats](https://github.com/MohitHereVats/VirtualEventManagementPlatform)

---

*This project demonstrates a complete backend implementation for virtual event management with modern web development practices and security standards.*
