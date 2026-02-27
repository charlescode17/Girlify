"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const slides = [
  {
    image: "/images/hero-1.jpg",
    subtitle: "New Collection 2026",
    title: "Elegance\nRedefined",
    cta: "Explore Collection",
  },
  {
    image: "/images/hero-2.jpg",
    subtitle: "Curated Essentials",
    title: "Luxury\nWithout Limits",
    cta: "Shop Now",
  },
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length)
        setIsTransitioning(false)
      }, 600)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const slide = slides[current]

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] w-full overflow-hidden">
      {/* Background Images */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.image}
            alt={s.title.replace("\n", " ")}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-foreground/10" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div
          className={`transition-all duration-700 ease-out ${
            isTransitioning
              ? "opacity-0 translate-y-4"
              : "opacity-100 translate-y-0"
          }`}
        >
          <p className="mb-4 text-xs font-medium tracking-[0.3em] uppercase text-card/90">
            {slide.subtitle}
          </p>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-card leading-[1.05] tracking-tight whitespace-pre-line text-balance">
            {slide.title}
          </h2>
          <div className="mt-8">
            <a
              href="#shop"
              className="group inline-flex items-center gap-2 border border-card/40 bg-card/10 backdrop-blur-sm px-8 py-3.5 text-sm font-medium tracking-widest uppercase text-card transition-all duration-300 hover:bg-card hover:text-foreground rounded-lg"
            >
              {slide.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setIsTransitioning(true)
              setTimeout(() => {
                setCurrent(i)
                setIsTransitioning(false)
              }, 400)
            }}
            className={`h-[2px] rounded-full transition-all duration-500 cursor-pointer ${
              i === current ? "w-8 bg-card" : "w-4 bg-card/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
