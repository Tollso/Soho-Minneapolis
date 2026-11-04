import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, UserCheck } from 'lucide-react';
import { EventItem } from '../../types';

interface GuestlistModalProps {
  event: EventItem | null;
  onClose: () => void;
  onRsvpCompleted?: (guestName: string, eventTitle: string) => void;
}

export const GuestlistModal: React.FC<GuestlistModalProps> = ({ event, onClose, onRsvpCompleted }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [guestCount, setGuestCount] = useState(2);
  const [passCode, setPassCode] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!event) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/guestlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          eventId: event.id,
          guestCount
        })
      });

      if (res.ok) {
        const submittedName = fullName;
        const eventTitle = event.title;
        setFullName('');
        setEmail('');
        setPassCode(null);
        if (onRsvpCompleted) {
          onRsvpCompleted(submittedName, eventTitle);
        }
        onClose();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#0E0E14] border border-neutral-700 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-900 border border-neutral-800"
        >
          <X className="w-5 h-5" />
        </button>

        {passCode ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold uppercase text-white font-serif">
              Guestlist Pass Issued
            </h3>
            <p className="text-xs text-neutral-400">
              Pass dispatched to <span className="text-white font-mono">{email}</span>. Present at 923 Nicollet door prior to 11:30 PM.
            </p>
            <div className="p-3 bg-black rounded-xl border border-neutral-800 font-mono text-sm font-bold text-amber-400">
              {passCode}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-2">
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
                COMPLIMENTARY GUESTLIST
              </span>
              <h3 className="text-xl font-bold uppercase text-white font-serif">{event.title}</h3>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase mb-1">Full Legal Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#161622] border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#161622] border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-extrabold uppercase tracking-wider"
            >
              {submitting ? 'Registering...' : 'Confirm Guestlist RSVP'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
