"use client"

import { useSweets } from "@/contexts/sweets-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, DollarSign, AlertTriangle, Candy } from "lucide-react"

export function AdminStats() {
  const { sweets } = useSweets()

  const totalSweets = sweets.length
  const totalStock = sweets.reduce((sum, sweet) => sum + sweet.quantity, 0)
  const totalValue = sweets.reduce((sum, sweet) => sum + sweet.price * sweet.quantity, 0)
  const outOfStock = sweets.filter((sweet) => sweet.quantity === 0).length
  const lowStock = sweets.filter((sweet) => sweet.quantity > 0 && sweet.quantity < 10).length

  const stats = [
    {
      title: "Total Products",
      value: totalSweets,
      icon: Candy,
      description: "Different sweets",
    },
    {
      title: "Total Stock",
      value: totalStock,
      icon: Package,
      description: "Items in inventory",
    },
    {
      title: "Inventory Value",
      value: `$${totalValue.toFixed(2)}`,
      icon: DollarSign,
      description: "Total worth",
    },
    {
      title: "Stock Alerts",
      value: outOfStock + lowStock,
      icon: AlertTriangle,
      description: `${outOfStock} out, ${lowStock} low`,
      alert: outOfStock + lowStock > 0,
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.alert ? "text-destructive" : "text-muted-foreground"}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.alert ? "text-destructive" : ""}`}>{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
