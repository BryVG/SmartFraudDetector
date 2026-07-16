import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:3000",
    
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR:", {
      status: error.response?.status,
      data: error.response?.data,
    });

    return Promise.reject(error);
  }
);