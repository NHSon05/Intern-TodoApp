  import axios, { type AxiosInstance } from 'axios'
import { getAccessToken, removeAccessToken } from '@/services/auth'


  class Http {
    instance: AxiosInstance

    constructor() {
      this.instance = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json'
        },
      })
      
      // Set accessToken to Header
      this.instance.interceptors.request.use(
        (config) => {
          const token = getAccessToken()
          
          // Dùng !== để so sánh chặt chẽ
          if (token && token !== 'undefined' && token !== 'null') {
            config.headers['Authorization'] = `Bearer ${token}`
          } else {
            // Gọi hàm đã import cho đồng bộ
            removeAccessToken()
          }
          return config
        },
        (error) => Promise.reject(error)
      )
      
      // ❌ Xử lý lỗi (auth)
      this.instance.interceptors.response.use(
        (response) => response,
        (error) => {
          const status = error.response?.status

          // Bắt cả 401 (hết hạn) và 403 (cấm truy cập do vé sai)
          if (status === 401 || status === 403) { 
            removeAccessToken()
            window.location.href = '/login'
          }
          return Promise.reject(error)
        }
      )
    }
  }

  const http = new Http().instance
  export default http