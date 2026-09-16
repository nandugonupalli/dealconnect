import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { ThemeProvider } from './context/ThemeContext'
import { OrderProvider } from './context/OrderContext'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <OrderProvider>
            <CartProvider>
              <AppRoutes />
              <Toaster position="top-right" richColors />
            </CartProvider>
          </OrderProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App