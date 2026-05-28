export function formatVnd(amount) {
  if (amount == null || amount === '') {
    return '—';
  }

  const value = Number(amount);
  if (Number.isNaN(value)) {
    return '—';
  }

  return `${new Intl.NumberFormat('en-US').format(value)} VND`;
}
