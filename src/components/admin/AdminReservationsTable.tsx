import React, { useState } from 'react';
import { CheckCircle2, XCircle, Clock, Calendar, Users, MapPin, Filter } from 'lucide-react';
import { ReservationRequest } from '../../types';

interface AdminReservationsTableProps {
  reservations: ReservationRequest[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  isActionLoading: string | null;
}

export const AdminReservationsTable: React.FC<AdminReservationsTableProps> = ({
  reservations,
  onApprove,
  onReject,
  isActionLoading
}) => {
  const [filterDate, setFilterDate] = useState<string>('');

  if (reservations.length === 0) {
    return (
      <div className="p-12 text-center text-neutral-500 bg-neutral-900/40 rounded-2xl border border-neutral-800">
        No table reservations in system.
      </div>
    );
  }

  // Get list of distinct dates from reservations
  const distinctDates = Array.from(new Set(reservations.map((r) => r.date))).filter(Boolean);
  const filteredReservations = filterDate
    ? reservations.filter((r) => r.date === filterDate)
    : reservations;

  return (
    <div className="space-y-4">
      {/* Calendar Date Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#121217] border border-neutral-800 text-xs">
        <div className="flex items-center gap-2 text-neutral-300 font-mono">
          <Calendar className="w-4 h-4 text-amber-400" />
          <span className="font-bold uppercase tracking-wider">Calendar Filter:</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setFilterDate('')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
              filterDate === ''
                ? 'bg-amber-400 text-black'
                : 'bg-[#181822] text-neutral-400 hover:text-white'
            }`}
          >
            All Nights ({reservations.length})
          </button>
          {distinctDates.map((d) => {
            const count = reservations.filter((r) => r.date === d).length;
            return (
              <button
                key={d}
                type="button"
                onClick={() => setFilterDate(d)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                  filterDate === d
                    ? 'bg-amber-400 text-black'
                    : 'bg-[#181822] text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {d} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {filteredReservations.length === 0 ? (
        <div className="p-8 text-center text-neutral-500 bg-neutral-900/30 rounded-xl border border-neutral-800">
          No table requests for selected calendar date ({filterDate}).
        </div>
      ) : (
        filteredReservations.map((res) => {
          const isPending =
            res.status === 'Pending for Admin Approval' ||
            (res.status as string) === 'Pending Super Admin Approval';

          return (
            <div
              key={res.id}
              className={`p-5 rounded-xl border transition-all ${
                isPending
                  ? 'bg-[#12121A] border-amber-500/40 shadow-lg shadow-amber-500/5'
                  : 'bg-neutral-900/50 border-neutral-800'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-xs text-white bg-black px-2.5 py-0.5 rounded border border-neutral-800">
                      {res.id}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded font-bold ${
                        isPending
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : res.status === 'Approved'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {res.status}
                    </span>
                    {res.vipCardNumber && (
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                        VIP Card: {res.vipCardNumber}
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-white uppercase tracking-tight">
                    {res.fullName}
                  </h4>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 font-mono">
                    <span className="flex items-center gap-1 text-white">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      {res.date}
                    </span>
                    <span className="flex items-center gap-1 text-white">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {res.timeSlot}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {res.guestCount} Guests
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {res.sectionName} ({res.tableNumber})
                    </span>
                  </div>

                  <div className="text-xs text-neutral-400">
                    <span className="font-mono text-neutral-500">Contact:</span> {res.email} • {res.phone || 'No phone'}
                  </div>

                  {res.selectedBottles && res.selectedBottles.length > 0 && (
                    <div className="text-xs text-neutral-300 font-mono pt-1">
                      <span className="text-amber-400 font-bold">Bottles: </span>
                      {res.selectedBottles.map((b) => `${b.quantity}x ${b.name}`).join(', ')}
                    </div>
                  )}

                  {res.specialRequests && (
                    <div className="text-xs text-neutral-400 italic">
                      "{res.specialRequests}"
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isPending ? (
                    <>
                      <button
                        type="button"
                        disabled={isActionLoading === res.id}
                        onClick={() => onApprove(res.id)}
                        className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Approve</span>
                      </button>
                      <button
                        type="button"
                        disabled={isActionLoading === res.id}
                        onClick={() => onReject(res.id)}
                        className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/40 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Reject</span>
                      </button>
                    </>
                  ) : (
                    <span className="text-xs font-mono text-neutral-500 uppercase px-3 py-1.5 rounded bg-neutral-950 border border-neutral-800">
                      Processed
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
