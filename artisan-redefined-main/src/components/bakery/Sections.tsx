import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, MapPin, Phone, Mail, Clock, Heart, X, Wheat } from "lucide-react";

const Instagram = (p: { size?: number }) => (
  <svg width={p.size ?? 16} height={p.size ?? 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
);
const Facebook = (p: { size?: number }) => (
  <svg width={p.size ?? 16} height={p.size ?? 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const Twitter = (p: { size?: number }) => (
  <svg width={p.size ?? 16} height={p.size ?? 16} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.812l-5.34-6.98L4.8 22H1.54l8.02-9.163L1 2h6.914l4.828 6.38zm-2.39 18h1.84L7.245 4H5.27z"/></svg>
);
const Youtube = (p: { size?: number }) => (
  <svg width={p.size ?? 16} height={p.size ?? 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"/></svg>
);

import heroImg from "@/assets/hero-bakery.jpg";
import featuredCake from "@/assets/featured-cake.jpg";
import breadsImg from "@/assets/artisan-breads.jpg";
import cakesImg from "@/assets/designer-cakes.jpg";
import pastriesImg from "@/assets/pastries.jpg";
import cookiesImg from "@/assets/cookies.jpg";
import hampersImg from "@/assets/hampers.jpg";
import storyImg from "@/assets/story-hands.jpg";

import { MagneticButton } from "./MagneticButton";
import { FlourParticles } from "./Effects";

/* ---------- HERO ---------- */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-[var(--chocolate)]">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="Golden croissants and rustic breads bathed in warm bakery sunlight"
          className="h-full w-full object-cover"
          data-cursor="image"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--chocolate)]/60 via-[var(--chocolate)]/30 to-[var(--chocolate)]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,color-mix(in_oklab,var(--gold)_25%,transparent),transparent_60%)]" />
      </motion.div>

      <FlourParticles count={40} />

      {/* Floating decorative elements */}
      <motion.div
        className="absolute right-[8%] top-[22%] hidden md:block"
        animate={{ y: [0, -18, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Wheat className="h-14 w-14 text-[var(--gold)]/70" strokeWidth={1} />
      </motion.div>
      <motion.div
        className="absolute left-[6%] top-[70%] hidden md:block"
        animate={{ y: [0, 15, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <Wheat className="h-10 w-10 -scale-x-100 text-[var(--gold)]/60" strokeWidth={1} />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-3 rounded-full glass px-5 py-2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--cream)]">
            Est. 1969 · Family Bakery
          </span>
        </motion.div>

        <h1 className="max-w-5xl text-balance font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] text-[var(--cream)]">
          {"Crafting Happiness".split(" ").map((w, i) => (
            <motion.span
              key={i}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.4 + i * 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mr-4 inline-block"
            >
              {w}
            </motion.span>
          ))}
          <motion.span
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 block italic"
          >
            <span className="gold-text">Since 1969</span>
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.8 }}
          className="mt-8 max-w-xl text-balance text-base text-[var(--cream)]/85 md:text-lg"
        >
          Freshly baked breads, handcrafted pastries, signature cakes, and timeless flavors loved for generations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton variant="gold">
            Explore Menu <ArrowRight size={16} />
          </MagneticButton>
          <MagneticButton variant="outline">
            <span className="text-[var(--cream)]">Order Cakes</span>
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.6, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
        >
          <div className="mx-auto h-12 w-[1px] bg-gradient-to-b from-transparent via-[var(--gold)] to-transparent" />
          <div className="mt-2 text-[9px] uppercase tracking-[0.4em] text-[var(--cream)]/70">Scroll</div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- MARQUEE ---------- */
export function Marquee() {
  const items = ["Artisan Breads", "Signature Cakes", "Handcrafted Pastries", "Fresh Every Day", "Since 1969", "Made With Love"];
  return (
    <section className="relative overflow-hidden border-y border-[var(--gold)]/20 bg-[var(--chocolate)] py-6">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((t, i) => (
          <div key={i} className="flex items-center gap-8 px-8">
            <span className="font-display text-2xl italic text-[var(--cream)] md:text-3xl">{t}</span>
            <span className="h-2 w-2 rotate-45 bg-[var(--gold)]" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- STORY (Timeline) ---------- */
const timeline = [
  { year: "1969", title: "The Beginning", text: "Master baker Maxim opens a small oven on the corner of Baker Street." },
  { year: "1984", title: "Traditional Recipes", text: "Family recipes passed down three generations become our foundation." },
  { year: "2001", title: "Handcrafted Every Day", text: "Every loaf, every pastry — shaped by hand at dawn, never by machine." },
  { year: "2015", title: "Fresh Ingredients", text: "Local millers, seasonal fruit, French butter, single-origin chocolate." },
  { year: "Today", title: "Loved Across Generations", text: "Grandparents bring their grandchildren for the same cake they grew up on." },
];

export function Story() {
  return (
    <section id="story" className="relative overflow-hidden bg-[var(--cream)] py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionEyebrow>Our Story</SectionEyebrow>
            <h2 className="mt-4 font-display text-5xl leading-[1.05] text-[var(--chocolate)] md:text-6xl">
              Five decades of <span className="italic gold-text">warmth</span>, one recipe at a time.
            </h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="relative mt-10 overflow-hidden rounded-3xl shadow-[var(--shadow-luxe)]"
              data-cursor="image"
            >
              <img src={storyImg} alt="Baker's hands shaping dough" loading="lazy" className="h-[420px] w-full object-cover" />
              <div className="absolute bottom-6 left-6 rounded-2xl glass px-4 py-3">
                <div className="font-display text-xl text-[var(--chocolate)]">57+ years</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--coffee)]">of tradition</div>
              </div>
            </motion.div>
          </div>

          <ol className="relative border-l border-dashed border-[var(--gold)]/40 pl-8">
            {timeline.map((t, i) => (
              <motion.li
                key={t.year}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.05 }}
                className="relative mb-14 last:mb-0"
              >
                <span className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full gold-bg shadow-[var(--shadow-gold)]">
                  <span className="h-2 w-2 rounded-full bg-[var(--chocolate)]" />
                </span>
                <div className="font-display text-6xl text-[var(--gold)]/40 md:text-7xl">{t.year}</div>
                <h3 className="mt-1 font-display text-2xl text-[var(--chocolate)] md:text-3xl">{t.title}</h3>
                <p className="mt-3 max-w-md text-[var(--coffee)]">{t.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-[1px] w-8 bg-[var(--gold)]" />
      <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[var(--coffee)]">{children}</span>
    </div>
  );
}

/* ---------- SIGNATURE COLLECTION ---------- */
const collection = [
  { title: "Artisan Breads", img: breadsImg, price: "from $8", desc: "Sourdough, rye and rustic country loaves, hand-shaped at dawn.", cursor: "bread" },
  { title: "Designer Cakes", img: cakesImg, price: "from $85", desc: "Custom tiered cakes for weddings, birthdays and quiet Tuesdays.", cursor: "cake" },
  { title: "Pastries", img: pastriesImg, price: "from $4", desc: "Croissants, éclairs and danishes laminated with French butter.", cursor: "pastry" },
  { title: "Cookies", img: cookiesImg, price: "from $3", desc: "Small, warm and worth pretending you didn't eat six.", cursor: "pastry" },
  { title: "Gift Hampers", img: hampersImg, price: "from $65", desc: "Curated bakery boxes wrapped in kraft and gold ribbon.", cursor: "image" },
] as const;

export function Collection() {
  return (
    <section id="menu" className="relative bg-[var(--warm-white)] py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionEyebrow>Signature Collection</SectionEyebrow>
            <h2 className="mt-4 font-display text-5xl leading-[1.05] text-[var(--chocolate)] md:text-6xl">
              A menu written by <span className="italic gold-text">generations</span>.
            </h2>
          </div>
          <p className="max-w-md text-[var(--coffee)]">
            Five categories, hundreds of recipes, one philosophy: butter, patience, and time.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {collection.map((c, i) => (
            <CollectionCard key={c.title} item={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionCard({ item, index }: { item: (typeof collection)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0 });
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setT({ rx: -py * 8, ry: px * 8 });
  };
  const featured = index === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.08 }}
      className={featured ? "lg:row-span-2" : ""}
    >
      <motion.article
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setT({ rx: 0, ry: 0 })}
        style={{ transform: `perspective(1200px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)`, transformStyle: "preserve-3d" }}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-[var(--cream)] shadow-[var(--shadow-soft)] transition-shadow duration-500 hover:shadow-[var(--shadow-luxe)]"
        data-cursor={item.cursor}
      >
        <div className={`relative overflow-hidden ${featured ? "h-[520px]" : "h-64"}`}>
          <img
            src={item.img}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--chocolate)]/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute right-4 top-4 rounded-full glass px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--chocolate)]">
            {item.price}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-8">
          <h3 className="font-display text-3xl text-[var(--chocolate)] md:text-4xl">{item.title}</h3>
          <p className="text-sm text-[var(--coffee)]">{item.desc}</p>
          <button
            data-cursor="cta"
            className="mt-auto inline-flex items-center gap-2 self-start text-xs font-semibold uppercase tracking-[0.25em] text-[var(--chocolate)] transition-colors hover:text-[var(--gold)]"
          >
            Order <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </motion.article>
    </motion.div>
  );
}

/* ---------- FEATURED CAKE (3D scroll) ---------- */
export function FeaturedCake() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.05, 0.9]);
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.3]);

  return (
    <section id="cakes" ref={ref} className="relative overflow-hidden bg-[var(--chocolate)] py-40">
      <div className="pointer-events-none absolute inset-0">
        <motion.div style={{ opacity: glow }} className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_45%,transparent),transparent_70%)] blur-2xl" />
      </div>

      {/* floating decor */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${10 + i * 10}%`,
            top: `${20 + (i % 3) * 25}%`,
            width: 8 + (i % 3) * 4,
            height: 8 + (i % 3) * 4,
            background: i % 2 ? "#7A1E2E" : "#3A1E12",
            boxShadow: `0 0 20px ${i % 2 ? "#7A1E2E" : "#D9A441"}80`,
          }}
          animate={{ y: [0, -30, 0], x: [0, 10, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
        />
      ))}

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <div>
          <SectionEyebrow>
            <span className="text-[var(--gold)]">Featured This Season</span>
          </SectionEyebrow>
          <h2 className="mt-4 font-display text-5xl leading-[1.05] text-[var(--cream)] md:text-7xl">
            The <span className="italic gold-text">Midnight Truffle</span>
          </h2>
          <p className="mt-6 max-w-md text-[var(--cream)]/80">
            Belgian dark chocolate, 24k edible gold leaf, seasonal berries and a whisper of espresso ganache. Made to order, delivered fresh within 24 hours.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <MagneticButton variant="gold">
              Order This Cake <ArrowRight size={16} />
            </MagneticButton>
            <div className="flex items-center gap-2 rounded-full glass-dark px-5 py-3 text-xs uppercase tracking-[0.2em] text-[var(--cream)]">
              <Star size={14} className="fill-[var(--gold)] text-[var(--gold)]" />
              4.98 · 320 reviews
            </div>
          </div>
        </div>

        <motion.div style={{ rotate, scale }} className="relative mx-auto aspect-square w-full max-w-[520px]" data-cursor="cake">
          <img src={featuredCake} alt="Midnight Truffle featured cake" loading="lazy" className="h-full w-full rounded-full object-cover shadow-[var(--shadow-luxe)]" />
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <svg viewBox="0 0 200 200" className="h-full w-full">
              <defs>
                <path id="circle-text" d="M 100,100 m -95,0 a 95,95 0 1,1 190,0 a 95,95 0 1,1 -190,0" />
              </defs>
              <text fill="#D9A441" fontSize="10" fontFamily="Cormorant Garamond" letterSpacing="6">
                <textPath href="#circle-text">
                  · SIGNATURE · HANDCRAFTED · SINCE 1969 · MAXIM'S BAKERS · SIGNATURE · HANDCRAFTED · SINCE 1969 ·
                </textPath>
              </text>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- BAKERY PROCESS ---------- */
const process = [
  { title: "Fresh Ingredients", desc: "Local mills. Seasonal fruit. Real butter." },
  { title: "Mixing", desc: "Slow-fermented at cool temperature." },
  { title: "Baking", desc: "Stone-hearth oven, 240°C, watched closely." },
  { title: "Decorating", desc: "Piped, brushed and dusted by hand." },
  { title: "Delivered Fresh", desc: "Warm from the oven to your door." },
];

export function Process() {
  return (
    <section className="relative overflow-hidden bg-[var(--beige)] py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <SectionEyebrow>Our Craft</SectionEyebrow>
          <h2 className="mt-4 font-display text-5xl leading-[1.05] text-[var(--chocolate)] md:text-6xl">
            From flour to <span className="italic gold-text">your door</span>.
          </h2>
        </div>
        <div className="relative">
          <div className="absolute left-0 right-0 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent md:block" />
          <div className="grid gap-6 md:grid-cols-5">
            {process.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 grid h-20 w-20 place-items-center rounded-full bg-[var(--cream)] shadow-[var(--shadow-soft)]">
                  <ProcessIcon i={i} />
                </div>
                <div className="mt-2 font-display text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Step {i + 1}</div>
                <h3 className="mt-2 font-display text-xl text-[var(--chocolate)]">{p.title}</h3>
                <p className="mt-2 max-w-[180px] text-xs text-[var(--coffee)]">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessIcon({ i }: { i: number }) {
  const props = { className: "text-[var(--chocolate)]", size: 28, strokeWidth: 1.5 };
  const icons = [
    <Wheat key="w" {...props} />,
    <svg key="m" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-[var(--chocolate)]"><path d="M6 4h12l-1 8H7z" /><path d="M8 12v8h8v-8" /></svg>,
    <svg key="b" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-[var(--chocolate)]"><rect x="3" y="8" width="18" height="12" rx="2" /><path d="M7 8V5m10 3V5" /></svg>,
    <svg key="d" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-[var(--chocolate)]"><path d="M12 3v18M3 12h18" /><circle cx="12" cy="12" r="4" /></svg>,
    <svg key="t" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-[var(--chocolate)]"><path d="M3 7h13v10H3z" /><path d="M16 10h4l1 3v4h-5" /><circle cx="7" cy="19" r="2" /><circle cx="18" cy="19" r="2" /></svg>,
  ];
  return icons[i];
}

/* ---------- TESTIMONIALS ---------- */
const testimonials = [
  { name: "Priya S.", role: "Regular since 1998", text: "My grandmother's birthday cake came from Maxim's. So did my wedding cake. So will my daughter's." },
  { name: "Marcus L.", role: "Chef & food writer", text: "The lamination on their croissants is museum-grade. I bring visiting chefs here just to prove a point." },
  { name: "Elena R.", role: "Event planner", text: "Every cake arrives on time, exactly as designed. In fifteen years I have never once been disappointed." },
  { name: "James O.", role: "Neighbour", text: "I walk in for a coffee and leave with a loaf, a pastry and a story. Every single time." },
  { name: "Aarti K.", role: "Bride", text: "They turned a sketch on a napkin into the most beautiful cake I have ever seen. Truly artisans." },
  { name: "Diego M.", role: "Regular", text: "The sourdough has a soul. That is the only way I can describe it." },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-[var(--warm-white)] py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <SectionEyebrow>Kind Words</SectionEyebrow>
          <h2 className="mt-4 font-display text-5xl leading-[1.05] text-[var(--chocolate)] md:text-6xl">
            Loved across <span className="italic gold-text">generations</span>.
          </h2>
        </div>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--warm-white)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--warm-white)] to-transparent" />
        <div className="flex animate-marquee gap-6" style={{ animationDuration: "50s" }}>
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="w-[380px] shrink-0 rounded-3xl bg-[var(--cream)] p-8 shadow-[var(--shadow-soft)]"
              data-cursor="button"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="fill-[var(--gold)] text-[var(--gold)]" />
                ))}
              </div>
              <p className="mt-4 font-display text-xl italic leading-snug text-[var(--chocolate)]">
                "{t.text}"
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full gold-bg font-display text-lg text-[var(--chocolate)]">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[var(--chocolate)]">{t.name}</div>
                  <div className="text-xs text-[var(--coffee)]">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- GALLERY ---------- */
const galleryImages = [
  { src: heroImg, alt: "Croissants at sunrise", span: "row-span-2" },
  { src: cakesImg, alt: "Wedding cake" },
  { src: pastriesImg, alt: "Pastry display" },
  { src: breadsImg, alt: "Rustic breads", span: "row-span-2" },
  { src: featuredCake, alt: "Chocolate cake" },
  { src: cookiesImg, alt: "Chocolate cookies" },
  { src: storyImg, alt: "Kneading dough" },
  { src: hampersImg, alt: "Gift hampers" },
];

export function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  return (
    <section id="gallery" className="relative bg-[var(--cream)] py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <SectionEyebrow>Gallery</SectionEyebrow>
          <h2 className="mt-4 font-display text-5xl leading-[1.05] text-[var(--chocolate)] md:text-6xl">
            A morning at <span className="italic gold-text">Maxim's</span>.
          </h2>
        </div>
        <div className="grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4">
          {galleryImages.map((g, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.08 }}
              onClick={() => setLightbox(g.src)}
              data-cursor="image"
              className={`group relative overflow-hidden rounded-2xl shadow-[var(--shadow-soft)] ${g.span ?? ""}`}
            >
              <img src={g.src} alt={g.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--chocolate)]/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-4 left-4 translate-y-4 text-left text-xs uppercase tracking-[0.3em] text-[var(--cream)] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {g.alt}
              </div>
              <div className="absolute inset-0 opacity-0 shadow-[inset_0_0_60px_color-mix(in_oklab,var(--gold)_50%,transparent)] transition-opacity duration-500 group-hover:opacity-100" />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[var(--chocolate)]/90 p-6 backdrop-blur-md"
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute right-6 top-6 rounded-full glass p-3 text-[var(--cream)]"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <motion.img
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightbox}
              alt=""
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-[var(--shadow-luxe)]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- STATS ---------- */
const stats = [
  { value: 57, suffix: "+", label: "Years of tradition" },
  { value: 10000, suffix: "+", label: "Happy customers" },
  { value: 100, suffix: "+", label: "Bakery items" },
  { value: 365, suffix: "", label: "Days baking fresh" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1800;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-[var(--chocolate)] py-24 text-[var(--cream)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--gold)_15%,transparent),transparent_70%)]" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="font-display text-6xl md:text-7xl">
              <span className="gold-text">
                <Counter to={s.value} suffix={s.suffix} />
              </span>
            </div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.4em] text-[var(--cream)]/70">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- INSTAGRAM ---------- */
const insta = [featuredCake, breadsImg, pastriesImg, cakesImg, cookiesImg, hampersImg];

export function InstagramSection() {
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  return (
    <section className="bg-[var(--warm-white)] py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionEyebrow>@maxims.bakers</SectionEyebrow>
            <h2 className="mt-4 font-display text-5xl leading-[1.05] text-[var(--chocolate)] md:text-6xl">
              Fresh from the <span className="italic gold-text">oven</span>.
            </h2>
          </div>
          <a
            href="#"
            data-cursor="button"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--chocolate)] hover:text-[var(--gold)]"
          >
            <Instagram size={16} /> Follow
          </a>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {insta.map((img, i) => (
            <button
              key={i}
              onClick={() => setLiked((l) => ({ ...l, [i]: !l[i] }))}
              data-cursor="image"
              className="group relative aspect-square overflow-hidden rounded-2xl"
            >
              <img src={img} alt={`Instagram post ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--chocolate)]/50 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <Heart
                  size={32}
                  className={`transition-all ${liked[i] ? "scale-125 fill-[var(--gold)] text-[var(--gold)]" : "text-[var(--cream)]"}`}
                />
              </div>
              <AnimatePresence>
                {liked[i] && (
                  <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 3, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="pointer-events-none absolute inset-0 flex items-center justify-center"
                  >
                    <Heart size={40} className="fill-[var(--gold)] text-[var(--gold)]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */
export function CTA() {
  return (
    <section id="cta" className="relative overflow-hidden bg-[var(--chocolate)] py-40 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--gold)_25%,transparent),transparent_65%)]" />
      <FlourParticles count={20} />
      <div className="relative mx-auto max-w-4xl px-6">
        <SectionEyebrow>
          <span className="text-[var(--gold)]">Ready When You Are</span>
        </SectionEyebrow>
        <h2 className="mt-6 font-display text-5xl leading-[1] text-[var(--cream)] md:text-8xl">
          Ready for something <span className="italic gold-text">fresh?</span>
        </h2>
        <p className="mx-auto mt-8 max-w-lg text-[var(--cream)]/75">
          From a single loaf to a five-tier wedding cake — we would love to bake for you.
        </p>
        <div className="mt-12">
          <MagneticButton variant="gold">
            Order Your Favourite Today <ArrowRight size={16} />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
export function Footer() {
  return (
    <footer id="contact" className="relative bg-[var(--warm-white)] pt-24 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full gold-bg shadow-[var(--shadow-gold)]">
                <span className="font-display text-xl text-[var(--chocolate)]">M</span>
              </div>
              <div>
                <div className="font-display text-2xl text-[var(--chocolate)]">Maxim's</div>
                <div className="text-[9px] uppercase tracking-[0.3em] text-[var(--coffee)]">
                  Bakers & Confectioners · Since 1969
                </div>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm text-[var(--coffee)]">
              A family bakery baking bread, pastries and cakes with butter, patience and time — the way we have since 1969.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 flex max-w-md items-center gap-2 rounded-full glass p-1.5 pl-5"
            >
              <input
                type="email"
                placeholder="Your email for warm updates"
                aria-label="Email"
                className="flex-1 bg-transparent text-sm text-[var(--chocolate)] placeholder:text-[var(--coffee)]/70 focus:outline-none"
              />
              <button
                type="submit"
                data-cursor="cta"
                className="rounded-full gold-bg px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--chocolate)]"
              >
                Subscribe
              </button>
            </form>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((I, i) => (
                <a
                  key={i}
                  href="#"
                  data-cursor="button"
                  aria-label="Social link"
                  className="grid h-10 w-10 place-items-center rounded-full border border-[var(--gold)]/30 text-[var(--chocolate)] transition-colors hover:bg-[var(--gold)]"
                >
                  <I size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">Visit</h4>
            <ul className="mt-4 space-y-3 text-sm text-[var(--coffee)]">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-1 shrink-0 text-[var(--gold)]" /> 12 Baker Street, Old Quarter
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-[var(--gold)]" /> +1 (555) 019-6900
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-[var(--gold)]" /> hello@maxims.bakery
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">Hours</h4>
            <ul className="mt-4 space-y-3 text-sm text-[var(--coffee)]">
              <li className="flex items-start gap-2">
                <Clock size={14} className="mt-1 shrink-0 text-[var(--gold)]" />
                <div>
                  <div>Mon – Fri · 7am – 9pm</div>
                  <div>Sat – Sun · 6am – 10pm</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 overflow-hidden rounded-3xl border border-[var(--gold)]/20">
          <div className="relative aspect-[16/5] w-full bg-[var(--beige)]">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,var(--beige)_25%,transparent_25%,transparent_75%,var(--beige)_75%),linear-gradient(45deg,var(--beige)_25%,transparent_25%,transparent_75%,var(--beige)_75%)] bg-[length:40px_40px] bg-[position:0_0,20px_20px] opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={28} className="mx-auto text-[var(--gold)]" />
                <div className="mt-2 font-display text-2xl text-[var(--chocolate)]">Find us on the map</div>
                <div className="mt-1 text-xs text-[var(--coffee)]">12 Baker Street, Old Quarter</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[var(--gold)]/20 pt-6 text-xs text-[var(--coffee)] md:flex-row">
          <div>© {new Date().getFullYear()} Maxim's Bakers & Confectioners. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[var(--chocolate)]" data-cursor="button">Privacy</a>
            <a href="#" className="hover:text-[var(--chocolate)]" data-cursor="button">Terms</a>
            <a href="#" className="hover:text-[var(--chocolate)]" data-cursor="button">Concept demo</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
