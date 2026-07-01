/* =========================================================================
   Backend finto in memoria.
   Serve a far girare il frontend SENZA il server reale.
   Rispetta ESATTAMENTE il contratto documentato in services/apiClient.js:
   quando il backend di Ettore sarà pronto, basta mettere VITE_USE_MOCK=false
   e non cambia nient'altro nel frontend.
   ========================================================================= */

// Credenziali admin di comodo per la demo in mock.
const MOCK_ADMIN = { email: 'admin@keyvault.dev', password: 'admin123' }

// Stato in memoria: si azzera a ogni refresh (è un mock, non persiste).
let keys = [
  {
    id: 'key_9f2a10',
    name: 'Servizio Fatturazione',
    prefix: 'kv_live_8f21',
    status: 'active',
    permissions: ['read', 'write'],
    createdAt: '2026-06-18T09:12:00Z',
    lastUsedAt: '2026-06-30T22:41:00Z',
  },
  {
    id: 'key_3c88b1',
    name: 'Job Notturno Report',
    prefix: 'kv_live_1ac7',
    status: 'active',
    permissions: ['read'],
    createdAt: '2026-06-05T14:30:00Z',
    lastUsedAt: '2026-06-29T03:00:00Z',
  },
  {
    id: 'key_77de02',
    name: 'Integrazione Legacy',
    prefix: 'kv_live_44b9',
    status: 'revoked',
    permissions: ['read'],
    createdAt: '2026-04-22T11:05:00Z',
    lastUsedAt: '2026-05-30T08:15:00Z',
  },
]

// Ritardo finto per simulare la rete e vedere gli stati di caricamento.
const delay = (ms = 450) => new Promise((r) => setTimeout(r, ms))

function randomSecret() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let body = ''
  for (let i = 0; i < 32; i++) body += chars[Math.floor(Math.random() * chars.length)]
  return `kv_live_${body}`
}

export const mockBackend = {
  async login({ email, password }) {
    await delay()
    if (email === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
      return { token: 'mock-token.' + Date.now(), user: { email, role: 'admin' } }
    }
    const err = new Error('Credenziali non valide.')
    err.status = 401
    throw err
  },

  async listKeys() {
    await delay()
    // Copia difensiva, ordinata dalla più recente.
    return [...keys].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },

  async createKey({ name, permissions }) {
    await delay()
    const secret = randomSecret()
    const created = {
      id: 'key_' + Math.random().toString(16).slice(2, 8),
      name: name?.trim() || 'Chiave senza nome',
      prefix: secret.slice(0, 12),
      status: 'active',
      permissions: permissions?.length ? permissions : ['read'],
      createdAt: new Date().toISOString(),
      lastUsedAt: null,
    }
    keys.push(created)
    // Il segreto in chiaro viene restituito SOLO qui, una volta sola.
    return { ...created, secret }
  },

  async revokeKey(id) {
    await delay()
    const k = keys.find((x) => x.id === id)
    if (!k) {
      const err = new Error('Chiave non trovata.')
      err.status = 404
      throw err
    }
    k.status = 'revoked'
    return { id: k.id, status: 'revoked' }
  },
}

export { MOCK_ADMIN }
