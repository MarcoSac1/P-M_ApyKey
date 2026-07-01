import { api } from './apiClient.js'

export const keyService = {
  list: () => api.listKeys(),
  create: ({ name, permissions }) => api.createKey({ name, permissions }),
  revoke: (id) => api.revokeKey(id),
}
