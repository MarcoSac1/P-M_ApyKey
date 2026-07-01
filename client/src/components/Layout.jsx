import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { USE_MOCK } from '../services/apiClient.js'

/* Guscio autenticato: barra laterale + area contenuti. */
export default function Layout({ children }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const navItem = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 14px',
    borderRadius: 'var(--radius-sm)',
    color: isActive ? 'var(--text)' : 'var(--text-muted)',
    background: isActive ? 'var(--surface-2)' : 'transparent',
    fontSize: 14,
    fontWeight: 500,
    textDecoration: 'none',
  })

  return (
    <div style={{ display: 'flex', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <aside
        style={{
          width: 240,
          flexShrink: 0,
          borderRight: '1px solid var(--border)',
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 6px 24px' }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
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
          <span style={{ fontWeight: 600, letterSpacing: '-0.01em' }}>Key Vault</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <NavLink to="/" end style={navItem}>▤ Dashboard</NavLink>
          <NavLink to="/keys" style={navItem}>⚿ Chiavi</NavLink>
        </nav>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {USE_MOCK && (
            <div
              style={{
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                color: 'var(--warning)',
                border: '1px solid rgba(232,176,75,.3)',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 10px',
                lineHeight: 1.4,
              }}
            >
              MODALITÀ MOCK
              <br />
              backend simulato
            </div>
          )}
          <button
            onClick={() => { logout(); navigate('/login') }}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-strong)',
              color: 'var(--text-muted)',
              padding: '9px 12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: 13,
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Esci
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, padding: '32px 40px', maxWidth: 1100 }}>{children}</main>
    </div>
  )
}
