import React from 'react';
import { Calendar, Users, MapPin, Clock, RefreshCw, QrCode } from 'lucide-react';
import { ReservationRequest } from '../../types';

interface PortalReservationsListProps {
  userReservations: ReservationRequest[];
  email: string;
  onRefresh: (email: string) => void;
}

export const PortalReservationsList: React.FC<PortalReservationsListProps> = ({
  userReservations,
  email,
  onRefresh
}) => {
  return (
    <div className="p-6 rounded-2xl bg-[#0E0E14] border border-neutral-800 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-amber-400" />
          <span>Your VIP Table Bookings</span>
        </h3>
        <button
          onClick={() => onRefresh(email)}
          className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white font-mono"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Refresh</span>
        </button>
      </div>

      {userReservations.length === 0 ? (
        <p className="text-xs text-neutral-500 py-4 text-center">
          No table reservations currently linked to this email address.
        </p>
      ) : (
        <div className="space-y-3">
          {userReservations.map((res) => {
            const isResPending =
              res.status === 'Pending for Admin Approval' ||
              (res.status as string) === 'Pending Super Admin Approval';

            return (
              <div
                key={res.id}
                className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-white">#{res.id}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                        isResPending
                          ? 'bg-amber-400/10 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {isResPending ? 'Pending for Admin Approval' : res.status}
                    </span>
                  </div>
                  <div className="text-neutral-300 font-bold">
                    {res.sectionName} (Table {res.tableNumber})
                  </div>
                  <div className="text-neutral-400 font-mono text-[11px]">
                    {res.date} • {res.timeSlot} • {res.guestCount} Guests
                  </div>
                  {isResPending && (
                    <div className="text-[10px] text-amber-400/90 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Table booking is provisional and awaiting Admin authorization before door pass is finalized.
                    </div>
                  )}
                </div>

                <div className="sm:text-right font-mono text-[11px]">
                  <div className="text-neutral-500 uppercase text-[9px]">Entry Code</div>
                  <div className="font-bold text-amber-300">{res.qrPassCode}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
