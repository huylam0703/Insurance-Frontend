import { ArrowUpRight } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { formatCurrency, formatDate } from '../../utils/format';

export default function ClaimsTable({ claims, onViewClaim }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:px-6"
            >
              Claim ID
            </th>
            <th
              scope="col"
              className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 md:table-cell sm:px-6"
            >
              Policy Holder
            </th>
            <th
              scope="col"
              className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 lg:table-cell sm:px-6"
            >
              Type
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:px-6"
            >
              Amount
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:px-6"
            >
              Status
            </th>
            <th
              scope="col"
              className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:table-cell sm:px-6"
            >
              Submitted
            </th>
            <th scope="col" className="relative px-4 py-3 sm:px-6">
              <span className="sr-only">View</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {claims.map((claim) => (
            <tr
              key={claim.id}
              className="transition-colors hover:bg-gray-50/80"
            >
              <td className="whitespace-nowrap px-4 py-4 sm:px-6">
                <div>
                  <p className="text-sm font-medium text-gray-900">{claim.id}</p>
                  <p className="text-xs text-gray-500 md:hidden">{claim.policyHolder}</p>
                </div>
              </td>
              <td className="hidden whitespace-nowrap px-4 py-4 md:table-cell sm:px-6">
                <div>
                  <p className="text-sm font-medium text-gray-900">{claim.policyHolder}</p>
                  <p className="text-xs text-gray-500">{claim.policyNumber}</p>
                </div>
              </td>
              <td className="hidden whitespace-nowrap px-4 py-4 text-sm text-gray-600 lg:table-cell sm:px-6">
                {claim.type}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900 sm:px-6">
                {formatCurrency(claim.amount)}
              </td>
              <td className="whitespace-nowrap px-4 py-4 sm:px-6">
                <StatusBadge status={claim.status} />
              </td>
              <td className="hidden whitespace-nowrap px-4 py-4 text-sm text-gray-500 sm:table-cell sm:px-6">
                {formatDate(claim.submittedAt)}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-right text-sm sm:px-6">
                <button
                  type="button"
                  onClick={() => onViewClaim?.(claim)}
                  className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  View
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
