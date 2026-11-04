import { sendMailSafely, VENUE_NOTIFICATION_EMAIL } from './emailTransport';

export interface ReservationEmailData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  guestCount: number;
  sectionName: string;
  tableNumber: string;
  selectedBottles: { name: string; quantity: number }[];
  specialRequests?: string;
  vipCardNumber?: string;
  qrPassCode: string;
  approvedBy?: string;
}

export const sendReservationPendingEmails = async (reservation: ReservationEmailData) => {
  const bottleSummary = reservation.selectedBottles.length > 0
    ? reservation.selectedBottles.map(b => `${b.quantity}x ${b.name}`).join(', ')
    : 'None pre-ordered (available on arrival)';

  // 1. Email to Customer: Provisional Request Received - Pending for Admin Approval
  const customerSubject = `VIP Table Reservation Request Received (Pending for Admin Approval) - Soho Lounge (#${reservation.id})`;
  const customerHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #0b0b0e; color: #f5f5f5; padding: 30px; border-radius: 8px;">
      <h2 style="color: #ffffff; text-transform: uppercase; letter-spacing: 2px;">SOHO LOUNGE MINNEAPOLIS</h2>
      <p style="color: #d4af37; font-size: 14px; font-weight: bold; text-transform: uppercase;">VIP Table Booking • Pending Authorization</p>
      <hr style="border: 0; border-top: 1px solid #333; margin: 20px 0;" />
      <p>Dear <strong>${reservation.fullName}</strong>,</p>
      <p>Thank you for submitting your VIP table reservation request for Soho Lounge (923 Nicollet Mall, Minneapolis, MN).</p>
      
      <div style="background-color: #2a1e05; border-left: 4px solid #d4af37; padding: 15px; margin: 15px 0; border-radius: 4px;">
        <p style="margin: 0; color: #f5f5f5; font-size: 13px;">
          <strong>Security Protocol:</strong> In accordance with Soho Lounge venue policy, table reservations are provisional and are <strong>strictly not finalized until approved by the Admin</strong>. Your request has been queued in our Executive Hub for review.
        </p>
      </div>

      <div style="background-color: #16161d; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #333;">
        <p style="margin: 6px 0;"><strong>Request Reference ID:</strong> ${reservation.id}</p>
        <p style="margin: 6px 0;"><strong>Status:</strong> <span style="color: #d4af37; font-weight: bold;">PENDING FOR ADMIN APPROVAL</span></p>
        <p style="margin: 6px 0;"><strong>Requested Section:</strong> ${reservation.sectionName} (${reservation.tableNumber})</p>
        <p style="margin: 6px 0;"><strong>Date & Time:</strong> ${reservation.date} at ${reservation.timeSlot}</p>
        <p style="margin: 6px 0;"><strong>Party Size:</strong> ${reservation.guestCount} Guests</p>
        <p style="margin: 6px 0;"><strong>Bottle Package:</strong> ${bottleSummary}</p>
      </div>

      <p style="color: #ccc; font-size: 13px;">You will receive an official finalized confirmation email with your live door entry QR pass immediately upon Admin authorization.</p>
      <p style="margin-top: 25px;">Warm regards,<br/><strong>Soho Lounge Executive Team</strong><br/>923 Nicollet Mall, Minneapolis, MN 55402</p>
    </div>
  `;

  // 2. Email to Super Admin / Venue Host
  const venueSubject = `[NEW VIP TABLE BOOKING] ${reservation.fullName} - ${reservation.date} (${reservation.sectionName} ${reservation.tableNumber})`;
  const venueHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; color: #111; padding: 25px; border-radius: 8px;">
      <h2 style="color: #0b0b0e; border-bottom: 2px solid #d4af37; padding-bottom: 8px;">NEW TABLE RESERVATION FORM RECEIVED</h2>
      <p>A new guest reservation form has been submitted online:</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Customer Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${reservation.fullName}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;"><a href="mailto:${reservation.email}">${reservation.email}</a></td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${reservation.phone || 'N/A'}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Date & Time:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${reservation.date} @ ${reservation.timeSlot}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Section & Table:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>${reservation.sectionName}</strong> (${reservation.tableNumber})</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Guests:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${reservation.guestCount}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Bottles:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${bottleSummary}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Special Requests:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${reservation.specialRequests || 'None'}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>VIP Card Number:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${reservation.vipCardNumber || 'None'}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Reference ID:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${reservation.id}</td></tr>
      </table>
      <div style="margin-top: 20px; padding: 15px; background: #eef2ff; border-radius: 6px;">
        <p style="margin: 0; font-size: 13px;"><strong>Management Action:</strong> You can manage this reservation directly in the Soho Lounge Admin Hub.</p>
      </div>
    </div>
  `;

  await Promise.allSettled([
    sendMailSafely(reservation.email, customerSubject, customerHtml, `Reservation request ${reservation.id} received and pending Admin approval.`),
    sendMailSafely(VENUE_NOTIFICATION_EMAIL, venueSubject, venueHtml, `New reservation awaiting Admin review from ${reservation.fullName}`)
  ]);
};

export const sendReservationApprovedEmails = async (reservation: ReservationEmailData) => {
  const bottleSummary = reservation.selectedBottles.length > 0
    ? reservation.selectedBottles.map(b => `${b.quantity}x ${b.name}`).join(', ')
    : 'None pre-ordered (available on arrival)';

  const customerSubject = `VIP Table Reservation FINALIZED & CONFIRMED - Soho Lounge Minneapolis (#${reservation.id})`;
  const customerHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #0b0b0e; color: #f5f5f5; padding: 30px; border-radius: 8px;">
      <h2 style="color: #ffffff; text-transform: uppercase; letter-spacing: 2px;">SOHO LOUNGE MINNEAPOLIS</h2>
      <p style="color: #22c55e; font-size: 14px; font-weight: bold; text-transform: uppercase;">✓ Official VIP Table Reservation Finalized</p>
      <hr style="border: 0; border-top: 1px solid #333; margin: 20px 0;" />
      <p>Dear <strong>${reservation.fullName}</strong>,</p>
      <p>Your VIP table reservation has been <strong>reviewed and officially approved</strong> by the Admin. Your booking is now finalized.</p>
      
      <div style="background-color: #16161d; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #d4af37;">
        <p style="margin: 6px 0;"><strong>Confirmation Code:</strong> ${reservation.id}</p>
        <p style="margin: 6px 0;"><strong>Active Door Pass Code:</strong> <span style="color: #d4af37; font-family: monospace; font-weight: bold;">${reservation.qrPassCode}</span></p>
        <p style="margin: 6px 0;"><strong>Section & Table:</strong> ${reservation.sectionName} (${reservation.tableNumber})</p>
        <p style="margin: 6px 0;"><strong>Date & Arrival:</strong> ${reservation.date} at ${reservation.timeSlot}</p>
        <p style="margin: 6px 0;"><strong>Party Size:</strong> ${reservation.guestCount} Guests</p>
        <p style="margin: 6px 0;"><strong>Bottle Package:</strong> ${bottleSummary}</p>
        <p style="margin: 6px 0;"><strong>Approved By:</strong> ${reservation.approvedBy || 'Admin'}</p>
      </div>

      <p style="color: #aaa; font-size: 12px;">Present this confirmation or mention code <strong>${reservation.id}</strong> at the 923 Nicollet Mall VIP red carpet entrance.</p>
      <p style="margin-top: 25px;">Warm regards,<br/><strong>Soho Lounge Executive Team</strong><br/>923 Nicollet Mall, Minneapolis, MN</p>
    </div>
  `;

  const venueSubject = `[RESERVATION FINALIZED] ${reservation.fullName} - ${reservation.date} (${reservation.sectionName})`;
  const venueHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; color: #111; padding: 25px; border-radius: 8px;">
      <h2 style="color: #0b0b0e;">RESERVATION OFFICIALLY FINALIZED BY ADMIN</h2>
      <p>Table reservation #${reservation.id} has been approved by ${reservation.approvedBy || 'Admin'}:</p>
      <p><strong>Guest:</strong> ${reservation.fullName} (${reservation.email})</p>
      <p><strong>Section & Table:</strong> ${reservation.sectionName} (${reservation.tableNumber})</p>
      <p><strong>Date & Time:</strong> ${reservation.date} at ${reservation.timeSlot}</p>
    </div>
  `;

  await Promise.allSettled([
    sendMailSafely(reservation.email, customerSubject, customerHtml, `Reservation ${reservation.id} finalized for ${reservation.fullName}`),
    sendMailSafely(VENUE_NOTIFICATION_EMAIL, venueSubject, venueHtml, `Reservation ${reservation.id} approved by Admin`)
  ]);
};
