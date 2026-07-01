/* =========================================================================
   Client API di basso livello.
   - In modalità mock instrada tutto al backend finto.
   - In modalità reale usa fetch verso VITE_API_BASE_URL, allega il token
     Bearer e normalizza gli errori.

   ------------------------------------------------------------------------
   CONTRATTO API (da concordare con Ettore — il mock lo rispetta già):

   POST   /api/auth/login
          body: { email, password }
          200 -> { token, user: { email, role } }
          401 -> { message }

   GET    /api/keys
          header: Authorization: Bearer <token>
          200 -> [ { id, name, prefix, status, permissions[], createdAt, lastUsedAt } ]

   POST   /api/keys
          body: { name, permissions[] }
          201 -> { id, name, prefix, status, permissions[], createdAt, lastUsedAt, secret }
          NB: "secret" (chiave in chiaro) è restituito SOLO qui, una volta sola.

   POST   /api/keys/:id/revoke
          200 -> { id, status: "revoked" }
   ------------------------------------------------------------------------
   ========================================================================= */

import { mockBackend } from './mock/mockBackend.js'

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
const TOKEN_KEY = 'kv_token'

export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY)
}
export function setToken(token) {
  if (token) sessionStorage.setItem(TOKEN_KEY, token)
  else sessionStorage.removeItem(TOKEN_KEY)
}

async function request(path, { method = 'GET', body } = {}) {
  const res = await fetch(BASE_URL + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  let data = null
  try { data = await res.json() } catch { /* risposta senza corpo */ }

  if (!res.ok) {
    const err = new Error(data?.message || `Errore ${res.status}`)
    err.status = res.status
    throw err
  }
  return data
}

// Facciata unica: il resto dell'app non sa se sta parlando col mock o col vero backend.
export const api = {
  login: (creds) =>
    USE_MOCK ? mockBackend.login(creds) : request('/auth/login', { method: 'POST', body: creds }),

  listKeys: () =>
    USE_MOCK ? mockBackend.listKeys() : request('/keys'),

  createKey: (payload) =>
    USE_MOCK ? mockBackend.createKey(payload) : request('/keys', { method: 'POST', body: payload }),

  revokeKey: (id) =>
    USE_MOCK ? mockBackend.revokeKey(id) : request(`/keys/${id}/revoke`, { method: 'POST' }),
}

export { USE_MOCK }
