import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Monitor, Cpu, HardDrive, Zap, Settings, Shield, Phone, Mail, MapPin, Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-white/70 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm dark:bg-gray-900/70 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500 rounded-xl shadow-lg">
                <Monitor className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900 dark:text-white">TechForge PC</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="#services"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium dark:text-gray-300 dark:hover:text-blue-400"
              >
                Services
              </Link>
              <Link
                href="#about"
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
                href="#contact"
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
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button variant="ghost" className="rounded-xl">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-200 rounded-full px-4 py-2 font-medium dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                Professional PC Building Services
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight dark:text-white">
                Custom PC Builds &<span className="text-blue-500 dark:text-blue-400"> Optimization</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed dark:text-gray-300">
                Transform your computing experience with expertly crafted custom PCs, professional optimization
                services, and ongoing technical support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl px-8 py-4 shadow-sm hover:shadow-md transition-all duration-200 bg-transparent dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  View Our Work
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:bg-gray-800/60 dark:border-gray-700/50">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Custom Gaming PC Build"
                  width={500}
                  height={400}
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 dark:text-white">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
              From custom builds to performance optimization, we provide comprehensive PC solutions tailored to your
              needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white/70 backdrop-blur-xl border-gray-200/50 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden dark:bg-gray-800/70 dark:border-gray-700/50">
              <CardHeader className="pb-4">
                <div className="p-3 bg-blue-100 rounded-xl w-fit mb-4 dark:bg-blue-900/30">
                  <Cpu className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-gray-900 text-xl dark:text-white">Custom PC Builds</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Tailored systems built to your exact specifications and budget requirements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 space-y-2 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 dark:bg-blue-400"></span>Gaming rigs
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 dark:bg-blue-400"></span>Workstations
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 dark:bg-blue-400"></span>Budget builds
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 dark:bg-blue-400"></span>High-end systems
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-xl border-gray-200/50 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden dark:bg-gray-800/70 dark:border-gray-700/50">
              <CardHeader className="pb-4">
                <div className="p-3 bg-yellow-100 rounded-xl w-fit mb-4 dark:bg-yellow-900/30">
                  <Zap className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <CardTitle className="text-gray-900 text-xl dark:text-white">Performance Optimization</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Maximize your system's potential with professional tuning and optimization.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 space-y-2 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 dark:bg-yellow-400"></span>CPU/GPU
                    overclocking
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 dark:bg-yellow-400"></span>Memory
                    optimization
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 dark:bg-yellow-400"></span>Thermal
                    management
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 dark:bg-yellow-400"></span>System cleanup
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-xl border-gray-200/50 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden dark:bg-gray-800/70 dark:border-gray-700/50">
              <CardHeader className="pb-4">
                <div className="p-3 bg-green-100 rounded-xl w-fit mb-4 dark:bg-green-900/30">
                  <HardDrive className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-gray-900 text-xl dark:text-white">Hardware Upgrades</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Breathe new life into your existing system with strategic upgrades.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 space-y-2 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 dark:bg-green-400"></span>RAM upgrades
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 dark:bg-green-400"></span>Storage solutions
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 dark:bg-green-400"></span>Graphics cards
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 dark:bg-green-400"></span>Cooling systems
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-xl border-gray-200/50 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden dark:bg-gray-800/70 dark:border-gray-700/50">
              <CardHeader className="pb-4">
                <div className="p-3 bg-purple-100 rounded-xl w-fit mb-4 dark:bg-purple-900/30">
                  <Settings className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-gray-900 text-xl dark:text-white">System Maintenance</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Keep your PC running smoothly with regular maintenance services.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 space-y-2 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 dark:bg-purple-400"></span>Deep cleaning
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 dark:bg-purple-400"></span>Software updates
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 dark:bg-purple-400"></span>Driver
                    optimization
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 dark:bg-purple-400"></span>Health
                    diagnostics
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-xl border-gray-200/50 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden dark:bg-gray-800/70 dark:border-gray-700/50">
              <CardHeader className="pb-4">
                <div className="p-3 bg-red-100 rounded-xl w-fit mb-4 dark:bg-red-900/30">
                  <Shield className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <CardTitle className="text-gray-900 text-xl dark:text-white">Technical Support</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Ongoing support to ensure your system performs at its best.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 space-y-2 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3 dark:bg-red-400"></span>Remote assistance
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3 dark:bg-red-400"></span>Troubleshooting
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3 dark:bg-red-400"></span>Performance monitoring
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3 dark:bg-red-400"></span>Warranty support
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-xl border-gray-200/50 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden dark:bg-gray-800/70 dark:border-gray-700/50">
              <CardHeader className="pb-4">
                <div className="p-3 bg-cyan-100 rounded-xl w-fit mb-4 dark:bg-cyan-900/30">
                  <Monitor className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
                </div>
                <CardTitle className="text-gray-900 text-xl dark:text-white">Consultation</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Expert advice to help you make informed decisions about your PC needs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 space-y-2 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3 dark:bg-cyan-400"></span>Needs assessment
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3 dark:bg-cyan-400"></span>Budget planning
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3 dark:bg-cyan-400"></span>Component selection
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3 dark:bg-cyan-400"></span>Future-proofing
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-800/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 dark:text-white">
                Why Choose TechForge PC?
              </h2>
              <p className="text-lg text-gray-600 mb-8 dark:text-gray-300">
                With over 8 years of experience in PC building and optimization, we've helped hundreds of clients
                achieve their perfect computing setup.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-100 rounded-xl dark:bg-blue-900/30">
                    <div className="w-2 h-2 bg-blue-500 rounded-full dark:bg-blue-400"></div>
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-semibold text-lg mb-2 dark:text-white">Expert Knowledge</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Deep understanding of hardware compatibility and performance optimization.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-100 rounded-xl dark:bg-blue-900/30">
                    <div className="w-2 h-2 bg-blue-500 rounded-full dark:bg-blue-400"></div>
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-semibold text-lg mb-2 dark:text-white">Quality Components</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We source only the highest quality parts from trusted manufacturers.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-100 rounded-xl dark:bg-blue-900/30">
                    <div className="w-2 h-2 bg-blue-500 rounded-full dark:bg-blue-400"></div>
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-semibold text-lg mb-2 dark:text-white">Ongoing Support</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Comprehensive warranty and support for all our builds and services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:bg-gray-800/60 dark:border-gray-700/50">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="PC Building Process"
                  width={500}
                  height={400}
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 dark:text-white">Get In Touch</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Ready to build your dream PC? Let's discuss your project.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/70 backdrop-blur-xl border-gray-200/50 text-center rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-gray-800/70 dark:border-gray-700/50">
              <CardHeader>
                <div className="p-4 bg-blue-100 rounded-2xl w-fit mx-auto mb-4 dark:bg-blue-900/30">
                  <Phone className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-gray-900 dark:text-white">Phone</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Call us for immediate assistance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-900 font-semibold text-lg dark:text-white">+1 (555) 123-4567</p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-xl border-gray-200/50 text-center rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-gray-800/70 dark:border-gray-700/50">
              <CardHeader>
                <div className="p-4 bg-green-100 rounded-2xl w-fit mx-auto mb-4 dark:bg-green-900/30">
                  <Mail className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-gray-900 dark:text-white">Email</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Send us your project details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-900 font-semibold text-lg dark:text-white">info@techforgepc.com</p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-xl border-gray-200/50 text-center rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-gray-800/70 dark:border-gray-700/50">
              <CardHeader>
                <div className="p-4 bg-purple-100 rounded-2xl w-fit mx-auto mb-4 dark:bg-purple-900/30">
                  <MapPin className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-gray-900 dark:text-white">Location</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">Visit our workshop</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-900 font-semibold text-lg dark:text-white">
                  123 Tech Street
                  <br />
                  Silicon Valley, CA
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/70 backdrop-blur-xl border-t border-gray-200/50 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900/70 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="p-2 bg-blue-500 rounded-xl shadow-lg">
                <Monitor className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">TechForge PC</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">© 2024 TechForge PC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
