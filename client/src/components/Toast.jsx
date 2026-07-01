import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

/* Notifiche temporanee. La voce dell'interfaccia: dice cosa è successo,
   senza scusarsi e senza girarci intorno. */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const push = useCallback((message, tone = 'info') => {
    const id = Math.random().toString(36).slice(2)
    setToasts((t) => [...t, { id, message, tone }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000)
  }, [])

  const tones = {
    info: 'var(--border-strong)',
    success: 'var(--accent)',
    error: 'var(--danger)',
  }

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          zIndex: 1000,
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderLeft: `3px solid ${tones[t.tone]}`,
              color: 'var(--text)',
              padding: '12px 16px',
              borderRadius: 'var(--radius-sm)',
              boxShadow: 'var(--shadow)',
              maxWidth: 360,
              fontSize: 14,
            }}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast va usato dentro <ToastProvider>')
  return ctx
}
