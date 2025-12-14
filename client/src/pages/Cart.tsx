"use client"

import { useCart } from "@/contexts/cart-context"
import { useSweets } from "@/contexts/sweets-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, Package } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { SuccessDialog } from "@/components/success-dialog"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart()
  const { purchaseSweet } = useSweets()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const handleCheckout = () => {
    if (cart.length === 0) return

    setIsProcessing(true)

    // Simulate processing delay
    setTimeout(() => {
      let allSuccess = true

      // Process each item in cart
      for (const item of cart) {
        const success = purchaseSweet(item.sweet.id, item.quantity)
        if (!success) {
          allSuccess = false
          toast({
            title: "Purchase failed",
            description: `Insufficient stock for ${item.sweet.name}`,
          })
          break
        }
      }

      if (allSuccess) {
        clearCart()
        setShowSuccessDialog(true)
      }

      setIsProcessing(false)
    }, 1500)
  }

  const incrementQuantity = (sweetId: string, currentQuantity: number, maxQuantity: number) => {
    if (currentQuantity < maxQuantity) {
      updateQuantity(sweetId, currentQuantity + 1)
    }
  }

  const decrementQuantity = (sweetId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(sweetId, currentQuantity - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <SuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        title="Purchase Completed!"
        description={`Successfully purchased ${cart.length} item(s). Thank you for your order!`}
        onContinue={() => navigate("/")}
      />

      <div className="container py-8 max-w-6xl">
        <Button variant="ghost" className="mb-6 gap-2" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-balance">Shopping Cart</h1>
              {cart.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearCart} className="text-destructive">
                  Clear Cart
                </Button>
              )}
            </div>

            {cart.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-6 text-center text-pretty">
                    Add some delicious sweets to get started!
                  </p>
                  <Button onClick={() => navigate("/")} className="gap-2">
                    <Package className="h-4 w-4" />
                    Browse Sweets
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <Card
                    key={item.sweet.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow border-0 bg-card"
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="relative h-24 w-24 rounded-lg overflow-hidden shrink-0 bg-muted">
                          <img
                            src="/sweets/candy.png"
                            alt="Candy"
                            width={300}
                            height={300}
                            className="object-cover"
                          />
                  
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h3 className="font-semibold text-lg leading-tight text-balance">{item.sweet.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.sweet.category}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive shrink-0"
                              onClick={() => removeFromCart(item.sweet.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full bg-transparent"
                                onClick={() => decrementQuantity(item.sweet.id, item.quantity)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <Input
                                type="number"
                                min="1"
                                max={item.sweet.quantity}
                                value={item.quantity}
                                onChange={(e) => {
                                  const val = Number.parseInt(e.target.value) || 1
                                  updateQuantity(item.sweet.id, Math.min(val, item.sweet.quantity))
                                }}
                                className="w-16 h-8 text-center"
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full bg-transparent"
                                onClick={() => incrementQuantity(item.sweet.id, item.quantity, item.sweet.quantity)}
                                disabled={item.quantity >= item.sweet.quantity}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold bg-gradient-to-br from-primary to-primary/70 bg-clip-text text-transparent">
                                ${(item.sweet.price * item.quantity).toFixed(2)}
                              </p>
                              <p className="text-xs text-muted-foreground">${item.sweet.price.toFixed(2)} each</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-0 bg-gradient-to-br from-card to-muted/20 shadow-xl">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-medium">${(getTotalPrice() * 0.1).toFixed(2)}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-2xl bg-gradient-to-br from-primary to-primary/70 bg-clip-text text-transparent">
                      ${(getTotalPrice() * 1.1).toFixed(2)}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                    onClick={handleCheckout}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Complete Purchase"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
