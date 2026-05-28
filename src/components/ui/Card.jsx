export default function Card({ children, className = '', padding = true }) {
  const paddingClass = padding ? 'p-5 sm:p-6' : '';

  return (
    <article className={`rounded-2xl border border-gray-200/80 bg-white shadow-sm ${paddingClass} ${className}`}>
      {children}
    </article>
  );
}
