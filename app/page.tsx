"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Counter } from "@/components/counter"

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
    title: "Transforming Industries",
    subtitle: "With Precision Engineering",
    description: "Advanced extrusion and forming technologies for reliable and efficient manufacturing solutions worldwide.",
    image: "/banner/Banner-01-1.jpg",
  },
  {
    id: 2,
    title: "Quality Excellence",
    subtitle: "Premium Products",
    description: "Delivering world-class manufacturing solutions with cutting-edge technology and unmatched precision.",
    image: "/banner/Banner-02-1.jpg",
  },
  {
    id: 3,
    title: "Innovation Driven",
    subtitle: "Leading the Future",
    description: "Pioneering advanced manufacturing techniques to meet the evolving needs of modern industries.",
    image: "/banner/Banner-New-1.jpg",
  },
  {
    id: 4,
    title: "Customer Excellence",
    subtitle: "Superior Experience",
    description: "Committed to delivering exceptional service and building lasting relationships with our partners.",
    image: "/banner/services.jpg",
  },
  {
    id: 5,
    title: "Manufacturing Excellence",
    subtitle: "Industry Leaders",
    description: "Setting new standards in manufacturing with state-of-the-art facilities and expert craftsmanship.",
    image: "/banner/2537-202307311601095370.jpg",
  },
  {
    id: 6,
    title: "Precision Engineering",
    subtitle: "Advanced Solutions",
    description: "Delivering precision-engineered products that exceed industry standards and customer expectations.",
    image: "/banner/haul-off-catterpillar-belt-1672832580-6703565.jpeg",
  },
  {
    id: 7,
    title: "Quality Assurance",
    subtitle: "Trusted Performance",
    description: "Rigorous quality control processes ensuring every product meets the highest standards of excellence.",
    image: "/banner/istockphoto-1651115062-612x612.jpg",
  },
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState(500)
  const [currentBanner, setCurrentBanner] = useState(0)
  const [bannerKey, setBannerKey] = useState(0)
  const [mounted, setMounted] = useState(false)

  const categories = ["All", ...new Set(allProducts.map((p) => p.category))]

  useEffect(() => {
    setMounted(true)
  }, [])

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
      setBannerKey((prev) => prev + 1)
    }, 7000)
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
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navigation transparent={true} />
      </div>
      <section className="banner-container relative bg-background min-h-screen overflow-hidden">
        {banners.map((banner, index) => {
          const isActive = index === currentBanner

          return (
            <div key={`${banner.id}-${bannerKey}`} className="banner-item">
              <div 
                className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
                  isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
                style={{ backgroundImage: `url(${banner.image})` }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent"></div>
              
              <div className={`absolute top-20 left-10 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/40 to-blue-800/20 rounded-full blur-3xl z-10 ${
                isActive ? "animate-float-up" : "opacity-0"
              }`} style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}></div>
              <div className={`absolute top-60 left-60 w-[600px] h-[600px] bg-gradient-to-br from-sky-400/40 to-cyan-600/20 rounded-full blur-3xl z-10 ${
                isActive ? "animate-float-up" : "opacity-0"
              }`} style={{ transformStyle: 'preserve-3d', perspective: '1000px', animationDelay: '0.4s' }}></div>
              
              <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start justify-center pt-20">
                <div className={`transition-all duration-700 delay-500 ${
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}>
                  <div className="mb-4 inline-block">
                    <span className="px-4 py-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-300 text-sm font-semibold">Industry Leaders</span>
                  </div>
                  <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-4 leading-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 drop-shadow-2xl">{banner.title}</span>
                  </h1>
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold mb-6">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 drop-shadow-lg">{banner.subtitle}</span>
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed mb-8 drop-shadow-md">{banner.description}</p>
                  <div className="flex gap-4">
                    <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                      Get Started
                    </button>
                    <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {/* Banner Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20 bg-black/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentBanner ? "bg-blue-500 w-8 shadow-lg shadow-blue-500/50" : "bg-white/50 w-2 hover:bg-white/70"
              }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Wave SVG
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg className="relative block w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,120V114.37C149.93,61,314.09,48.68,475.83,77.43c43,7.64,84.23,20.12,127.61,26.46,59,8.63,112.48-12.24,165.56-35.4C827.93,42.78,886,24.76,951.2,30c86.53,7,172.46,45.71,248.8,84.81V120Z" fill="#ffffff"></path>
          </svg>
        </div> */}
      </section>

      {/* Heritage Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white scroll-animate relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="scroll-left">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">Welcome to</span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">ShopEase & Co Ltd.</span>
              </h1>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl">
                  <img src="/a-belt/download (8).jpg" alt="Belt Heritage" className="w-full h-auto transform group-hover:scale-105 transition duration-500" />
                </div>
              </div>
            </div>
            <div className="scroll-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full text-sm font-semibold mb-6">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                A HERITAGE OF 2 DECADES
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">Building Excellence Since 2004</h3>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>ShopEase founded in 2004 as a Premium Belt Manufacturer is now 20 years young today. SE has become the first choice Company to supply Automotive and Industrial Belts to customers worldwide.</span>
                </p>
                <p className="text-gray-600 leading-relaxed flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>Today SE is the No.1 supplier of V-Belts, Timing Belts, and Industrial Belts, which holds the largest market sharing in automotive and industrial sectors.</span>
                </p>
                <p className="text-gray-600 leading-relaxed flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>Today ShopEase stands proud as premier manufacturer of Automotive Belts, Industrial Belts and Agricultural Belts under popular brand name 'ShopEase'.</span>
                </p>
              </div>
              <button className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
                View All Products
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

     
      {/* Company Overview Section */}
      <section className="bg-white scroll-animate relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="scroll-left order-2 md:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold mb-4">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/></svg>
                Complete Solutions
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">ALL IN ONE ROOF!<br/>EVERYTHING IN STORE!</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Premium Belt Solutions</h4>
                    <p className="text-gray-600 text-sm">Automotive, Industrial, Agricultural Belts & Power Transmission Components</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Quality Excellence</h4>
                    <p className="text-gray-600 text-sm">R&D, Quality Control & Manufacturing Excellence under strict supervision</p>
                  </div>
                </div>
              </div>
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
                Explore Products
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
            </div>
            <div className="scroll-right order-1 md:order-2">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
                  <img src="/a-belt/One-Roof-1024x597.jpg" alt="One Roof Manufacturing" className="w-full h-auto transform group-hover:scale-105 transition duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Showcase Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20 animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">Our Products</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">Explore Our Categories</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover our comprehensive range of premium belt solutions for every industry need</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Link href="/products?category=Automotive Belts" className="group">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-all duration-700" style={{ backgroundImage: 'url(/a-belt/5E.jpg)' }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">AUTOMOTIVE BELTS</h3>
                  <p className="text-white/80 text-sm text-center opacity-0 group-hover:opacity-100 transition-all duration-300">High-performance belts for vehicles</p>
                </div>
              </div>
            </Link>
            <Link href="/products?category=Industrial Belts" className="group">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-all duration-700" style={{ backgroundImage: 'url(/a-belt/5F.jpg)' }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">INDUSTRIAL BELTS</h3>
                  <p className="text-white/80 text-sm text-center opacity-0 group-hover:opacity-100 transition-all duration-300">Heavy-duty solutions for industry</p>
                </div>
              </div>
            </Link>
            <Link href="/products?category=Agricultural Belts" className="group">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-all duration-700" style={{ backgroundImage: 'url(/a-belt/5G-1-1024x603.jpg)' }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">AGRICULTURAL BELTS</h3>
                  <p className="text-white/80 text-sm text-center opacity-0 group-hover:opacity-100 transition-all duration-300">Reliable belts for farming equipment</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="text-center">
            <Link href="/products" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300">
              View All Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-8 px-4 md:px-16 bg-gradient-to-b from-background to-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-12 px-6 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-lg">
            <h3 className="text-4xl md:text-5xl font-bold mb-3"><Counter end={20} suffix="+" /></h3>
            <p className="text-base font-medium">Years of Manufacturing<br/>Experience</p>
          </div>
          <div className="bg-white text-gray-800 py-12 px-6 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-lg border border-gray-200">
            <h3 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600"><Counter end={50000} />+</h3>
            <p className="text-base font-medium text-blue-600">Products Manufactured<br/>per day</p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-black text-white py-12 px-6 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-lg">
            <h3 className="text-4xl md:text-5xl font-bold mb-3"><Counter end={5} suffix="+" /></h3>
            <p className="text-base font-medium">Factories</p>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-12 px-6 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-lg">
            <h3 className="text-4xl md:text-5xl font-bold mb-3"><Counter end={15} suffix="+" /></h3>
            <p className="text-base font-medium">Sales Offices</p>
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mx-4 h-1 bg-black"></div>
          
          {/* Customer Reviews Section */}
          <div className="pt-12 mb-12">
            <h3 className="text-3xl font-bold text-center text-foreground mb-8">What Our Customers Say</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 italic">"Excellent quality belts! We've been using ShopEase products for our automotive business for 3 years. Never had any quality issues."</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mr-3">R</div>
                  <div>
                    <p className="font-semibold text-foreground">Rajesh Kumar</p>
                    <p className="text-sm text-muted-foreground">Auto Parts Dealer</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 italic">"Best industrial belts in the market. Their customer service is outstanding and delivery is always on time."</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mr-3">S</div>
                  <div>
                    <p className="font-semibold text-foreground">Suresh Patel</p>
                    <p className="text-sm text-muted-foreground">Manufacturing Unit</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(4)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <svg className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 italic">"Good quality products at competitive prices. Their agricultural belts have improved our farm equipment efficiency significantly."</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mr-3">A</div>
                  <div>
                    <p className="font-semibold text-foreground">Amit Singh</p>
                    <p className="text-sm text-muted-foreground">Farmer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
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
