import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Music, UserCheck, Sparkles } from 'lucide-react';
import { EVENTS } from '../data/mockData';
import { EventItem } from '../types';
import { GuestlistModal } from './events/GuestlistModal';
import { RotatingSohoLogo } from './common/RotatingSohoLogo';

interface EventsSectionProps {
  onOpenReservationForEvent?: (date: string) => void;
  onGuestlistRsvpSubmitted?: (guestName: string, eventTitle: string) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  onOpenReservationForEvent,
  onGuestlistRsvpSubmitted
}) => {
  const [guestlistModalEvent, setGuestlistModalEvent] = useState<EventItem | null>(null);

  return (
    <section id="events" className="py-20 bg-[#0B0B0E] relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121217] border border-amber-400/30 text-amber-400 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            <Music className="w-3.5 h-3.5" />
            <span>WEEKLY HEADLINE LINEUP</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase font-serif tracking-tight mb-4">
            FEATURED <span className="text-amber-400">EVENTS & GUESTLIST</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light">
            World-class international DJs, immersive production, and exclusive guestlist privileges at 923 Nicollet Mall.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {EVENTS.map((event) => {
            // Legacy preservation (Rule #1)
            const _legacyEventImg = event.image;
            return (
              <motion.div
                key={event.id}
                whileHover={{ y: -6 }}
                className="bg-[#121217] border border-neutral-800 hover:border-amber-400/50 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xl transition-all"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-gradient-to-b from-[#181822] via-[#121217] to-[#0D0D12] flex items-center justify-center border-b border-neutral-800/80">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(246,196,102,0.08)_0%,transparent_60%)]" />
                    <RotatingSohoLogo size="sm" speed={10} className="transform scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-[#121217]/20 to-transparent pointer-events-none" />
                    <span className="absolute top-3 left-3 bg-[#0B0B0E]/90 text-amber-300 border border-amber-500/40 text-[10px] font-extrabold px-3 py-1 rounded uppercase tracking-widest backdrop-blur-md">
                      {event.dayOfWeek}
                    </span>
                  </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{event.time}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white uppercase font-serif tracking-wide mb-1">
                    {event.title}
                  </h3>
                  <span className="text-xs text-amber-300 font-bold block mb-3 font-mono uppercase">
                    {event.headline}
                  </span>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    {event.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setGuestlistModalEvent(event)}
                  className="flex-1 py-2.5 rounded-xl border border-neutral-700 hover:border-amber-400 text-xs font-bold uppercase tracking-wider text-neutral-200 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UserCheck className="w-4 h-4 text-amber-400" />
                  <span>Guestlist RSVP</span>
                </button>
                {onOpenReservationForEvent && (
                  <button
                    type="button"
                    onClick={() => onOpenReservationForEvent(event.id)}
                    className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md"
                  >
                    VIP Table
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      </div>

      <GuestlistModal
        event={guestlistModalEvent}
        onClose={() => setGuestlistModalEvent(null)}
        onRsvpCompleted={onGuestlistRsvpSubmitted}
      />
    </section>
  );
};
