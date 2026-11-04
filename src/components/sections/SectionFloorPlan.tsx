import React from 'react';
import { motion } from 'framer-motion';
import { Users, Music, Disc } from 'lucide-react';
import { TableSection } from '../../types';

interface SectionFloorPlanProps {
  leftSections: TableSection[];
  rightSections: TableSection[];
  selectedSection: TableSection;
  activeTableNumber: string;
  onSelectSection: (sec: TableSection) => void;
  onSelectTable: (sec: TableSection, tableNum: string) => void;
}

export const SectionFloorPlan: React.FC<SectionFloorPlanProps> = ({
  leftSections,
  rightSections,
  selectedSection,
  activeTableNumber,
  onSelectSection,
  onSelectTable
}) => {
  const renderWing = (sections: TableSection[], wingLabel: string, isLeft: boolean) => (
    <div className="lg:col-span-6 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-neutral-800 text-xs font-bold text-neutral-300">
        <span className="uppercase tracking-wider flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-neutral-800 text-white text-[10px] font-mono">{isLeft ? 'WEST WING' : 'EAST WING'}</span>
          {wingLabel}
        </span>
        <span className="text-[10px] text-neutral-500 font-mono">3 Booths Each</span>
      </div>

      {sections.map((sec, idx) => {
        const isSelected = selectedSection.id === sec.id;
        return (
          <motion.div
            key={sec.id}
            whileHover={{ scale: 1.01 }}
            onClick={() => onSelectSection(sec)}
            className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
              isSelected
                ? 'bg-[#181824] border-amber-400 shadow-lg shadow-amber-500/10'
                : 'bg-[#0E0E14] border-neutral-800 hover:border-neutral-600'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                    {isLeft ? 'Left' : 'Right'} Section {idx + 1} of 3
                  </span>
                  {sec.isPopular && (
                    <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-400 text-black">
                      HIGH DEMAND
                    </span>
                  )}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide">
                  {sec.name}
                </h3>
                <p className="text-[11px] text-neutral-400 font-light">{sec.tagline}</p>
              </div>

              <span className="text-xs font-mono font-extrabold text-amber-300 bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800">
                VIP Enclave
              </span>
            </div>

            <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                <Users className="w-3.5 h-3.5 text-neutral-400" />
                <span>Up to {sec.capacity} guests</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-neutral-500 uppercase font-mono mr-1">Booths:</span>
                {sec.tableNumbers.map((tb) => {
                  const isTableActive = isSelected && activeTableNumber === tb;
                  return (
                    <button
                      key={tb}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTable(sec, tb);
                      }}
                      className={`px-2 py-1 rounded text-[11px] font-mono font-bold transition-colors cursor-pointer ${
                        isTableActive
                          ? 'bg-amber-400 text-black shadow'
                          : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                      }`}
                    >
                      {tb}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <div className="p-4 sm:p-8 rounded-2xl bg-[#09090D] border border-neutral-800 shadow-2xl relative overflow-hidden">
      {/* Central DJ Booth Header */}
      <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-neutral-900 to-amber-500/10 border border-amber-500/30 text-center relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="p-2 rounded-lg bg-amber-400/20 text-amber-300">
            <Disc className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold block">
              VENUE AXIS • ELEVATED SOUNDSTAGE
            </span>
            <h3 className="text-base sm:text-lg font-black tracking-widest text-white uppercase flex items-center justify-center gap-2">
              <Music className="w-4 h-4 text-amber-400" />
              CENTRAL DJ BOOTH & VOID ACOUSTICS STACK
              <Music className="w-4 h-4 text-amber-400" />
            </h3>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center gap-6 text-xs text-neutral-400 font-mono">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300/90 flex items-center gap-1">
            ← 3 SECTIONS ON LEFT (AMUSE, PRIVÉ, VELVET)
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300/90 flex items-center gap-1">
            3 SECTIONS ON RIGHT (THE SUITE, NICOLLET, THE HOUSE) →
          </span>
        </div>
      </div>

      {/* Flanking Wings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
        {renderWing(leftSections, 'STAGE LEFT (3 SECTIONS)', true)}
        {renderWing(rightSections, 'STAGE RIGHT (3 SECTIONS)', false)}
      </div>

      {/* Main Bar & Entrance Footers */}
      <div className="mt-8 pt-6 border-t border-neutral-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
        <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/80">
          <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block mb-0.5">
            ← VIP RED CARPET ACCESS & CONCIERGE
          </span>
          <span className="text-xs text-neutral-500">Nicollet Mall Private Entry</span>
        </div>
        <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/80">
          <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block mb-0.5">
            MAIN BAR & MIXOLOGY SALON →
          </span>
          <span className="text-xs text-neutral-500">Artisan Cocktails & Vintage Champagne</span>
        </div>
      </div>
    </div>
  );
};
