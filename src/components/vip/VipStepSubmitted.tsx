import React from 'react';
import { CheckCircle2, ShieldCheck, Lock, Crown } from 'lucide-react';
import { VIPMember } from '../../types';

interface VipStepSubmittedProps {
  member: VIPMember;
  onClose: () => void;
  onOpenPortal: () => void;
}

export const VipStepSubmitted: React.FC<VipStepSubmittedProps> = ({
  member,
  onClose,
  onOpenPortal
}) => {
  return (
    <div className="space-y-6 text-center py-2">
      <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center mx-auto text-amber-400 shadow-xl">
        <Crown className="w-8 h-8" />
      </div>

      <div>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 block mb-1">
          MEMBERSHIP APPLICATION RECEIVED
        </span>
        <h3 className="text-2xl font-black text-white uppercase font-serif tracking-wide">
          Thank You, {member.fullName.split(' ')[0]}
        </h3>
        <p className="text-xs text-neutral-400 max-w-md mx-auto mt-2 leading-relaxed">
          Your application for <strong className="text-white">{member.tier} Membership</strong> has been received by Soho Lounge Minneapolis. Our membership committee will review your profile and reach out with your activation credentials.
        </p>
      </div>

      {/* Member card preview */}
      <div className="p-4 rounded-xl bg-[#121217] border border-neutral-800 text-left max-w-md mx-auto space-y-2">
        <div className="flex items-center gap-3">
          {member.photoUrl && (
            <img
              src={member.photoUrl}
              alt={member.fullName}
              className="w-12 h-14 rounded-lg object-cover border border-amber-400"
            />
          )}
          <div>
            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase block">
              {member.tier} VIP Member
            </span>
            <span className="text-sm font-bold text-white block">{member.fullName}</span>
            <span className="text-xs text-neutral-400 block">{member.email}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-neutral-800 flex justify-between items-center text-xs font-mono">
          <span className="text-neutral-400">Application Reference:</span>
          <span className="text-amber-400 font-bold">{member.cardNumber || 'SOHO-APP-' + member.id}</span>
        </div>
      </div>

      <div className="p-3 bg-[#121217] border border-neutral-800 rounded-xl text-xs text-neutral-400 max-w-md mx-auto text-left flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <span>
          A confirmation copy has been sent to <strong className="text-white">{member.email}</strong>. Our concierge host will contact you directly within 24–48 hours.
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="w-full sm:w-auto px-8 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
};
