import axios from "axios";
import{BASE_URL} from "./apipaths";
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        Accept:`application/json`,
    }
});
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }    
);
axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        // Only handle if we actually got a response from server
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else if (error.response.status === 500) {
          console.log("Server Error");
        }
      } else {
        // This is a network/CORS error
        console.error("Network or CORS error:", error.message);
      }
  
      return Promise.reject(error);
    }
  );
export default axiosInstance;