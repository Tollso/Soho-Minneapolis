import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ReservationCalendar } from './ReservationCalendar';

interface ReservationStep1Props {
  date: string;
  setDate: (d: string) => void;
  timeSlot: string;
  setTimeSlot: (t: string) => void;
  guestCount: number;
  setGuestCount: (g: number) => void;
  onNext: () => void;
}

export const ReservationStep1: React.FC<ReservationStep1Props> = ({
  date,
  setDate,
  timeSlot,
  setTimeSlot,
  guestCount,
  setGuestCount,
  onNext,
}) => {
  const getUpcomingNight = (targetDayOfWeek: number, dayName: string, sub: string) => {
    const now = new Date();
    const currentDay = now.getDay();
    let daysUntil = (targetDayOfWeek - currentDay + 7) % 7;
    if (daysUntil === 0) daysUntil = 7;
    const target = new Date(now);
    target.setDate(now.getDate() + daysUntil);
    const m = target.toLocaleString('en-US', { month: 'short' });
    const d = target.getDate();
    const dateStr = `${target.getFullYear()}-${String(target.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    return { date: dateStr, label: `${dayName}, ${m} ${d}`, sub };
  };

  const featuredNights = [
    getUpcomingNight(5, 'Friday', 'Obsidian Velvet'),
    getUpcomingNight(6, 'Saturday', 'Champagne & Diamonds'),
    getUpcomingNight(0, 'Sunday', 'Skylight Sessions'),
  ];

  return (
    <div className="space-y-6">
      {/* Interactive Booking Calendar for Table & VIP Requests */}
      <div>
        <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
          Select Date via Calendar
        </label>
        <ReservationCalendar selectedDate={date} onSelectDate={setDate} />
      </div>

      {/* Featured Headline Events Quick Selection */}
      <div>
        <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
          Or Select Featured Headline Event
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {featuredNights.map((item) => (
            <button
              key={item.date}
              type="button"
              onClick={() => setDate(item.date)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                date === item.date
                  ? 'bg-[#181822] border-amber-400 text-white shadow-md'
                  : 'bg-[#121217] border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <span className="block text-xs font-bold text-white">{item.label}</span>
              <span className="text-[10px] text-amber-400/90 block mt-0.5">{item.sub}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
            Arrival Time Slot
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['10:00 PM', '11:00 PM', 'Midnight'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTimeSlot(t)}
                className={`py-2.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                  timeSlot === t
                    ? 'bg-white text-black border-white'
                    : 'bg-[#121217] text-neutral-300 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
              Guest Count
            </label>
            <span className="text-[10px] text-neutral-400 font-mono">Max 6 per section</span>
          </div>
          <div className="flex items-center gap-3 bg-[#121217] p-2.5 rounded-xl border border-neutral-800">
            <button
              type="button"
              onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
              className="w-8 h-8 rounded bg-[#181822] text-white font-bold flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
              -
            </button>
            <span className="flex-1 text-center font-bold text-white text-sm">
              {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}
            </span>
            <button
              type="button"
              onClick={() => setGuestCount(Math.min(6, guestCount + 1))}
              className="w-8 h-8 rounded bg-[#181822] text-white font-bold flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-neutral-800 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-3 rounded-xl bg-white text-black hover:bg-neutral-200 font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Select Section & Booth</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
