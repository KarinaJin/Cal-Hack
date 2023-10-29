import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ProblemProvider } from './contexts/ProblemContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProblemProvider>
      <App />
    </ProblemProvider>
  </React.StrictMode>,
)
