export interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
  createdAt: Date
}

export interface Sweet {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  category: string
  image: string
  createdAt: Date
}

export interface CartItem {
  sweet: Sweet
  quantity: number
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}
