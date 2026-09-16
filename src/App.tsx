import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { ThemeProvider } from './context/ThemeContext'
import AppRoutes from './routes/AppRoutes'
import ScrollProgress from './components/common/ScrollProgress'
import BackToTop from './components/common/BackToTop'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <ScrollProgress />
            <AppRoutes />
            <BackToTop />
            <Toaster position="top-right" richColors />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App