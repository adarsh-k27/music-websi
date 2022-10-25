import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "https://music-listen-web-app.herokuapp.com/"
})

export default axiosInstance;