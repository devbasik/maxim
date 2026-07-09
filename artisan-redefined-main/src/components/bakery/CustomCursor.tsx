import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

type CursorVariant = "default" | "button" | "cake" | "bread" | "pastry" | "image" | "cta";

const cursorLabels: Record<CursorVariant, string> = {
  default: "",
  button: "",
  cake: "Cake",
  bread: "Fresh",
  pastry: "Warm",
  image: "View",
  cta: "Order",
};

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const trailX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.6 });
  const trailY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.6 });

  const [variant, setVariant] = useState<CursorVariant>("default");
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (hidden) setHidden(false);

      const el = e.target as HTMLElement | null;
      if (!el) return;
      const v = el.closest<HTMLElement>("[data-cursor]")?.dataset.cursor as CursorVariant | undefined;
      setVariant(v ?? "default");
    };
    const leave = () => setHidden(true);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, [x, y, hidden]);

  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;
  if (isMobile) return null;

  const isExpanded = variant !== "default";
  const label = cursorLabels[variant];

  return (
    <>
      {/* Trail dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden md:block"
        style={{ x: trailX, y: trailY, translateX: "-50%", translateY: "-50%" }}
      >
        <div className="h-8 w-8 rounded-full bg-[color-mix(in_oklab,var(--gold)_25%,transparent)] blur-md" />
      </motion.div>

      {/* Main cursor */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:flex items-center justify-center"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: hidden ? 0 : isExpanded ? 1 : 1,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {isExpanded ? (
          <motion.div
            layout
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] gold-bg text-[var(--chocolate)] shadow-[var(--shadow-gold)]"
          >
            <CursorIcon variant={variant} />
            <AnimatePresence mode="wait">
              {label && (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 4 }}
                >
                  {label} {variant === "cta" ? "→" : ""}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full gold-bg shadow-[var(--shadow-gold)]">
            <RollingPin />
          </div>
        )}
      </motion.div>
    </>
  );
}

function RollingPin() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="9" width="20" height="6" rx="3" fill="#4A2C22" />
      <rect x="0" y="10.5" width="4" height="3" rx="1" fill="#4A2C22" />
      <rect x="20" y="10.5" width="4" height="3" rx="1" fill="#4A2C22" />
    </svg>
  );
}

function CursorIcon({ variant }: { variant: CursorVariant }) {
  const size = 14;
  switch (variant) {
    case "cake":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#4A2C22">
          <path d="M12 2l1 3-1 1-1-1zM4 10h16v3H4zM3 14h18v6H3z" />
        </svg>
      );
    case "bread":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#4A2C22">
          <path d="M4 12c0-4 4-6 8-6s8 2 8 6-3 8-8 8-8-4-8-8z" />
        </svg>
      );
    case "pastry":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#4A2C22">
          <path d="M3 18l9-14 9 14H3z" />
        </svg>
      );
    case "cta":
    case "button":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#4A2C22">
          <path d="M12 2l2 5h5l-4 3 2 6-5-4-5 4 2-6-4-3h5z" />
        </svg>
      );
    default:
      return null;
  }
}
