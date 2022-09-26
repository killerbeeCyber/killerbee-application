import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { createRoot } from 'react-dom/client'
import { CookiesProvider } from 'react-cookie'

import App from './components/app/app'

const root = createRoot(document.getElementById('root')!)
root.render(
  <CookiesProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CookiesProvider>
)
