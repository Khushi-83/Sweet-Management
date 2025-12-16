"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User, AuthContextType } from "@/lib/types"
// @ts-expect-error - Need to properly type the axios module
import api from "@/api/axios"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for saved session
    const token = localStorage.getItem("token")
    if (token) {
      fetchUser()
    } else {
      setIsLoading(false)
    }
  }, [])

  const fetchUser = async () => {
    try {
      const response = await api.get("/auth/me")
      setUser(response.data)
    } catch {
      // If fetching user fails, clear the token
      localStorage.removeItem("token")
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    
    try {
      const response = await api.post("/auth/login", { email, password })
      const { token } = response.data
      
      // Store token
      localStorage.setItem("token", token)
      
      // Fetch user data
      await fetchUser()
      return { success: true }
    } catch (error: unknown) {
      setIsLoading(false)
      if (error instanceof Error) {
        return { success: false, error: error.message || "Login failed" }
      }
      return { success: false, error: "Login failed" }
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    
    try {
      const response = await api.post("/auth/register", { name, email, password })
      const { token } = response.data
      
      localStorage.setItem("token", token)
      
      // Fetch user data
      await fetchUser()
      return { success: true }
    } catch (error: unknown) {
      setIsLoading(false)
      if (error instanceof Error) {
        return { success: false, error: error.message || "Registration failed" }
      }
      return { success: false, error: "Registration failed" }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("sweet_shop_user")
    localStorage.removeItem("token")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

// Separate export to avoid fast refresh warning
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}