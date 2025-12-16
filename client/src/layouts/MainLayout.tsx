import type { ReactNode } from "react"

import { AuthProvider } from "@/contexts/auth-context.tsx"
import { SweetsProvider } from "@/contexts/sweets-context"
import { CartProvider } from "@/contexts/cart-context"
import { Toaster } from "@/components/ui/toaster"
import { Header } from "@/components/header"

import "@/styles/globals.css"

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <AuthProvider>
      <SweetsProvider>
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster />
        </CartProvider>
      </SweetsProvider>
    </AuthProvider>
  )
}
