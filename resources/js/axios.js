import axios from "axios";
import { toast } from "react-toastify";
import { Inertia } from "@inertiajs/inertia";

// Set the base URL to your API
axios.defaults.baseURL = import.meta.env.VITE_API_URL; // Ensure this matches your API routes

// Set default headers
axios.defaults.headers.common["Accept"] = "application/json";

// Add a request interceptor to attach the Authorization token
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access
            toast.error("Session expired. Please log in again.");
            // Remove token and user data
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            localStorage.removeItem("userId");
            // Redirect to home page where login modal can be triggered
            Inertia.visit("/");
        } else if (
            error.response &&
            error.response.data &&
            error.response.data.error
        ) {
            toast.error(error.response.data.error);
        } else {
            toast.error("An unexpected error occurred.");
        }
        return Promise.reject(error);
    }
);

export default axios;
