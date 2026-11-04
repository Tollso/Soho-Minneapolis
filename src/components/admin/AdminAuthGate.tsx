import React from 'react';
import { Lock, ShieldCheck, KeyRound } from 'lucide-react';
import { SohoNeonLogo } from '../common/SohoNeonLogo';

interface AdminAuthGateProps {
  passcode: string;
  setPasscode: (val: string) => void;
  passcodeError: string | null;
  onVerify: (e: React.FormEvent) => void;
  onExit: () => void;
}

export const AdminAuthGate: React.FC<AdminAuthGateProps> = ({
  passcode,
  setPasscode,
  passcodeError,
  onVerify,
  onExit
}) => {
  return (
    <div className="min-h-screen bg-[#07070A] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0E0E14] border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl text-center">
        <div className="flex justify-center mb-4">
          <SohoNeonLogo size="sm" showGlow={true} />
        </div>

        <h1 className="text-xl font-bold uppercase tracking-wider text-white font-serif mb-1">
          Owner & Admin Portal
        </h1>
        <p className="text-xs text-neutral-400 mb-6 font-mono">
          Enter executive passcode to view and manage all table reservations.
        </p>

        <form onSubmit={onVerify} className="space-y-4">
          <div>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter Admin Passcode"
                className="w-full bg-[#181822] border border-neutral-700 rounded-xl pl-10 pr-4 py-3 text-sm font-mono tracking-widest text-white focus:outline-none focus:border-amber-400"
                autoFocus
              />
            </div>
            {passcodeError && (
              <p className="text-xs text-rose-400 mt-2 font-mono">{passcodeError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-400/20"
          >
            <Lock className="w-4 h-4" />
            <span>Login to Admin Hub</span>
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-neutral-800 flex justify-between items-center text-xs">
          <button
            onClick={onExit}
            className="text-neutral-500 hover:text-white transition-colors cursor-pointer"
          >
            ← Return to Main Site
          </button>
          <span className="text-[10px] font-mono text-amber-500/80 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
            Passcode: soho-admin-2026
          </span>
        </div>
      </div>
    </div>
  );
};
