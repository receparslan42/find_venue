import axios from 'axios'; // Axios: A library for making HTTP requests

// Create an Axios instance with a base URL and default headers
const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api", // Uses environment variable

  // Default headers for all requests made using this instance
  headers: {
    Accept: "application/json", // Type of response expected from the server

    // Indicates that the client expects JSON responses from the server
    // application/x-www-form-urlencoded: Standard encoding for HTML form data
    // charset=UTF-8: Character encoding for supporting a wide range of characters like Turkish characters
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
  }
});

export default http; // Export the Axios instance for use in other parts of the application