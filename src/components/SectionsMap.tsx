import React, { useState } from 'react';
import { LayoutGrid, MapPin } from 'lucide-react';
import { TableSection } from '../types';
import { SECTIONS } from '../data/mockData';
import { SectionFloorPlan } from './sections/SectionFloorPlan';
import { SectionInspector } from './sections/SectionInspector';
import { SectionDetailCard } from './sections/SectionDetailCard';

interface SectionsMapProps {
  onSelectSectionForReservation: (sectionId: string) => void;
}

export const SectionsMap: React.FC<SectionsMapProps> = ({
  onSelectSectionForReservation
}) => {
  const [selectedSection, setSelectedSection] = useState<TableSection>(SECTIONS[0]);
  const [activeTableNumber, setActiveTableNumber] = useState<string>(SECTIONS[0].tableNumbers[0]);
  const [viewMode, setViewMode] = useState<'map' | 'cards'>('map');

  const leftSections = SECTIONS.filter((s) => s.side === 'left');
  const rightSections = SECTIONS.filter((s) => s.side === 'right');

  const handleSelectSection = (sec: TableSection) => {
    setSelectedSection(sec);
    if (!sec.tableNumbers.includes(activeTableNumber)) {
      setActiveTableNumber(sec.tableNumbers[0]);
    }
  };

  const handleSelectTable = (sec: TableSection, tableNum: string) => {
    setSelectedSection(sec);
    setActiveTableNumber(tableNum);
  };

  return (
    <section id="sections" className="py-24 bg-[#050508] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>INTERACTIVE VENUE BLUEPRINT • MINNEAPOLIS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase">
              VIP Table <span className="text-amber-400">Sections</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-2xl">
              Equidistant flanking layout: 3 private VIP lounges positioned on the left and 3 on the right of our elevated DJ soundstage.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center p-1 bg-neutral-900/90 rounded-xl border border-neutral-800 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'map'
                  ? 'bg-amber-400 text-black font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Floor Map</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-amber-400 text-black font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Lounge Enclaves</span>
            </button>
          </div>
        </div>

        {/* View Mode: Map Blueprint */}
        {viewMode === 'map' ? (
          <div>
            <SectionFloorPlan
              leftSections={leftSections}
              rightSections={rightSections}
              selectedSection={selectedSection}
              activeTableNumber={activeTableNumber}
              onSelectSection={handleSelectSection}
              onSelectTable={handleSelectTable}
            />

            <SectionInspector
              selectedSection={selectedSection}
              activeTableNumber={activeTableNumber}
              onViewCards={() => setViewMode('cards')}
              onReserve={onSelectSectionForReservation}
            />
          </div>
        ) : (
          /* View Mode: Lounge Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SECTIONS.map((section) => (
              <SectionDetailCard
                key={section.id}
                section={section}
                isSelected={selectedSection.id === section.id}
                onSelect={setSelectedSection}
                onReserve={onSelectSectionForReservation}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
