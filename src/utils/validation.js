export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateLoginForm({ username, password }) {
  const errors = {};

  if (!username?.trim()) {
    errors.username = 'Username is required';
  }

  if (!password) {
    errors.password = 'Password is required';
  }

  return errors;
}

export function validateRegisterForm(form) {
  const errors = {};

  if (!form.firstName?.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!form.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (!form.dob) {
    errors.dob = 'Date of birth is required';
  }

  if (!form.username?.trim()) {
    errors.username = 'Username is required';
  }

  if (!form.password) {
    errors.password = 'Password is required';
  } else if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (!form.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(form.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!form.identityNumber?.trim()) {
    errors.identityNumber = 'Identity number is required';
  }

  return errors;
}

export function validatePolicyForm(form, { isEdit = false } = {}) {
  const errors = {};

  if (!form.name?.trim()) {
    errors.name = 'Name is required';
  }

  if (!form.policyType) {
    errors.policyType = 'Policy type is required';
  }

  const coverageAmount = Number(form.coverageAmount);
  if (form.coverageAmount === '' || form.coverageAmount == null) {
    errors.coverageAmount = 'Coverage amount is required';
  } else if (Number.isNaN(coverageAmount) || coverageAmount <= 0) {
    errors.coverageAmount = 'Coverage amount must be greater than 0';
  }

  const premiumAmount = Number(form.premiumAmount);
  if (form.premiumAmount === '' || form.premiumAmount == null) {
    errors.premiumAmount = 'Premium amount is required';
  } else if (Number.isNaN(premiumAmount) || premiumAmount <= 0) {
    errors.premiumAmount = 'Premium amount must be greater than 0';
  }

  const durationMonths = Number(form.durationMonths);
  if (form.durationMonths === '' || form.durationMonths == null) {
    errors.durationMonths = 'Duration is required';
  } else if (Number.isNaN(durationMonths) || durationMonths <= 0) {
    errors.durationMonths = 'Duration must be greater than 0';
  }

  const claimLimit = Number(form.claimLimit);
  if (form.claimLimit === '' || form.claimLimit == null) {
    errors.claimLimit = 'Claim limit is required';
  } else if (Number.isNaN(claimLimit) || claimLimit < 0) {
    errors.claimLimit = 'Claim limit must be 0 or greater';
  }

  if (isEdit && !form.policyStatus) {
    errors.policyStatus = 'Status is required';
  }

  return errors;
}

function requirePositiveNumber(errors, field, value, label) {
  if (value === '' || value == null) {
    errors[field] = `${label} is required`;
    return;
  }
  const num = Number(value);
  if (Number.isNaN(num) || num <= 0) {
    errors[field] = `${label} must be greater than 0`;
  }
}

function requireText(errors, field, value, label) {
  if (!value?.trim()) {
    errors[field] = `${label} is required`;
  }
}

export function validatePurchaseForm(form, policyType, vehicleImage) {
  const errors = {};

  if (!policyType) {
    errors._form = 'Invalid policy type';
    return errors;
  }

  switch (policyType) {
    case 'HEALTH':
      requirePositiveNumber(errors, 'heightCm', form.heightCm, 'Height');
      requirePositiveNumber(errors, 'weightKg', form.weightKg, 'Weight');
      if (!form.bloodType) {
        errors.bloodType = 'Blood type is required';
      }
      break;

    case 'LIFE':
      requireText(errors, 'occupation', form.occupation, 'Occupation');
      requirePositiveNumber(errors, 'annualIncome', form.annualIncome, 'Annual income');
      requireText(errors, 'beneficiaryName', form.beneficiaryName, 'Beneficiary name');
      requireText(
        errors,
        'beneficiaryRelationship',
        form.beneficiaryRelationship,
        'Beneficiary relationship'
      );
      requireText(errors, 'beneficiaryPhone', form.beneficiaryPhone, 'Beneficiary phone');
      requireText(errors, 'medicalHistory', form.medicalHistory, 'Medical history');
      break;

    case 'VEHICLE':
      if (!form.vehicleType) {
        errors.vehicleType = 'Vehicle type is required';
      }
      requireText(errors, 'licensePlate', form.licensePlate, 'License plate');
      requireText(errors, 'brand', form.brand, 'Brand');
      requireText(errors, 'model', form.model, 'Model');
      requirePositiveNumber(errors, 'manufactureYear', form.manufactureYear, 'Manufacture year');
      requireText(errors, 'chassisNumber', form.chassisNumber, 'Chassis number');
      requireText(errors, 'engineNumber', form.engineNumber, 'Engine number');
      if (!vehicleImage) {
        errors.vehicleImage = 'Vehicle image is required';
      }
      break;

    case 'TRAVEL':
      requireText(errors, 'destinationCountry', form.destinationCountry, 'Destination country');
      if (!form.departureDate) {
        errors.departureDate = 'Departure date is required';
      }
      if (!form.returnDate) {
        errors.returnDate = 'Return date is required';
      } else if (
        form.departureDate &&
        form.returnDate &&
        form.returnDate <= form.departureDate
      ) {
        errors.returnDate = 'Return date must be after departure date';
      }
      requireText(errors, 'passportNumber', form.passportNumber, 'Passport number');
      requireText(errors, 'travelPurpose', form.travelPurpose, 'Travel purpose');
      requireText(
        errors,
        'emergencyContactName',
        form.emergencyContactName,
        'Emergency contact name'
      );
      requireText(
        errors,
        'emergencyContactPhone',
        form.emergencyContactPhone,
        'Emergency contact phone'
      );
      break;

    default:
      errors._form = 'Unsupported policy type';
  }

  return errors;
}
