import { GoogleGenAI } from '@google/genai';

export interface ReservationStore {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  guestCount: number;
  sectionId: string;
  sectionName: string;
  tableNumber: string;
  selectedBottles: { bottleId: string; quantity: number; name: string; price: number }[];
  specialRequests: string;
  totalEstimatedSpend: number;
  vipCardNumber?: string;
  status: 'Pending for Admin Approval' | 'Confirmed' | 'Finalized' | 'Rejected' | 'Cancelled';
  approvalStatus?: 'Pending for Admin Approval' | 'Approved' | 'Rejected';
  approvedAt?: string;
  approvedBy?: string;
  rejectionReason?: string;
  createdAt: string;
  qrPassCode: string;
}

export interface VIPMemberStore {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  tier: 'Gold' | 'Platinum' | 'Black Card';
  cardNumber: string;
  memberSince: string;
  perks: string[];
  qrCodeValue: string;
  totalVisits: number;
  photoUrl?: string;
  paymentStatus?: 'Pending' | 'Paid' | 'Failed';
  paymentAmount?: number;
  paymentDate?: string;
  paymentTransactionId?: string;
  approvalStatus?: 'Pending for Admin Approval' | 'Approved' | 'Rejected';
  status?: 'Pending Payment' | 'Pending for Admin Approval' | 'Active' | 'Rejected';
  cardIssued?: boolean;
  approvedAt?: string;
  approvedBy?: string;
  profession?: string;
}

export const reservations: ReservationStore[] = [
  {
    id: 'SOHO-7712',
    fullName: 'Victoria Vance',
    email: 'victoria.vance@luxcorp.com',
    phone: '(612) 555-0341',
    date: '2026-08-08',
    timeSlot: '11:30 PM',
    guestCount: 6,
    sectionId: 'the-suite',
    sectionName: 'The Suite',
    tableNumber: 'S-201',
    selectedBottles: [
      { bottleId: 'clase-azul-reposado', quantity: 1, name: 'Clase Azul Reposado', price: 0 },
      { bottleId: 'veuve-clicquot-yellow-label', quantity: 2, name: 'Veuve Clicquot Yellow Label', price: 0 }
    ],
    specialRequests: 'VIP corner booth preference, celebrating corporate milestone',
    totalEstimatedSpend: 0,
    vipCardNumber: 'SOHO-PLT-4890-X',
    status: 'Pending for Admin Approval',
    approvalStatus: 'Pending for Admin Approval',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    qrPassCode: 'SOHO-PASS-7712-PENDING-APPROVAL'
  },
  {
    id: 'SOHO-8829',
    fullName: 'Alexander Sterling',
    email: 'sterling@soholounge.com',
    phone: '(612) 555-0199',
    date: '2026-08-07',
    timeSlot: '11:00 PM',
    guestCount: 8,
    sectionId: 'amuse',
    sectionName: 'Amuse',
    tableNumber: 'A-101',
    selectedBottles: [
      { bottleId: 'moet-imperial-brut', quantity: 2, name: 'Moët Imperial Brut', price: 0 },
      { bottleId: 'don-julio-1942', quantity: 1, name: 'Don Julio 1942', price: 0 }
    ],
    specialRequests: 'Sparkler parade with custom LED sign reading "HAPPY BIRTHDAY ALEX"',
    totalEstimatedSpend: 0,
    vipCardNumber: 'SOHO-BLK-9921-X',
    status: 'Confirmed',
    approvalStatus: 'Approved',
    approvedAt: new Date(Date.now() - 86400000).toISOString(),
    approvedBy: 'Admin (Soho Executive)',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    qrPassCode: 'SOHO-PASS-8829-X'
  }
];

export const vipMembers: VIPMemberStore[] = [
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
      'Private Elevator & Amuse Lounge Access',
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
    perks: ['Express Line Bypass + 1 Guest', 'Priority Table Reservations', '10% Discount on Bottle Packages'],
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
    perks: ['Line Bypass + 3 Guests', 'Monthly Complimentary Champagne Bottle', 'Dedicated VIP Host'],
    qrCodeValue: 'SOHO-PLT-4318-LOCKED-PENDING-APPROVAL',
    totalVisits: 0
  }
];

export const guestlistEntries: any[] = [];

export let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
    });
  } catch (err) {
    console.warn('Gemini client warning:', err);
  }
}
