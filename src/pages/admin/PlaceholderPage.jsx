import DashboardCard from '../../components/ui/DashboardCard';

export default function PlaceholderPage({ title, description }) {
  return (
    <DashboardCard title={title} description={description}>
      <p className="text-sm text-gray-500">
        This module is ready for integration. Connect your API endpoints via{' '}
        <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-700">
          src/services/api.js
        </code>
        .
      </p>
    </DashboardCard>
  );
}
