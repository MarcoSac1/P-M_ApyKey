import { api, setToken } from './apiClient.js'

export const authService = {
  async login(email, password) {
    const { token, user } = await api.login({ email, password })
    setToken(token)
    return user
  },
  logout() {
    setToken(null)
  },
}
