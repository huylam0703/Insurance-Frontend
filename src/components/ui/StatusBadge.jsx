import { STATUS_BADGE_VARIANTS } from '../../utils/constants';
import { formatStatusLabel } from '../../utils/format';

const variantStyles = {
  blue: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  amber: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  orange: 'bg-orange-50 text-orange-700 ring-orange-600/20',
  emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  green: 'bg-green-50 text-green-700 ring-green-600/20',
  red: 'bg-red-50 text-red-700 ring-red-600/20',
  gray: 'bg-gray-100 text-gray-700 ring-gray-500/20',
};

export default function StatusBadge({ status, className = '' }) {
  const variant = STATUS_BADGE_VARIANTS[status] || 'gray';
  const styles = variantStyles[variant];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${styles} ${className}`}
    >
      {formatStatusLabel(status)}
    </span>
  );
}
