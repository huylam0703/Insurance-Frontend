import { useCallback, useEffect, useState } from 'react';
import { AlertCircle, FilePlus, Pencil, RefreshCw, Trash2 } from 'lucide-react';
import PolicyFormModal from '../../components/admin/policies/PolicyFormModal';
import Button from '../../components/ui/Button';
import ConfirmModal from '../../components/ui/ConfirmModal';
import DashboardCard from '../../components/ui/DashboardCard';
import StatusBadge from '../../components/ui/StatusBadge';
import {
  createPolicy,
  deletePolicy,
  getPolicies,
  updatePolicy,
} from '../../services/policyService';
import { getApiErrorMessage } from '../../utils/apiError';
import { formatVnd } from '../../utils/formatCurrency';
import { formatStatusLabel } from '../../utils/format';

function getPolicyStatus(policy) {
  return policy.policyStatus || policy.status || 'UNKNOWN';
}

function getPolicyErrorMessage(error, fallback) {
  const status = error?.response?.status;
  if (status === 401) {
    return 'Session expired. Please sign in again.';
  }
  if (status === 403) {
    return 'You do not have permission to perform this action.';
  }
  return getApiErrorMessage(error, fallback);
}

function AlertBanner({ type, message, onDismiss }) {
  if (!message) return null;

  const styles =
    type === 'success'
      ? 'border-emerald-100 bg-emerald-50 text-emerald-800'
      : 'border-red-100 bg-red-50 text-red-800';

  return (
    <div
      className={`flex items-start justify-between gap-3 rounded-2xl border px-4 py-3 text-sm ${styles}`}
      role="alert"
    >
      <p>{message}</p>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 text-xs font-semibold uppercase tracking-wide opacity-70 hover:opacity-100"
        >
          Dismiss
        </button>
      )}
    </div>
  );
}

function PolicyActions({ policy, onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-end gap-1">
      <button
        type="button"
        onClick={() => onEdit(policy)}
        className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
      >
        <Pencil className="h-4 w-4" aria-hidden />
        Edit
      </button>
      <button
        type="button"
        onClick={() => onDelete(policy)}
        className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4" aria-hidden />
        Delete
      </button>
    </div>
  );
}

function PoliciesTable({ policies, onEdit, onDelete }) {
  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {[
              'Name',
              'Policy Type',
              'Coverage Amount',
              'Premium Amount',
              'Duration Months',
              'Claim Limit',
              'Status',
              'Actions',
            ].map((heading) => (
              <th
                key={heading}
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:px-6"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {policies.map((policy) => {
            const status = getPolicyStatus(policy);
            return (
              <tr key={policy.id} className="transition-colors hover:bg-gray-50/80">
                <td className="whitespace-nowrap px-4 py-4 sm:px-6">
                  <p className="text-sm font-medium text-gray-900">{policy.name}</p>
                  {policy.description && (
                    <p className="mt-0.5 max-w-xs truncate text-xs text-gray-500">
                      {policy.description}
                    </p>
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600 sm:px-6">
                  {formatStatusLabel(policy.policyType || '—')}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900 sm:px-6">
                  {formatVnd(policy.coverageAmount)}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900 sm:px-6">
                  {formatVnd(policy.premiumAmount)}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600 sm:px-6">
                  {policy.durationMonths ?? '—'}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600 sm:px-6">
                  {policy.claimLimit ?? '—'}
                </td>
                <td className="whitespace-nowrap px-4 py-4 sm:px-6">
                  <StatusBadge status={status} />
                </td>
                <td className="whitespace-nowrap px-4 py-4 sm:px-6">
                  <PolicyActions policy={policy} onEdit={onEdit} onDelete={onDelete} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function PoliciesCards({ policies, onEdit, onDelete }) {
  return (
    <div className="space-y-4 md:hidden">
      {policies.map((policy) => {
        const status = getPolicyStatus(policy);
        return (
          <article
            key={policy.id}
            className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-gray-900">{policy.name}</h3>
                <p className="mt-0.5 text-xs text-gray-500">
                  {formatStatusLabel(policy.policyType || '—')}
                </p>
              </div>
              <StatusBadge status={status} />
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs text-gray-500">Coverage</dt>
                <dd className="font-medium text-gray-900">{formatVnd(policy.coverageAmount)}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Premium</dt>
                <dd className="font-medium text-gray-900">{formatVnd(policy.premiumAmount)}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Duration</dt>
                <dd className="font-medium text-gray-900">{policy.durationMonths} months</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Claim limit</dt>
                <dd className="font-medium text-gray-900">{policy.claimLimit}</dd>
              </div>
            </dl>

            {policy.description && (
              <p className="mt-3 text-xs text-gray-500 line-clamp-2">{policy.description}</p>
            )}

            <div className="mt-4 border-t border-gray-100 pt-3">
              <PolicyActions policy={policy} onEdit={onEdit} onDelete={onDelete} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function PoliciesPage() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadPolicies = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getPolicies();
      setPolicies(data);
    } catch (err) {
      setPolicies([]);
      setError(getPolicyErrorMessage(err, 'Failed to load policies. Please try again.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await getPolicies();
        if (cancelled) return;
        setPolicies(data);
        setError('');
      } catch (err) {
        if (cancelled) return;
        setPolicies([]);
        setError(getPolicyErrorMessage(err, 'Failed to load policies. Please try again.'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleOpenCreate = () => {
    setEditingPolicy(null);
    setFormOpen(true);
    setFormError('');
    setSuccessMessage('');
  };

  const handleOpenEdit = (policy) => {
    setEditingPolicy(policy);
    setFormOpen(true);
    setFormError('');
    setSuccessMessage('');
  };

  const handleCloseForm = () => {
    if (!formLoading) {
      setFormOpen(false);
      setEditingPolicy(null);
    }
  };

  const handleFormSubmit = async (payload) => {
    setFormLoading(true);
    setFormError('');
    setSuccessMessage('');

    try {
      if (editingPolicy?.id) {
        await updatePolicy(editingPolicy.id, payload);
        setSuccessMessage('Policy updated successfully.');
      } else {
        await createPolicy(payload);
        setSuccessMessage('Policy created successfully.');
      }

      setFormOpen(false);
      setEditingPolicy(null);
      await loadPolicies();
    } catch (err) {
      setFormError(
        getPolicyErrorMessage(
          err,
          editingPolicy?.id
            ? 'Failed to update policy. Please try again.'
            : 'Failed to create policy. Please try again.'
        )
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget?.id) return;

    setDeleteLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      await deletePolicy(deleteTarget.id);
      setSuccessMessage(`"${deleteTarget.name}" was deleted successfully.`);
      setDeleteTarget(null);
      await loadPolicies();
    } catch (err) {
      setError(getPolicyErrorMessage(err, 'Failed to delete policy. Please try again.'));
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <AlertBanner type="success" message={successMessage} onDismiss={() => setSuccessMessage('')} />
      {error && !loading && policies.length > 0 && (
        <AlertBanner type="error" message={error} onDismiss={() => setError('')} />
      )}

      <DashboardCard
        title="Policy catalog"
        description="Manage insurance products, coverage limits, and pricing."
        action={
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={loadPolicies}
              disabled={loading}
              className="gap-1.5"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} aria-hidden />
              Refresh
            </Button>
            <Button size="sm" onClick={handleOpenCreate} className="gap-1.5">
              <FilePlus className="h-4 w-4" aria-hidden />
              New policy
            </Button>
          </div>
        }
        noPadding={!loading && !error && policies.length > 0}
      >
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
            <p className="mt-4 text-sm text-gray-500">Loading policies...</p>
          </div>
        )}

        {!loading && error && policies.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <AlertCircle className="h-6 w-6" aria-hidden />
            </div>
            <p className="mt-4 max-w-md text-sm text-gray-600">{error}</p>
            <Button className="mt-6" variant="secondary" onClick={loadPolicies}>
              Try again
            </Button>
          </div>
        )}

        {!loading && !error && policies.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <FilePlus className="h-6 w-6" aria-hidden />
            </div>
            <h3 className="mt-4 text-base font-semibold text-gray-900">No policies yet</h3>
            <p className="mt-2 max-w-sm text-sm text-gray-500">
              Create your first insurance product to make it available for contracts and claims.
            </p>
            <Button className="mt-6 gap-1.5" onClick={handleOpenCreate}>
              <FilePlus className="h-4 w-4" aria-hidden />
              Create policy
            </Button>
          </div>
        )}

        {!loading && policies.length > 0 && (
          <>
            <PoliciesTable
              policies={policies}
              onEdit={handleOpenEdit}
              onDelete={setDeleteTarget}
            />
            <div className="p-4 sm:p-6 md:hidden">
              <PoliciesCards
                policies={policies}
                onEdit={handleOpenEdit}
                onDelete={setDeleteTarget}
              />
            </div>
          </>
        )}
      </DashboardCard>

      <PolicyFormModal
        open={formOpen}
        policy={editingPolicy}
        loading={formLoading}
        submitError={formError}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
      />

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete policy"
        message={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.name}"? This action cannot be undone.`
            : ''
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        loading={deleteLoading}
        variant="danger"
        onClose={() => !deleteLoading && setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
