export default function SectionTitle({ title }) {
  return (
    <div className="flex items-center justify-center">
      <div className="h-px flex-1 max-w-30 bg-linear-to-r from-transparent to-border-secondary/30" />
      <div className="w-1.5 h-1.5 rounded-full bg-border-secondary/40" />

      <h2 className="text-3xl md:text-4xl px-4 text-text-accent font-medium">{title}</h2>

      <div className="w-1.5 h-1.5 rounded-full bg-border-secondary/40" />
      <div className="h-px flex-1 max-w-30 bg-linear-to-l from-transparent to-border-secondary/30" />
    </div>
  );
}
