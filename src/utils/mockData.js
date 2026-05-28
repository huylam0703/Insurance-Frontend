import { CLAIM_STATUSES } from './constants';

export const dashboardStats = [
  {
    id: 'policies',
    title: 'Total Policies',
    value: 12847,
    change: '+4.2%',
    changeType: 'positive',
    icon: 'FileText',
  },
  {
    id: 'contracts',
    title: 'Active Contracts',
    value: 9632,
    change: '+2.8%',
    changeType: 'positive',
    icon: 'FileSignature',
  },
  {
    id: 'claims',
    title: 'Pending Claims',
    value: 284,
    change: '-12.5%',
    changeType: 'negative',
    icon: 'ClipboardList',
  },
  {
    id: 'payments',
    title: 'Approved Payments',
    value: 1842000,
    change: '+8.1%',
    changeType: 'positive',
    icon: 'CreditCard',
    isCurrency: true,
  },
];

export const claimWorkflowCounts = {
  [CLAIM_STATUSES.SUBMITTED]: 86,
  [CLAIM_STATUSES.UNDER_REVIEW]: 124,
  [CLAIM_STATUSES.NEED_MORE_INFO]: 42,
  [CLAIM_STATUSES.APPROVED]: 58,
  [CLAIM_STATUSES.PAID]: 312,
  [CLAIM_STATUSES.REJECTED]: 31,
};

export const recentClaims = [
  {
    id: 'CLM-2026-10482',
    policyHolder: 'Sarah Mitchell',
    policyNumber: 'POL-88421',
    type: 'Auto Collision',
    amount: 12450,
    status: CLAIM_STATUSES.UNDER_REVIEW,
    submittedAt: '2026-05-17T09:24:00Z',
    assignee: 'James Chen',
  },
  {
    id: 'CLM-2026-10479',
    policyHolder: 'Robert Nguyen',
    policyNumber: 'POL-77203',
    type: 'Property Damage',
    amount: 48200,
    status: CLAIM_STATUSES.NEED_MORE_INFO,
    submittedAt: '2026-05-16T14:11:00Z',
    assignee: 'Emily Watson',
  },
  {
    id: 'CLM-2026-10475',
    policyHolder: 'Lisa Anderson',
    policyNumber: 'POL-91045',
    type: 'Health Reimbursement',
    amount: 3200,
    status: CLAIM_STATUSES.APPROVED,
    submittedAt: '2026-05-16T08:45:00Z',
    assignee: 'David Park',
  },
  {
    id: 'CLM-2026-10471',
    policyHolder: 'Michael Torres',
    policyNumber: 'POL-65892',
    type: 'Liability',
    amount: 156000,
    status: CLAIM_STATUSES.SUBMITTED,
    submittedAt: '2026-05-15T16:30:00Z',
    assignee: 'Unassigned',
  },
  {
    id: 'CLM-2026-10468',
    policyHolder: 'Jennifer Walsh',
    policyNumber: 'POL-44107',
    type: 'Workers Comp',
    amount: 8900,
    status: CLAIM_STATUSES.PAID,
    submittedAt: '2026-05-14T11:20:00Z',
    assignee: 'James Chen',
  },
  {
    id: 'CLM-2026-10465',
    policyHolder: 'Thomas Reed',
    policyNumber: 'POL-33918',
    type: 'Auto Theft',
    amount: 22100,
    status: CLAIM_STATUSES.REJECTED,
    submittedAt: '2026-05-13T10:05:00Z',
    assignee: 'Emily Watson',
  },
];

export const fraudAlerts = [
  {
    id: 'FRD-8821',
    severity: 'high',
    title: 'Duplicate claim submission detected',
    description: 'Same incident reported under POL-88421 and POL-88429 within 2 hours.',
    claimId: 'CLM-2026-10482',
    detectedAt: '2026-05-17T10:15:00Z',
  },
  {
    id: 'FRD-8819',
    severity: 'medium',
    title: 'Unusual payout velocity',
    description: 'Policyholder received 3 payouts in 30 days exceeding threshold.',
    claimId: 'CLM-2026-10455',
    detectedAt: '2026-05-17T08:42:00Z',
  },
  {
    id: 'FRD-8814',
    severity: 'low',
    title: 'Geolocation mismatch',
    description: 'Incident location differs from policy registered address by 240km.',
    claimId: 'CLM-2026-10448',
    detectedAt: '2026-05-16T19:30:00Z',
  },
];

export const currentUser = {
  name: 'Alex Morgan',
  role: 'Claims Administrator',
  email: 'alex.morgan@insureflow.com',
  avatarInitials: 'AM',
  notificationCount: 5,
};
