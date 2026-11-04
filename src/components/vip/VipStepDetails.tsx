import React from 'react';
import { MembershipTier } from '../../types';

interface VipStepDetailsProps {
  tier: MembershipTier;
  setTier: (t: MembershipTier) => void;
  fullName: string;
  setFullName: (n: string) => void;
  email: string;
  setEmail: (e: string) => void;
  phone: string;
  setPhone: (p: string) => void;
  profession: string;
  setProfession: (pr: string) => void;
  errorMsg: string | null;
  onProceed: (e: React.FormEvent) => void;
  onClose: () => void;
}

export const VipStepDetails: React.FC<VipStepDetailsProps> = ({
  tier,
  setTier,
  fullName,
  setFullName,
  email,
  setEmail,
  phone,
  setPhone,
  profession,
  setProfession,
  errorMsg,
  onProceed,
  onClose
}) => {
  return (
    <form onSubmit={onProceed} className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
          Select VIP Card Tier
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { name: 'Gold' as MembershipTier, price: '$500/yr', desc: 'Line Bypass + 1' },
            { name: 'Platinum' as MembershipTier, price: '$1,200/yr', desc: 'Line Bypass + 3' },
            { name: 'Black Card' as MembershipTier, price: '$2,500/yr', desc: 'Unlimited Bypass + 4' }
          ].map((t) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setTier(t.name)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                tier === t.name
                  ? 'bg-amber-400 text-black border-amber-400 shadow-md'
                  : 'bg-[#121217] text-neutral-300 border-neutral-800 hover:border-neutral-600'
              }`}
            >
              <span className="font-bold text-xs uppercase block">{t.name}</span>
              <span className="text-[11px] font-mono font-semibold block">{t.price}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
          Full Legal Name *
        </label>
        <input
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="e.g. Elena Rostova"
          className="w-full bg-[#121217] border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
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
          placeholder="e.g. elena@example.com"
          className="w-full bg-[#121217] border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
            Mobile Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(612) 555-0142"
            className="w-full bg-[#121217] border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
            Profession / Company
          </label>
          <input
            type="text"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            placeholder="e.g. Managing Partner / Architect"
            className="w-full bg-[#121217] border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {errorMsg && (
        <p className="text-xs text-rose-400 bg-rose-950/40 p-3 rounded-lg border border-rose-800">
          {errorMsg}
        </p>
      )}

      <div className="pt-4 border-t border-neutral-800 flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
        >
          Next: Add Portrait Photo →
        </button>
      </div>
    </form>
  );
};
