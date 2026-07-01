import { useState } from 'react'
import Modal from './Modal.jsx'
import Button from './Button.jsx'

/* ELEMENTO FIRMA.
   La chiave in chiaro compare qui e SOLO qui, subito dopo la creazione.
   Chiudendo la modale non è più recuperabile: è la stessa regola che seguono
   Stripe, AWS, GitHub. Il tono di avviso (ambra) rende evidente la posta in gioco. */
export default function RevealKeyModal({ apiKey, onClose }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(apiKey.secret)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard non disponibile: fallback silenzioso, l'utente può selezionare a mano.
    }
  }

  return (
    <Modal onClose={onClose} width={540}>
      <div className="eyebrow" style={{ color: 'var(--warning)', marginBottom: 10 }}>
        Copia adesso — non verrà mostrata di nuovo
      </div>
      <h3 style={{ fontSize: 20, marginBottom: 6 }}>Chiave creata</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 0 }}>
        “{apiKey.name}” è attiva. Conserva il valore in un posto sicuro: per motivi di
        sicurezza il server non lo tiene in chiaro e non potremo ri-mostrarlo.
      </p>

      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 14,
          background: 'var(--bg)',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-sm)',
          padding: '14px 16px',
          wordBreak: 'break-all',
          color: 'var(--accent)',
          margin: '18px 0',
        }}
      >
        {apiKey.secret}
      </div>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <Button variant="ghost" onClick={copy}>
          {copied ? 'Copiata ✓' : 'Copia chiave'}
        </Button>
        <Button variant="primary" onClick={onClose}>
          Ho salvato la chiave
        </Button>
      </div>
    </Modal>
  )
}
