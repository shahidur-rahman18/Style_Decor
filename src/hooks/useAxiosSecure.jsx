import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import useAuth from './useAuth'
import { getAccessToken } from '../utils/tokenManager'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

const useAxiosSecure = () => {
  const { logout, refreshAccessToken } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      config => {
        const token = getAccessToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      }
    )

    const responseInterceptor = axiosInstance.interceptors.response.use(
      res => res,
      async err => {
        const originalRequest = err.config

        if (err?.response?.status !== 401 || !originalRequest) {
          return Promise.reject(err)
        }

        if (originalRequest.url?.includes('/auth/refresh')) {
          await logout().catch(console.error)
          navigate('/login')
          return Promise.reject(err)
        }

        if (originalRequest._retry) {
          await logout().catch(console.error)
          navigate('/login')
          return Promise.reject(err)
        }

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject })
          })
            .then(token => {
              originalRequest.headers.Authorization = `Bearer ${token}`
              return axiosInstance(originalRequest)
            })
            .catch(error => Promise.reject(error))
        }

        originalRequest._retry = true
        isRefreshing = true

        try {
          const data = await refreshAccessToken()
          const newToken = data.accessToken
          processQueue(null, newToken)
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return axiosInstance(originalRequest)
        } catch (refreshError) {
          processQueue(refreshError, null)
          await logout().catch(console.error)
          navigate('/login')
          return Promise.reject(refreshError)
        } finally {
          isRefreshing = false
        }
      }
    )

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor)
      axiosInstance.interceptors.response.eject(responseInterceptor)
    }
  }, [logout, refreshAccessToken, navigate])

  return axiosInstance
}

export default useAxiosSecure
