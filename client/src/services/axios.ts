import axios from "axios";
import type { AxiosInstance } from "axios";

//use this isUsingProduction false for locally testing
const isUsingProduction = false;

const Api: AxiosInstance = axios.create({
  baseURL: isUsingProduction
    ? import.meta.env.VITE_API_BASE_URL_PROD
    : import.meta.env.VITE_API_BASE_URL_DEV,
  withCredentials: true,
});

Api.interceptors.request.use(
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

Api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle known errors
    if (error.response) {
      const status = error.response.status;

      // Handle specific status codes globally
      switch (status) {
        case 401:
          console.error("Unauthorized. Logging out...");
          // logout user logic or redirect to login
          break;
        case 403:
          console.error("Forbidden.");
          break;
        case 500:
          console.error("Server Error. Try again later.");
          break;
        default:
          console.error(error.response.data?.message || "Unknown Error");
      }
    } else if (error.request) {
      console.error("No response from server.");
    } else {
      console.error("Axios config error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default Api;
