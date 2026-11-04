import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface ReservationStep4Props {
  fullName: string;
  setFullName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  vipCardNumber: string;
  setVipCardNumber: (v: string) => void;
  specialRequests: string;
  setSpecialRequests: (v: string) => void;
  isSubmitting: boolean;
  errorMsg: string;
  onSubmit: (e: React.FormEvent) => void;
  onPrev: () => void;
}

export const ReservationStep4: React.FC<ReservationStep4Props> = ({
  fullName,
  setFullName,
  email,
  setEmail,
  phone,
  setPhone,
  vipCardNumber,
  setVipCardNumber,
  specialRequests,
  setSpecialRequests,
  isSubmitting,
  errorMsg,
  onSubmit,
  onPrev,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Alexander Sterling"
            className="w-full bg-[#121217] border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#white]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. alexander@example.com"
            className="w-full bg-[#121217] border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#white]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
            Mobile Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. (612) 555-0199"
            className="w-full bg-[#121217] border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#white]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
            VIP Card # (Optional)
          </label>
          <input
            type="text"
            value={vipCardNumber}
            onChange={(e) => setVipCardNumber(e.target.value)}
            placeholder="e.g. SOHO-BLK-9921-X"
            className="w-full bg-[#121217] border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#white]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
          Special Requests / Sparkler Parade Text
        </label>
        <textarea
          rows={2}
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          placeholder="e.g. Birthday parade with LED sign reading 'HAPPY BIRTHDAY ALEX', security escort required"
          className="w-full bg-[#121217] border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#white]"
        />
      </div>

      {/* Venue Policy Notice */}
      <div className="p-3 bg-[#121217] rounded-xl border border-neutral-800 text-xs text-neutral-300 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="text-white font-bold block uppercase tracking-wider text-[11px]">
            VIP Table Policy & Confirmation
          </span>
          <p className="text-neutral-400 text-[11px] leading-relaxed mt-0.5">
            21+ upscale dress code strictly enforced. Our VIP host team will review table availability and send a confirmation directly to your email.
          </p>
        </div>
      </div>

      {errorMsg && (
        <p className="text-xs text-rose-400 bg-rose-950/40 p-3 rounded-lg border border-rose-800/50">
          {errorMsg}
        </p>
      )}

      <div className="pt-4 border-t border-neutral-800 flex justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 rounded-xl bg-[#121217] text-neutral-400 font-bold text-xs uppercase tracking-wider cursor-pointer hover:text-white"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-400/20"
        >
          {isSubmitting ? (
            <span>Sending to Management...</span>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Send Reservation to Management</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
