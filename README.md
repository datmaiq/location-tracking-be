README.md
Location Tracking Backend
This repository contains the backend code for a location tracking system built using Node.js.
Setup and Run

To create a comprehensive README file for the project, I will break down the instructions into three sections: setup and running the API, API documentation, and ERD (Entity-Relationship Diagram). Here's a structured approach for each part:

README.md
Location Tracking Backend
This repository contains the backend code for a location tracking system built using Node.js .

Table of Contents
Setup and Run
API Documentation
ERD (Entity-Relationship Diagram)
Setup and Run
Prerequisites
Node.js (v12.x or higher)
npm (v6.x or higher)
MongoDB
Installation
1.Clone the repository:

git clone https://github.com/datmaiq/location-tracking-be.git
cd location-tracking-be

2.Install the dependencies:

npm install

3.Create a .env file in the root directory and add the following environment

JWT_SECRET_KEY="SBYpK28qzjNQ1IW7UKKfY07VAPmFVW4AQL0cmBwWT5Q="
MONGO_URL="mongodb+srv://trangmaiq:6jDTMSv!w32IlnPc@whatever.b66he9n.mongodb.net/location"

4.Run the application:

npm run server
Running the Application
The API server will start on http://localhost:8000.
