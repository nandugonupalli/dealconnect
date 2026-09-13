import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { CartItem, Product } from '../types'

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
  deliveryCharge: number
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('dealconnect_cart')
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch {
        localStorage.removeItem('dealconnect_cart')
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('dealconnect_cart', JSON.stringify(items))
  }, [items])

  const addItem = (product: Product, quantity: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id)
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id ? { ...i, quantity: i.quantity + quantity } : i
        )
      }
      return [...prev, { productId: product.id, product, quantity, price: product.price }]
    })
  }

  const removeItem = (productId: string) => {
    setItems((p) => p.filter((i) => i.productId !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    setItems((p) => p.map((i) => (i.productId === productId ? { ...i, quantity } : i)))
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((s, i) => s + i.quantity, 0)
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const deliveryCharge = subtotal > 5000 || subtotal === 0 ? 0 : 200
  const total = subtotal + deliveryCharge

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        deliveryCharge,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}