"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Sweet } from "@/lib/types"

interface SweetsContextType {
  sweets: Sweet[]
  addSweet: (sweet: Omit<Sweet, "id" | "createdAt">) => void
  updateSweet: (id: string, sweet: Partial<Sweet>) => void
  deleteSweet: (id: string) => void
  purchaseSweet: (id: string, quantity: number) => boolean
  isLoading: boolean
}

const SweetsContext = createContext<SweetsContextType | undefined>(undefined)

// Initial mock sweets data
const INITIAL_SWEETS: Sweet[] = [
  {
    id: "1",
    name: "Chocolate Truffles",
    description: "Rich, velvety dark chocolate truffles dusted with cocoa powder",
    price: 12.99,
    quantity: 50,
    category: "Chocolate",
    image: "/chocolate-truffles.png",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Strawberry Bonbons",
    description: "Sweet strawberry-flavored hard candies with a tangy center",
    price: 5.99,
    quantity: 100,
    category: "Hard Candy",
    image: "/strawberry-bonbons.jpg",
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "Gummy Bears",
    description: "Assorted fruit-flavored gummy bears in vibrant colors",
    price: 7.49,
    quantity: 0,
    category: "Gummies",
    image: "/colorful-gummy-bears.jpg",
    createdAt: new Date(),
  },
  {
    id: "4",
    name: "Mint Humbugs",
    description: "Traditional striped mint candies with a refreshing peppermint flavor",
    price: 4.99,
    quantity: 75,
    category: "Hard Candy",
    image: "/mint-striped-candy.jpg",
    createdAt: new Date(),
  },
  {
    id: "5",
    name: "Caramel Fudge",
    description: "Smooth, buttery caramel fudge squares",
    price: 9.99,
    quantity: 30,
    category: "Fudge",
    image: "/caramel-fudge.jpg",
    createdAt: new Date(),
  },
  {
    id: "6",
    name: "Lemon Drops",
    description: "Tangy lemon-flavored hard candies with a sour kick",
    price: 6.49,
    quantity: 60,
    category: "Hard Candy",
    image: "/lemon-drop-candies.jpg",
    createdAt: new Date(),
  },
  {
    id: "7",
    name: "Licorice Allsorts",
    description: "Colorful assortment of licorice candies in various shapes",
    price: 8.99,
    quantity: 45,
    category: "Licorice",
    image: "/licorice-allsorts.jpg",
    createdAt: new Date(),
  },
  {
    id: "8",
    name: "Peanut Butter Cups",
    description: "Creamy peanut butter enrobed in milk chocolate",
    price: 10.99,
    quantity: 0,
    category: "Chocolate",
    image: "/peanut-butter-cups.jpg",
    createdAt: new Date(),
  },
  {
    id: "9",
    name: "Rock Candy",
    description: "Crystallized sugar on a stick in assorted colors and flavors",
    price: 3.99,
    quantity: 80,
    category: "Hard Candy",
    image: "/colorful-rock-candy.jpg",
    createdAt: new Date(),
  },
  {
    id: "10",
    name: "Turkish Delight",
    description: "Rose-flavored gel candy dusted with powdered sugar",
    price: 11.49,
    quantity: 25,
    category: "Specialty",
    image: "/turkish-delight.jpg",
    createdAt: new Date(),
  },
  {
    id: "11",
    name: "Sour Worms",
    description: "Tangy and chewy gummy worms coated in sour sugar",
    price: 6.99,
    quantity: 90,
    category: "Gummies",
    image: "/sour-gummy-worms.jpg",
    createdAt: new Date(),
  },
  {
    id: "12",
    name: "Toffee Chews",
    description: "Chewy English toffee with a buttery caramel flavor",
    price: 7.99,
    quantity: 55,
    category: "Toffee",
    image: "/toffee-chews.jpg",
    createdAt: new Date(),
  },
]

let sweetIdCounter = 13

export function SweetsProvider({ children }: { children: React.ReactNode }) {
  const [sweets, setSweets] = useState<Sweet[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load sweets from localStorage or use initial data
    const savedSweets = localStorage.getItem("sweet_shop_inventory")
    if (savedSweets) {
      setSweets(JSON.parse(savedSweets))
    } else {
      setSweets(INITIAL_SWEETS)
      localStorage.setItem("sweet_shop_inventory", JSON.stringify(INITIAL_SWEETS))
    }
    setIsLoading(false)
  }, [])

  const saveToStorage = (updatedSweets: Sweet[]) => {
    localStorage.setItem("sweet_shop_inventory", JSON.stringify(updatedSweets))
  }

  const addSweet = (sweetData: Omit<Sweet, "id" | "createdAt">) => {
    const newSweet: Sweet = {
      ...sweetData,
      id: String(sweetIdCounter++),
      createdAt: new Date(),
    }
    const updatedSweets = [...sweets, newSweet]
    setSweets(updatedSweets)
    saveToStorage(updatedSweets)
  }

  const updateSweet = (id: string, sweetData: Partial<Sweet>) => {
    const updatedSweets = sweets.map((sweet) => (sweet.id === id ? { ...sweet, ...sweetData } : sweet))
    setSweets(updatedSweets)
    saveToStorage(updatedSweets)
  }

  const deleteSweet = (id: string) => {
    const updatedSweets = sweets.filter((sweet) => sweet.id !== id)
    setSweets(updatedSweets)
    saveToStorage(updatedSweets)
  }

  const purchaseSweet = (id: string, quantity: number): boolean => {
    const sweet = sweets.find((s) => s.id === id)
    if (!sweet || sweet.quantity < quantity) {
      return false
    }

    const updatedSweets = sweets.map((s) => (s.id === id ? { ...s, quantity: s.quantity - quantity } : s))
    setSweets(updatedSweets)
    saveToStorage(updatedSweets)
    return true
  }

  return (
    <SweetsContext.Provider value={{ sweets, addSweet, updateSweet, deleteSweet, purchaseSweet, isLoading }}>
      {children}
    </SweetsContext.Provider>
  )
}

export function useSweets() {
  const context = useContext(SweetsContext)
  if (context === undefined) {
    throw new Error("useSweets must be used within a SweetsProvider")
  }
  return context
}
