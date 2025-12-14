"use client"

import { SweetsGrid } from "@/components/sweets/sweets-grid"
import { useAuth } from "@/contexts/auth-context"

export function UserDashboard() {
  const { user } = useAuth()

  return (
    <div className="container max-w-7xl mx-auto px-6 py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-balance">Welcome to Sweet Shop, {user?.name}!</h1>
        <p className="text-muted-foreground text-lg text-pretty">
          Browse our delicious selection of sweets, candies, and treats
        </p>
      </div>

      <SweetsGrid />
    </div>
  )
}
