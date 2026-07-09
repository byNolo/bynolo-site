export default function Section({ eyebrow, title, copy, children, className = "" }) {
  return (
    <section className={`px-5 py-16 sm:px-8 lg:px-12 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title || copy) && (
          <div className="mb-10 max-w-3xl">
            {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-green-300">{eyebrow}</p>}
            {title && <h2 className="text-3xl font-semibold tracking-normal text-white sm:text-4xl lg:text-5xl">{title}</h2>}
            {copy && <p className="mt-4 text-base leading-7 text-zinc-300 sm:text-lg">{copy}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
