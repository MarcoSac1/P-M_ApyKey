import { useState } from 'react'
import Modal from './Modal.jsx'
import Button from './Button.jsx'

const ALL_PERMISSIONS = [
  { id: 'read', label: 'Lettura' },
  { id: 'write', label: 'Scrittura' },
  { id: 'delete', label: 'Cancellazione' },
]

/* Form di creazione chiave: nome descrittivo + permessi. */
export default function CreateKeyForm({ onCreate, onCancel, submitting = false }) {
  const [name, setName] = useState('')
  const [permissions, setPermissions] = useState(['read'])
  const [error, setError] = useState('')

  function togglePerm(id) {
    setPermissions((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  }

  function submit() {
    if (!name.trim()) {
      setError('Dai un nome alla chiave: ti aiuta a riconoscerla nella lista.')
      return
    }
    if (permissions.length === 0) {
      setError('Seleziona almeno un permesso.')
      return
    }
    setError('')
    onCreate({ name: name.trim(), permissions })
  }

  const inputStyle = {
    width: '100%',
    height: 42,
    padding: '0 14px',
    background: 'var(--bg)',
    border: '1px solid var(--border-strong)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text)',
    fontFamily: 'var(--font-sans)',
    fontSize: 14,
  }

  return (
    <Modal onClose={onCancel} width={480}>
      <h3 style={{ fontSize: 20, marginBottom: 4 }}>Nuova chiave</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 0, marginBottom: 20 }}>
        La chiave in chiaro sarà mostrata una sola volta dopo la creazione.
      </p>

      <label style={{ display: 'block', fontSize: 13, marginBottom: 7, color: 'var(--text-muted)' }}>
        Nome
      </label>
      <input
        style={inputStyle}
        placeholder="es. Servizio Fatturazione"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
      />

      <div style={{ marginTop: 20, marginBottom: 8, fontSize: 13, color: 'var(--text-muted)' }}>
        Permessi
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {ALL_PERMISSIONS.map((p) => {
          const on = permissions.includes(p.id)
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => togglePerm(p.id)}
              style={{
                padding: '7px 14px',
                borderRadius: 999,
                fontSize: 13,
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                background: on ? 'rgba(61,214,196,.10)' : 'transparent',
                border: `1px solid ${on ? 'var(--accent)' : 'var(--border-strong)'}`,
                color: on ? 'var(--accent)' : 'var(--text-muted)',
              }}
            >
              {p.label}
            </button>
          )
        })}
      </div>

      {error && (
        <p style={{ color: 'var(--danger)', fontSize: 13, marginTop: 16, marginBottom: 0 }}>
          {error}
        </p>
      )}

      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 26 }}>
        <Button variant="ghost" onClick={onCancel} disabled={submitting}>
          Annulla
        </Button>
        <Button variant="primary" onClick={submit} loading={submitting}>
          Crea chiave
        </Button>
      </div>
    </Modal>
  )
}
