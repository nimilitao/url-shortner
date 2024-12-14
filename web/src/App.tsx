import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RedirectPage from './pages/[code]'
import Home from './pages/home'
import NotFoundPage from './pages/404'
import { ThemeProvider } from './components/themeprovider'

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:code" element={<RedirectPage />} />
          <Route path="*" element={<Navigate to="/notfound" replace />} />
          <Route path="/notfound" element={<NotFoundPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
