export const mockPolicies = [
  {
    id: 'health-001',
    type: 'Health Insurance',
    title: 'Comprehensive Health Plan',
    description:
      'Hospitalization, outpatient care, and preventive health benefits for individuals and families.',
    coverageAmount: 500000,
    premiumAmount: 89,
    duration: '12 months',
    icon: 'HeartPulse',
  },
  {
    id: 'life-001',
    type: 'Life Insurance',
    title: 'Secure Life Protection',
    description:
      'Financial protection for your loved ones with flexible term and beneficiary options.',
    coverageAmount: 1000000,
    premiumAmount: 65,
    duration: '24 months',
    icon: 'Shield',
  },
  {
    id: 'vehicle-001',
    type: 'Vehicle Insurance',
    title: 'Auto Guard Plus',
    description:
      'Collision, theft, and third-party liability coverage for cars and motorcycles.',
    coverageAmount: 75000,
    premiumAmount: 120,
    duration: '12 months',
    icon: 'Car',
  },
  {
    id: 'travel-001',
    type: 'Travel Insurance',
    title: 'Global Travel Cover',
    description:
      'Trip cancellation, medical emergencies, and baggage protection worldwide.',
    coverageAmount: 100000,
    premiumAmount: 45,
    duration: 'Per trip',
    icon: 'Plane',
  },
];

export const customerFeatures = [
  {
    title: 'Buy Insurance Online',
    description: 'Compare plans and purchase coverage in minutes without paperwork.',
    icon: 'ShoppingCart',
  },
  {
    title: 'Manage Contracts',
    description: 'View active policies, renewal dates, and contract documents anytime.',
    icon: 'FileText',
  },
  {
    title: 'Submit Claims',
    description: 'File claims digitally with supporting documents and real-time tracking.',
    icon: 'ClipboardList',
  },
  {
    title: 'Track Claim Status',
    description: 'Follow every step from submission to approval or payment.',
    icon: 'Activity',
  },
  {
    title: 'Secure Payment',
    description: 'Encrypted checkout with instant payment confirmation and receipts.',
    icon: 'Lock',
  },
  {
    title: 'Notification Updates',
    description: 'Get alerts for claim progress, renewals, and policy changes.',
    icon: 'Bell',
  },
];

export const purchaseSteps = [
  { key: 'browse', label: 'Browse', description: 'Explore available insurance plans' },
  { key: 'select', label: 'Select Policy', description: 'Choose the coverage that fits you' },
  { key: 'confirm', label: 'Confirm', description: 'Review and verify your information' },
  { key: 'payment', label: 'Payment', description: 'Complete secure online payment' },
  { key: 'active', label: 'Active Contract', description: 'Your policy is live and protected' },
];

export const claimSteps = [
  { key: 'submitted', label: 'Submitted', status: 'SUBMITTED' },
  { key: 'review', label: 'Under Review', status: 'UNDER_REVIEW' },
  { key: 'info', label: 'Need More Info', status: 'NEED_MORE_INFO' },
  { key: 'approved', label: 'Approved', status: 'APPROVED' },
  { key: 'paid', label: 'Paid', status: 'PAID' },
  { key: 'rejected', label: 'Rejected', status: 'REJECTED' },
];
