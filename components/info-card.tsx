type InfoCardProps = {
  title: string;
  description: string;
};

export function InfoCard({ title, description }: InfoCardProps) {
  return (
    <article className="surface p-6">
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
    </article>
  );
}
