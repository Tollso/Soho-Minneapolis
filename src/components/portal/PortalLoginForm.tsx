import React from 'react';
import { CreditCard, Lock, RefreshCw } from 'lucide-react';

interface PortalLoginFormProps {
  cardLookupInput: string;
  setCardLookupInput: (v: string) => void;
  errorMsg: string;
  loading: boolean;
  handleLookup: (e: React.FormEvent) => void;
}

export const PortalLoginForm: React.FC<PortalLoginFormProps> = ({
  cardLookupInput,
  setCardLookupInput,
  errorMsg,
  loading,
  handleLookup,
}) => {
  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-[#121217] border border-neutral-800 text-xs text-neutral-300 leading-relaxed">
        <span className="text-amber-400 font-bold block mb-1 uppercase tracking-wider">VIP MEMBER ACCESS</span>
        Enter your registered VIP Card Number or email address to access your digital red carpet pass and active table reservations.
      </div>

      <form onSubmit={handleLookup} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
            VIP Card Number or Email
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={cardLookupInput}
              onChange={(e) => setCardLookupInput(e.target.value)}
              placeholder="e.g. SOHO-BLK-9921-X or your registered email"
              className="w-full bg-[#121217] border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-all"
            />
            <CreditCard className="absolute right-3.5 top-3.5 w-5 h-5 text-neutral-500" />
          </div>
        </div>

        {errorMsg && (
          <p className="text-xs text-rose-400 bg-rose-950/40 p-3 rounded-lg border border-rose-800/50">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-[0.15em] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
          <span>Access VIP Member Portal</span>
        </button>
      </form>
    </div>
  );
};
