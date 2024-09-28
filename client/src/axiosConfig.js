import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://bookmanager-tuo3.onrender.com/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosInstance;
