import { sendMailSafely, VENUE_NOTIFICATION_EMAIL } from './emailTransport';

export const sendVipApplicationPendingEmails = async (member: {
  fullName: string;
  email: string;
  phone: string;
  tier: string;
  cardNumber: string;
  profession?: string;
  paymentAmount?: number;
  paymentTransactionId?: string;
}) => {
  const customerSubject = `Payment Received & Pending for Admin Approval - Soho Lounge ${member.tier} VIP Card`;
  const customerHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #0b0b0e; color: #f5f5f5; padding: 30px; border-radius: 8px;">
      <h2 style="color: #ffffff; text-transform: uppercase;">SOHO LOUNGE MINNEAPOLIS</h2>
      <p style="color: #d4af37; font-size: 14px; font-weight: bold;">PAYMENT RECEIVED • PENDING FOR ADMIN APPROVAL</p>
      <hr style="border: 0; border-top: 1px solid #333; margin: 20px 0;" />
      <p>Dear <strong>${member.fullName}</strong>,</p>
      <p>Thank you for submitting your application and completing your membership dues payment for the <strong>${member.tier} Tier</strong> at Soho Lounge Minneapolis.</p>
      <div style="background-color: #16161d; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #333;">
        <p style="margin: 6px 0;"><strong>Applicant:</strong> ${member.fullName}</p>
        <p style="margin: 6px 0;"><strong>Requested Tier:</strong> ${member.tier}</p>
        <p style="margin: 6px 0;"><strong>Payment Status:</strong> <span style="color: #4ade80; font-weight: bold;">RECEIVED ($${member.paymentAmount || 0}.00)</span></p>
        <p style="margin: 6px 0;"><strong>Transaction ID:</strong> ${member.paymentTransactionId || 'TXN-CONFIRMED'}</p>
        <p style="margin: 6px 0;"><strong>Cardholder Photo:</strong> <span style="color: #4ade80;">Verified & Attached</span></p>
        <p style="margin: 6px 0;"><strong>Approval Status:</strong> <span style="color: #facc15; font-weight: bold;">Under Admin Review</span></p>
      </div>
      <p>In accordance with Soho Lounge security and VIP protocols, all cards with portrait photos must be reviewed and approved by the Admin before the card and door access pass are officially issued.</p>
      <p>You will receive an instant email notification once the Admin approves your card.</p>
      <p style="margin-top: 25px;">Warm regards,<br/><strong>Soho Lounge Executive Team</strong><br/>923 Nicollet Mall, Minneapolis, MN</p>
    </div>
  `;

  const venueSubject = `[NEW VIP CARD APPLICATION] ${member.fullName} (${member.tier} Tier)`;
  const venueHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; color: #111; padding: 25px; border-radius: 8px;">
      <h2 style="color: #0b0b0e; border-bottom: 2px solid #d4af37; padding-bottom: 8px;">NEW VIP CARD APPLICATION FORM RECEIVED</h2>
      <p>A new guest VIP Card membership application has been submitted:</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Applicant Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${member.fullName}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;"><a href="mailto:${member.email}">${member.email}</a></td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${member.phone || 'N/A'}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Profession:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${member.profession || 'N/A'}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Requested Tier:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>${member.tier}</strong></td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Card Number:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${member.cardNumber}</td></tr>
      </table>
      <div style="margin-top: 20px; padding: 15px; background: #eef2ff; border-radius: 6px;">
        <p style="margin: 0; font-size: 13px;"><strong>Admin Action:</strong> You can review and approve this member in the Soho Lounge Admin Hub.</p>
      </div>
    </div>
  `;

  await Promise.allSettled([
    sendMailSafely(member.email, customerSubject, customerHtml, `Application received for VIP application ${member.fullName}. Pending Admin review.`),
    sendMailSafely(VENUE_NOTIFICATION_EMAIL, venueSubject, venueHtml, `New VIP application from ${member.fullName}`)
  ]);
};

export const sendVipCardIssuedEmail = async (member: {
  fullName: string;
  email: string;
  tier: string;
  cardNumber: string;
  qrCodeValue: string;
}) => {
  const customerSubject = `Congratulations: Your Soho Lounge ${member.tier} VIP Card Has Been Approved & Issued! (#${member.cardNumber})`;
  const customerHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #0b0b0e; color: #f5f5f5; padding: 30px; border-radius: 8px;">
      <h2 style="color: #ffffff; text-transform: uppercase;">SOHO LOUNGE MINNEAPOLIS</h2>
      <p style="color: #d4af37; font-size: 14px; font-weight: bold;">VIP CARD APPROVED & ACTIVATED</p>
      <hr style="border: 0; border-top: 1px solid #333; margin: 20px 0;" />
      <p>Dear <strong>${member.fullName}</strong>,</p>
      <p>We are delighted to inform you that your application for the <strong>${member.tier} Tier</strong> has been officially approved by the Admin. Your VIP Card has been issued and is now active.</p>
      <div style="background-color: #16161d; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #333;">
        <p style="margin: 6px 0;"><strong>Cardholder:</strong> ${member.fullName}</p>
        <p style="margin: 6px 0;"><strong>Official VIP Card Number:</strong> ${member.cardNumber}</p>
        <p style="margin: 6px 0;"><strong>Membership Tier:</strong> ${member.tier}</p>
        <p style="margin: 6px 0;"><strong>Door Pass Code:</strong> ${member.qrCodeValue}</p>
        <p style="margin: 6px 0;"><strong>Status:</strong> <span style="color: #4ade80; font-weight: bold;">ACTIVE & VALID FOR 2026</span></p>
      </div>
      <p>Your digital photo ID pass and live QR entry code are ready for red carpet line bypass at 923 Nicollet Mall. Access your digital wallet pass anytime through the Soho VIP Portal.</p>
      <p style="margin-top: 25px;">Welcome to the inner circle,<br/><strong>Soho Lounge Executive Team</strong><br/>923 Nicollet Mall, Minneapolis, MN</p>
    </div>
  `;

  await Promise.allSettled([
    sendMailSafely(member.email, customerSubject, customerHtml, `Your VIP Card ${member.cardNumber} is now issued and active!`),
    sendMailSafely(VENUE_NOTIFICATION_EMAIL, `[VIP CARD ISSUED] ${member.fullName} (${member.tier})`, `Approved by Admin for ${member.fullName}`, `VIP Card issued`)
  ]);
};

export const sendGuestlistEmails = async (entry: {
  fullName: string;
  email: string;
  eventId: string;
  guestCount: number;
  passCode: string;
}) => {
  const customerSubject = `Guestlist Pass Confirmed - Soho Lounge Minneapolis (#${entry.passCode})`;
  const customerHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #0b0b0e; color: #f5f5f5; padding: 30px; border-radius: 8px;">
      <h2 style="color: #ffffff;">SOHO LOUNGE MINNEAPOLIS</h2>
      <p style="color: #d4af37; font-size: 14px; font-weight: bold;">EVENT GUESTLIST RSVP CONFIRMED</p>
      <hr style="border: 0; border-top: 1px solid #333; margin: 20px 0;" />
      <p>Hello <strong>${entry.fullName}</strong>,</p>
      <p>You have been added to the Soho Lounge VIP Guestlist for event: <strong>${entry.eventId}</strong>.</p>
      <div style="background-color: #16161d; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #333;">
        <p style="margin: 6px 0;"><strong>Guestlist Pass Code:</strong> ${entry.passCode}</p>
        <p style="margin: 6px 0;"><strong>Party Size:</strong> ${entry.guestCount} Guest(s)</p>
        <p style="margin: 6px 0;"><strong>Venue Address:</strong> 923 Nicollet Mall, Minneapolis, MN 55402</p>
      </div>
      <p style="font-size: 12px; color: #aaa;">Strict upscale dress code applies. 21+ photo ID required at door.</p>
    </div>
  `;

  await Promise.allSettled([
    sendMailSafely(entry.email, customerSubject, customerHtml, `Guestlist RSVP for ${entry.fullName}`),
    sendMailSafely(VENUE_NOTIFICATION_EMAIL, `[NEW GUESTLIST RSVP] ${entry.fullName}`, `Guestlist RSVP from ${entry.fullName}`, `RSVP registered`)
  ]);
};

export const sendContactInquiryEmails = async (inquiry: {
  fullName: string;
  email: string;
  phone?: string;
  inquiryType: string;
  message: string;
}) => {
  const customerSubject = `Thank You for Contacting Soho Lounge Minneapolis`;
  const customerHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #0b0b0e; color: #f5f5f5; padding: 30px; border-radius: 8px;">
      <h2 style="color: #ffffff;">SOHO LOUNGE MINNEAPOLIS</h2>
      <p style="color: #d4af37; font-size: 14px; font-weight: bold;">INQUIRY RECEIVED</p>
      <hr style="border: 0; border-top: 1px solid #333; margin: 20px 0;" />
      <p>Dear <strong>${inquiry.fullName}</strong>,</p>
      <p>Thank you for reaching out to Soho Lounge regarding <strong>${inquiry.inquiryType}</strong>.</p>
      <p>Our VIP concierge team at 923 Nicollet Mall has received your message and will contact you shortly.</p>
    </div>
  `;

  const venueSubject = `[NEW INQUIRY FORM] ${inquiry.fullName} - ${inquiry.inquiryType}`;
  const venueHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; color: #111; padding: 25px; border-radius: 8px;">
      <h2 style="color: #0b0b0e; border-bottom: 2px solid #d4af37; padding-bottom: 8px;">NEW CONTACT / CONCIERGE INQUIRY</h2>
      <p>A new guest inquiry form has been submitted online:</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${inquiry.fullName}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;"><a href="mailto:${inquiry.email}">${inquiry.email}</a></td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${inquiry.phone || 'N/A'}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Inquiry Type:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>${inquiry.inquiryType}</strong></td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Message:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${inquiry.message}</td></tr>
      </table>
    </div>
  `;

  await Promise.allSettled([
    sendMailSafely(inquiry.email, customerSubject, customerHtml, `Inquiry received from ${inquiry.fullName}`),
    sendMailSafely(VENUE_NOTIFICATION_EMAIL, venueSubject, venueHtml, `Inquiry message from ${inquiry.fullName}: ${inquiry.message}`)
  ]);
};
