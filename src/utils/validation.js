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
