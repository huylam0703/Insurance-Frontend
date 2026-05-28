import { useState } from 'react';
import { X } from 'lucide-react';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import { POLICY_STATUSES, POLICY_TYPES } from '../../../utils/constants';
import { validatePolicyForm } from '../../../utils/validation';

const emptyForm = {
  name: '',
  policyType: '',
  description: '',
  coverageAmount: '',
  premiumAmount: '',
  durationMonths: '',
  claimLimit: '',
  policyStatus: 'ACTIVE',
};

function policyToForm(policy) {
  if (!policy) return { ...emptyForm };

  return {
    name: policy.name ?? '',
    policyType: policy.policyType ?? '',
    description: policy.description ?? '',
    coverageAmount: policy.coverageAmount ?? '',
    premiumAmount: policy.premiumAmount ?? '',
    durationMonths: policy.durationMonths ?? '',
    claimLimit: policy.claimLimit ?? '',
    policyStatus: policy.policyStatus || policy.status || 'ACTIVE',
  };
}

function buildPayload(form, isEdit) {
  const payload = {
    name: form.name.trim(),
    policyType: form.policyType,
    description: form.description?.trim() || '',
    coverageAmount: Number(form.coverageAmount),
    premiumAmount: Number(form.premiumAmount),
    durationMonths: Number(form.durationMonths),
    claimLimit: Number(form.claimLimit),
  };

  if (isEdit) {
    payload.policyStatus = form.policyStatus;
  }

  return payload;
}

function PolicyFormModalContent({ policy, loading, submitError, onClose, onSubmit }) {
  const isEdit = Boolean(policy?.id);
  const [form, setForm] = useState(() => policyToForm(policy));
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validatePolicyForm(form, { isEdit });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    await onSubmit(buildPayload(form, isEdit));
  };

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
        aria-labelledby="policy-form-title"
        className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h2 id="policy-form-title" className="text-lg font-semibold text-gray-900">
              {isEdit ? 'Edit policy' : 'Create policy'}
            </h2>
            <p className="mt-0.5 text-sm text-gray-500">
              {isEdit
                ? 'Update coverage, pricing, and availability.'
                : 'Add a new insurance product to the catalog.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto px-6 py-5" noValidate>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Input
                label="Policy name"
                name="name"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Travel Premium"
              />
            </div>

            <Select
              label="Policy type"
              name="policyType"
              value={form.policyType}
              onChange={handleChange}
              error={errors.policyType}
            >
              <option value="">Select type</option>
              {POLICY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>

            {isEdit && (
              <Select
                label="Status"
                name="policyStatus"
                value={form.policyStatus}
                onChange={handleChange}
                error={errors.policyStatus}
              >
                {POLICY_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Select>
            )}

            <Input
              label="Coverage amount (VND)"
              name="coverageAmount"
              type="number"
              min="1"
              value={form.coverageAmount}
              onChange={handleChange}
              error={errors.coverageAmount}
            />

            <Input
              label="Premium amount (VND)"
              name="premiumAmount"
              type="number"
              min="1"
              value={form.premiumAmount}
              onChange={handleChange}
              error={errors.premiumAmount}
            />

            <Input
              label="Duration (months)"
              name="durationMonths"
              type="number"
              min="1"
              value={form.durationMonths}
              onChange={handleChange}
              error={errors.durationMonths}
            />

            <Input
              label="Claim limit"
              name="claimLimit"
              type="number"
              min="0"
              value={form.claimLimit}
              onChange={handleChange}
              error={errors.claimLimit}
            />

            <div className="sm:col-span-2">
              <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-gray-700">
                Description <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={form.description}
                onChange={handleChange}
                placeholder="Brief description of coverage and benefits"
                className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {submitError && (
            <p className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </p>
          )}

          <div className="mt-6 flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
            <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : isEdit ? 'Save changes' : 'Create policy'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function PolicyFormModal({
  open,
  policy,
  loading,
  submitError,
  onClose,
  onSubmit,
}) {
  if (!open) return null;

  const formKey = policy?.id ?? 'create';

  return (
    <PolicyFormModalContent
      key={formKey}
      policy={policy}
      loading={loading}
      submitError={submitError}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
}
