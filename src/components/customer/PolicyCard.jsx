import { Car, HeartPulse, Plane, Shield } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import Button from '../ui/Button';
import Card from '../ui/Card';

const iconMap = {
  HeartPulse,
  Shield,
  Car,
  Plane,
};

export default function PolicyCard({ policy }) {
  const Icon = iconMap[policy.icon] || Shield;

  return (
    <Card className="flex h-full flex-col transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
          <Icon className="h-3.5 w-3.5" />
          {policy.type}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{policy.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">{policy.description}</p>
      <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 text-sm">
        <div>
          <dt className="text-gray-400">Coverage</dt>
          <dd className="mt-0.5 font-semibold text-gray-900">
            {formatCurrency(policy.coverageAmount)}
          </dd>
        </div>
        <div>
          <dt className="text-gray-400">Premium</dt>
          <dd className="mt-0.5 font-semibold text-blue-600">
            ${policy.premiumAmount}/mo
          </dd>
        </div>
        <div className="col-span-2">
          <dt className="text-gray-400">Duration</dt>
          <dd className="mt-0.5 font-medium text-gray-700">{policy.duration}</dd>
        </div>
      </dl>
      <Button variant="secondary" className="mt-6 w-full">
        View Details
      </Button>
    </Card>
  );
}
