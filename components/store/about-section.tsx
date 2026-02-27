export default function AboutSection() {
  return (
    <section id="about" className="px-6 py-24 md:px-10 lg:px-16">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs font-medium tracking-[0.3em] uppercase text-primary mb-4">
          Our Story
        </p>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-foreground tracking-tight leading-[1.15] text-balance">
          Where elegance meets the everyday
        </h2>
        <p className="mt-6 text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
          Girlify was born from the belief that every woman deserves to feel extraordinary.
          We curate pieces that transcend trends, blending timeless craftsmanship with
          modern sensibility. Each item in our collection tells a story of refined taste
          and effortless sophistication.
        </p>
        <div className="mt-10 flex items-center justify-center gap-12">
          <div>
            <p className="font-serif text-3xl text-foreground">250+</p>
            <p className="mt-1 text-xs text-muted-foreground tracking-widest uppercase">Curated Pieces</p>
          </div>
          <div className="h-10 w-[1px] bg-border" />
          <div>
            <p className="font-serif text-3xl text-foreground">50k+</p>
            <p className="mt-1 text-xs text-muted-foreground tracking-widest uppercase">Happy Clients</p>
          </div>
          <div className="h-10 w-[1px] bg-border" />
          <div>
            <p className="font-serif text-3xl text-foreground">12</p>
            <p className="mt-1 text-xs text-muted-foreground tracking-widest uppercase">Countries</p>
          </div>
        </div>
      </div>
    </section>
  )
}
