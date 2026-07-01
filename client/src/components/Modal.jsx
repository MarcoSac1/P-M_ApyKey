import { useEffect } from 'react'

/* Contenitore modale generico: overlay + pannello centrato, chiudibile con Esc. */
export default function Modal({ children, onClose, width = 480 }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(6,9,13,.72)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        zIndex: 900,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: width,
          background: 'var(--surface)',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow)',
          padding: 24,
        }}
      >
        {children}
      </div>
    </div>
  )
}
