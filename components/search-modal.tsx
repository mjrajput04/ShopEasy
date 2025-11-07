"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface Product {
  id: number
  name: string
  price: number
  category: string
  image: string
  inStock: boolean
}

const allProducts: Product[] = [
  {
    id: 1,
    name: "V6 Submersible Pump (SHREE RAM V6 RED Submersible Pump 7.50 HP X 4 Stg (30ft.)",
    price: 37892,
    category: "Submersible Pumps",
    image: "/a-belt/5E.jpg",
    inStock: true,
  },
  {
    id: 2,
    name: "Power: 1 HP Submersible Pump Sets",
    price: 75000,
    category: "Submersible Pumps",
    image: "/a-belt/5F.jpg",
    inStock: true,
  },
  {
    id: 3,
    name: "0.75 HP SUBMERSIBLE PUMPSETS",
    price: 7000,
    category: "Submersible Pumps",
    image: "/a-belt/5G-1-1024x603.jpg",
    inStock: true,
  },
  {
    id: 4,
    name: "V5 Submersible Pump Set",
    price: 0,
    category: "Submersible Pumps",
    image: "/a-belt/5G-2.jpg",
    inStock: true,
  },
  {
    id: 5,
    name: "Industrial V-Belt",
    price: 125,
    category: "Industrial Belts",
    image: "/a-belt/download.jpg",
    inStock: true,
  },
  {
    id: 6,
    name: "Timing Belt for Automotive",
    price: 89,
    category: "Automotive Belts",
    image: "/a-belt/download (1).jpg",
    inStock: true,
  },
  {
    id: 7,
    name: "Heavy Duty V-Belt",
    price: 156,
    category: "Industrial Belts",
    image: "/a-belt/download (2).jpg",
    inStock: true,
  },
  {
    id: 8,
    name: "Serpentine Belt",
    price: 78,
    category: "Automotive Belts",
    image: "/a-belt/download (3).jpg",
    inStock: true,
  },
  {
    id: 9,
    name: "Agricultural Belt",
    price: 95,
    category: "Agricultural Belts",
    image: "/a-belt/download (4).jpg",
    inStock: true,
  },
  {
    id: 10,
    name: "Power Transmission Belt",
    price: 134,
    category: "Industrial Belts",
    image: "/a-belt/download (5).jpg",
    inStock: true,
  },
  {
    id: 11,
    name: "Motorcycle Drive Belt",
    price: 42,
    category: "Automotive Belts",
    image: "/a-belt/download (6).jpg",
    inStock: true,
  },
  {
    id: 12,
    name: "Rolon Belts for 4-Wheelers",
    price: 85,
    category: "Automotive Belts",
    image: "/a-belt/Rolon-Belts-For-4-Wheelers-1536x568.jpg",
    inStock: true,
  },
]

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredProducts(filtered)
    } else {
      setFilteredProducts([])
    }
  }, [searchQuery])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-foreground placeholder-muted-foreground text-lg"
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-1 hover:bg-secondary rounded-md transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {searchQuery.trim() === "" ? (
            <div className="p-8 text-center text-muted-foreground">
              Start typing to search products...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No products found for "{searchQuery}"
            </div>
          ) : (
            <div className="p-2">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-3 hover:bg-secondary rounded-lg transition"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <div className="text-right">
                    {product.price > 0 ? (
                      <span className="font-bold text-accent">₹{product.price.toLocaleString()}</span>
                    ) : (
                      <span className="font-bold text-blue-600">Ask Price</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}