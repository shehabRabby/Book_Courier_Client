import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth"; 
import { useNavigate } from "react-router-dom"; 
const BASE_URL = import.meta.env.VITE_API_URL;

const axiosSecure = axios.create({
    baseURL: BASE_URL, 
    withCredentials: true,
});

const useAxiosSecure = () => {
    const { user, logOut } = useAuth(); 
    const navigate = useNavigate();

    useEffect(() => {
        
        const requestInterceptor = axiosSecure.interceptors.request.use(
            async (config) => {
                if (user) {
                    const token = await user.getIdToken(); 
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // --- RESPONSE INTERCEPTOR (Handles 401/403 Errors) ---
        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                const status = error.response?.status;
                
                if (status === 401 || status === 403) {
                    console.error(`Axios Secure Error: Status ${status}. Logging out user.`);
                    await logOut(); 
                    navigate("/login");
                }
                return Promise.reject(error);
            }
        );

        // Cleanup: Remove interceptors when the component/hook unmounts
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [user, logOut, navigate]); 

    return axiosSecure;
};

export default useAxiosSecure;