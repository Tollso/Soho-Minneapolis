export type MembershipTier = 'Gold' | 'Platinum' | 'Black Card';

export interface VIPMember {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  tier: MembershipTier;
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
  approvalStatus?: 'Pending for Admin Approval' | 'Pending Super Admin Approval' | 'Approved' | 'Rejected';
  status?: 'Pending Payment' | 'Pending for Admin Approval' | 'Pending Super Admin Approval' | 'Active' | 'Rejected';
  cardIssued?: boolean;
  approvedAt?: string;
  approvedBy?: string;
  profession?: string;
}

export interface TableSection {
  id: string;
  name: string;
  tagline: string;
  capacity: number;
  minSpend: number;
  description: string;
  features: string[];
  image: string;
  isPopular?: boolean;
  tableNumbers: string[];
  side: 'left' | 'right';
  positionIndex: number; // 1: closest to DJ booth, 2: mid-tier, 3: outer lounge
  zoneLabel: string;
}

export interface BottleItem {
  id: string;
  name: string;
  category: 'Champagne' | 'Tequila' | 'Vodka' | 'Whiskey' | 'Gin' | 'Rum' | 'White Wine' | 'Red Wine' | 'Buckets & Mixers' | 'Whiskey & Cognac' | 'Parade Package' | string;
  volume: string;
  price?: number;
  description: string;
  image?: string;
  includesSparklers?: boolean;
}

export interface ReservationRequest {
  id?: string;
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
  status: 'Pending for Admin Approval' | 'Pending Super Admin Approval' | 'Confirmed' | 'Finalized' | 'Rejected' | 'Cancelled';
  approvalStatus?: 'Pending for Admin Approval' | 'Pending Super Admin Approval' | 'Approved' | 'Rejected';
  approvedAt?: string;
  approvedBy?: string;
  createdAt: string;
  qrPassCode: string;
}

export interface EventItem {
  id: string;
  title: string;
  headliner?: string;
  headline?: string;
  genre?: string;
  date?: string;
  formattedDate?: string;
  dayOfWeek?: string;
  time: string;
  description: string;
  image: string;
  tag?: string;
  tags?: string[];
  djs?: string[];
  coverFee?: string;
  guestlistOpen?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'concierge';
  text: string;
  timestamp: string;
}
