import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {App} from './App'
import { AuthProvider } from './store/AuthContext'
import { AppProvider } from './store/AppContext'
createRoot(document.getElementById('root')).render(
	<AppProvider>
	<AuthProvider>
    <App />
  </AuthProvider>
  </AppProvider>
)
