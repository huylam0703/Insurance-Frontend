import {
  ClipboardList,
  CreditCard,
  FileSignature,
  FileText,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { formatCurrency, formatNumber } from '../../utils/format';

const iconMap = {
  FileText,
  FileSignature,
  ClipboardList,
  CreditCard,
};

export default function StatCard({ title, value, change, changeType, icon, isCurrency }) {
  const Icon = iconMap[icon] || FileText;
  const isPositive = changeType === 'positive';
  const displayValue = isCurrency ? formatCurrency(value) : formatNumber(value);

  return (
    <article className="group rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
      <header className="flex items-start justify-between gap-4">
        <section className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            {displayValue}
          </p>
          <p className="mt-3 flex items-center gap-1.5">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 shrink-0 text-emerald-500" aria-hidden />
            ) : (
              <TrendingDown className="h-4 w-4 shrink-0 text-red-500" aria-hidden />
            )}
            <span
              className={`text-sm font-medium ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}
            >
              {change}
            </span>
            <span className="text-sm text-gray-400">vs last month</span>
          </p>
        </section>
        <aside className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
          <Icon className="h-5 w-5" aria-hidden />
        </aside>
      </header>
    </article>
  );
}
