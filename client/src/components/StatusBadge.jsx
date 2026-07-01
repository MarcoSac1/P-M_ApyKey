/* Pallino + etichetta di stato chiave. */
const MAP = {
  active: { label: 'Attiva', color: 'var(--accent)', bg: 'rgba(61,214,196,.10)' },
  revoked: { label: 'Revocata', color: 'var(--danger)', bg: 'rgba(240,102,79,.10)' },
}

export default function StatusBadge({ status }) {
  const s = MAP[status] || MAP.revoked
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        padding: '3px 10px',
        borderRadius: 999,
        background: s.bg,
        color: s.color,
        fontSize: 12,
        fontWeight: 600,
        fontFamily: 'var(--font-mono)',
      }}
    >
      <span style={{ width: 7, height: 7, borderRadius: 999, background: s.color }} />
      {s.label}
    </span>
  )
}
