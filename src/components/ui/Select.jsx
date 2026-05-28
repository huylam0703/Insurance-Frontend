export default function Select({
  label,
  id,
  error,
  className = '',
  children,
  ...props
}) {
  const selectId = id || props.name;

  return (
    <div>
      {label && (
        <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-gray-900 transition-colors focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
        } ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
