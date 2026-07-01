import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'
import Layout from './components/Layout.jsx'
import Login from './views/Login.jsx'
import Dashboard from './views/Dashboard.jsx'
import Keys from './views/Keys.jsx'

/* Rotta protetta: senza autenticazione si torna al login. */
function Protected({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Layout>{children}</Layout> : <Navigate to="/login" replace />
}

export default function App() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/" element={<Protected><Dashboard /></Protected>} />
      <Route path="/keys" element={<Protected><Keys /></Protected>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
