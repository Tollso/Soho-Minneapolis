import { Router } from 'express';
import { vipMembers, VIPMemberStore } from './store.js';
import { sendVipApplicationPendingEmails, sendVipCardIssuedEmail } from './email.js';

export const vipMembersRouter = Router();

// Get VIP Member by identifier (card number, ID, or email)
vipMembersRouter.get('/vip-members/:identifier', (req, res) => {
  const query = req.params.identifier.toLowerCase();
  const match = vipMembers.find(
    m => m.cardNumber.toLowerCase() === query ||
         m.id.toLowerCase() === query ||
         m.email.toLowerCase() === query
  );

  if (match) {
    res.json(match);
  } else {
    res.status(404).json({ error: 'VIP Member Card not found.' });
  }
});

// VIP Application handler
const handleVipApplication = (req: any, res: any) => {
  try {
    const {
      fullName, email, phone, requestedTier, tier: tierFromBody,
      profession, photoUrl, paymentStatus, paymentAmount
    } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({ error: 'Name and email are required for VIP application.' });
    }

    if (!photoUrl || typeof photoUrl !== 'string' || photoUrl.trim().length === 0) {
      return res.status(400).json({
        error: 'A portrait photo is required for your VIP card identification and security protocol.'
      });
    }

    const tier: 'Gold' | 'Platinum' | 'Black Card' = tierFromBody || requestedTier || 'Black Card';
    const fee = paymentAmount || (tier === 'Black Card' ? 2500 : tier === 'Platinum' ? 1200 : 500);
    const txnId = `TXN-${tier.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-6)}`;

    let existing = vipMembers.find(m => m.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.json({ success: true, member: existing, isExisting: true });
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const prefix = tier === 'Black Card' ? 'BLK' : tier === 'Platinum' ? 'PLT' : 'GLD';
    const assignedCardNumber = `SOHO-${prefix}-${randomNum}-X`;

    const newMember: VIPMemberStore = {
      id: `VIP-${prefix}-${randomNum}`,
      fullName,
      email,
      phone: phone || '',
      profession: profession || '',
      tier,
      cardNumber: assignedCardNumber,
      memberSince: new Date().getFullYear().toString(),
      photoUrl,
      paymentStatus: 'Paid',
      paymentAmount: fee,
      paymentDate: new Date().toISOString(),
      paymentTransactionId: txnId,
      approvalStatus: 'Pending for Admin Approval',
      status: 'Pending for Admin Approval',
      cardIssued: false,
      perks: [
        `Express Entry line bypass for ${fullName}`,
        `Access to ${tier} Tier privileges`,
        'Digital Wallet Pass & QR Entry',
        'Priority Soho Concierge Service'
      ],
      qrCodeValue: assignedCardNumber,
      totalVisits: 0
    };

    vipMembers.push(newMember);

    sendVipApplicationPendingEmails({
      ...newMember,
      profession,
      paymentAmount: fee,
      paymentTransactionId: txnId
    }).catch(err => {
      console.error('[Email Dispatch Error] VIP Application Pending:', err);
    });

    res.status(201).json({
      success: true,
      member: newMember,
      isExisting: false,
      message: 'Your VIP membership application has been received. Our concierge team will review your details and contact you shortly.'
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to submit VIP Application', details: error.message });
  }
};

vipMembersRouter.post('/vip-members/apply', handleVipApplication);
vipMembersRouter.post('/vip-applications', handleVipApplication);

// Admin: List all VIP applications
const handleListApplications = (req: any, res: any) => {
  try {
    const sorted = [...vipMembers].sort((a, b) => {
      const aPending = a.approvalStatus === 'Pending for Admin Approval' || (a.approvalStatus as string) === 'Pending Super Admin Approval';
      const bPending = b.approvalStatus === 'Pending for Admin Approval' || (b.approvalStatus as string) === 'Pending Super Admin Approval';
      if (aPending && !bPending) return -1;
      if (!aPending && bPending) return 1;
      return 0;
    });
    res.json({ success: true, count: sorted.length, members: sorted });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch VIP applications', details: error.message });
  }
};

vipMembersRouter.get('/admin/vip-applications', handleListApplications);
vipMembersRouter.get('/admin/vip-members', handleListApplications);

// Admin: Approve VIP Card
const handleApproveVip = (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { adminName } = req.body;

    const member = vipMembers.find(m => m.id === id || m.cardNumber === id);
    if (!member) {
      return res.status(404).json({ error: 'VIP application/member not found.' });
    }

    member.approvalStatus = 'Approved';
    member.status = 'Active';
    member.cardIssued = true;
    member.approvedAt = new Date().toISOString();
    member.approvedBy = adminName || 'Admin (Soho Executive)';

    const prefix = member.tier === 'Black Card' ? 'BLK' : member.tier === 'Platinum' ? 'PLT' : 'GLD';
    member.qrCodeValue = `SOHO-${prefix}-${member.cardNumber.split('-')[2] || 'VALID'}-2026`;

    sendVipCardIssuedEmail({
      fullName: member.fullName,
      email: member.email,
      tier: member.tier,
      cardNumber: member.cardNumber,
      qrCodeValue: member.qrCodeValue
    }).catch(err => {
      console.error('[Email Dispatch Error] VIP Card Issued:', err);
    });

    res.json({
      success: true,
      message: `VIP Card successfully approved and issued for ${member.fullName}!`,
      member
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to approve VIP card', details: error.message });
  }
};

vipMembersRouter.post('/admin/vip-applications/:id/approve', handleApproveVip);
vipMembersRouter.post('/admin/vip-members/:id/approve', handleApproveVip);

// Admin: Reject VIP Card
const handleRejectVip = (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { adminName } = req.body;

    const member = vipMembers.find(m => m.id === id || m.cardNumber === id);
    if (!member) {
      return res.status(404).json({ error: 'VIP application/member not found.' });
    }

    member.approvalStatus = 'Rejected';
    member.status = 'Rejected';
    member.cardIssued = false;
    member.approvedBy = adminName || 'Admin';

    res.json({
      success: true,
      message: `Application for ${member.fullName} has been rejected.`,
      member
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to reject VIP card', details: error.message });
  }
};

vipMembersRouter.post('/admin/vip-applications/:id/reject', handleRejectVip);
vipMembersRouter.post('/admin/vip-members/:id/reject', handleRejectVip);
