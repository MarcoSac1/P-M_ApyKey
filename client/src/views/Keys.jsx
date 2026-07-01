import { useEffect, useState } from 'react'
import { keyService } from '../services/keyService.js'
import KeyTable from '../components/KeyTable.jsx'
import CreateKeyForm from '../components/CreateKeyForm.jsx'
import RevealKeyModal from '../components/RevealKeyModal.jsx'
import ConfirmModal from '../components/ConfirmModal.jsx'
import Button from '../components/Button.jsx'
import { useToast } from '../components/Toast.jsx'

/* Gestione completa: lista, creazione (con reveal-once) e revoca. */
export default function Keys() {
  const [keys, setKeys] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [creating, setCreating] = useState(false)
  const [revealed, setRevealed] = useState(null)   // chiave appena creata (con secret)
  const [toRevoke, setToRevoke] = useState(null)    // chiave in attesa di conferma revoca
  const [revoking, setRevoking] = useState(false)
  const { push } = useToast()

  function load() {
    setLoading(true)
    keyService
      .list()
      .then(setKeys)
      .catch((e) => push(e.message, 'error'))
      .finally(() => setLoading(false))
  }

  useEffect(load, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleCreate(payload) {
    setCreating(true)
    try {
      const created = await keyService.create(payload)
      setShowCreate(false)
      setRevealed(created)      // apre la modale reveal-once
      push(`Chiave “${created.name}” creata`, 'success')
      load()
    } catch (e) {
      push(e.message, 'error')
    } finally {
      setCreating(false)
    }
  }

  async function handleRevoke() {
    setRevoking(true)
    try {
      await keyService.revoke(toRevoke.id)
      push(`Chiave “${toRevoke.name}” revocata`, 'success')
      setToRevoke(null)
      load()
    } catch (e) {
      push(e.message, 'error')
    } finally {
      setRevoking(false)
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Gestione</div>
          <h1 style={{ fontSize: 26 }}>Chiavi API</h1>
        </div>
        <Button onClick={() => setShowCreate(true)}>+ Nuova chiave</Button>
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
        <KeyTable keys={keys} loading={loading} onRevoke={setToRevoke} />
      </div>

      {showCreate && (
        <CreateKeyForm onCreate={handleCreate} onCancel={() => setShowCreate(false)} submitting={creating} />
      )}

      {revealed && <RevealKeyModal apiKey={revealed} onClose={() => setRevealed(null)} />}

      {toRevoke && (
        <ConfirmModal
          title="Revocare questa chiave?"
          message={`“${toRevoke.name}” smetterà di funzionare subito e in modo permanente. I servizi che la usano riceveranno errori 401.`}
          confirmLabel="Revoca chiave"
          onConfirm={handleRevoke}
          onCancel={() => setToRevoke(null)}
          loading={revoking}
        />
      )}
    </div>
  )
}
