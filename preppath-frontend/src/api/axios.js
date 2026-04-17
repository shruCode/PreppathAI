import axios from "axios";
import toast from "react-hot-toast";

let logoutHandler = null;

export const setLogoutHandler = (handler) => {
  logoutHandler = handler;
};

const instance = axios.create({
  baseURL: "https://node-backend.onrender.com/api",
});

// Attach token to every request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (logoutHandler) {
        logoutHandler();
      }

      toast.error("Session expired. Please login again.");

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default instance;
