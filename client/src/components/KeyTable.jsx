import StatusBadge from './StatusBadge.jsx'
import Button from './Button.jsx'

function fmtDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('it-IT', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

/* Tabella delle chiavi. Mostra solo il prefisso: il segreto non torna mai dal server. */
export default function KeyTable({ keys, onRevoke, loading }) {
  if (loading) {
    return <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Carico le chiavi…</div>
  }

  if (!keys.length) {
    return (
      <div style={{ padding: '48px 24px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text)', fontWeight: 600, marginBottom: 4 }}>Nessuna chiave ancora</p>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: 0 }}>
          Crea la prima chiave per iniziare a proteggere le tue rotte.
        </p>
      </div>
    )
  }

  const th = {
    textAlign: 'left',
    padding: '12px 16px',
    fontSize: 11,
    letterSpacing: '.08em',
    textTransform: 'uppercase',
    color: 'var(--text-faint)',
    fontWeight: 600,
    borderBottom: '1px solid var(--border)',
  }
  const td = { padding: '14px 16px', borderBottom: '1px solid var(--border)', fontSize: 14 }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={th}>Nome</th>
            <th style={th}>Prefisso</th>
            <th style={th}>Stato</th>
            <th style={th}>Creata</th>
            <th style={th}>Ultimo utilizzo</th>
            <th style={{ ...th, textAlign: 'right' }}>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((k) => (
            <tr key={k.id}>
              <td style={{ ...td, fontWeight: 500 }}>{k.name}</td>
              <td style={{ ...td, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                {k.prefix}…
              </td>
              <td style={td}><StatusBadge status={k.status} /></td>
              <td style={{ ...td, color: 'var(--text-muted)' }}>{fmtDate(k.createdAt)}</td>
              <td style={{ ...td, color: 'var(--text-muted)' }}>{fmtDate(k.lastUsedAt)}</td>
              <td style={{ ...td, textAlign: 'right' }}>
                {k.status === 'active' ? (
                  <Button variant="danger" onClick={() => onRevoke(k)} style={{ height: 32, padding: '0 12px' }}>
                    Revoca
                  </Button>
                ) : (
                  <span style={{ color: 'var(--text-faint)', fontSize: 13 }}>—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
