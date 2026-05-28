export default function DashboardCard({
  title,
  description,
  action,
  children,
  className = '',
  noPadding = false,
}) {
  return (
    <section
      className={`rounded-2xl border border-gray-200/80 bg-white shadow-sm ${className}`}
    >
      {(title || description || action) && (
        <header className="flex flex-col gap-3 border-b border-gray-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
          <div className="min-w-0">
            {title && (
              <h2 className="text-base font-semibold text-gray-900 sm:text-lg">{title}</h2>
            )}
            {description && (
              <p className="mt-0.5 text-sm text-gray-500">{description}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </header>
      )}
      <div className={noPadding ? '' : 'p-4 sm:p-6'}>{children}</div>
    </section>
  );
}
