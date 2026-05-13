export default function SectionTitle({ title, number }) {
  return (
    <div className="flex items-center gap-4 md:gap-5">
      <span className="text-sm md:text-base font-mono text-cyan-300/90 tracking-wider shrink-0">
        {number}
      </span>
      <h2 className="text-2xl md:text-3xl text-text-accent font-medium font-title tracking-tight shrink-0">
        {title}
      </h2>
      <div className="h-px flex-1 bg-linear-to-r from-border-stealth/70 to-transparent" />
    </div>
  );
}
