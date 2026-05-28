import { Car, HeartPulse, Plane, Shield } from 'lucide-react';
import { formatStatusLabel } from '../../utils/format';
import { formatVnd } from '../../utils/formatCurrency';
import Button from '../ui/Button';
import Card from '../ui/Card';

const iconByType = {
  HEALTH: HeartPulse,
  LIFE: Shield,
  VEHICLE: Car,
  TRAVEL: Plane,
};

const statusStyles = {
  ACTIVE: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  INACTIVE: 'bg-gray-100 text-gray-600 ring-gray-500/20',
};

function getPolicyStatus(policy) {
  return policy.policyStatus || policy.status || 'UNKNOWN';
}

export default function PolicyCard({ policy, onBuy, buyDisabled = false }) {
  const Icon = iconByType[policy.policyType] || Shield;
  const status = getPolicyStatus(policy);
  const statusClass = statusStyles[status] || 'bg-gray-100 text-gray-600 ring-gray-500/20';
  const isActive = status === 'ACTIVE';

  return (
    <Card className="flex h-full flex-col transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
          <Icon className="h-3.5 w-3.5" aria-hidden />
          {formatStatusLabel(policy.policyType || 'Insurance')}
        </span>
        <span
          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusClass}`}
        >
          {formatStatusLabel(status)}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-gray-900">{policy.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">
        {policy.description || 'Comprehensive coverage tailored to your needs.'}
      </p>

      <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 text-sm">
        <div>
          <dt className="text-gray-400">Coverage</dt>
          <dd className="mt-0.5 font-semibold text-gray-900">{formatVnd(policy.coverageAmount)}</dd>
        </div>
        <div>
          <dt className="text-gray-400">Premium</dt>
          <dd className="mt-0.5 font-semibold text-blue-600">{formatVnd(policy.premiumAmount)}</dd>
        </div>
        <div>
          <dt className="text-gray-400">Duration</dt>
          <dd className="mt-0.5 font-medium text-gray-700">
            {policy.durationMonths ? `${policy.durationMonths} months` : '—'}
          </dd>
        </div>
        <div>
          <dt className="text-gray-400">Claim limit</dt>
          <dd className="mt-0.5 font-medium text-gray-700">{policy.claimLimit ?? '—'}</dd>
        </div>
      </dl>

      <Button
        className="mt-6 w-full"
        onClick={() => onBuy?.(policy)}
        disabled={buyDisabled || !isActive}
      >
        {isActive ? 'Buy' : 'Unavailable'}
      </Button>
    </Card>
  );
}
