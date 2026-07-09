import { motion, useReducedMotion } from "framer-motion";

export default function BrandBackdrop({ dense = false }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050806]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.06)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.16),transparent_48%),linear-gradient(180deg,rgba(5,8,6,0.18),#050806_78%)]" />
      <motion.div
        className="absolute left-[-12%] top-[18%] h-[1px] w-[124%] bg-gradient-to-r from-transparent via-green-300/30 to-transparent"
        animate={reduceMotion ? undefined : { y: dense ? [0, 90, 0] : [0, 44, 0], opacity: [0.25, 0.7, 0.25] }}
        transition={reduceMotion ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[22%] left-[-8%] h-[1px] w-[116%] bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent"
        animate={reduceMotion ? undefined : { y: dense ? [0, -72, 0] : [0, -36, 0], opacity: [0.15, 0.55, 0.15] }}
        transition={reduceMotion ? undefined : { duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(34,197,94,0.05)_42%,transparent_64%)]" />
    </div>
  );
}
