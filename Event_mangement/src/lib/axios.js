import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: "https://event-mangement-b.onrender.com/api", // Fixed to localhost
   // Include cookies/credentials
  withCredentials: true, // Include cookies/credentials
  headers: {
    // "Content-Type": "application/json",
  },
});
// Add a request interceptor to attach the Authorization header if a token exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    console.log("Attaching token:", token); // Should now log the valid token after login
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
