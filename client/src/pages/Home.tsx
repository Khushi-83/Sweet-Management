"use client"

import { useAuth } from "@/hooks/use-auth"
import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { UserDashboard } from "@/components/dashboard/user-dashboard"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  const { user, isLoading } = useAuth()
  const [showLogin, setShowLogin] = useState(true)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/30">
        <div className="container flex items-center justify-center min-h-screen py-8">
          {showLogin ? (
            <LoginForm onToggleForm={() => setShowLogin(false)} />
          ) : (
            <RegisterForm onToggleForm={() => setShowLogin(true)} />
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      <main className="min-h-screen">{user.role === "admin" ? <AdminDashboard /> : <UserDashboard />}</main>
      <Toaster />
    </>
  )
}
