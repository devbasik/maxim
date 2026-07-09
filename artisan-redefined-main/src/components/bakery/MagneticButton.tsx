import { useRef, forwardRef, type ButtonHTMLAttributes } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "gold" | "outline";
};

export const MagneticButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, variant = "gold", className = "", ...rest }, _ref) => {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 200, damping: 15 });
    const sy = useSpring(y, { stiffness: 200, damping: 15 });

    const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      x.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 20);
      y.set(((e.clientY - (r.top + r.height / 2)) / r.height) * 20);
    };
    const onLeave = () => {
      x.set(0);
      y.set(0);
    };

    const base =
      "relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] transition-shadow";
    const styles =
      variant === "gold"
        ? "gold-bg text-[var(--chocolate)] shadow-[var(--shadow-gold)] hover:shadow-[0_30px_70px_-15px_color-mix(in_oklab,var(--gold)_70%,transparent)]"
        : "border border-[var(--chocolate)]/40 text-[var(--chocolate)] hover:bg-[var(--chocolate)] hover:text-[var(--cream)]";

    return (
      <motion.button
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ x: sx, y: sy }}
        data-cursor="cta"
        className={`${base} ${styles} ${className}`}
        {...(rest as React.ComponentProps<typeof motion.button>)}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        {variant === "gold" && <span className="absolute inset-0 -translate-x-full animate-shimmer" />}
      </motion.button>
    );
  },
);
MagneticButton.displayName = "MagneticButton";
