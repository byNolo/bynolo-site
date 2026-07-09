import BrandBackdrop from "./BrandBackdrop";
import AnimatedBackground from "./AnimatedBackground";

function ParticleBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 w-screen max-w-full overflow-hidden bg-[#050806]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.18),transparent_48%),linear-gradient(180deg,rgba(5,8,6,0.1),#050806_82%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(34,197,94,0.05)_42%,transparent_64%)]" />
      <AnimatedBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050806]/15 via-transparent to-[#050806]" />
    </div>
  );
}

export default function PageShell({ children, dense = false, background = "grid", className = "" }) {
  return (
    <div className={`relative min-h-screen w-full max-w-full overflow-hidden bg-[#050806] text-white ${className}`}>
      {background === "particles" ? <ParticleBackdrop /> : <BrandBackdrop dense={dense} />}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
