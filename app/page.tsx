"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { Footer } from "@/components/footer"

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
    name: "Automotive V-Belt 5E Series",
    price: 45,
    category: "Automotive Belts",
    image: "/a-belt/5E.jpg",
    inStock: true,
  },
  {
    id: 2,
    name: "Industrial V-Belt 5F Series",
    price: 52,
    category: "Industrial Belts",
    image: "/a-belt/5F.jpg",
    inStock: true,
  },
  {
    id: 3,
    name: "Heavy Duty V-Belt 5G Series",
    price: 68,
    category: "Industrial Belts",
    image: "/a-belt/5G-1-1024x603.jpg",
    inStock: true,
  },
  {
    id: 4,
    name: "Premium V-Belt 5G-2 Series",
    price: 72,
    category: "Industrial Belts",
    image: "/a-belt/5G-2.jpg",
    inStock: true,
  },
  {
    id: 5,
    name: "Timing Belt for Automotive",
    price: 89,
    category: "Automotive Belts",
    image: "/a-belt/download (1).jpg",
    inStock: false,
  },
  {
    id: 6,
    name: "Serpentine Belt Multi-Rib",
    price: 65,
    category: "Automotive Belts",
    image: "/a-belt/download (2).jpg",
    inStock: true,
  },
  {
    id: 7,
    name: "Industrial Conveyor Belt",
    price: 125,
    category: "Industrial Belts",
    image: "/a-belt/download (3).jpg",
    inStock: true,
  },
  {
    id: 8,
    name: "Power Transmission Belt",
    price: 95,
    category: "Industrial Belts",
    image: "/a-belt/download (4).jpg",
    inStock: true,
  },
  {
    id: 9,
    name: "Synchronous Belt HTD",
    price: 78,
    category: "Industrial Belts",
    image: "/a-belt/download (5).jpg",
    inStock: true,
  },
  {
    id: 10,
    name: "Agricultural V-Belt",
    price: 55,
    category: "Agricultural Belts",
    image: "/a-belt/download (6).jpg",
    inStock: true,
  },
  {
    id: 11,
    name: "Motorcycle Drive Belt",
    price: 42,
    category: "Automotive Belts",
    image: "/a-belt/download (7).jpg",
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

const banners = [
  {
    id: 1,
    title: "SERVICE",
    subtitle: "MANUFACTURING QUALITY, DISTRIBUTING RELATIONSHIPS",
    image: "/banner/Banner-01-1.jpg",
  },
  {
    id: 2,
    title: "QUALITY",
    subtitle: "PREMIUM PRODUCTS FOR MODERN LIFESTYLE",
    image: "/banner/Banner-02-1.jpg",
  },
  {
    id: 3,
    title: "INNOVATION",
    subtitle: "LEADING THE FUTURE OF RETAIL EXCELLENCE",
    image: "/banner/Banner-New-1.jpg",
  },
  {
    id: 4,
    title: "EXCELLENCE",
    subtitle: "DELIVERING SUPERIOR CUSTOMER EXPERIENCE",
    image: "/banner/services.jpg",
  },
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState(500)
  const [currentBanner, setCurrentBanner] = useState(0)

  const categories = ["All", ...new Set(allProducts.map((p) => p.category))]

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      const matchesPrice = product.price <= priceRange
      return matchesSearch && matchesCategory && matchesPrice
    })
  }, [searchQuery, selectedCategory, priceRange])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate')
        }
      })
    }, observerOptions)

    const scrollElements = document.querySelectorAll('.scroll-animate, .scroll-left, .scroll-right')
    scrollElements.forEach((el) => observer.observe(el))

    return () => {
      scrollElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <section className="banner-container relative bg-background min-h-[80vh]">
        {banners.map((banner, index) => {
          const isActive = index === currentBanner

          return (
            <div
              key={banner.id}
              className={`banner-item relative bg-cover bg-center transition-opacity duration-700 ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative z-10 h-full max-w-7xl mx-auto px-4 flex flex-col items-start justify-center">
                <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">{banner.title}</h1>
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">{banner.subtitle}</p>
              </div>
            </div>
          )
        })}

        {/* Banner Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentBanner ? "bg-accent w-8" : "bg-muted-foreground hover:bg-muted-foreground/70"
              }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg className="relative block w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#ffffff"></path>
          </svg>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="bg-card border-y border-border scroll-animate">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="scroll-left">
              <h2 className="text-sm text-muted-foreground mb-2" id="welcome-text">Welcome to</h2>
              <h1 className="text-3xl font-bold text-primary mb-4" id="company-name">ShopEase & Co Ltd.</h1>
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <img src="/a-belt/download (8).jpg" alt="Belt Heritage" className="w-full h-auto" />
              </div>
            </div>
            <div className="scroll-right">
              <h3 className="text-2xl font-bold text-accent mb-6" id="heritage-title">A HERITAGE OF 2 DECADES</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed" id="heritage-desc1">
                ShopEase founded in 2004 as a Premium Belt Manufacturer is now 20 years young today. SE has become the first choice Company to supply Automotive and Industrial Belts to customers worldwide and is the largest belt manufacturer from startup to the US.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed" id="heritage-desc2">
                Today SE is the No.1 supplier of V-Belts, Timing Belts, and Industrial Belts, which holds the largest market sharing in automotive and industrial sectors.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed" id="heritage-desc3">
                Today ShopEase stands proud as premier manufacturer of Automotive Belts, Industrial Belts and Agricultural Belts under popular brand name 'ShopEase'. SE also produces world class Quality Belts and Precision Engineering Solutions.
              </p>
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition">
                <span id="view-all">View All</span> →
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="mx-16 h-1 bg-black"></div>

     
      {/* Company Overview Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 scroll-animate">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="scroll-left">
            <h2 className="text-3xl font-bold text-accent mb-6" id="company-title">ALL IN ONE ROOF! EVERYTHING IN STORE!</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed" id="company-desc1">
              ShopEase is a leading manufacturer in premium belt solutions with its Automotive Belts, Industrial Belts, Agricultural Belts, Power Transmission Components, and Precision Engineered Products.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed" id="company-desc2">
              The core functions like R&D, Quality Control, Manufacturing Excellence and Technical Support operate under the strict supervision of the Corporate office as SE believes that a high degree of precision can meet the demanding needs of the automotive and industrial sectors.
            </p>
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition">
              View All →
            </button>
          </div>
          <div className="scroll-right">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <img src="/a-belt/One-Roof-1024x597.jpg" alt="One Roof Manufacturing" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>
      <div className="mx-16 h-1 bg-black"></div>

      {/* Category Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 animate-fade-in-up">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link href="/products?category=Automotive Belts" className="group">
            <div className="relative h-64 bg-cover bg-center rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-500" style={{ backgroundImage: 'url(/a-belt/5E.jpg)' }}>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-2xl font-bold text-white" id="automotive-belts">AUTOMOTIVE BELTS</h3>
              </div>
            </div>
          </Link>
          <Link href="/products?category=Industrial Belts" className="group">
            <div className="relative h-64 bg-cover bg-center rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-500" style={{ backgroundImage: 'url(/a-belt/5F.jpg)' }}>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-2xl font-bold text-white" id="industrial-belts">INDUSTRIAL BELTS</h3>
              </div>
            </div>
          </Link>
          <Link href="/products?category=Agricultural Belts" className="group">
            <div className="relative h-64 bg-cover bg-center rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-500" style={{ backgroundImage: 'url(/a-belt/5G-1-1024x603.jpg)' }}>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-2xl font-bold text-white" id="agricultural-belts">AGRICULTURAL BELTS</h3>
              </div>
            </div>
          </Link>
        </div>
        <div className="text-center">
          <Link href="/products" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition">
            <span id="view-all-2">View All</span> →
          </Link>
        </div>
      </section>
      <div className="mx-16 h-1 bg-black"></div>

      {/* Statistics Section */}
      <section className="bg-background py-16 animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-12">
            <div className="transform hover:scale-110 transition-all duration-300">
              <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-2 animate-bounce-in">20+</h3>
              <p className="text-accent font-semibold" id="stats-years">Years of Manufacturing<br/>Experience</p>
            </div>
            <div className="transform hover:scale-110 transition-all duration-300">
              <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-2 animate-bounce-in">50,000+</h3>
              <p className="text-accent font-semibold" id="stats-products">Products Manufactured<br/>per day</p>
            </div>
            <div className="transform hover:scale-110 transition-all duration-300">
              <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-2 animate-bounce-in">5+</h3>
              <p className="text-accent font-semibold" id="stats-factories">Factories</p>
            </div>
            <div className="transform hover:scale-110 transition-all duration-300">
              <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-2 animate-bounce-in">15+</h3>
              <p className="text-accent font-semibold" id="stats-offices">Sales Offices</p>
            </div>
          </div>
          <div className="mx-4 h-1 bg-black"></div>
          
          <div className="pt-12 text-center">
            <h4 className="text-xl font-semibold text-foreground mb-4" id="whatsapp-support">WhatsApp Support: +91 77 55 99 44 87</h4>
            <p className="text-muted-foreground mb-8 max-w-4xl mx-auto" id="company-message">
              In ShopEase, Products are regularly evaluated & technology updated, matching the latest design requirements, so that our customers are satisfied.
            </p>
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
              <span id="write-to-us">Write to Us</span> →
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
