import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Mail, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultInquiryType?: string;
  defaultSubject?: string;
  onInquirySubmitted?: (fullName: string, inquiryType: string) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultInquiryType = 'VIP Table & Bottle Pricing Inquiry',
  defaultSubject = '',
  onInquirySubmitted
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState(defaultInquiryType);
  const [message, setMessage] = useState(defaultSubject ? `Inquiry regarding: ${defaultSubject}` : '');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!fullName || !email || !message) {
      setErrorMsg('Full name, email address, and inquiry message are required.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, phone, inquiryType, message })
      });

      if (res.ok) {
        const submittedName = fullName;
        const submittedType = inquiryType;
        setFullName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setErrorMsg('');
        setSuccessMsg('');
        if (onInquirySubmitted) {
          onInquirySubmitted(submittedName, submittedType);
        }
        onClose();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to submit contact request.');
      }
    } catch {
      setErrorMsg('Network error submitting inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSuccessMsg('');
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-xl bg-[#0B0B0E] border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl"
      >
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#181822] text-neutral-400 hover:text-white border border-neutral-700 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
            <Mail className="w-4 h-4" />
            <span>SOHO LOUNGE MINNEAPOLIS • CONCIERGE INQUIRY</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white uppercase font-serif">
            CONTACT <span className="text-amber-400">CONCIERGE</span>
          </h2>
          <p className="text-xs text-neutral-400">
            Direct routing to Soho concierge team at <span className="text-white font-mono">gungordubc@gmail.com</span>.
          </p>
        </div>

        {successMsg ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold uppercase text-white font-serif">Inquiry Transmitted</h3>
            <p className="text-xs text-neutral-300 max-w-md mx-auto">{successMsg}</p>
            <button
              onClick={handleResetAndClose}
              className="px-6 py-2.5 rounded-xl bg-amber-400 text-black text-xs font-bold uppercase tracking-wider"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase mb-1">Full Legal Name *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#14141C] border border-neutral-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#14141C] border border-neutral-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#14141C] border border-neutral-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase mb-1">Inquiry Message *</label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#14141C] border border-neutral-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {errorMsg && <p className="text-xs text-rose-400">{errorMsg}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-extrabold uppercase tracking-wider"
            >
              {submitting ? 'Transmitting...' : 'Send Inquiry to Concierge'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};
