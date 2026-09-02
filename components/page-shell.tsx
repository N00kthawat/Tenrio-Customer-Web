type PageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export function PageShell({ eyebrow, title, description, children }: PageShellProps) {
  return (
    <div className="space-y-8">
      <section className="surface p-8 sm:p-10">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="page-title mt-4 max-w-4xl">{title}</h1>
        <p className="muted-copy mt-4 max-w-3xl">{description}</p>
      </section>
      {children}
    </div>
  );
}
