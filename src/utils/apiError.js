export function getApiErrorMessage(error, fallback = 'Something went wrong. Please try again.') {
  const data = error?.response?.data;

  if (!data) {
    return error?.message || fallback;
  }

  if (typeof data === 'string') {
    return data;
  }

  if (data.message) {
    return data.message;
  }

  if (data.error) {
    return typeof data.error === 'string' ? data.error : data.error.message || fallback;
  }

  if (Array.isArray(data.errors) && data.errors.length > 0) {
    return data.errors[0]?.message || data.errors[0] || fallback;
  }

  return fallback;
}
