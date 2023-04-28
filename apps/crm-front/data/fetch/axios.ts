import axios from 'axios';

const api = axios.create({
    baseURL: "https://crm-backend-two.vercel.app/",
    headers: {
        "content-type":"application/json"
    }
})


export default api