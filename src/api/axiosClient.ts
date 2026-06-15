import axios from "axios";

const VITE_NODE_ENV = import.meta.env.VITE_NODE_ENV;
const API_URL =
  VITE_NODE_ENV === "production"
    ? import.meta.env.VITE_API_URL_PROD
    : import.meta.env.VITE_API_URL_DEV;

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
