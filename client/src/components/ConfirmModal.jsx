import Modal from './Modal.jsx'
import Button from './Button.jsx'

/* Conferma per azioni distruttive (es. revoca). */
export default function ConfirmModal({
  title,
  message,
  confirmLabel = 'Conferma',
  onConfirm,
  onCancel,
  loading = false,
}) {
  return (
    <Modal onClose={onCancel} width={420}>
      <h3 style={{ fontSize: 18, marginBottom: 8 }}>{title}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 0, marginBottom: 22 }}>
        {message}
      </p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <Button variant="ghost" onClick={onCancel} disabled={loading}>
          Annulla
        </Button>
        <Button variant="danger" onClick={onConfirm} loading={loading}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}
