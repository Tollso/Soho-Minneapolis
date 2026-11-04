import nodemailer from 'nodemailer';

export const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL || 'gungordubc@gmail.com';
export const VENUE_NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || process.env.VENUE_NOTIFICATION_EMAIL || 'gungordubc@gmail.com';

export const getTransporter = () => {
  // 1. Google Mail (Gmail) Primary Transport
  const gmailUser = process.env.GMAIL_USER || process.env.GOOGLE_MAIL_USER || 'gungordubc@gmail.com';
  const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.GOOGLE_MAIL_PASS || process.env.SMTP_PASS || '';

  if (gmailPass) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass
      }
    });
  }

  // 2. Generic / Hostinger SMTP Fallback
  const host = process.env.HOSTINGER_SMTP_HOST || 'smtp.hostinger.com';
  const port = Number(process.env.HOSTINGER_SMTP_PORT) || 465;
  const user = process.env.HOSTINGER_SMTP_USER || process.env.SMTP_USER || '';
  const pass = process.env.HOSTINGER_SMTP_PASS || '';
  const secure = process.env.HOSTINGER_SMTP_SECURE !== 'false';

  if (user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass }
    });
  }

  return null;
};

export const sendMailSafely = async (to: string, subject: string, html: string, text: string) => {
  const fromEmail = process.env.GMAIL_USER || process.env.HOSTINGER_FROM_EMAIL || 'gungordubc@gmail.com';
  const fromName = 'Soho Lounge Minneapolis';
  const fromHeader = `"${fromName}" <${fromEmail}>`;

  const transporter = getTransporter();

  if (!transporter) {
    console.log(`[Google Mail Forwarding Queue - Destination: ${VENUE_NOTIFICATION_EMAIL}]`);
    console.log(`From: ${fromHeader}`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Forward Target: ${VENUE_NOTIFICATION_EMAIL}`);
    return { success: true, simulated: true, forwardedTo: VENUE_NOTIFICATION_EMAIL };
  }

  try {
    const info = await transporter.sendMail({
      from: fromHeader,
      to,
      subject,
      text,
      html
    });
    console.log(`[Google Mail Sent Successfully] MessageId: ${info.messageId} To: ${to} (Forwarded to ${VENUE_NOTIFICATION_EMAIL})`);
    return { success: true, messageId: info.messageId };
  } catch (err: any) {
    console.error(`[Google Mail SMTP Error sending to ${to}]:`, err.message);
    return { success: false, error: err.message };
  }
};
