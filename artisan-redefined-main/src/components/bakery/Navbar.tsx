import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Our Story", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Special Cakes", href: "#cakes" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 2.3, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "glass py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#home" className="group flex items-center gap-3" data-cursor="button">
          <div className="grid h-10 w-10 place-items-center rounded-full gold-bg shadow-[var(--shadow-gold)]">
            <span className="font-display text-lg text-[var(--chocolate)]">M</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-xl text-[var(--chocolate)]">Maxim's</div>
            <div className="text-[9px] uppercase tracking-[0.3em] text-[var(--coffee)]">Since 1969</div>
          </div>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor="button"
              className="group relative text-sm font-medium text-[var(--chocolate)]"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 gold-bg transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#cta"
            data-cursor="cta"
            className="group relative hidden overflow-hidden rounded-full px-6 py-2.5 text-sm font-semibold text-[var(--chocolate)] shadow-[var(--shadow-gold)] gold-bg md:inline-flex"
          >
            <span className="relative z-10">Order Now</span>
            <span className="absolute inset-0 -translate-x-full animate-shimmer" />
          </a>
          <button
            aria-label="Toggle menu"
            className="rounded-full glass p-2.5 lg:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass mx-6 mt-3 overflow-hidden rounded-2xl lg:hidden"
          >
            <div className="flex flex-col p-6">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-[color-mix(in_oklab,var(--gold)_20%,transparent)] py-3 text-sm font-medium last:border-0"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#cta"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-full gold-bg py-3 text-center text-sm font-semibold text-[var(--chocolate)]"
              >
                Order Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
