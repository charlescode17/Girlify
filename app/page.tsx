"use client"

import { CartProvider } from "@/components/store/cart-context"
import Header from "@/components/store/header"
import HeroSection from "@/components/store/hero-section"
import CategoriesSection from "@/components/store/categories-section"
import ProductGrid from "@/components/store/product-grid"
import AboutSection from "@/components/store/about-section"
import CartDrawer from "@/components/store/cart-drawer"
import Footer from "@/components/store/footer"

export default function HomePage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <CategoriesSection />
          <ProductGrid />
          <AboutSection />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  )
}
