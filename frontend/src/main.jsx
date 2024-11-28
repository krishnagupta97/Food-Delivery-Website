import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import StoreContextProvider from './context/StoreContext.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <Router>
    <StoreContextProvider>
        <App />
        <ToastContainer />
    </StoreContextProvider>
  </Router>
)
