export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-12">
      <h1 className="text-h1 text-ink">{title}</h1>
      {subtitle && (
        <p className="mt-4 max-w-xl text-body text-ink-muted">{subtitle}</p>
      )}
    </header>
  );
}
