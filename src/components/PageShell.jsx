import BrandBackdrop from "./BrandBackdrop";

export default function PageShell({ children, dense = false, className = "" }) {
  return (
    <div className={`relative min-h-screen overflow-hidden bg-[#050806] text-white ${className}`}>
      <BrandBackdrop dense={dense} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
