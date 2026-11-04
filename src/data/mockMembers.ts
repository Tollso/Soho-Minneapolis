import { VIPMember } from '../types';

export const INITIAL_MEMBERS: VIPMember[] = [
  {
    id: 'VIP-BLACK-0001',
    fullName: 'Alexander Sterling',
    email: 'sterling@soholounge.com',
    phone: '(612) 555-0199',
    profession: 'Venture Capitalist / Managing Partner',
    tier: 'Black Card',
    cardNumber: 'SOHO-BLK-9921-X',
    memberSince: '2024',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    paymentStatus: 'Paid',
    paymentAmount: 2500,
    paymentDate: '2026-01-15T18:30:00.000Z',
    paymentTransactionId: 'TXN-BLK-9921-SUCCEEDED',
    approvalStatus: 'Approved',
    status: 'Active',
    cardIssued: true,
    approvedAt: '2026-01-15T19:00:00.000Z',
    approvedBy: 'Admin (Soho Executive)',
    perks: [
      'Unlimited Express Line Bypass + 4 Guests',
      'Private Elevator & Amuse / The Suite Access',
      '24/7 Dedicated Concierge & Bottle Storage',
      'Complimentary Dom Pérignon Birthday Bottle'
    ],
    qrCodeValue: 'SOHO-BLK-0001-VALID-2026',
    totalVisits: 38
  },
  {
    id: 'VIP-GOLD-7749',
    fullName: 'Elena Rostova',
    email: 'elena.r@example.com',
    phone: '(612) 555-0142',
    profession: 'Creative Director & Fashion Consultant',
    tier: 'Gold',
    cardNumber: 'SOHO-GLD-7749-A',
    memberSince: '2025',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    paymentStatus: 'Paid',
    paymentAmount: 500,
    paymentDate: '2026-03-10T21:15:00.000Z',
    paymentTransactionId: 'TXN-GLD-7749-SUCCEEDED',
    approvalStatus: 'Approved',
    status: 'Active',
    cardIssued: true,
    approvedAt: '2026-03-10T22:00:00.000Z',
    approvedBy: 'Admin (Soho Executive)',
    perks: [
      'Express Line Bypass for Cardholder + 1 Guest',
      'Priority Table Reservations',
      '10% Discount on Bottle Packages',
      'Exclusive Access to Artist Afterparties'
    ],
    qrCodeValue: 'SOHO-GLD-7749-VALID-2026',
    totalVisits: 14
  },
  {
    id: 'VIP-PLT-4318',
    fullName: 'Dominic Vance',
    email: 'dominic.vance@example.com',
    phone: '(612) 555-0183',
    profession: 'Principal Architect & Studio Lead',
    tier: 'Platinum',
    cardNumber: 'SOHO-PLT-4318-P',
    memberSince: '2026',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    paymentStatus: 'Paid',
    paymentAmount: 1200,
    paymentDate: '2026-09-18T20:10:00.000Z',
    paymentTransactionId: 'TXN-PLT-4318-SUCCEEDED',
    approvalStatus: 'Pending for Admin Approval',
    status: 'Pending for Admin Approval',
    cardIssued: false,
    perks: [
      'Line Bypass for Cardholder + 3 Guests',
      'Monthly Complimentary Welcome Champagne Bottle',
      'Dedicated VIP Host & Concierge Hotline',
      'Access to Private Afterparties'
    ],
    qrCodeValue: 'SOHO-PLT-4318-LOCKED-PENDING-APPROVAL',
    totalVisits: 0
  }
];

export const SAMPLE_VIP_MEMBERS = INITIAL_MEMBERS;
