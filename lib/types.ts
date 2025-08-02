export interface Product {
  id: number
  name: string
  category: string
  price: number
  specs: string // Stored as JSON string in DB
  description: string
  image: string | null
  visible: boolean
  created_at: Date
  updated_at: Date
}

export interface User {
  id: number
  username: string
  email: string
  password_hash: string
  role: "admin" | "user"
  created_at: Date
  updated_at: Date
}

export interface ContactSubmission {
  id: number
  name: string
  email: string
  phone?: string | null
  message: string
  status: "new" | "contacted" | "resolved"
  created_at: Date
}

export interface ProductFormData {
  name: string
  category: string
  price: string
  specs: string
  description: string
  image?: string
  visible: boolean
}
