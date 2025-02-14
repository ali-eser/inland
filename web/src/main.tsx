import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router'
import { ThemeProvider } from "@/components/theme-provider"

import './index.css'
import App from './App.tsx'
import userSlice from './reducers/userReducer.ts'

const store = configureStore({
  reducer: {
    user: userSlice
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
