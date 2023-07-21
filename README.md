## Overview
Notexis a web application designed to revolutionize the way users create, organize, and collaborate on notes. The goal is to provide an intuitive and visually engaging user interface that promotes seamless interaction and ease of use. Keys features of the app includes:
* Note Creation and Editting
* Real-time Updates and Collaboration
* User Authentication and Security
* Search and Filtering

## The Frontend

### Tools
* The application was built using `React`, `TypeScript` and `Vite`
* `React Router dom` was used to handle client-side routing. 
* `Redux` was employed for managing global application state for efficient data flow across components.
* `Tailwind CSS` was adopted to create dynamic and responsive styling for components.
* `TinyMCE` was integrated for text editing and formatting capabilities, offering users a feature-rich text editor for creating and editing notes.
* `Socket.IO`: was used to achieve real-time updates and collaboration,therefore enabling bidirectional communication between the server and clients, for instant updates on shared notes.
* `Jest and React Testing Library`were used for testing the frontend components and ensuring code quality.
* `Axios` was chosen for handling HTTP requests.

## Environment Variables
To run this project, you will need to add the following environment variables to your `.env` file

`REACT_APP_USERS_API_URL`

## Installation Guide
To set up and run the frontend application locally, follow these step-by-step instructions:

1. Prerequisites:
   - Ensure you have Node.js (v14 or higher) installed on your machine.
   - If you already have yarn installed, Install Yarn globally by running `npm install -g yarn` in your terminal.

2. Clone the Repository:
     ```bash
     git clone [repository_url]
     ```

3. Install Dependencies:
   - Change directory to the project folder:
     ```bash
     cd [project_folder]
     ```
   - Install the project dependencies using Yarn:
     ```bash
     yarn install
     ```
4. Follow the step above to setup `.env` file.
5. To start the dev server run:```yarn dev``` and the application will be available at `http://127.0.0.1:5173/` by default.
6. To build for production: ```yarn build```
7. To run unit tests, use: ```yarn test```
8. Live Url : https://emmanuelo-devtown-assessment.vercel.app/

## The Backend

### Tools
*  `Node.js` and `Express`were used to build the backend.
*  `MongoDB`: was used for data storage.
*  `Mongoose`:was integrated as an Object Data Modeling (ODM).
*  `Socket.io:` was used for real-time updates and collaboration features.
*  `JWT`: was implemented for user authentication.
*  `CORS(Cross-Origin Resource Sharing)`: was integrated for a secure and controlled cross-origin requests.

     
## Interface Overview

*Introduce the user to the app's main interface, highlighting key elements and functionalities.
*

## API Reference
* Login
* Signup
* Verify email
* Get Shared Note
* Create Note


## Challenges and Solution Strategies
