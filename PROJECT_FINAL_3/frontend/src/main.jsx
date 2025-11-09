import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'
import reportWebVitals from './reportWebVitals'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)

// Monitor performance metrics
reportWebVitals(metrics => {
  // Log performance metrics
  if (process.env.NODE_ENV === 'development') {
    console.log(metrics);
  }
  // You can also send metrics to your analytics service here
});
