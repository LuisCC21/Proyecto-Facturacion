import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { AppRouter } from './router/AppRouter.jsx'
import { store } from './store/store.js'
import './styles/normalize.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename='/Proyecto-Facturacion/'>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
