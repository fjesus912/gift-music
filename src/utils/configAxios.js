import axios from "axios";


const axiosMusic = axios.create({
  baseURL: "https://fj-music-api.1.us-1.fl0.io",
})

axiosMusic.interceptors.request.use((config) => {
  config.headers.Authorization = `JWT ${
    JSON.parse(localStorage.getItem("userInfo"))?.token
  }`
  return config
})

export { axiosMusic }