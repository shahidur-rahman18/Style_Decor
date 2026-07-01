import axios from 'axios'
import { getAccessToken } from '../utils/tokenManager'

const authClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  })

  export const register = async (name, email, password) => {
    const { data } = await authClient.post('/auth/register', {
      name,
      email,
      password,
    })
    return data
  }


  export const login = async (email, password) => {
    const { data } = await authClient.post('/auth/login', {
      email,
      password,
    })
    return data
  }

  export const refreshToken = async () => {
    const { data } = await authClient.post('/auth/refresh')
    return data
  }


  export const logout = async () => {
    const { data } = await authClient.post('/auth/logout')
    return data
  }

  export const firebaseSync = async (firebaseIdToken) => {
    const { data } = await authClient.post(
      '/auth/firebase-sync',
      {},
      {
        headers: {
          Authorization: `Bearer ${firebaseIdToken}`,
        },
      }
    )
    return data
  }


  export const getMe = async () => {
    const token = getAccessToken()
    const { data } = await authClient.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  }