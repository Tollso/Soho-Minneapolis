import React from 'react';
import { QrCode, Clock, ShieldCheck, Lock, User, AlertCircle } from 'lucide-react';
import { VIPMember } from '../../types';

interface PortalDoorPassProps {
  member: VIPMember;
  isPendingApproval: boolean;
  isRejected: boolean;
}

export const PortalDoorPass: React.FC<PortalDoorPassProps> = ({
  member,
  isPendingApproval,
  isRejected
}) => {
  return (
    <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#14141c] via-[#1a1a24] to-[#0d0d12] border-2 border-neutral-700 overflow-hidden shadow-2xl">
      {/* Status Notification Banner */}
      {isPendingApproval ? (
        <div className="mb-4 p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 flex items-start gap-2.5 text-xs text-amber-200">
          <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 animate-pulse" />
          <div>
            <span className="font-bold text-amber-300 block uppercase tracking-wider">
              Membership Application Under Review
            </span>
            Your VIP membership application is currently being processed by our concierge team. Your digital door pass will activate upon confirmation.
          </div>
        </div>
      ) : isRejected ? (
        <div className="mb-4 p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 flex items-start gap-2.5 text-xs text-rose-200">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-rose-300 block uppercase tracking-wider">
              Membership Inquiry Notice
            </span>
            Please contact the VIP host team at gungordubc@gmail.com regarding your membership inquiry.
          </div>
        </div>
      ) : (
        <div className="mb-4 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between text-xs text-emerald-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-bold uppercase tracking-wider">
              Active VIP Membership • Red Carpet Clearance
            </span>
          </div>
        </div>
      )}

      {/* Card Header with Photo */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-20 h-24 rounded-xl overflow-hidden border-2 border-amber-400/70 bg-neutral-900 shrink-0 shadow-lg relative">
            {member.photoUrl ? (
              <img
                src={member.photoUrl}
                alt={member.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-600 bg-neutral-800">
                <User className="w-8 h-8" />
              </div>
            )}
            <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] text-center font-mono text-amber-300 uppercase py-0.5">
              PHOTO ID
            </span>
          </div>

          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold mb-0.5">
              SOHO LOUNGE MINNEAPOLIS
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              {member.fullName}
            </h2>
            <div className="text-xs text-neutral-400 mt-0.5">{member.email}</div>
            <div className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-amber-400/10 text-amber-300 border border-amber-400/30">
              {member.tier} Tier
            </div>
          </div>
        </div>

        <div className="text-left sm:text-right font-mono">
          <div className="text-[10px] text-neutral-400 uppercase">Card Number</div>
          <div className="text-base font-bold text-white tracking-widest">
            {member.cardNumber || 'PENDING'}
          </div>
          <div className="text-[10px] text-neutral-500 mt-1">Since {member.memberSince}</div>
        </div>
      </div>

      {/* Scannable Door QR Pass Area */}
      <div className="p-4 rounded-xl bg-black/60 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-mono font-bold text-white uppercase flex items-center justify-center sm:justify-start gap-1.5">
            <QrCode className="w-4 h-4 text-amber-400" />
            <span>Digital Red Carpet Door Pass</span>
          </div>
          <p className="text-[11px] text-neutral-400">
            Present this pass to Soho security at the red carpet line bypass on Nicollet Mall.
          </p>
        </div>

        <div className="shrink-0 text-center">
          {isPendingApproval ? (
            <div className="p-3 bg-neutral-900 border border-amber-500/30 rounded-xl text-center flex flex-col items-center">
              <Clock className="w-6 h-6 text-amber-400 mb-1" />
              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                Under Review
              </span>
              <span className="text-[9px] text-neutral-500">Concierge Verification</span>
            </div>
          ) : isRejected ? (
            <div className="p-3 bg-rose-950/40 border border-rose-800 rounded-xl text-center">
              <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">
                Access Denied
              </span>
            </div>
          ) : (
            <div className="p-2.5 bg-white rounded-xl shadow-lg border border-amber-400">
              <div className="w-20 h-20 bg-neutral-900 flex items-center justify-center rounded">
                <QrCode className="w-16 h-16 text-white" />
              </div>
              <span className="block text-[8px] font-mono text-black font-bold uppercase mt-1 text-center">
                ACTIVE PASS
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
