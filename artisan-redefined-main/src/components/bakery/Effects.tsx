import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 150, damping: 30 });
  return (
    <motion.div
      className="fixed left-0 top-0 z-[100] h-[3px] w-full origin-left gold-bg"
      style={{ scaleX }}
    />
  );
}

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--chocolate)]"
    >
      <div className="relative h-[6px] w-64 overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--gold)_20%,transparent)]">
        <motion.div
          className="absolute inset-y-0 left-0 gold-bg"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
      </div>
      <motion.div
        className="absolute -mt-24"
        initial={{ x: -260, rotate: 0 }}
        animate={{ x: 260, rotate: 720 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      >
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="9" width="20" height="6" rx="3" fill="#D9A441" />
          <rect x="0" y="10.5" width="4" height="3" rx="1" fill="#E8C079" />
          <rect x="20" y="10.5" width="4" height="3" rx="1" fill="#E8C079" />
        </svg>
      </motion.div>
      <motion.div
        className="mt-10 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="font-display text-3xl text-[var(--cream)]">Maxim's</div>
        <div className="mt-2 text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]">
          Bakers & Confectioners · Since 1969
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FlourParticles({ count = 30 }: { count?: number }) {
  const [particles] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 10 + Math.random() * 12,
      size: 2 + Math.random() * 4,
      drift: (Math.random() - 0.5) * 60,
    })),
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-[color-mix(in_oklab,var(--cream)_80%,transparent)]"
          style={{ left: `${p.x}%`, top: "-10px", width: p.size, height: p.size, filter: "blur(0.5px)" }}
          animate={{ y: ["-10px", "110vh"], x: [0, p.drift, -p.drift, 0], opacity: [0, 1, 1, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

export function MouseSpotlight() {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  useEffect(() => {
    const m = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden md:block"
      style={{
        background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, color-mix(in oklab, var(--gold) 12%, transparent), transparent 70%)`,
      }}
    />
  );
}
