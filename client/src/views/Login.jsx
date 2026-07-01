import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { USE_MOCK } from '../services/apiClient.js'
import { MOCK_ADMIN } from '../services/mock/mockBackend.js'
import Button from '../components/Button.jsx'

/* Accesso amministratore. */
export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState(USE_MOCK ? MOCK_ADMIN.email : '')
  const [password, setPassword] = useState(USE_MOCK ? MOCK_ADMIN.password : '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit() {
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Accesso non riuscito.')
    } finally {
      setLoading(false)
    }
  }

  const input = {
    width: '100%',
    height: 44,
    padding: '0 14px',
    background: 'var(--bg)',
    border: '1px solid var(--border-strong)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text)',
    fontFamily: 'var(--font-sans)',
    fontSize: 14,
    marginBottom: 14,
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: 20,
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ width: '100%', maxWidth: 380 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 26 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 9,
              background: 'var(--accent)',
              color: 'var(--accent-ink)',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
            }}
          >
            K
          </div>
          <span style={{ fontSize: 18, fontWeight: 600 }}>Key Vault</span>
        </div>

        <div className="eyebrow" style={{ marginBottom: 8 }}>Accesso amministratore</div>
        <h1 style={{ fontSize: 26, marginBottom: 24 }}>Entra nel pannello</h1>

        <label style={{ fontSize: 13, color: 'var(--text-muted)' }}>Email</label>
        <input style={{ ...input, marginTop: 6 }} value={email} onChange={(e) => setEmail(e.target.value)} />

        <label style={{ fontSize: 13, color: 'var(--text-muted)' }}>Password</label>
        <input
          style={{ ...input, marginTop: 6 }}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
        />

        {error && (
          <p style={{ color: 'var(--danger)', fontSize: 13, marginTop: 0, marginBottom: 14 }}>{error}</p>
        )}

        <Button full loading={loading} onClick={submit}>Accedi</Button>

        {USE_MOCK && (
          <p style={{ color: 'var(--text-faint)', fontSize: 12, marginTop: 18, fontFamily: 'var(--font-mono)' }}>
            Demo (mock): {MOCK_ADMIN.email} / {MOCK_ADMIN.password}
          </p>
        )}
      </div>
    </div>
  )
}
