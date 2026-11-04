import { Router } from 'express';
import { reservations, ReservationStore } from './store.js';
import { sendReservationPendingEmails, sendReservationApprovedEmails } from './email.js';

export const reservationsRouter = Router();

// Availability check for a given date and timeSlot
reservationsRouter.get('/reservations/availability', (req, res) => {
  const { date, timeSlot } = req.query;
  if (!date) return res.json({ bookedSectionIds: [], bookedTableNumbers: [], bookings: [] });

  const activeBookings = reservations.filter(r => {
    const isSameDate = r.date === date;
    const isSameTime = !timeSlot || r.timeSlot === timeSlot;
    const isActive = r.status !== 'Rejected' && r.approvalStatus !== 'Rejected';
    return isSameDate && isSameTime && isActive;
  });

  res.json({
    date,
    timeSlot,
    bookedSectionIds: activeBookings.map(r => r.sectionId),
    bookedTableNumbers: activeBookings.map(r => r.tableNumber),
    bookings: activeBookings.map(b => ({
      sectionId: b.sectionId,
      sectionName: b.sectionName,
      tableNumber: b.tableNumber,
      status: (b.status === 'Confirmed' || b.status === 'Finalized' || b.approvalStatus === 'Approved') ? 'Approved' : 'Requested'
    }))
  });
});

// Get reservations or filter
reservationsRouter.get('/reservations', (req, res) => {
  const { email, code } = req.query;
  if (code) {
    const match = reservations.find(r => r.id.toLowerCase() === (code as string).toLowerCase());
    return res.json(match ? [match] : []);
  }
  if (email) {
    const matches = reservations.filter(r => r.email.toLowerCase() === (email as string).toLowerCase());
    return res.json(matches);
  }
  res.json(reservations);
});

// Create new Table Reservation with strict single-reservation-per-section/time rule
reservationsRouter.post('/reservations', (req, res) => {
  try {
    const {
      fullName, email, phone, date, timeSlot, guestCount,
      sectionId, sectionName, tableNumber, selectedBottles,
      specialRequests, vipCardNumber
    } = req.body;

    if (!fullName || !email || !sectionId || !date) {
      return res.status(400).json({ error: 'Full Name, Email, Section, and Date are required.' });
    }

    const slot = timeSlot || '11:00 PM';
    // Exclusivity: Only 1 reservation allowed for the same section & time
    const conflict = reservations.find(r =>
      r.date === date &&
      r.timeSlot === slot &&
      (r.sectionId === sectionId || r.sectionName.toLowerCase() === (sectionName || '').toLowerCase() || (tableNumber && r.tableNumber === tableNumber)) &&
      r.status !== 'Rejected' && r.approvalStatus !== 'Rejected'
    );

    if (conflict) {
      const isApproved = conflict.status === 'Confirmed' || conflict.status === 'Finalized' || conflict.approvalStatus === 'Approved';
      return res.status(409).json({
        error: isApproved
          ? `The ${sectionName || 'selected section'} has already been reserved and approved for ${date} at ${slot}. It is unavailable.`
          : `A reservation has already been requested for the ${sectionName || 'selected section'} on ${date} at ${slot}. Only one reservation can request for the same section and time.`
      });
    }

    const reservationId = `SOHO-${Math.floor(1000 + Math.random() * 9000)}`;
    const passCode = `SOHO-PASS-${Math.floor(1000 + Math.random() * 9000)}-X`;

    const newReservation: ReservationStore = {
      id: reservationId,
      fullName,
      email,
      phone: phone || '',
      date,
      timeSlot: slot,
      guestCount: Number(guestCount) || 4,
      sectionId,
      sectionName: sectionName || 'VIP Section',
      tableNumber: tableNumber || 'T-101',
      selectedBottles: selectedBottles || [],
      specialRequests: specialRequests || '',
      totalEstimatedSpend: 0,
      vipCardNumber: vipCardNumber || '',
      status: 'Pending for Admin Approval',
      approvalStatus: 'Pending for Admin Approval',
      createdAt: new Date().toISOString(),
      qrPassCode: passCode
    };

    reservations.unshift(newReservation);
    sendReservationPendingEmails(newReservation).catch(err => {
      console.error('[Email Dispatch Error] Reservation:', err);
    });

    res.status(201).json({
      success: true,
      message: 'Table reservation request received. Forwarded to management for review.',
      reservation: newReservation
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to process reservation', details: error.message });
  }
});

// Admin: List all Table Reservations
reservationsRouter.get('/admin/reservations', (req, res) => {
  try {
    const sorted = [...reservations].sort((a, b) => {
      const aPending = a.status === 'Pending for Admin Approval' || (a.status as string) === 'Pending Super Admin Approval';
      const bPending = b.status === 'Pending for Admin Approval' || (b.status as string) === 'Pending Super Admin Approval';
      if (aPending && !bPending) return -1;
      if (!aPending && bPending) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    res.json({ success: true, count: sorted.length, reservations: sorted });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch reservations', details: error.message });
  }
});

// Admin: Approve & Finalize Table Reservation
reservationsRouter.post('/admin/reservations/:id/approve', (req, res) => {
  try {
    const { id } = req.params;
    const { adminName } = req.body;
    const reservation = reservations.find(r => r.id.toLowerCase() === id.toLowerCase());
    if (!reservation) return res.status(404).json({ error: 'Reservation not found.' });

    reservation.status = 'Confirmed';
    reservation.approvalStatus = 'Approved';
    reservation.approvedAt = new Date().toISOString();
    reservation.approvedBy = adminName || 'Admin (Soho Executive)';
    reservation.qrPassCode = `SOHO-PASS-${reservation.id.replace('SOHO-', '')}-FINALIZED`;

    sendReservationApprovedEmails(reservation).catch(err => {
      console.error('[Email Dispatch Error] Reservation Approved:', err);
    });

    res.json({
      success: true,
      message: `Reservation #${reservation.id} for ${reservation.fullName} approved and finalized!`,
      reservation
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to approve reservation', details: error.message });
  }
});

// Admin: Reject Table Reservation
reservationsRouter.post('/admin/reservations/:id/reject', (req, res) => {
  try {
    const { id } = req.params;
    const { reason, adminName } = req.body;
    const reservation = reservations.find(r => r.id.toLowerCase() === id.toLowerCase());
    if (!reservation) return res.status(404).json({ error: 'Reservation not found.' });

    reservation.status = 'Rejected';
    reservation.approvalStatus = 'Rejected';
    reservation.rejectionReason = reason || 'Declined by Admin';
    reservation.approvedBy = adminName || 'Admin';

    res.json({
      success: true,
      message: `Reservation #${reservation.id} has been rejected and section freed.`,
      reservation
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to reject reservation', details: error.message });
  }
});
