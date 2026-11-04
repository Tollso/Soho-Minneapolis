import React from 'react';
import { CheckCircle2, XCircle, Crown, CreditCard, UserCheck, Lock } from 'lucide-react';
import { VIPMember } from '../../types';

interface AdminMembersTableProps {
  members: VIPMember[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  isActionLoading: string | null;
}

export const AdminMembersTable: React.FC<AdminMembersTableProps> = ({
  members,
  onApprove,
  onReject,
  isActionLoading
}) => {
  if (members.length === 0) {
    return (
      <div className="p-12 text-center text-neutral-500 bg-neutral-900/40 rounded-2xl border border-neutral-800">
        No VIP member records found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {members.map((member) => {
        const isPending =
          member.approvalStatus === 'Pending for Admin Approval' ||
          (member.approvalStatus as string) === 'Pending Super Admin Approval' ||
          !member.cardIssued;

        return (
          <div
            key={member.id}
            className={`p-5 rounded-xl border transition-all ${
              isPending
                ? 'bg-[#12121A] border-amber-500/40 shadow-lg shadow-amber-500/5'
                : 'bg-neutral-900/50 border-neutral-800'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                {member.photoUrl ? (
                  <img
                    src={member.photoUrl}
                    alt={member.fullName}
                    className="w-14 h-16 rounded-lg object-cover border border-amber-400 shrink-0"
                  />
                ) : (
                  <div className="w-14 h-16 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-600 shrink-0">
                    No Photo
                  </div>
                )}

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-xs text-amber-400 bg-black px-2.5 py-0.5 rounded border border-amber-500/30 flex items-center gap-1">
                      <Crown className="w-3 h-3 text-amber-400" />
                      {member.tier}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                        isPending
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {isPending ? 'Pending for Admin Approval' : 'Active Member'}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">
                      Paid: ${member.paymentAmount || 0}
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-base">{member.fullName}</h4>
                  <div className="text-xs text-neutral-400">
                    {member.email} • {member.phone} {member.profession && `• ${member.profession}`}
                  </div>
                  <div className="text-xs font-mono text-neutral-500">
                    Card #{member.cardNumber || 'PENDING'} • Member ID: {member.id}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 self-end lg:self-center shrink-0">
                {isPending ? (
                  <>
                    <button
                      onClick={() => onReject(member.id)}
                      disabled={isActionLoading === member.id}
                      className="px-4 py-2 rounded-xl border border-rose-800 text-rose-400 hover:bg-rose-950/40 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => onApprove(member.id)}
                      disabled={isActionLoading === member.id}
                      className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve & Issue Card</span>
                    </button>
                  </>
                ) : (
                  <div className="text-right text-xs font-mono text-neutral-500">
                    <div>{member.approvedBy || 'Admin Approved'}</div>
                    <div className="text-emerald-400 font-bold">Door Pass Active</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
