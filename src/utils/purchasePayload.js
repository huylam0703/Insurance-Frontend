/**
 * Builds the JSON body for POST /contracts/purchase.
 * Backend ContractCreationRequest expects `policy_id` (not policyId).
 */
export function buildPurchasePayload(policyId, policyType, form) {
  const base = { policy_id: policyId };

  switch (policyType) {
    case 'HEALTH':
      return {
        ...base,
        healthDetail: {
          heightCm: Number(form.heightCm),
          weightKg: Number(form.weightKg),
          bloodType: form.bloodType,
          medicalHistory: form.medicalHistory?.trim() || '',
          allergies: form.allergies?.trim() || '',
          smoking: Boolean(form.smoking),
          alcoholUse: Boolean(form.alcoholUse),
        },
      };

    case 'LIFE':
      return {
        ...base,
        lifeDetail: {
          occupation: form.occupation.trim(),
          annualIncome: Number(form.annualIncome),
          beneficiaryName: form.beneficiaryName.trim(),
          beneficiaryRelationship: form.beneficiaryRelationship.trim(),
          beneficiaryPhone: form.beneficiaryPhone.trim(),
          medicalHistory: form.medicalHistory.trim(),
          smoking: Boolean(form.smoking),
        },
      };

    case 'VEHICLE':
      return {
        ...base,
        vehicleDetail: {
          vehicleType: form.vehicleType,
          licensePlate: form.licensePlate.trim(),
          brand: form.brand.trim(),
          model: form.model.trim(),
          manufactureYear: Number(form.manufactureYear),
          chassisNumber: form.chassisNumber.trim(),
          engineNumber: form.engineNumber.trim(),
        },
      };

    case 'TRAVEL':
      return {
        ...base,
        travelDetail: {
          destinationCountry: form.destinationCountry.trim(),
          departureDate: form.departureDate,
          returnDate: form.returnDate,
          passportNumber: form.passportNumber.trim(),
          travelPurpose: form.travelPurpose.trim(),
          emergencyContactName: form.emergencyContactName.trim(),
          emergencyContactPhone: form.emergencyContactPhone.trim(),
        },
      };

    default:
      throw new Error(`Unsupported policy type: ${policyType}`);
  }
}

export const INITIAL_PURCHASE_FORM = {
  heightCm: '',
  weightKg: '',
  bloodType: '',
  medicalHistory: '',
  allergies: '',
  smoking: false,
  alcoholUse: false,
  occupation: '',
  annualIncome: '',
  beneficiaryName: '',
  beneficiaryRelationship: '',
  beneficiaryPhone: '',
  vehicleType: '',
  licensePlate: '',
  brand: '',
  model: '',
  manufactureYear: '',
  chassisNumber: '',
  engineNumber: '',
  destinationCountry: '',
  departureDate: '',
  returnDate: '',
  passportNumber: '',
  travelPurpose: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
};
