export const APP_NAME = 'InsureFlow';
export const APP_TAGLINE = 'Policy & Claim Management';

export const CLAIM_STATUSES = {
  SUBMITTED: 'SUBMITTED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  NEED_MORE_INFO: 'NEED_MORE_INFO',
  APPROVED: 'APPROVED',
  PAID: 'PAID',
  REJECTED: 'REJECTED',
};

export const CLAIM_WORKFLOW_STEPS = [
  { key: CLAIM_STATUSES.SUBMITTED, label: 'Submitted' },
  { key: CLAIM_STATUSES.UNDER_REVIEW, label: 'Under Review' },
  { key: CLAIM_STATUSES.NEED_MORE_INFO, label: 'Need More Info' },
  { key: CLAIM_STATUSES.APPROVED, label: 'Approved' },
  { key: CLAIM_STATUSES.PAID, label: 'Paid' },
];

export const NAV_ITEMS = [
  { label: 'Dashboard', path: '/admin', icon: 'LayoutDashboard', end: true },
  { label: 'Policies', path: '/admin/policies', icon: 'FileText' },
  { label: 'Contracts', path: '/admin/contracts', icon: 'FileSignature' },
  { label: 'Claims', path: '/admin/claims', icon: 'ClipboardList' },
  { label: 'Payments', path: '/admin/payments', icon: 'CreditCard' },
  { label: 'Notifications', path: '/admin/notifications', icon: 'Bell' },
  { label: 'Audit Logs', path: '/admin/audit-logs', icon: 'ScrollText' },
  { label: 'Users', path: '/admin/users', icon: 'Users' },
  { label: 'Settings', path: '/admin/settings', icon: 'Settings' },
];

export const STATUS_BADGE_VARIANTS = {
  [CLAIM_STATUSES.SUBMITTED]: 'blue',
  [CLAIM_STATUSES.UNDER_REVIEW]: 'amber',
  [CLAIM_STATUSES.NEED_MORE_INFO]: 'orange',
  [CLAIM_STATUSES.APPROVED]: 'emerald',
  [CLAIM_STATUSES.PAID]: 'green',
  [CLAIM_STATUSES.REJECTED]: 'red',
};
