import { useState, useEffect } from 'react'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import {
  login,
  register,
  logout as logoutApi,
  refreshToken,
  firebaseSync,
} from '../api/auth.api'
import { app } from '../firebase/firebase.config'
import { setAccessToken, clearAccessToken } from '../utils/tokenManager'
import { AuthContext } from './AuthContext'


const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessTokenState] = useState(null)
  const [authProvider, setAuthProvider] = useState(null)
  const [loading, setLoading] = useState(true)

  const applySession = (data, provider) => {
    const { user, accessToken } = data
    setAccessToken(accessToken)
    setAccessTokenState(accessToken)
    setUser(user)
    setAuthProvider(provider)
  }


  const loginWithEmail = async (email, password) => {
    setLoading(true)
    try {
      const data = await login(email, password)
      applySession(data, 'local')
      return data
    } finally {
      setLoading(false)
    }
  }

  const registerWithEmail = async (name, email, password) => {
    setLoading(true)
    try {
      const data = await register(name, email, password)
      applySession(data, 'local')
      return data
    } finally {
      setLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    setLoading(true)
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const firebaseIdToken = await result.user.getIdToken()
      const data = await firebaseSync(firebaseIdToken)
      applySession(data, 'firebase')
      return data
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    const wasFirebase = authProvider === 'firebase'

    try {
      await logoutApi()
    } finally {
      clearAccessToken()
      setAccessTokenState(null)
      setUser(null)
      setAuthProvider(null)
      setLoading(false)

      if (wasFirebase) {
        await signOut(auth)
      }
    }
  }

  const refreshAccessToken = async () => {
    const data = await refreshToken()
    setAccessToken(data.accessToken)
    setAccessTokenState(data.accessToken)
    if (data.user) setUser(data.user)
    return data
  }


  useEffect(() => {
    const initSession = async () => {
      try {
        const data = await refreshToken()
        applySession(data, null)
      } catch {
        clearAccessToken()
        setAccessTokenState(null)
        setUser(null)
        setAuthProvider(null)
      } finally {
        setLoading(false)
      }
    }
    initSession()
  }, [])

  const authInfo = {
    user,
    accessToken,
    authProvider,
    loading,
    setLoading,
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    logout,
    refreshAccessToken,
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
