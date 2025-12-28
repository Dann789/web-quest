import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from '@/contexts/AuthContext'
import AppRouter from '@/routes'
import './index.css'

/**
 * Application Entry Point
 * 
 * Struktur Provider:
 * - StrictMode: Development checks
 * - AuthProvider: Authentication context
 * - AppRouter: Route handling
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </StrictMode>,
)
