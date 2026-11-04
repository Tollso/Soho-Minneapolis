import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Calendar as CalendarIcon } from 'lucide-react';

interface ReservationCalendarProps {
  selectedDate: string; // YYYY-MM-DD
  onSelectDate: (dateStr: string) => void;
  className?: string;
}

export const ReservationCalendar: React.FC<ReservationCalendarProps> = ({
  selectedDate,
  onSelectDate,
  className = ''
}) => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  const formatDateStr = (y: number, m: number, d: number) =>
    `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  const todayStr = formatDateStr(today.getFullYear(), today.getMonth(), today.getDate());
  const isCurrentMonthView = currentYear === today.getFullYear() && currentMonth === today.getMonth();

  const handlePrevMonth = () => {
    if (isCurrentMonthView) return;
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else { setCurrentMonth(currentMonth - 1); }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else { setCurrentMonth(currentMonth + 1); }
  };

  const goToToday = () => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
    onSelectDate(todayStr);
  };

  const selectUpcomingWeekend = (targetDayOfWeek: number, weeksOffset = 0) => {
    const currentDay = today.getDay();
    let daysUntil = (targetDayOfWeek - currentDay + 7) % 7;
    if (daysUntil === 0 && weeksOffset === 0) daysUntil = 7;
    daysUntil += weeksOffset * 7;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + daysUntil);
    const dateStr = formatDateStr(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
    setCurrentYear(targetDate.getFullYear());
    setCurrentMonth(targetDate.getMonth());
    onSelectDate(dateStr);
  };

  return (
    <div className={`p-4 rounded-2xl bg-[#0F0F14] border border-neutral-800 shadow-xl select-none ${className}`}>
      {/* Month Navigation & Current Month Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-bold text-white uppercase tracking-wider">
            {monthNames[currentMonth]} {currentYear}
          </span>
          {!isCurrentMonthView && (
            <button
              type="button"
              onClick={goToToday}
              className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono hover:bg-amber-500/20 cursor-pointer"
            >
              Today
            </button>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePrevMonth}
            disabled={isCurrentMonthView}
            className={`p-1.5 rounded-lg transition-colors ${
              isCurrentMonthView ? 'text-neutral-600 bg-neutral-900/50 cursor-not-allowed' : 'bg-[#181822] text-neutral-400 hover:text-white cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button type="button" onClick={handleNextMonth} className="p-1.5 rounded-lg bg-[#181822] text-neutral-400 hover:text-white transition-colors cursor-pointer">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {daysOfWeek.map((day, idx) => (
          <span key={day} className={`text-[10px] font-mono uppercase font-bold py-1 ${idx === 4 || idx === 5 || idx === 6 ? 'text-amber-400/90' : 'text-neutral-500'}`}>
            {day}
          </span>
        ))}
      </div>

      {/* Day Cells Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from({ length: firstDayIndex }).map((_, idx) => (
          <div key={`empty-${idx}`} className="h-10 w-full" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const day = idx + 1;
          const dateStr = formatDateStr(currentYear, currentMonth, day);
          const isSelected = selectedDate === dateStr;
          const isToday = dateStr === todayStr;
          const dayOfWeek = (firstDayIndex + idx) % 7;
          const isClubNight = dayOfWeek === 4 || dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0;
          const isPast = dateStr < todayStr && currentYear <= today.getFullYear();

          return (
            <button
              key={dateStr}
              type="button"
              disabled={isPast}
              onClick={() => onSelectDate(dateStr)}
              className={`h-10 w-full rounded-xl flex flex-col items-center justify-center text-xs font-mono font-bold transition-all relative cursor-pointer ${
                isSelected
                  ? 'bg-amber-400 text-black shadow-lg shadow-amber-500/30 scale-105 z-10'
                  : isToday
                  ? 'bg-amber-400/15 text-white border-2 border-amber-400 ring-2 ring-amber-400/30 shadow-md shadow-amber-500/10'
                  : isPast
                  ? 'text-neutral-600 opacity-40 cursor-not-allowed'
                  : isClubNight
                  ? 'text-white bg-[#161620] hover:bg-[#1E1E2C] border border-amber-500/20 hover:border-amber-400/50'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/80'
              }`}
            >
              <span>{day}</span>
              {isToday ? (
                <span className={`text-[8px] font-mono uppercase tracking-wider font-extrabold leading-none mt-0.5 ${isSelected ? 'text-black' : 'text-amber-300'}`}>
                  TODAY
                </span>
              ) : isClubNight && !isSelected && !isPast ? (
                <span className="w-1 h-1 rounded-full bg-amber-400 mt-0.5" />
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Quick Select Buttons with Today Button */}
      <div className="mt-3 pt-3 border-t border-neutral-800/80 flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] text-neutral-500 font-mono uppercase mr-1">Quick Select:</span>
        <button
          type="button"
          onClick={goToToday}
          className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-colors cursor-pointer ${
            selectedDate === todayStr ? 'bg-amber-400 text-black' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-400 hover:text-black'
          }`}
        >
          Today ({today.getDate()})
        </button>
        <button type="button" onClick={() => selectUpcomingWeekend(5)} className="px-2 py-1 rounded bg-[#181822] hover:bg-amber-400 hover:text-black text-[10px] text-neutral-300 font-mono transition-colors cursor-pointer">This Fri</button>
        <button type="button" onClick={() => selectUpcomingWeekend(6)} className="px-2 py-1 rounded bg-[#181822] hover:bg-amber-400 hover:text-black text-[10px] text-neutral-300 font-mono transition-colors cursor-pointer">This Sat</button>
        <button type="button" onClick={() => selectUpcomingWeekend(5, 1)} className="px-2 py-1 rounded bg-[#181822] hover:bg-amber-400 hover:text-black text-[10px] text-neutral-300 font-mono transition-colors cursor-pointer">Next Fri</button>
        <button type="button" onClick={() => selectUpcomingWeekend(6, 1)} className="px-2 py-1 rounded bg-[#181822] hover:bg-amber-400 hover:text-black text-[10px] text-neutral-300 font-mono transition-colors cursor-pointer">Next Sat</button>
      </div>

      {/* Selected Date Confirmation */}
      {selectedDate && (
        <div className="mt-2.5 p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5 text-amber-300 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Reserved Night: {selectedDate} {selectedDate === todayStr ? '(Tonight)' : ''}</span>
          </div>
          <span className="text-[10px] text-neutral-400 uppercase">923 Nicollet Mall</span>
        </div>
      )}
    </div>
  );
};
