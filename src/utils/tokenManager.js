let accessToken = null

export const setAccessToken = (token) => {
  accessToken = token
}

export const getAccessToken = () => {
  return accessToken
}

export const clearAccessToken = () => {
  accessToken = null
}

export const isTokenExpired = (token) => {
  if (!token) return true

  try {
    const parts = token.split('.')
    if (parts.length !== 3) return true

    const payload = JSON.parse(atob(parts[1]))
    if (!payload.exp) return true

    return Date.now() >= payload.exp * 1000
  } catch {
    return true
  }
}