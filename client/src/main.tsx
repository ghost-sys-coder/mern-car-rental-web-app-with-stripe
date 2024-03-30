import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.scss'
import AuthProvider from './context/AuthContext.tsx'
import RentalProvider from './context/RentalContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
        <AuthProvider>
        <RentalProvider>
          <App />
          </RentalProvider>
        </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
