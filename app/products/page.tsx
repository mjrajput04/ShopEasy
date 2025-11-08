"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"

interface Product {
  id: number
  name: string
  price: number
  category: string
  image: string
  inStock: boolean
  supplier?: {
    name: string
    location: string
    rating: number
    reviews: number
    verified: boolean
    responseRate: number
    experience: string
  }
  specifications?: {
    power?: string
    type?: string
    brand?: string
  }
}

const allProducts: Product[] = [
  {
    id: 1,
    name: "V6 Submersible Pump (SHREE RAM V6 RED Submersible Pump 7.50 HP X 4 Stg (30ft.)",
    price: 37892,
    category: "Submersible Pumps",
    image: "/a-belt/5E.jpg",
    inStock: true,
    supplier: {
      name: "Shree Ram Pump & Pipe",
      location: "Rajkot",
      rating: 3.8,
      reviews: 230,
      verified: true,
      responseRate: 75,
      experience: "3 yrs"
    },
    specifications: {
      power: "7.5 HP",
      type: "Automatic",
      brand: "Made in India"
    }
  },
  {
    id: 2,
    name: "Power: 1 HP Submersible Pump Sets",
    price: 75000,
    category: "Submersible Pumps",
    image: "/a-belt/5F.jpg",
    inStock: true,
    supplier: {
      name: "Mascot Pump Limited",
      location: "Ahmedabad",
      rating: 4.0,
      reviews: 44,
      verified: true,
      responseRate: 42,
      experience: "19 yrs"
    },
    specifications: {
      power: "1 HP",
      type: "Automatic"
    }
  },
  {
    id: 3,
    name: "0.75 HP SUBMERSIBLE PUMPSETS",
    price: 7000,
    category: "Submersible Pumps",
    image: "/a-belt/5G-1-1024x603.jpg",
    inStock: true,
    supplier: {
      name: "OMC Submersible Pump",
      location: "Rajkot",
      rating: 4.2,
      reviews: 256,
      verified: true,
      responseRate: 84,
      experience: "9 yrs"
    },
    specifications: {
      power: "0.75 HP",
      type: "Manual"
    }
  },
  {
    id: 4,
    name: "V5 Submersible Pump Set",
    price: 0, // Ask Price
    category: "Submersible Pumps",
    image: "/a-belt/5G-2.jpg",
    inStock: true,
    supplier: {
      name: "Kalsi Metal Works Pvt. Ltd.",
      location: "Jalandhar",
      rating: 4.0,
      reviews: 81,
      verified: true,
      responseRate: 80,
      experience: "11 yrs"
    },
    specifications: {
      power: "5 HP",
      brand: "Kalsi"
    }
  },
  {
    id: 5,
    name: "Timing Belt for Automotive",
    price: 89,
    category: "Automotive Belts",
    image: "/a-belt/download (1).jpg",
    inStock: false,
    supplier: {
      name: "Auto Parts Supplier",
      location: "Mumbai",
      rating: 3.5,
      reviews: 120,
      verified: true,
      responseRate: 65,
      experience: "5 yrs"
    }
  },
  {
    id: 6,
    name: "Serpentine Belt Multi-Rib",
    price: 65,
    category: "Automotive Belts",
    image: "/a-belt/download (2).jpg",
    inStock: true,
    supplier: {
      name: "Belt Manufacturing Co.",
      location: "Chennai",
      rating: 4.1,
      reviews: 89,
      verified: true,
      responseRate: 78,
      experience: "7 yrs"
    }
  },
  {
    id: 7,
    name: "Industrial Conveyor Belt",
    price: 125,
    category: "Industrial Belts",
    image: "/a-belt/download (3).jpg",
    inStock: true,
    supplier: {
      name: "Industrial Solutions Ltd.",
      location: "Pune",
      rating: 4.3,
      reviews: 156,
      verified: true,
      responseRate: 85,
      experience: "12 yrs"
    }
  },
  {
    id: 8,
    name: "Power Transmission Belt",
    price: 95,
    category: "Industrial Belts",
    image: "/a-belt/download (4).jpg",
    inStock: true,
    supplier: {
      name: "Power Tech Industries",
      location: "Delhi",
      rating: 3.9,
      reviews: 203,
      verified: true,
      responseRate: 72,
      experience: "8 yrs"
    }
  },
  {
    id: 9,
    name: "Synchronous Belt HTD",
    price: 78,
    category: "Industrial Belts",
    image: "/a-belt/download (5).jpg",
    inStock: true,
    supplier: {
      name: "Precision Belt Co.",
      location: "Bangalore",
      rating: 4.4,
      reviews: 178,
      verified: true,
      responseRate: 88,
      experience: "15 yrs"
    }
  },
  {
    id: 10,
    name: "Agricultural V-Belt",
    price: 55,
    category: "Agricultural Belts",
    image: "/a-belt/download (6).jpg",
    inStock: true,
    supplier: {
      name: "Agri Equipment Supplies",
      location: "Ludhiana",
      rating: 3.7,
      reviews: 94,
      verified: true,
      responseRate: 68,
      experience: "6 yrs"
    }
  },
  {
    id: 11,
    name: "Motorcycle Drive Belt",
    price: 42,
    category: "Automotive Belts",
    image: "/a-belt/download (7).jpg",
    inStock: true,
    supplier: {
      name: "Bike Parts Hub",
      location: "Kolkata",
      rating: 3.6,
      reviews: 67,
      verified: true,
      responseRate: 61,
      experience: "4 yrs"
    }
  },
  {
    id: 12,
    name: "Rolon Belts for 4-Wheelers",
    price: 85,
    category: "Automotive Belts",
    image: "/a-belt/Rolon-Belts-For-4-Wheelers-1536x568.jpg",
    inStock: true,
    supplier: {
      name: "Rolon Chain Industries",
      location: "Gurgaon",
      rating: 4.2,
      reviews: 145,
      verified: true,
      responseRate: 82,
      experience: "10 yrs"
    }
  },
]

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState(100000)

  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [searchParams])

  const categories = ["All", ...new Set(allProducts.map((p) => p.category))]

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      const matchesPrice = product.price <= priceRange
      return matchesSearch && matchesCategory && matchesPrice
    })
  }, [searchQuery, selectedCategory, priceRange])

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar - Search and Filters */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-8 shadow-sm">
              <h2 className="text-xl font-bold text-foreground mb-6" id="find-products">Find Products</h2>
              
              {/* Search */}
              <div className="mb-8">
                <input
                  type="text"
                  placeholder="Search products..." id="search-placeholder"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4 text-foreground" id="category-filter">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-3 cursor-pointer accent-blue-600"
                      />
                      <span className={`text-sm transition ${selectedCategory === category ? 'font-semibold text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="font-semibold mb-3 text-foreground"><span id="price-range-text">Price Range</span></h3>
                <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3 mb-3">
                  <p className="text-lg font-bold text-blue-600">₹{priceRange.toLocaleString()}</p>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>₹0</span>
                  <span>₹1,00,000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Products Grid */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2" id="all-products-title">All Products</h1>
              <p className="text-muted-foreground"><span id="showing-text">Showing</span> <span className="font-semibold text-foreground">{filteredProducts.length}</span> <span id="products-count-text">products</span></p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <p className="text-muted-foreground text-lg" id="no-products-found">No products found matching your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}