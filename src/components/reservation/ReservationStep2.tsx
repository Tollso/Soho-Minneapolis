import React, { useState, useEffect } from 'react';
import { ChevronRight, Users, Ban, AlertCircle } from 'lucide-react';
import { SECTIONS } from '../../data/mockData';
import { TableSection } from '../../types';

interface ReservationStep2Props {
  selectedSection: TableSection;
  setSelectedSection: (sec: TableSection) => void;
  selectedTableNumber?: string;
  setSelectedTableNumber?: (table: string) => void;
  date?: string;
  timeSlot?: string;
  onNext: () => void;
  onPrev: () => void;
}

export const ReservationStep2: React.FC<ReservationStep2Props> = ({
  selectedSection,
  setSelectedSection,
  selectedTableNumber,
  setSelectedTableNumber,
  date,
  timeSlot,
  onNext,
  onPrev,
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'left' | 'right'>('all');
  const [bookedSectionIds, setBookedSectionIds] = useState<string[]>([]);
  const [bookedDetails, setBookedDetails] = useState<{ [id: string]: string }>({});

  useEffect(() => {
    if (!date) return;
    fetch(`/api/reservations/availability?date=${encodeURIComponent(date)}&timeSlot=${encodeURIComponent(timeSlot || '11:00 PM')}`)
      .then(res => res.json())
      .then(data => {
        if (data.bookedSectionIds) {
          setBookedSectionIds(data.bookedSectionIds);
          const details: { [id: string]: string } = {};
          (data.bookings || []).forEach((b: any) => {
            details[b.sectionId] = b.status === 'Approved' ? 'Reserved & Approved' : 'Request Pending';
          });
          setBookedDetails(details);
        }
      })
      .catch(err => console.warn('Could not check availability:', err));
  }, [date, timeSlot]);

  const filteredSections = SECTIONS.filter((s) => {
    if (filterTab === 'all') return true;
    return s.side === filterTab;
  });

  const handleSelectSec = (sec: TableSection) => {
    if (bookedSectionIds.includes(sec.id)) return;
    setSelectedSection(sec);
    if (setSelectedTableNumber) setSelectedTableNumber(sec.tableNumbers[0]);
  };

  const currentTable = selectedTableNumber || selectedSection.tableNumbers[0];
  const isCurrentSectionBooked = bookedSectionIds.includes(selectedSection.id);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
        <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
          Choose VIP Lounge Section & Booth
        </label>
        {date && (
          <span className="text-[11px] text-amber-400 font-mono">
            Checking: {date} @ {timeSlot || '11:00 PM'}
          </span>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(['all', 'left', 'right'] as const).map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilterTab(tab)}
            className={`px-3 py-1 rounded text-[11px] font-bold uppercase transition-colors cursor-pointer ${
              filterTab === tab ? 'bg-white text-black font-extrabold' : 'bg-[#121217] text-neutral-400 border border-neutral-800'
            }`}
          >
            {tab === 'all' ? 'All 6 Sections' : tab === 'left' ? '← 3 Left Stage' : '3 Right Stage →'}
          </button>
        ))}
      </div>

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[350px] overflow-y-auto pr-1">
        {filteredSections.map((sec) => {
          const isSelected = selectedSection.id === sec.id;
          const isBooked = bookedSectionIds.includes(sec.id);
          const bookStatus = bookedDetails[sec.id] || 'Unavailable';

          return (
            <div
              key={sec.id}
              onClick={() => handleSelectSec(sec)}
              className={`p-3.5 rounded-xl border transition-all relative ${
                isBooked
                  ? 'bg-rose-950/20 border-rose-900/40 opacity-60 cursor-not-allowed'
                  : isSelected
                  ? 'bg-[#181822] border-white shadow-md cursor-pointer'
                  : 'bg-[#121217] border-neutral-800 hover:border-neutral-700 cursor-pointer'
              }`}
            >
              <div className="flex justify-between items-start mb-1.5">
                <div>
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-bold block w-fit mb-1 border border-neutral-700">
                    {sec.side === 'left' ? '← Stage Left' : 'Stage Right →'}
                  </span>
                  <span className="font-bold text-white uppercase text-sm">{sec.name}</span>
                </div>
                {isBooked ? (
                  <span className="text-[9px] font-bold text-rose-400 uppercase font-mono bg-rose-950 border border-rose-800 px-2 py-0.5 rounded flex items-center gap-1">
                    <Ban className="w-3 h-3" />
                    {bookStatus}
                  </span>
                ) : (
                  <span className="text-[9px] font-extrabold text-emerald-400 uppercase font-mono bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                    Available
                  </span>
                )}
              </div>

              <p className="text-[11px] text-neutral-400 font-light mb-2 line-clamp-2">{sec.description}</p>
              
              <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono pt-2 border-t border-neutral-800/80">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-neutral-400" />
                  Up to {sec.capacity} Guests
                </span>
                <span>Booths: {sec.tableNumbers.join(', ')}</span>
              </div>

              {isSelected && !isBooked && setSelectedTableNumber && (
                <div className="mt-2.5 pt-2.5 border-t border-neutral-800 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-neutral-400 font-mono uppercase">Booth:</span>
                  <div className="flex gap-1.5">
                    {sec.tableNumbers.map((tb) => (
                      <button
                        key={tb}
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setSelectedTableNumber(tb); }}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                          currentTable === tb ? 'bg-white text-black font-extrabold' : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                        }`}
                      >
                        {tb}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isCurrentSectionBooked && (
        <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2 font-mono">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{selectedSection.name} is already booked for this night and time. Please pick an open section above.</span>
        </div>
      )}

      <div className="pt-3 border-t border-neutral-800 flex justify-between items-center">
        <button type="button" onClick={onPrev} className="px-5 py-2.5 rounded-xl bg-[#121217] text-neutral-400 font-bold text-xs uppercase hover:text-white cursor-pointer">
          ← Back
        </button>
        <button
          type="button"
          disabled={isCurrentSectionBooked}
          onClick={onNext}
          className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
            isCurrentSectionBooked
              ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
              : 'bg-white text-black hover:bg-neutral-200 cursor-pointer shadow-lg'
          }`}
        >
          <span>Select Bottle Package ({selectedSection.name})</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
