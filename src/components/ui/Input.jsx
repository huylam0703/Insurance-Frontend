export default function Input({
  label,
  id,
  error,
  className = '',
  ...props
}) {
  const inputId = id || props.name;

  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-gray-900 transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
