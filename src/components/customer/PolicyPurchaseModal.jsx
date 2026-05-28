import { useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { purchaseContract } from '../../services/contractService';
import { getApiErrorMessage } from '../../utils/apiError';
import { formatVnd } from '../../utils/formatCurrency';
import { formatStatusLabel } from '../../utils/format';
import { resolvePolicyId } from '../../utils/policy';
import { buildPurchasePayload, INITIAL_PURCHASE_FORM } from '../../utils/purchasePayload';
import { validatePurchaseForm } from '../../utils/validation';

function CheckboxField({ label, name, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-700">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      {label}
    </label>
  );
}

function HealthFields({ form, errors, onChange }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Input
        label="Height (cm)"
        name="heightCm"
        type="number"
        min="1"
        value={form.heightCm}
        onChange={onChange}
        error={errors.heightCm}
      />
      <Input
        label="Weight (kg)"
        name="weightKg"
        type="number"
        min="1"
        value={form.weightKg}
        onChange={onChange}
        error={errors.weightKg}
      />
      <Select
        label="Blood type"
        name="bloodType"
        value={form.bloodType}
        onChange={onChange}
        error={errors.bloodType}
      >
        <option value="">Select blood type</option>
        {['A', 'B', 'AB', 'O'].map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </Select>
      <div className="sm:col-span-2">
        <Input
          label="Medical history"
          name="medicalHistory"
          value={form.medicalHistory}
          onChange={onChange}
          error={errors.medicalHistory}
          placeholder="None"
        />
      </div>
      <div className="sm:col-span-2">
        <Input
          label="Allergies"
          name="allergies"
          value={form.allergies}
          onChange={onChange}
          error={errors.allergies}
          placeholder="None"
        />
      </div>
      <CheckboxField
        label="Smoking"
        name="smoking"
        checked={form.smoking}
        onChange={onChange}
      />
      <CheckboxField
        label="Alcohol use"
        name="alcoholUse"
        checked={form.alcoholUse}
        onChange={onChange}
      />
    </div>
  );
}

function LifeFields({ form, errors, onChange }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Input
          label="Occupation"
          name="occupation"
          value={form.occupation}
          onChange={onChange}
          error={errors.occupation}
        />
      </div>
      <Input
        label="Annual income"
        name="annualIncome"
        type="number"
        min="1"
        value={form.annualIncome}
        onChange={onChange}
        error={errors.annualIncome}
      />
      <Input
        label="Beneficiary name"
        name="beneficiaryName"
        value={form.beneficiaryName}
        onChange={onChange}
        error={errors.beneficiaryName}
      />
      <Input
        label="Beneficiary relationship"
        name="beneficiaryRelationship"
        value={form.beneficiaryRelationship}
        onChange={onChange}
        error={errors.beneficiaryRelationship}
      />
      <Input
        label="Beneficiary phone"
        name="beneficiaryPhone"
        value={form.beneficiaryPhone}
        onChange={onChange}
        error={errors.beneficiaryPhone}
      />
      <div className="sm:col-span-2">
        <Input
          label="Medical history"
          name="medicalHistory"
          value={form.medicalHistory}
          onChange={onChange}
          error={errors.medicalHistory}
        />
      </div>
      <div className="sm:col-span-2">
        <CheckboxField
          label="Smoking"
          name="smoking"
          checked={form.smoking}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

function VehicleFields({ form, errors, vehicleImage, onChange, onFileChange }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Select
        label="Vehicle type"
        name="vehicleType"
        value={form.vehicleType}
        onChange={onChange}
        error={errors.vehicleType}
      >
        <option value="">Select vehicle type</option>
        {['CAR', 'MOTORBIKE', 'TRUCK'].map((type) => (
          <option key={type} value={type}>
            {formatStatusLabel(type)}
          </option>
        ))}
      </Select>
      <Input
        label="License plate"
        name="licensePlate"
        value={form.licensePlate}
        onChange={onChange}
        error={errors.licensePlate}
      />
      <Input label="Brand" name="brand" value={form.brand} onChange={onChange} error={errors.brand} />
      <Input label="Model" name="model" value={form.model} onChange={onChange} error={errors.model} />
      <Input
        label="Manufacture year"
        name="manufactureYear"
        type="number"
        min="1900"
        value={form.manufactureYear}
        onChange={onChange}
        error={errors.manufactureYear}
      />
      <Input
        label="Chassis number"
        name="chassisNumber"
        value={form.chassisNumber}
        onChange={onChange}
        error={errors.chassisNumber}
      />
      <div className="sm:col-span-2">
        <Input
          label="Engine number"
          name="engineNumber"
          value={form.engineNumber}
          onChange={onChange}
          error={errors.engineNumber}
        />
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Vehicle image</label>
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-gray-900 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-blue-700 ${
            errors.vehicleImage ? 'border-red-300' : 'border-gray-200'
          }`}
        />
        {errors.vehicleImage && (
          <p className="mt-1 text-xs text-red-600">{errors.vehicleImage}</p>
        )}
        {vehicleImage && (
          <p className="mt-1 text-xs text-gray-500">Selected: {vehicleImage.name}</p>
        )}
      </div>
    </div>
  );
}

function TravelFields({ form, errors, onChange }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Input
          label="Destination country"
          name="destinationCountry"
          value={form.destinationCountry}
          onChange={onChange}
          error={errors.destinationCountry}
        />
      </div>
      <Input
        label="Departure date"
        name="departureDate"
        type="date"
        value={form.departureDate}
        onChange={onChange}
        error={errors.departureDate}
      />
      <Input
        label="Return date"
        name="returnDate"
        type="date"
        value={form.returnDate}
        onChange={onChange}
        error={errors.returnDate}
      />
      <Input
        label="Passport number"
        name="passportNumber"
        value={form.passportNumber}
        onChange={onChange}
        error={errors.passportNumber}
      />
      <Input
        label="Travel purpose"
        name="travelPurpose"
        value={form.travelPurpose}
        onChange={onChange}
        error={errors.travelPurpose}
      />
      <Input
        label="Emergency contact name"
        name="emergencyContactName"
        value={form.emergencyContactName}
        onChange={onChange}
        error={errors.emergencyContactName}
      />
      <Input
        label="Emergency contact phone"
        name="emergencyContactPhone"
        value={form.emergencyContactPhone}
        onChange={onChange}
        error={errors.emergencyContactPhone}
      />
    </div>
  );
}

function TypeFields({ policyType, form, errors, vehicleImage, onChange, onFileChange }) {
  switch (policyType) {
    case 'HEALTH':
      return <HealthFields form={form} errors={errors} onChange={onChange} />;
    case 'LIFE':
      return <LifeFields form={form} errors={errors} onChange={onChange} />;
    case 'VEHICLE':
      return (
        <VehicleFields
          form={form}
          errors={errors}
          vehicleImage={vehicleImage}
          onChange={onChange}
          onFileChange={onFileChange}
        />
      );
    case 'TRAVEL':
      return <TravelFields form={form} errors={errors} onChange={onChange} />;
    default:
      return (
        <p className="text-sm text-red-600">This policy type is not supported for online purchase.</p>
      );
  }
}

function PolicyPurchaseModalContent({ policy, onClose }) {
  const [form, setForm] = useState(() => ({ ...INITIAL_PURCHASE_FORM }));
  const [vehicleImage, setVehicleImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const policyType = policy.policyType;
  const policyStatus = policy.policyStatus || policy.status || 'UNKNOWN';

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSubmitError('');
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] ?? null;
    setVehicleImage(file);
    setErrors((prev) => ({ ...prev, vehicleImage: undefined }));
    setSubmitError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const policyId = resolvePolicyId(policy);
    if (!policyId) {
      setSubmitError(
        'Unable to purchase this plan. The policy identifier is missing. Please refresh the page and try again.'
      );
      return;
    }

    const validationErrors = validatePurchaseForm(form, policyType, vehicleImage);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setSubmitError('');

    try {
      const requestData = buildPurchasePayload(policyId, policyType, form);
      await purchaseContract(requestData, policyType === 'VEHICLE' ? vehicleImage : null);
      setSuccess(true);
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        setSubmitError('Session expired. Please sign in again to purchase insurance.');
      } else if (status === 403) {
        setSubmitError('You do not have permission to purchase this policy.');
      } else {
        setSubmitError(getApiErrorMessage(error, 'Failed to purchase insurance'));
      }
    } finally {
      setLoading(false);
    }
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
        aria-labelledby="purchase-modal-title"
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-xl"
      >
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-4">
          <div className="min-w-0 pr-4">
            <h2 id="purchase-modal-title" className="text-lg font-semibold text-gray-900">
              {success ? 'Purchase successful' : 'Purchase insurance'}
            </h2>
            <p className="mt-0.5 text-sm text-gray-500">
              {policy.name} · {formatStatusLabel(policyType)} · Premium{' '}
              {formatVnd(policy.premiumAmount)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="shrink-0 rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {success ? (
          <div className="overflow-y-auto px-6 py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" aria-hidden />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">Contract purchased</h3>
            <p className="mt-2 text-sm text-gray-500">
              Your {formatStatusLabel(policyType)} insurance contract has been submitted
              successfully. Our team will review your application shortly.
            </p>
            <Button className="mt-8 w-full sm:w-auto" onClick={onClose}>
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="overflow-y-auto px-6 py-5" noValidate>
            <div className="mb-5 rounded-2xl border border-blue-100 bg-blue-50/60 p-4 text-sm">
              <dl className="grid grid-cols-2 gap-3">
                <div>
                  <dt className="text-blue-600/80">Coverage</dt>
                  <dd className="font-semibold text-gray-900">{formatVnd(policy.coverageAmount)}</dd>
                </div>
                <div>
                  <dt className="text-blue-600/80">Duration</dt>
                  <dd className="font-semibold text-gray-900">{policy.durationMonths} months</dd>
                </div>
                <div>
                  <dt className="text-blue-600/80">Claim limit</dt>
                  <dd className="font-semibold text-gray-900">{policy.claimLimit}</dd>
                </div>
                <div>
                  <dt className="text-blue-600/80">Status</dt>
                  <dd className="font-semibold text-gray-900">{policyStatus}</dd>
                </div>
              </dl>
              {policy.description && (
                <p className="mt-3 border-t border-blue-100 pt-3 text-gray-600">{policy.description}</p>
              )}
            </div>

            <p className="mb-4 text-sm font-medium text-gray-700">
              {formatStatusLabel(policyType)} details
            </p>

            <TypeFields
              policyType={policyType}
              form={form}
              errors={errors}
              vehicleImage={vehicleImage}
              onChange={handleChange}
              onFileChange={handleFileChange}
            />

            {errors._form && (
              <p className="mt-4 text-sm text-red-600">{errors._form}</p>
            )}

            {submitError && (
              <p className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                {submitError}
              </p>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
              <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading || !policyType}>
                {loading ? 'Submitting...' : 'Confirm purchase'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function PolicyPurchaseModal({ open, policy, onClose }) {
  if (!open || !policy) return null;

  const modalKey = resolvePolicyId(policy) ?? policy.name;

  return <PolicyPurchaseModalContent key={modalKey} policy={policy} onClose={onClose} />;
}
