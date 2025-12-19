import axios from "axios";

export const api = axios.create({
  baseURL: "https://portfolio-backend-otxk.onrender.com/api"
});
