export default function Footer() {
  return (
    <footer id="contact" className="bg-foreground px-6 py-16 md:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Top */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl tracking-[0.04em] text-card">
              <span className="text-primary">G</span>irlify
            </h3>
            <p className="mt-3 text-sm text-card/50 leading-relaxed max-w-xs">
              Luxury women&apos;s fashion, curated for the modern woman. Elegance redefined.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-card/40 mb-4">
                Shop
              </h4>
              <ul className="flex flex-col gap-2.5">
                {["New Arrivals", "Bestsellers", "Knitwear", "Bags", "Jewelry"].map((link) => (
                  <li key={link}>
                    <a
                      href="#shop"
                      className="text-sm text-card/60 transition-colors duration-200 hover:text-primary"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-card/40 mb-4">
                Company
              </h4>
              <ul className="flex flex-col gap-2.5">
                {["About", "Contact", "Careers", "Press", "Sustainability"].map((link) => (
                  <li key={link}>
                    <a
                      href="#about"
                      className="text-sm text-card/60 transition-colors duration-200 hover:text-primary"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-card/40 mb-4">
              Stay in Touch
            </h4>
            <p className="text-sm text-card/50 leading-relaxed mb-4">
              Subscribe for exclusive offers and new arrivals.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex"
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-l-lg border border-card/10 bg-card/5 px-4 py-2.5 text-sm text-card placeholder:text-card/30 outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="rounded-r-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-gold-dim cursor-pointer"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-card/10 pt-8 md:flex-row">
          <p className="text-xs text-card/30">
            2026 Girlify. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Shipping Info"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-card/30 transition-colors hover:text-card/60"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
