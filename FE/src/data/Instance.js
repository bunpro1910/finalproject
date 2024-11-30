import axios from "axios";
import { toast } from "react-toastify";

let token;
if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
}

const instance = axios.create({
    baseURL: '/api',
    headers: {
        Authorization: `Bearer ${token}`,
    },
    // .. other options
});

// Add a response interceptor
instance.interceptors.response.use(
    response => {
        // Any status code that lie within the range of 2xx will cause this function to trigger
        // Do something with response data
        return response;
    },
    error => {
        // Any status codes that falls outside the range of 2xx will cause this function to trigger
        if (error.response && error.response.status === 422) {
            // Handle 422 error
            console.log(error.response.data)
            toast.error(`${ error.response.data.errors.reduce((x,item)=>{
                x += item.message+"\n"
                return x
            },'')}`)
            // You can handle the error here, show a notification, redirect, etc.
        }
        return Promise.reject(error);
    }
);

export default instance;