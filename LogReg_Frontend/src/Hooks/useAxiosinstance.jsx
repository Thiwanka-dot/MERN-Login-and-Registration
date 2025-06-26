import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/v1/auth', // This is backend url
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default function useAxiosInstance(){
    return axiosInstance
}