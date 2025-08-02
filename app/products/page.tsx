import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Monitor } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { getVisibleProducts } from "@/lib/products"

export default async function ProductsPage() {
  const products = await getVisibleProducts()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-white/70 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm dark:bg-gray-900/70 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500 rounded-xl shadow-lg">
                <Monitor className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900 dark:text-white">ReconnectIT</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link
                href="/#services"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium dark:text-gray-300 dark:hover:text-blue-400"
              >
                Services
              </Link>
              <Link
                href="/#about"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium dark:text-gray-300 dark:hover:text-blue-400"
              >
                About
              </Link>
              <Link
                href="/products"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium dark:text-gray-300 dark:hover:text-blue-400"
              >
                Products
              </Link>
              <Link
                href="/#contact"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium dark:text-gray-300 dark:hover:text-blue-400"
              >
                Contact
              </Link>
              <ThemeToggle />
              <Link href="/admin">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-6 shadow-lg hover:shadow-xl transition-all duration-200">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 dark:text-white">Our Products</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
              Explore our range of custom-built PCs, designed for every need and budget.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.length === 0 ? (
              <div className="col-span-full text-center text-gray-600 dark:text-gray-400">
                No products available at the moment. Please check back later!
              </div>
            ) : (
              products.map((product) => (
                <Card
                  key={product.id}
                  className="bg-white/70 backdrop-blur-xl border-gray-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-gray-800/70 dark:border-gray-700/50"
                >
                  <CardHeader className="pb-4">
                    {product.image && (
                      <div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden mb-4 dark:bg-gray-800">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-gray-900 text-xl dark:text-white">{product.name}</CardTitle>
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200 rounded-full px-3 py-1 font-medium dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                        {product.category}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-600 mt-2 dark:text-gray-300">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Specifications:</h4>
                      <ul className="text-sm text-gray-600 space-y-1 dark:text-gray-300">
                        {Array.isArray(product.specs) &&
                          product.specs.map((spec, index) => (
                            <li key={index} className="flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 dark:bg-blue-400"></span>
                              {spec}
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${product.price.toLocaleString()}
                      </span>
                      <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-6 shadow-lg hover:shadow-xl transition-all duration-200">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/70 backdrop-blur-xl border-t border-gray-200/50 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900/70 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Image
                src="/images/reconnectit-logo.png"
                alt="ReconnectIT Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-lg font-semibold text-gray-900 dark:text-white">ReconnectIT</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">© 2024 ReconnectIT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
