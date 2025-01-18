# Uber Clone (MERN Stack)

This repository contains a full-stack Uber clone application developed using the **[MERN Stack](https://www.mongodb.com/mern-stack)** (**[MongoDB](https://www.mongodb.com/)**, **[Express](https://expressjs.com/)**, **[React](https://react.dev/)**, **[Node.js](https://nodejs.org/)**). It includes advanced features such as real-time location tracking, live traffic-based fare calculation, and a modern UI design.

The app integrates several technologies like **[Socket.io](https://socket.io/)**, **[Google Maps API](https://developers.google.com/maps/documentation)**, and state management using both **[Context API](https://react.dev/learn/passing-data-deeply-with-context)** and **[Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)**.

---
## Demo

![Demo GIF](resources/chatty-video.gif)

## Features

- **Real-Time Location Tracking**: Powered by [**Socket.io**](https://socket.io/) to track and share live user and driver locations.
- **Search and Geocoding**: Integrated with [**Google Maps API**](https://developers.google.com/maps/documentation) for location search and address-to-coordinate conversion.
- **Distance and Fare Calculation**: Leverages [**Google Maps Distance Matrix API**](https://developers.google.com/maps/documentation/distance-matrix/start) to calculate distances and fares with live traffic.
- **Street View and Directions**: Provides a [**Street View**](https://developers.google.com/maps/documentation/streetview/start) and route directions from origin to destination using [**Google Maps API**](https://developers.google.com/maps/documentation).
- **JWT Authentication**: Secures the application with [**JSON Web Tokens (JWT)**](https://jwt.io/) for user authentication.
- **Debounced Location Search**: Enhances user experience with debounced input for location searches to optimize API calls.
- **Driver Matching**: Matches riders with the nearest drivers based on **real-time** updates using [**Socket.io**](https://socket.io/).
- **Modern UI Design**: Incorporates [**Flowbite**](https://flowbite.com/) and [**Tailwind CSS**](https://tailwindcss.com/) for a sleek user interface.
- **State Management**: Combines [**Context API**](https://react.dev/learn/passing-data-deeply-with-context) and [**Zustand**](https://docs.pmnd.rs/zustand/getting-started/introduction) for effective state handling.


---
## Key Technologies & Libraries Used

### Backend
- **Node.js** & **Express.js**: For building the server-side application.
- **MongoDB** & **Mongoose**: For database management and schema modeling.
- **Socket.IO**: For real-time communication (e.g., live location tracking).
- **JWT Authentication**: For secure user authentication and session management.
- **BCrypt**: For hashing passwords securely.
- **Express Validator**: For backend form validation.
- **Axios**: For making HTTP requests.
- **CORS**: For enabling cross-origin requests.
- **Cookie Parser**: For handling cookies in requests.
- **Dotenv**: For managing environment variables.

### Frontend
- **React (Vite)**: For building the client-side application.
- **React Router DOM**: For navigation and routing.
- **Socket.IO Client**: For real-time communication with the backend.
- **@react-google-maps/api**: For integrating Google Maps functionalities.
- **Axios**: For making API requests.
- **GSAP**: For creating smooth animations.
- **Flowbite** & **Flowbite React**: For UI components.
- **Tailwind CSS**: For responsive and modern styling.
- **Zustand**: For state management.
- **React Hot Toast**: For displaying toast notifications.
- **RemixIcon**: For using modern icons.

---
### Prerequisites
- **Node.js** (v14+)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Google Maps API Key**

## Installation Guide
### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/harsh-panchal-804/Full-Stack-Uber-Clone
   ```

2. **Install Dependencies**
   ```bash
   # Install server dependencies
   cd BackEnd
   npm install

   # Install client dependencies
   cd FrontEnd
   npm install 
   # Apply Patch for Goople Maps
   npm run postinstall
   ```

3. **Set Up Environment Variables**
   Create `.env` files in both the `server` and `client` directories.

   **Server `.env`:**
   ```env
    PORT=4000
    DB_CONNECT=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    MAPS_API_KEY=your_google_maps_api_key
   ```
   
   **Client `.env`:**
   ```env
    VITE_BASE_URL=http://localhost:4000
    VITE_GOMAPS_API_KEY=your_google_maps_api_key
   ```
    
4. **Run the Application**
   ```bash
   # Start the server
   cd BackEnd
   npx nodemon

   # Start the client
   cd FronEnd
   npm run dev
   ```
# Project Structure

## Backend/
```
Backend/
├── contollers/
├── db/
│   └── Models/
├── middlewares/
├── routes/
└── services/
```

## Frontend/
```
Frontend/
├── patches/
└── src/
    ├── assets/
    ├── components/
    ├── context/
    ├── hooks/
    ├── pages/
    └── store/
```

## Directory Descriptions

### Backend Directories
- `controllers/` - Request handlers and business logic
- `db/` - Database configuration and models
  - `Models/` - Mongoose schemas and models
- `middlewares/` - Custom middleware functions
- `routes/` - API route definitions 
- `services/` - Business logic and external service integrations

### Frontend Directories
- `patches/` - Custom patches for npm packages
- `src/` - Source code
  - `assets/` - Images, fonts and static files
  - `components/` - Reusable React components
  - `context/` - React context providers 
  - `hooks/` - Custom React hooks
  - `pages/` - Page components
  - `store/` - State management with Zustand

# API Route Structure
```
Backend/
├── /users
    ├── POST /register
    ├── POST /login
    ├── GET /profile
    └── GET /logout
├── /captains
    ├── POST /register
    ├── POST /login
    ├── GET /profile
    └── GET /logout
├── /rides
    ├── POST /create
    ├── GET /get-fare
    ├── POST /confirm
    ├── GET /start-ride
    └── POST /end-ride
└── /maps
    ├── GET /get-coordinates
    ├── GET /get-distance-time
    └── GET /get-suggestions
```
More information about API routes can be found in **[README.md](./Backend/README.md)** file in the BackEnd folder.


