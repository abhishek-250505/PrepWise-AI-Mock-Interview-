import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import ToastProvider from './components/ToastProvider.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
    </ToastProvider>
  </StrictMode>,
)
