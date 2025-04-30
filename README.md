# SecureShareFiles

A secure document sharing platform built with React and Node.js, featuring secure authentication and file management capabilities.

## Project Overview

SecureShareFiles is a modern web application that allows users to securely share and manage documents. The platform uses Supabase for authentication and file storage, providing a robust and secure solution for document management.

## Tech Stack

### Frontend
- React 19
- Vite
- TailwindCSS
- React Router DOM
- React Dropzone
- Framer Motion
- React Toastify
- Hero Icons

### Backend
- Node.js
- Express.js
- Supabase
- Multer (for file uploads)

## Features

- Secure email-based OTP authentication
- Document upload and management
- Modern, responsive UI
- Real-time notifications
- Secure file storage

## Project Structure

```
SecureShareFiles/
├── frontend/
│   └── secure-docs/          # React frontend application
│       ├── src/              # Source files
│       ├── public/           # Static assets
│       └── package.json      # Frontend dependencies
└── backend/
    ├── routes/              # API routes
    │   ├── authRoutes.js    # Authentication endpoints
    │   └── docRoutes.js     # Document management endpoints
    ├── config/              # Configuration files
    └── server.js            # Main server file
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Supabase account

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your Supabase credentials
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend/secure-docs
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- POST `/auth/login` - Request OTP login

### Document Management
- POST `/docs/upload` - Upload a document

## Security Features

- Email-based OTP authentication
- Secure file storage using Supabase
- CORS protection
- Environment variable configuration

## 🎨 SecureDocs Images

![Screenshot 2025-04-22 151346](https://github.com/user-attachments/assets/22adef09-99a4-4d2f-ab32-e510b359b999)

![Screenshot 2025-04-30 192908](https://github.com/user-attachments/assets/94b8a59c-7a75-480d-b0e6-92e909593e82)

![Screenshot 2025-04-30 192516](https://github.com/user-attachments/assets/44be823b-7b20-48f1-b522-1e85e3c0adcb)

