import { AlertTriangle, X } from 'lucide-react';
import Button from './Button';

export default function ConfirmModal({
  open,
  title = 'Confirm action',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  loading = false,
  variant = 'danger',
  onConfirm,
  onClose,
}) {
  if (!open) return null;

  const confirmVariant = variant === 'danger' ? 'primary' : 'primary';
  const confirmClassName =
    variant === 'danger'
      ? 'bg-red-600 shadow-red-600/20 hover:bg-red-700 focus-visible:ring-red-500'
      : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
        aria-label="Close dialog backdrop"
        onClick={onClose}
        disabled={loading}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        className="relative w-full max-w-md rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xl"
      >
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="absolute right-4 top-4 rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-start gap-4">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              variant === 'danger'
                ? 'bg-red-50 text-red-600'
                : 'bg-blue-50 text-blue-600'
            }`}
          >
            <AlertTriangle className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0 pr-6">
            <h2 id="confirm-modal-title" className="text-lg font-semibold text-gray-900">
              {title}
            </h2>
            {message && <p className="mt-2 text-sm text-gray-500">{message}</p>}
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            variant={confirmVariant}
            onClick={onConfirm}
            disabled={loading}
            className={confirmClassName}
          >
            {loading ? 'Processing...' : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
