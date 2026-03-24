import axios from "axios";

const apiClient = axios.create({
    baseURL: `http://localhost:3055/v1/api`,
    headers: {
        "Content-Type": "application/json",
        'x-api-key': import.meta.env.VITE_API_KEY
    }
})

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    const clientId = localStorage.getItem('clientId')

    if (token) {
        config.headers.Authorization = `${token}`
    }

    if (clientId) {
        config.headers['x-client-id'] = clientId
    }

    return config
})

export default apiClient