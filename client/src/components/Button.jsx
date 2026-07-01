/* Bottone riutilizzabile. Varianti: primary | ghost | danger. */
export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
  loading = false,
  full = false,
  ...rest
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 40,
    padding: '0 16px',
    width: full ? '100%' : 'auto',
    borderRadius: 'var(--radius-sm)',
    fontFamily: 'var(--font-sans)',
    fontSize: 14,
    fontWeight: 600,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'transform .06s ease, background .15s ease, border-color .15s ease',
    border: '1px solid transparent',
  }
  const variants = {
    primary: { background: 'var(--accent)', color: 'var(--accent-ink)' },
    ghost: { background: 'transparent', color: 'var(--text)', borderColor: 'var(--border-strong)' },
    danger: { background: 'transparent', color: 'var(--danger)', borderColor: 'rgba(240,102,79,.4)' },
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      style={{ ...base, ...variants[variant] }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'translateY(1px)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      {...rest}
    >
      {loading ? 'Attendi…' : children}
    </button>
  )
}
