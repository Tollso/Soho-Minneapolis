import React from 'react';
import { ChevronRight } from 'lucide-react';
import { BOTTLE_MENU } from '../../data/mockData';
import { TableSection } from '../../types';

interface ReservationStep3Props {
  selectedSection: TableSection;
  bottleCart: { [bottleId: string]: number };
  updateBottleQty: (bottleId: string, delta: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ReservationStep3: React.FC<ReservationStep3Props> = ({
  selectedSection,
  bottleCart,
  updateBottleQty,
  onNext,
  onPrev,
}) => {
  return (
    <div className="space-y-6">
      {/* Bottle Total Banner */}
      <div className="p-4 rounded-xl bg-[#121217] border border-[#white]/40">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-white uppercase">Section: {selectedSection.name}</span>
          <span className="font-bold text-[#white]">
            Pricing: Contact for Pricing
          </span>
        </div>
      </div>

      {/* Quick Bottle Add List */}
      <div className="max-h-60 overflow-y-auto space-y-2.5 pr-2">
        {BOTTLE_MENU.map((item) => {
          const qty = bottleCart[item.id] || 0;
          return (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-[#121217] border border-neutral-800 flex items-center justify-between text-xs"
            >
              <div>
                <span className="font-bold text-white block">{item.name}</span>
                <span className="text-neutral-400">{item.category} • {item.volume} • Contact for Pricing</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateBottleQty(item.id, -1)}
                  className="w-7 h-7 rounded bg-[#181822] text-neutral-300 font-bold hover:bg-[#white] hover:text-[#0B0B0E]"
                >
                  -
                </button>
                <span className="w-6 text-center font-bold text-white font-mono">{qty}</span>
                <button
                  type="button"
                  onClick={() => updateBottleQty(item.id, 1)}
                  className="w-7 h-7 rounded bg-[#181822] text-neutral-300 font-bold hover:bg-[#white] hover:text-[#0B0B0E]"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-neutral-800 flex justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 rounded-xl bg-[#121217] text-neutral-400 font-bold text-xs uppercase tracking-wider"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-3 rounded-xl bg-white text-black hover:bg-neutral-200 font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Enter Contact Info</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
