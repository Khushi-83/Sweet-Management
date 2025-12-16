"use client"

import { useAuth } from "@/hooks/use-auth"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Candy, User, LogOut, Shield, ShoppingCart } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function Header() {
  const { user, logout } = useAuth()
  const { getTotalItems } = useCart()
  const navigate = useNavigate()
  const cartItemCount = getTotalItems()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="bg-gradient-to-br from-primary to-primary/70 p-2 rounded-xl shadow-lg">
            <Candy className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-br from-primary to-primary/70 bg-clip-text text-transparent">
            Sweet Shop
          </h1>
        </button>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="relative h-10 w-10 rounded-full bg-transparent"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge
                className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 text-xs font-bold"
                variant="default"
              >
                {cartItemCount}
              </Badge>
            )}
          </Button>

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <User className="h-4 w-4" />
                  {user.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <DropdownMenuItem disabled className="gap-2">
                    <Shield className="h-4 w-4" />
                    <span className="text-xs">Admin Access</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="gap-2 text-destructive">
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}
