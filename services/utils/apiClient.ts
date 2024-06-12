// import axios from 'axios';
// import useAuthStore from "./authStore"; 

// // Create a custom Axios instance
// const apiClient = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });


// apiClient.interceptors.request.use(
//     (config) => {
//         const accessToken = useAuthStore.getState().access.accessToken;
//         if (accessToken) {
//             config.headers.Authorization = `Bearer ${accessToken}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// export default apiClient;


import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthStore from './authStore';
import { useRouter } from 'next/navigation';

// Create a custom Axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the Authorization header
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().access.access_token;
    console.log("access",accessToken)
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses and errors
apiClient.interceptors.response.use(
  (response) => {
    // Handle successful responses
    toast.success('Request completed successfully');
    return response;
  },
  (error) => {
    // Handle errors
    const router = useRouter();
    if (error.response) {
      // Server responded with a status other than 200 range
      if (error.response.status === 401) {
        // Handle unauthorized access, redirect to login
        toast.error('You are not authorized to access this resource');
        router.push('/login');
      } else if (error.response.status === 500) {
        // Handle server errors
        toast.error('An error occurred on the server. Please try again later.');
      } else {
        toast.error(`An error occurred: ${error.response.data.message}`);
      }
    } else if (error.request) {
      // Request was made but no response received
      toast.error('No response received. Please check your network connection.');
    } else {
      // Something happened in setting up the request
      toast.error(`An error occurred: ${error.message}`);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
