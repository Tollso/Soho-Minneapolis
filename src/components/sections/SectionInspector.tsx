import React from 'react';
import { Eye, ArrowRight } from 'lucide-react';
import { TableSection } from '../../types';
import { GoldSohoLogo } from '../common/GoldSohoLogo';

interface SectionInspectorProps {
  selectedSection: TableSection;
  activeTableNumber: string;
  onViewCards: () => void;
  onReserve: (sectionId: string) => void;
}

export const SectionInspector: React.FC<SectionInspectorProps> = ({
  selectedSection,
  activeTableNumber,
  onViewCards,
  onReserve
}) => {
  return (
    <div className="mt-8 p-5 sm:p-6 rounded-xl bg-[#09090D] border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
      <div className="flex items-start sm:items-center gap-4">
        {/* Replaced lounge photo with Gold Soho Lounge Emblem */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-neutral-900/90 border border-amber-500/40 p-2 flex items-center justify-center shrink-0 shadow-md">
          <GoldSohoLogo size="sm" showEmblemOnly />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-400 text-black font-bold">
              {selectedSection.side === 'left' ? 'Stage Left (DJ Flank)' : 'Stage Right (DJ Flank)'}
            </span>
            <span className="text-[10px] font-mono uppercase text-amber-300/80">
              Section {selectedSection.positionIndex} of 3
            </span>
            <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
              Selected Table: {activeTableNumber}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
            {selectedSection.name}
          </h3>
          <p className="text-xs text-neutral-400 max-w-xl line-clamp-2 mt-1">
            {selectedSection.description}
          </p>
          <div className="flex items-center gap-4 mt-2 text-xs text-neutral-400 font-mono">
            <span>Capacity: Up to {selectedSection.capacity} guests</span>
            <span>•</span>
            <span>Booths: {selectedSection.tableNumbers.join(', ')}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
        <button
          type="button"
          onClick={onViewCards}
          className="px-4 py-2.5 rounded-xl border border-neutral-700 hover:border-amber-400 text-neutral-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 text-amber-400" />
          <span>View Details & Perks</span>
        </button>

        <button
          type="button"
          onClick={() => onReserve(selectedSection.id)}
          className="px-6 py-3 rounded-xl bg-amber-400 text-black hover:bg-amber-300 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <span>Reserve {selectedSection.name}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
