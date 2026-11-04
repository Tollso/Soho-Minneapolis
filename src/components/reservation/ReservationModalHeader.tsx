import React from 'react';
import { X, Sparkles, Check } from 'lucide-react';

interface ReservationModalHeaderProps {
  step: number;
  onClose: () => void;
}

export const ReservationModalHeader: React.FC<ReservationModalHeaderProps> = ({
  step,
  onClose
}) => {
  const steps = [
    { num: 1, label: 'Date & Party' },
    { num: 2, label: 'Section' },
    { num: 3, label: 'Bottles' },
    { num: 4, label: 'Review & Send' }
  ];

  return (
    <div>
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            923 NICOLLET MALL • MINNEAPOLIS
          </span>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase mt-0.5">
            VIP Table Reservation
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between py-4 border-b border-neutral-800/80 mb-6 overflow-x-auto">
        {steps.map((s, idx) => (
          <React.Fragment key={s.num}>
            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                  step === s.num
                    ? 'bg-amber-400 text-black'
                    : step > s.num
                    ? 'bg-emerald-500 text-white'
                    : 'bg-neutral-800 text-neutral-500'
                }`}
              >
                {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
              </span>
              <span
                className={`text-[11px] font-mono uppercase ${
                  step === s.num
                    ? 'text-white font-bold'
                    : step > s.num
                    ? 'text-neutral-400'
                    : 'text-neutral-600'
                }`}
              >
                {s.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`h-[1px] w-6 sm:w-12 mx-2 shrink-0 ${
                  step > s.num ? 'bg-emerald-500' : 'bg-neutral-800'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
