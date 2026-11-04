import React from 'react';
import { Calendar, Users, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ReservationRequest, VIPMember } from '../../types';

interface AdminMetricsBarProps {
  reservations: ReservationRequest[];
  members: VIPMember[];
  activeTab: 'reservations' | 'members';
  setActiveTab: (t: 'reservations' | 'members') => void;
}

export const AdminMetricsBar: React.FC<AdminMetricsBarProps> = ({
  reservations,
  members,
  activeTab,
  setActiveTab
}) => {
  const pendingReservations = reservations.filter(
    (r) => r.status === 'Pending for Admin Approval' || (r.status as string) === 'Pending Super Admin Approval'
  ).length;

  const pendingMembers = members.filter(
    (m) => m.approvalStatus === 'Pending for Admin Approval' || (m.approvalStatus as string) === 'Pending Super Admin Approval'
  ).length;

  return (
    <div className="space-y-6 mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
          <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
            Total Reservations
          </span>
          <span className="text-2xl font-bold font-mono text-white">
            {reservations.length}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-neutral-900/60 border border-amber-500/30">
          <span className="text-[10px] font-mono uppercase text-amber-400 block mb-1">
            Pending Table Approvals
          </span>
          <span className="text-2xl font-bold font-mono text-amber-400">
            {pendingReservations}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
          <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
            Active VIP Members
          </span>
          <span className="text-2xl font-bold font-mono text-white">
            {members.filter((m) => m.cardIssued).length}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-neutral-900/60 border border-amber-500/30">
          <span className="text-[10px] font-mono uppercase text-amber-400 block mb-1">
            Pending VIP Cards
          </span>
          <span className="text-2xl font-bold font-mono text-amber-400">
            {pendingMembers}
          </span>
        </div>
      </div>

      <div className="flex border-b border-neutral-800">
        <button
          onClick={() => setActiveTab('reservations')}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'reservations'
              ? 'border-amber-400 text-amber-400 bg-amber-400/5'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Table Bookings</span>
          {pendingReservations > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-400 text-black font-extrabold">
              {pendingReservations}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('members')}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'members'
              ? 'border-amber-400 text-amber-400 bg-amber-400/5'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>VIP Member Applications</span>
          {pendingMembers > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-400 text-black font-extrabold">
              {pendingMembers}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
