"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Monitor, Plus, Edit, Trash2, ArrowLeft, Settings, Eye, EyeOff, X, Loader2 } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Product } from "@/lib/types"

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [productForm, setProductForm] = useState({
    name: "",
    category: "",
    price: "",
    specs: "",
    description: "",
    image: "",
    visible: true,
  })
  const [imagePreview, setImagePreview] = useState<string>("")
  const [editImagePreview, setEditImagePreview] = useState<string>("")

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts()
    }
  }, [isAuthenticated])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/products?all=true")
      if (response.ok) {
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products?all=true")
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      })

      if (response.ok) {
        setIsAuthenticated(true)
        fetchProducts()
      } else {
        const error = await response.json()
        alert(error.error || "Login failed")
      }
    } catch (error) {
      console.error("Login error:", error)
      alert("Login failed")
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setIsAuthenticated(false)
      setProducts([])
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productForm),
      })

      if (response.ok) {
        const newProduct = await response.json()
        setProducts([newProduct, ...products])
        setProductForm({ name: "", category: "", price: "", specs: "", description: "", image: "", visible: true })
        setImagePreview("")
        setIsAddingProduct(false)
      } else {
        const error = await response.json()
        alert(error.error || "Failed to add product")
      }
    } catch (error) {
      console.error("Error adding product:", error)
      alert("Failed to add product")
    }
  }

  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProduct),
      })

      if (response.ok) {
        const updatedProduct = await response.json()
        setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)))
        setEditingProduct(null)
        setEditImagePreview("")
      } else {
        const error = await response.json()
        alert(error.error || "Failed to update product")
      }
    } catch (error) {
      console.error("Error updating product:", error)
      alert("Failed to update product")
    }
  }

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setProducts(products.filter((p) => p.id !== id))
      } else {
        const error = await response.json()
        alert(error.error || "Failed to delete product")
      }
    } catch (error) {
      console.error("Error deleting product:", error)
      alert("Failed to delete product")
    }
  }

  const toggleProductVisibility = async (id: number) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle-visibility" }),
      })

      if (response.ok) {
        const updatedProduct = await response.json()
        setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)))
      } else {
        const error = await response.json()
        alert(error.error || "Failed to toggle visibility")
      }
    } catch (error) {
      console.error("Error toggling visibility:", error)
      alert("Failed to toggle visibility")
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        if (isEdit) {
          setEditImagePreview(result)
          setEditingProduct({ ...editingProduct, image: result })
        } else {
          setImagePreview(result)
          setProductForm({ ...productForm, image: result })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 flex items-center justify-center">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <Card className="w-full max-w-md bg-white/70 backdrop-blur-xl border-gray-200/50 rounded-2xl shadow-2xl dark:bg-gray-800/70 dark:border-gray-700/50">
          <CardHeader className="text-center pb-6">
            <div className="p-4 bg-blue-500 rounded-2xl w-fit mx-auto mb-4 shadow-lg">
              <Monitor className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-gray-900 text-2xl dark:text-white">Admin Login</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Enter your credentials to access the management panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="username" className="text-gray-700 font-medium dark:text-gray-300">
                  Username or Email
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="bg-white/50 border-gray-300 text-gray-900 rounded-xl mt-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                  placeholder="Enter username or email"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-700 font-medium dark:text-gray-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="bg-white/50 border-gray-300 text-gray-900 rounded-xl mt-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                  placeholder="Enter password"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-3 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Login
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-4 text-center bg-gray-100 rounded-xl p-3 dark:text-gray-400 dark:bg-gray-800/50">
              Demo credentials: admin / admin123
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-white/70 backdrop-blur-xl border-b border-gray-200/50 shadow-sm dark:bg-gray-900/70 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <div className="p-2 bg-blue-500 rounded-xl shadow-lg">
                <Monitor className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900 dark:text-white">TechForge PC</span>
            </Link>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <Settings className="h-5 w-5" />
                <span className="font-medium">Management</span>
              </div>
              <ThemeToggle />
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-red-300 text-red-600 hover:bg-red-50 rounded-xl dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20 bg-transparent"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Admin Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Product Management</h1>
          <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-6 shadow-lg hover:shadow-xl transition-all duration-200">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white/90 backdrop-blur-xl border-gray-200/50 text-gray-900 rounded-2xl dark:bg-gray-800/90 dark:border-gray-700/50 dark:text-white max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-gray-900 dark:text-white">Add New Product</DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-300">
                  Create a new PC build product for the catalog.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-700 font-medium dark:text-gray-300">
                    Product Name
                  </Label>
                  <Input
                    id="name"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="bg-white/50 border-gray-300 text-gray-900 rounded-xl mt-1 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category" className="text-gray-700 font-medium dark:text-gray-300">
                    Category
                  </Label>
                  <Select
                    value={productForm.category}
                    onValueChange={(value) => setProductForm({ ...productForm, category: value })}
                  >
                    <SelectTrigger className="bg-white/50 border-gray-300 text-gray-900 rounded-xl mt-1 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 rounded-xl dark:bg-gray-800 dark:border-gray-700">
                      <SelectItem value="Gaming">Gaming</SelectItem>
                      <SelectItem value="Workstation">Workstation</SelectItem>
                      <SelectItem value="Budget">Budget</SelectItem>
                      <SelectItem value="Content Creation">Content Creation</SelectItem>
                      <SelectItem value="Office">Office</SelectItem>
                      <SelectItem value="High-End">High-End</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="price" className="text-gray-700 font-medium dark:text-gray-300">
                    Price ($)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="bg-white/50 border-gray-300 text-gray-900 rounded-xl mt-1 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="specs" className="text-gray-700 font-medium dark:text-gray-300">
                    Specifications (comma-separated)
                  </Label>
                  <Input
                    id="specs"
                    value={productForm.specs}
                    onChange={(e) => setProductForm({ ...productForm, specs: e.target.value })}
                    className="bg-white/50 border-gray-300 text-gray-900 rounded-xl mt-1 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                    placeholder="RTX 4080, Intel i7-13700K, 32GB DDR5"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-gray-700 font-medium dark:text-gray-300">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="bg-white/50 border-gray-300 text-gray-900 rounded-xl mt-1 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="image" className="text-gray-700 font-medium dark:text-gray-300">
                    Product Image
                  </Label>
                  <div className="mt-1 space-y-3">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e)}
                      className="bg-white/50 border-gray-300 text-gray-900 rounded-xl dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                    />
                    {imagePreview && (
                      <div className="relative w-full h-32 bg-gray-100 rounded-xl overflow-hidden dark:bg-gray-800">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setImagePreview("")
                            setProductForm({ ...productForm, image: "" })
                          }}
                          className="absolute top-2 right-2 h-6 w-6 p-0 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="visible"
                    checked={productForm.visible}
                    onChange={(e) => setProductForm({ ...productForm, visible: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <Label htmlFor="visible" className="text-gray-700 font-medium dark:text-gray-300">
                    Make product visible to customers
                  </Label>
                </div>
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-3">
                  Add Product
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Products Table */}
        <div className="grid gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="bg-white/70 backdrop-blur-xl border-gray-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-gray-800/70 dark:border-gray-700/50"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    {product.image && (
                      <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 dark:bg-gray-800">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <CardTitle className="text-gray-900 flex items-center gap-3 text-xl dark:text-white">
                        {product.name}
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200 rounded-full px-3 py-1 font-medium dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                          {product.category}
                        </Badge>
                        <Badge
                          className={`rounded-full px-3 py-1 font-medium ${
                            product.visible
                              ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"
                              : "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800"
                          }`}
                        >
                          {product.visible ? "Visible" : "Hidden"}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-gray-600 mt-2 dark:text-gray-300">
                        {product.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleProductVisibility(product.id)}
                      className={`rounded-xl ${
                        product.visible
                          ? "border-orange-300 text-orange-600 hover:bg-orange-50 dark:border-orange-700 dark:text-orange-400 dark:hover:bg-orange-900/20"
                          : "border-green-300 text-green-600 hover:bg-green-50 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-900/20"
                      }`}
                    >
                      {product.visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingProduct({ ...product, specs: product.specs.join(", ") })}
                          className="border-blue-300 text-blue-600 hover:bg-blue-50 rounded-xl dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/20"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white/90 backdrop-blur-xl border-gray-200/50 text-gray-900 rounded-2xl dark:bg-gray-800/90 dark:border-gray-700/50 dark:text-white max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-gray-900 dark:text-white">Edit Product</DialogTitle>
                          <DialogDescription className="text-gray-600 dark:text-gray-300">
                            Update the product information.
                          </DialogDescription>
                        </DialogHeader>
                        {editingProduct && (
                          <form onSubmit={handleEditProduct} className="space-y-4">
                            <div>
                              <Label htmlFor="edit-name" className="text-gray-700 font-medium dark:text-gray-300">
                                Product Name
                              </Label>
                              <Input
                                id="edit-name"
                                value={editingProduct.name}
                                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                className="bg-white/50 border-gray-300 text-gray-900 rounded-xl mt-1 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-category" className="text-gray-700 font-medium dark:text-gray-300">
                                Category
                              </Label>
                              <Select
                                value={editingProduct.category}
                                onValueChange={(value) => setEditingProduct({ ...editingProduct, category: value })}
                              >
                                <SelectTrigger className="bg-white/50 border-gray-300 text-gray-900 rounded-xl mt-1 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-gray-200 rounded-xl dark:bg-gray-800 dark:border-gray-700">
                                  <SelectItem value="Gaming">Gaming</SelectItem>
                                  <SelectItem value="Workstation">Workstation</SelectItem>
                                  <SelectItem value="Budget">Budget</SelectItem>
                                  <SelectItem value="Content Creation">Content Creation</SelectItem>
                                  <SelectItem value="Office">Office</SelectItem>
                                  <SelectItem value="High-End">High-End</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="edit-price" className="text-gray-700 font-medium dark:text-gray-300">
                                Price ($)
                              </Label>
                              <Input
                                id="edit-price"
                                type="number"
                                step="0.01"
                                value={editingProduct.price}
                                onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                                className="bg-white/50 border-gray-300 text-gray-900 rounded-xl mt-1 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-specs" className="text-gray-700 font-medium dark:text-gray-300">
                                Specifications (comma-separated)
                              </Label>
                              <Input
                                id="edit-specs"
                                value={editingProduct.specs}
                                onChange={(e) => setEditingProduct({ ...editingProduct, specs: e.target.value })}
                                className="bg-white/50 border-gray-300 text-gray-900 rounded-xl mt-1 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                                required
                              />
                            </div>
                            <div>
                              <Label
                                htmlFor="edit-description"
                                className="text-gray-700 font-medium dark:text-gray-300"
                              >
                                Description
                              </Label>
                              <Textarea
                                id="edit-description"
                                value={editingProduct.description}
                                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                className="bg-white/50 border-gray-300 text-gray-900 rounded-xl mt-1 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-image" className="text-gray-700 font-medium dark:text-gray-300">
                                Product Image
                              </Label>
                              <div className="mt-1 space-y-3">
                                <Input
                                  id="edit-image"
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleImageChange(e, true)}
                                  className="bg-white/50 border-gray-300 text-gray-900 rounded-xl dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                                />
                                {(editImagePreview || editingProduct?.image) && (
                                  <div className="relative w-full h-32 bg-gray-100 rounded-xl overflow-hidden dark:bg-gray-800">
                                    <img
                                      src={editImagePreview || editingProduct?.image}
                                      alt="Preview"
                                      className="w-full h-full object-cover"
                                    />
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        setEditImagePreview("")
                                        setEditingProduct({ ...editingProduct, image: "" })
                                      }}
                                      className="absolute top-2 right-2 h-6 w-6 p-0 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="edit-visible"
                                checked={editingProduct?.visible || false}
                                onChange={(e) => setEditingProduct({ ...editingProduct, visible: e.target.checked })}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                              />
                              <Label htmlFor="edit-visible" className="text-gray-700 font-medium dark:text-gray-300">
                                Make product visible to customers
                              </Label>
                            </div>
                            <Button
                              type="submit"
                              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-3"
                            >
                              Update Product
                            </Button>
                          </form>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                      className="border-red-300 text-red-600 hover:bg-red-50 rounded-xl dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-3 dark:text-gray-400">Specifications:</h4>
                    <ul className="text-sm text-gray-600 space-y-2 dark:text-gray-300">
                      {product.specs.map((spec, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 dark:bg-blue-400"></span>
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${product.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
