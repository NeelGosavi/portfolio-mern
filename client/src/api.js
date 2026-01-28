import axios from "axios";

// Automatically uses localhost when running on your computer, 
// and the Render URL when deployed.
const API_URL = import.meta.env.MODE === "development"
  ? "http://localhost:5000/api"
  : "https://portfolio-backend-otxk.onrender.com/api";

export const api = axios.create({
  baseURL: API_URL,
});