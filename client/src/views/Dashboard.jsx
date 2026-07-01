import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { keyService } from '../services/keyService.js'
import StatusBadge from '../components/StatusBadge.jsx'
import Button from '../components/Button.jsx'
import { useToast } from '../components/Toast.jsx'

function StatCard({ label, value, accent }) {
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: 20,
      }}
    >
      <div className="eyebrow" style={{ marginBottom: 12 }}>{label}</div>
      <div style={{ fontSize: 34, fontWeight: 600, fontFamily: 'var(--font-mono)', color: accent || 'var(--text)' }}>
        {value}
      </div>
    </div>
  )
}

/* Vista d'insieme: numeri chiave + ultime chiavi create. */
export default function Dashboard() {
  const [keys, setKeys] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { push } = useToast()

  useEffect(() => {
    keyService
      .list()
      .then(setKeys)
      .catch((e) => push(e.message, 'error'))
      .finally(() => setLoading(false))
  }, [push])

  const active = keys.filter((k) => k.status === 'active').length
  const revoked = keys.filter((k) => k.status === 'revoked').length
  const recent = [...keys].slice(0, 4)

  return (
    <div>
      <div className="eyebrow" style={{ marginBottom: 8 }}>Panoramica</div>
      <h1 style={{ fontSize: 26, marginBottom: 26 }}>Dashboard</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
        <StatCard label="Chiavi attive" value={loading ? '—' : active} accent="var(--accent)" />
        <StatCard label="Chiavi revocate" value={loading ? '—' : revoked} accent="var(--danger)" />
        <StatCard label="Totale chiavi" value={loading ? '—' : keys.length} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <h2 style={{ fontSize: 17 }}>Chiavi recenti</h2>
        <Button variant="ghost" onClick={() => navigate('/keys')} style={{ height: 34 }}>
          Vedi tutte
        </Button>
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
        {loading ? (
          <div style={{ padding: 32, color: 'var(--text-muted)' }}>Carico…</div>
        ) : recent.length === 0 ? (
          <div style={{ padding: 32, color: 'var(--text-muted)' }}>Ancora nessuna chiave.</div>
        ) : (
          recent.map((k, i) => (
            <div
              key={k.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 20px',
                borderTop: i === 0 ? 'none' : '1px solid var(--border)',
              }}
            >
              <div>
                <div style={{ fontWeight: 500 }}>{k.name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>
                  {k.prefix}…
                </div>
              </div>
              <StatusBadge status={k.status} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}
