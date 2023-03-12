import axios from 'axios'

const request = axios.create({
  timeout: 60000,
  baseURL: "http://localhost:5000"
})

request.interceptors.request.use(function (config) {
  // let token = localStorage.getItem('token') || ''
  // if (!token) {
  //   const params = new URLSearchParams(window.location.search)
  //   token = params.get('token')
  // }
  // config.headers.Authorization = `'Bearer ${token}`
  return config
})

export default request
