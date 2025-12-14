"use client"

import { useSweets } from "@/contexts/sweets-context"
import { AdminSweetCard } from "@/components/admin/admin-sweet-card"
import { AddSweetDialog } from "@/components/admin/add-sweet-dialog"
import { AdminStats } from "@/components/admin/admin-stats"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"
import { useState, useMemo } from "react"

export function AdminDashboard() {
  const { sweets, isLoading } = useSweets()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [stockFilter, setStockFilter] = useState<string>("all")

  const categories = useMemo(() => {
    const cats = new Set(sweets.map((sweet) => sweet.category))
    return Array.from(cats).sort()
  }, [sweets])

  const filteredSweets = useMemo(() => {
    return sweets.filter((sweet) => {
      const matchesSearch =
        sweet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sweet.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = categoryFilter === "all" || sweet.category === categoryFilter
      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "out" && sweet.quantity === 0) ||
        (stockFilter === "low" && sweet.quantity > 0 && sweet.quantity < 10) ||
        (stockFilter === "in" && sweet.quantity >= 10)

      return matchesSearch && matchesCategory && matchesStock
    })
  }, [sweets, searchQuery, categoryFilter, stockFilter])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading inventory...</p>
      </div>
    )
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground text-lg">Manage your sweet shop inventory</p>
        </div>
        <AddSweetDialog />
      </div>

      <AdminStats />

      <div className="bg-card rounded-lg border p-4 space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="admin-search" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search
            </Label>
            <Input
              id="admin-search"
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin-category" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Category
            </Label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger id="admin-category">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock-filter">Stock Status</Label>
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger id="stock-filter">
                <SelectValue placeholder="All stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stock</SelectItem>
                <SelectItem value="in">In Stock (10+)</SelectItem>
                <SelectItem value="low">Low Stock (1-9)</SelectItem>
                <SelectItem value="out">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          Showing {filteredSweets.length} of {sweets.length} products
        </div>
      </div>

      {filteredSweets.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground text-lg">No products found matching your criteria</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredSweets.map((sweet) => (
            <AdminSweetCard key={sweet.id} sweet={sweet} />
          ))}
        </div>
      )}
    </div>
  )
}
