import { createContext, useContext, useState } from 'react'
import { authService } from '../services/authService.js'
import { getToken } from '../services/apiClient.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Se c'è già un token in sessione, consideriamo l'admin autenticato.
  const [user, setUser] = useState(() => (getToken() ? { email: 'admin' } : null))

  async function login(email, password) {
    const u = await authService.login(email, password)
    setUser(u)
    return u
  }

  function logout() {
    authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth va usato dentro <AuthProvider>')
  return ctx
}
