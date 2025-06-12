import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

const useAxiosSecure = () => {
    return axiosInstance;
};

export default useAxiosSecure;