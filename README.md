# Location Tracking Backend

This repository contains the backend code for a location tracking system built using Node.js.

## Table of Contents

- [Setup and Run](#setup-and-run)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
    - [Authentication](#authentication)
    - [User](#user)
    - [Location](#location)
    - [Friends](#friends)
    - [Messages](#messages)
    - [Autocomplete](#autocomplete)
- [ERD (Entity-Relationship Diagram)](#erd-entity-relationship-diagram)

## Setup and Run

### Prerequisites

- Node.js (v12.x or higher)
- npm (v6.x or higher)
- MongoDB

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/datmaiq/location-tracking-be.git
    cd location-tracking-be
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    # Add your environment variables here
    JWT_SECRET_KEY="<your secret here>"
    MONGO_URL="mongodb+srv://<user>:<password>@<url>/<db-name>"
    ```
4. Run the application:
    ```bash
    npm run server
    ```

### Running the Application

The API server will start on `http://localhost:8000`.

<<<<<<< Updated upstream
npm run server
Running the Application
The API server will start on http://localhost:8000.
=======
## API Documentation

### Authentication

#### Register a new user

- **URL:** `/api/auth/sign-up`
- **Method:** `POST`
- **Body Parameters:**
    - `username`: `String`
    - `password`: `String`

#### Login

- **URL:** `/api/auth/sign-in`
- **Method:** `POST`
- **Body Parameters:**
    - `email`: `String`
    - `password`: `String`

### User

#### Get User Profile

- **URL:** `/api/users/profile`
- **Method:** `GET`
- **Headers:**
    - `Authorization`: `Bearer token`

### Location

#### Add Location

- **URL:** `/api/locations`
- **Method:** `POST`
- **Headers:**
    - `Authorization`: `Bearer token`
- **Body Parameters:**
    - `latitude`: `Number`
    - `longitude`: `Number`
    - `timestamp`: `String`

#### Get Locations

- **URL:** `/api/locations`
- **Method:** `GET`
- **Headers:**
    - `Authorization`: `Bearer token`

### Friends

#### Send Friend Request

- **URL:** `/api/friends`
- **Method:** `POST`
- **Headers:**
    - `Authorization`: `Bearer token`
- **Body Parameters:**
    - `userId`: `String`
    - `friendId`: `String`

#### Get Friends List

- **URL:** `/api/friends/:userId`
- **Method:** `GET`
- **Headers:**
    - `Authorization`: `Bearer token`

### Messages

#### Send Message

- **URL:** `/api/messages`
- **Method:** `POST`
- **Headers:**
    - `Authorization`: `Bearer token`
- **Body Parameters:**
    - `senderId`: `String`
    - `receiverId`: `String`
    - `message`: `String`
    - `timestamp`: `String`

#### Get Messages

- **URL:** `/api/messages/:chatId`
- **Method:** `GET`
- **Headers:**
    - `Authorization`: `Bearer token`

### Autocomplete

#### Get Autocomplete Suggestions

- **URL:** `/api/autocomplete/:query`
- **Method:** `GET`
- **Headers:**
    - `Authorization`: `Bearer token`

## ERD (Entity-Relationship Diagram)

*Add your ERD here*
>>>>>>> Stashed changes
