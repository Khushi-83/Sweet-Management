"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { CartItem, Sweet } from "@/lib/types"

interface CartContextType {
  cart: CartItem[]
  addToCart: (sweet: Sweet, quantity: number) => void
  removeFromCart: (sweetId: string) => void
  updateQuantity: (sweetId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem("sweet_shop_cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  const saveToStorage = (updatedCart: CartItem[]) => {
    localStorage.setItem("sweet_shop_cart", JSON.stringify(updatedCart))
  }

  const addToCart = (sweet: Sweet, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.sweet.id === sweet.id)
      let updatedCart: CartItem[]

      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item.sweet.id === sweet.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      } else {
        updatedCart = [...prevCart, { sweet, quantity }]
      }

      saveToStorage(updatedCart)
      return updatedCart
    })
  }

  const removeFromCart = (sweetId: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.sweet.id !== sweetId)
      saveToStorage(updatedCart)
      return updatedCart
    })
  }

  const updateQuantity = (sweetId: string, quantity: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.sweet.id === sweetId ? { ...item, quantity: Math.max(1, quantity) } : item,
      )
      saveToStorage(updatedCart)
      return updatedCart
    })
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem("sweet_shop_cart")
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.sweet.price * item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
