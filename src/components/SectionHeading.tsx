const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-10 text-center">
    <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">{title}</h2>
    {subtitle && <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
    <div className="mx-auto mt-4 h-1 w-16 rounded-full gradient-gold" />
  </div>
);

export default SectionHeading;
