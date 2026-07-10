import axios from 'axios';

// Create a reusable Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor for request
api.interceptors.request.use(
  (config) => {
    // You could attach a token here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for response
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle global errors here, e.g. token expiration, 500 errors
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const submitContact = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const response = await api.post('/contact', data);
  return response.data;
};

export default api;
