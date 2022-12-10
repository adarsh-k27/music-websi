import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "https://music-listener-app.onrender.com/"
})

export default axiosInstance;