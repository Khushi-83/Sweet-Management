"use client"

import { useState } from "react"
import type { Sweet } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Package, Plus, Minus } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"

interface SweetCardProps {
  sweet: Sweet
}

export function SweetCard({ sweet }: SweetCardProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { toast } = useToast()
  const navigate = useNavigate()

  const isAvailable = sweet.quantity >= 1

  const handleAddToCart = () => {
    if (quantity > sweet.quantity) {
      toast({
        title: "Insufficient stock",
        description: `Only ${sweet.quantity} items available`
      })
      return
    }

    addToCart(sweet, quantity)
    toast({
      title: "Added to cart!",
      description: `${quantity}x ${sweet.name} added to your cart`,
    })
    navigate("/cart")
  }

  const incrementQuantity = () => {
    if (quantity < sweet.quantity) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border border-border/50 bg-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted/30">
        <img
          src="/sweets/candy.png"
          alt="Candy"
          width={300}
          height={300}
          className="object-cover"
        />
        
        {!isAvailable && (
          <div className="absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center">
            <Badge variant="secondary" className="text-sm px-4 py-1.5 font-semibold shadow-md">
              Out of Stock
            </Badge>
          </div>
        )}
        {isAvailable && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-primary/90 backdrop-blur-sm shadow-md px-2 py-0.5 text-xs">{sweet.category}</Badge>
          </div>
        )}
      </div>
      <CardContent className="p-3">
        <h3 className="font-bold text-base leading-tight text-balance mb-1 text-foreground group-hover:text-primary transition-colors">
          {sweet.name}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3 text-pretty leading-relaxed">
          {sweet.description}
        </p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-primary">${sweet.price.toFixed(2)}</span>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
            <Package className="h-3 w-3" />
            <span className="font-medium">{sweet.quantity} left</span>
          </div>
        </div>

        {isAvailable && (
          <div className="flex items-center gap-2 mb-2">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-full bg-transparent"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <div className="flex-1 text-center">
              <span className="text-sm font-semibold">{quantity}</span>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-full bg-transparent"
              onClick={incrementQuantity}
              disabled={quantity >= sweet.quantity}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-3 pt-0">
        <Button
          className="w-full gap-2 h-9 text-sm font-semibold shadow-sm hover:shadow-md transition-all"
          disabled={!isAvailable}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
