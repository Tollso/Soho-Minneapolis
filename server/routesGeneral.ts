import { Router } from 'express';
import { GoogleGenAI } from '@google/genai';
import { guestlistEntries, ai } from './store.js';
import { sendGuestlistEmails, sendContactInquiryEmails, sendMailSafely, VENUE_NOTIFICATION_EMAIL } from './email.js';

export const generalRouter = Router();
let activeAi = ai;

// Health check
generalRouter.get('/health', (req, res) => {
  res.json({ status: 'ok', venue: 'Soho Lounge Minneapolis', address: '923 Nicollet Mall' });
});

// Admin: Verify passcode
generalRouter.post('/admin/verify-passcode', (req, res) => {
  const { passcode } = req.body;
  const validPasscodes = ['soho-admin-2026', 'sohosuperadmin', 'admin2026', 'superadmin', 'soho-super-2026'];
  if (passcode && validPasscodes.includes(passcode.toLowerCase().trim())) {
    return res.json({ success: true, authorized: true, role: 'Admin' });
  }
  return res.status(401).json({ success: false, authorized: false, error: 'Invalid Admin passcode.' });
});

// Guestlist RSVP API
generalRouter.post('/guestlist', (req, res) => {
  const { fullName, email, eventId, guestCount } = req.body;
  if (!fullName || !email || !eventId) {
    return res.status(400).json({ error: 'Full name, email, and event ID are required.' });
  }
  const passCode = `GL-${Math.floor(100000 + Math.random() * 900000)}`;
  const entry = {
    id: passCode,
    fullName,
    email,
    eventId,
    guestCount: Number(guestCount) || 1,
    passCode,
    createdAt: new Date().toISOString()
  };
  guestlistEntries.push(entry);

  sendGuestlistEmails(entry).catch(err => {
    console.error('[Email Dispatch Error] Guestlist:', err);
  });

  res.status(201).json({
    success: true,
    passCode,
    message: 'Added to Soho Lounge Exclusive Guestlist! Arrive before 11:00 PM for complimentary entry.'
  });
});

// Contact / Table & Event Inquiry Form API - Forwards to Google Mail (gungordubc@gmail.com)
generalRouter.post('/contact', (req, res) => {
  try {
    const { fullName, email, phone, inquiryType, message } = req.body;
    if (!fullName || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    sendContactInquiryEmails({
      fullName,
      email,
      phone: phone || '',
      inquiryType: inquiryType || 'VIP Table & Pricing Inquiry',
      message
    }).catch(err => {
      console.error('[Email Dispatch Error] Contact Inquiry:', err);
    });

    res.status(200).json({
      success: true,
      message: `Inquiry received. A confirmation has been sent to your email and forwarded to our executive team at ${VENUE_NOTIFICATION_EMAIL}.`
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to process inquiry', details: error.message });
  }
});

// VIP Card Waitlist API - Forwards notifications to Google Mail (gungordubc@gmail.com)
generalRouter.post('/vip-waitlist', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }

  sendMailSafely(
    VENUE_NOTIFICATION_EMAIL,
    `[NEW VIP CARD WAITLIST] ${email}`,
    `<div style="font-family: Arial, sans-serif; background: #0b0b0e; color: #f5f5f5; padding: 25px; border-radius: 8px;">
      <h2 style="color: #d4af37;">NEW SOHO VIP CARD WAITLIST SIGNUP</h2>
      <p>A new guest has requested early launch access to the VIP Card program:</p>
      <p style="font-size: 16px; font-weight: bold; color: #ffffff;"><a href="mailto:${email}" style="color: #d4af37;">${email}</a></p>
      <p style="font-size: 12px; color: #888;">Timestamp: ${new Date().toLocaleString()}</p>
    </div>`,
    `New VIP Card waitlist signup from: ${email}`
  ).catch(err => console.error('[Email Dispatch Error] Waitlist notification:', err));

  res.status(200).json({
    success: true,
    message: 'Added to the Soho VIP priority launch waitlist.'
  });
});

// AI VIP Host Concierge via Gemini API
generalRouter.post('/concierge', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required.' });

    if (!activeAi && process.env.GEMINI_API_KEY) {
      activeAi = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });
    }

    if (!activeAi) {
      return res.json({
        reply: `Welcome to Soho Lounge Minneapolis (923 Nicollet Mall). As your VIP Concierge, I can assist you with table reservations (Contact for Pricing), bottle service selections, dress code guidelines, and VIP Card membership perks. How may I elevate your evening?`
      });
    }

    const systemInstruction = `You are "SOHO VIP CONCIERGE", the suave AI Host for Soho Lounge at 923 Nicollet Mall, Minneapolis.
All table & bottle service is Contact for Pricing. Inquiries are routed to our executive Google Mail at gungordubc@gmail.com.
Dress Code: Soho maintains an upscale nightlife atmosphere. Acceptable attire includes button-down and collared shirts, blazers, fashionable fitted clothing, dresses, clean premium denim, and clean upscale fashion sneakers. Prohibited: sweatpants, athletic wear, jerseys, slides/Crocs, baggy or torn denim.
Tone: Luxury hospitality, helpful, concise (under 150 words).`;

    const response = await activeAi.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { systemInstruction, temperature: 0.7 }
    });

    res.json({ reply: response.text || 'Welcome to Soho Lounge. How may I assist your VIP experience tonight?' });
  } catch (error: any) {
    console.error('Concierge API error:', error);
    res.status(500).json({
      reply: 'Thank you for reaching Soho Lounge Concierge at 923 Nicollet Mall, Minneapolis. Our hosts are available to reserve your table directly through our online reservation system.'
    });
  }
});
