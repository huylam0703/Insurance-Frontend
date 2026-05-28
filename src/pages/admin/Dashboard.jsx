import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  ClipboardPlus,
  FilePlus,
  ShieldAlert,
  UserPlus,
} from 'lucide-react';
import ClaimsTable from '../../components/ui/ClaimsTable';
import DashboardCard from '../../components/ui/DashboardCard';
import StatCard from '../../components/ui/StatCard';
import { CLAIM_STATUSES, CLAIM_WORKFLOW_STEPS } from '../../utils/constants';
import {
  claimWorkflowCounts,
  dashboardStats,
  fraudAlerts,
  recentClaims,
} from '../../utils/mockData';
import { formatRelativeTime, formatStatusLabel } from '../../utils/format';

const severityStyles = {
  high: 'border-red-200 bg-red-50 text-red-700',
  medium: 'border-amber-200 bg-amber-50 text-amber-700',
  low: 'border-blue-200 bg-blue-50 text-blue-700',
};

const quickActions = [
  {
    label: 'New Policy',
    description: 'Register a new insurance policy',
    icon: FilePlus,
    href: '/admin/policies',
    color: 'bg-blue-600 hover:bg-blue-700 text-white',
  },
  {
    label: 'Submit Claim',
    description: 'File a new claim request',
    icon: ClipboardPlus,
    href: '/admin/claims',
    color: 'bg-slate-800 hover:bg-slate-900 text-white',
  },
  {
    label: 'Add User',
    description: 'Invite team member',
    icon: UserPlus,
    href: '/admin/users',
    color: 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50',
  },
];

function ProgressBar({ percentage }) {
  const filled = Math.min(10, Math.max(0, Math.round(percentage / 10)));

  return (
    <div className="flex gap-0.5" role="presentation">
      {Array.from({ length: 10 }, (_, index) => (
        <div
          key={index}
          className={`h-2 flex-1 rounded-sm transition-colors ${
            index < filled ? 'bg-blue-600' : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
}

function ClaimWorkflowSection() {
  const rejectedCount = claimWorkflowCounts[CLAIM_STATUSES.REJECTED] || 0;
  const totalActive = Object.entries(claimWorkflowCounts)
    .filter(([key]) => key !== CLAIM_STATUSES.REJECTED)
    .reduce((sum, [, count]) => sum + count, 0);

  return (
    <DashboardCard
      title="Claims Workflow"
      description="Pipeline from submission through payment or rejection"
    >
      <div className="space-y-6">
        <div className="space-y-5">
          {CLAIM_WORKFLOW_STEPS.map((step, index) => {
            const count = claimWorkflowCounts[step.key] || 0;
            const percentage = totalActive > 0 ? Math.round((count / totalActive) * 100) : 0;

            return (
              <div key={step.key}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">
                    {index + 1}. {step.label}
                  </span>
                  <span className="text-gray-500">
                    {count} <span className="text-gray-400">({percentage}%)</span>
                  </span>
                </div>
                <ProgressBar percentage={percentage} />
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between rounded-xl border border-red-100 bg-red-50/50 px-4 py-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-red-600" aria-hidden />
            <span className="text-sm font-medium text-red-800">
              {formatStatusLabel(CLAIM_STATUSES.REJECTED)}
            </span>
          </div>
          <span className="text-sm font-semibold text-red-700">{rejectedCount} claims</span>
        </div>

        <p className="text-center text-xs text-gray-400">
          SUBMITTED → UNDER_REVIEW → NEED_MORE_INFO → APPROVED → PAID or REJECTED
        </p>
      </div>
    </DashboardCard>
  );
}

function FraudAlertsSection() {
  return (
    <DashboardCard
      title="Fraud Alerts"
      description="AI-detected anomalies requiring review"
      action={
        <Link
          to="/admin/audit-logs"
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      }
    >
      <ul className="space-y-3">
        {fraudAlerts.map((alert) => (
          <li
            key={alert.id}
            className="rounded-xl border border-gray-100 p-4 transition-colors hover:border-gray-200 hover:bg-gray-50/50"
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${severityStyles[alert.severity]}`}
              >
                <AlertTriangle className="h-4 w-4" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${severityStyles[alert.severity]}`}
                  >
                    {alert.severity}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{alert.description}</p>
                <p className="mt-2 text-xs text-gray-400">
                  {alert.claimId} · {formatRelativeTime(alert.detectedAt)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </DashboardCard>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ClaimWorkflowSection />
        </div>

        <DashboardCard title="Quick Actions" description="Common administrative tasks">
          <div className="space-y-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              const isLight = action.color.includes('bg-white');

              return (
                <Link
                  key={action.label}
                  to={action.href}
                  className={`flex items-center gap-4 rounded-xl px-4 py-3.5 text-left shadow-sm transition-all duration-200 hover:shadow-md ${action.color}`}
                >
                  <Icon className={`h-5 w-5 shrink-0 ${isLight ? 'text-blue-600' : ''}`} />
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-semibold ${isLight ? 'text-gray-900' : ''}`}>
                      {action.label}
                    </p>
                    <p className={`text-xs ${isLight ? 'text-gray-500' : 'text-white/80'}`}>
                      {action.description}
                    </p>
                  </div>
                  <ArrowRight
                    className={`h-4 w-4 shrink-0 ${isLight ? 'text-gray-400' : 'text-white/70'}`}
                  />
                </Link>
              );
            })}
          </div>
        </DashboardCard>
      </section>

      <DashboardCard
        title="Recent Claims"
        description="Latest claim submissions across all policy types"
        action={
          <Link
            to="/admin/claims"
            className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            View all claims
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
        noPadding
      >
        <ClaimsTable claims={recentClaims} />
      </DashboardCard>

      <FraudAlertsSection />
    </div>
  );
}
