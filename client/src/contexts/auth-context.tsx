"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User, AuthContextType } from "@/lib/types"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user database (in-memory)
const MOCK_USERS = [
  {
    id: "1",
    email: "admin@sweetshop.com",
    password: "admin123",
    name: "Admin User",
    role: "admin" as const,
    createdAt: new Date(),
  },
  {
    id: "2",
    email: "user@sweetshop.com",
    password: "user123",
    name: "John Doe",
    role: "user" as const,
    createdAt: new Date(),
  },
]

let userIdCounter = 3

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem("sweet_shop_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const foundUser = MOCK_USERS.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("sweet_shop_user", JSON.stringify(userWithoutPassword))
      setIsLoading(false)
      return { success: true }
    }

    setIsLoading(false)
    return { success: false, error: "Invalid email or password" }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Check if user already exists
    if (MOCK_USERS.find((u) => u.email === email)) {
      setIsLoading(false)
      return { success: false, error: "Email already registered" }
    }

    // Create new user
    const newUser = {
      id: String(userIdCounter++),
      email,
      password,
      name,
      role: "user" as const,
      createdAt: new Date(),
    }

    MOCK_USERS.push(newUser)

    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    localStorage.setItem("sweet_shop_user", JSON.stringify(userWithoutPassword))
    setIsLoading(false)
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("sweet_shop_user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
