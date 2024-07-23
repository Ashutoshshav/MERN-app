# MERN URL Shortener

A URL shortener web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Overview

This project implements a URL shortener service allowing users to shorten long URLs into more manageable and shareable links. It consists of three main components:

1. **Signup**: Allows users to create a new account.
2. **Login**: Allows registered users to log in to their accounts.
3. **Home**: Provides the main interface for shortening URLs and managing user links.
4. **URL Analysis**: Provides Shorted URLs Number of clicks, clicking Date, Timing and Shorted URL Creater.
5. **Forget Password**: Provides Forget Password functionality and Reset Password by OTP on email.

The project utilizes JWT (JSON Web Tokens) for user authentication, enabling secure access to user-specific features and data.

## Technologies Used

- **Frontend**:
  - React.js
  - Tailwind CSS
  - Material-UI

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (mongoose ORM)

## Features

- User Authentication: JWT-based authentication system for secure user sign-up and login.
- URL Shortening: Generate short URLs from long ones using the ShortID package.
- User-specific Dashboard: Logged-in users can view and manage their shortened URLs.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ashutoshshav/MERN-app.git
