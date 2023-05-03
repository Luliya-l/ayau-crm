import axios from 'axios';

const api = axios.create({
    baseURL: "https://crm-backend-two.vercel.app/",
    // baseURL: "http://localhost:8000/",
    headers: {
        "content-type":"application/json"
    }
})

export const apiGPT = axios.create({
    baseURL: "http://185.125.88.88:9040/",
    headers: {
        "content-type":"application/json",
    }
})

export default api