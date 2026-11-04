import React from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { TableSection } from '../../types';
import { GoldSohoLogo } from '../common/GoldSohoLogo';

interface SectionDetailCardProps {
  section: TableSection;
  isSelected: boolean;
  onSelect: (sec: TableSection) => void;
  onReserve: (secId: string) => void;
}

export const SectionDetailCard: React.FC<SectionDetailCardProps> = ({
  section,
  isSelected,
  onSelect,
  onReserve
}) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={() => onSelect(section)}
      className={`rounded-2xl border transition-all cursor-pointer overflow-hidden flex flex-col ${
        isSelected
          ? 'bg-[#14141E] border-amber-400/80 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400/30'
          : 'bg-[#0A0A0E] border-neutral-800 hover:border-neutral-700'
      }`}
    >
      {/* Luxury Gold Soho Emblem Header replacing all lounge photos */}
      <div className="relative py-8 px-4 bg-gradient-to-b from-neutral-900 via-black to-neutral-950 border-b border-amber-500/20 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none" />
        <GoldSohoLogo size="md" subtitle={section.name.toUpperCase()} />

        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded bg-black/80 text-amber-300 border border-amber-500/30 backdrop-blur-sm">
            {section.side === 'left' ? 'Stage Left Wing' : 'Stage Right Wing'}
          </span>
          <span className="text-[10px] font-mono uppercase px-2 py-1 rounded bg-black/80 text-neutral-400 border border-neutral-800">
            Tier {section.positionIndex}
          </span>
        </div>

        {section.isPopular && (
          <div className="absolute top-3 right-3">
            <span className="text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded bg-amber-400 text-black shadow-md">
              HIGH DEMAND
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <h3 className="text-xl font-bold text-white uppercase tracking-wide">
              {section.name}
            </h3>
            <span className="text-xs font-mono font-bold text-amber-400">
              VIP Reservation
            </span>
          </div>

          <p className="text-xs text-neutral-400 mb-4 font-mono">
            Floor Position: {section.zoneLabel} • Capacity: {section.capacity} guests
          </p>

          <p className="text-xs text-neutral-300 line-clamp-3 mb-6 leading-relaxed">
            {section.description}
          </p>

          <div className="space-y-2 mb-6">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-bold block">
              INCLUDED VIP AMENITIES
            </span>
            {section.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
              <Users className="w-4 h-4 text-neutral-400" />
              <span>Max {section.capacity} Guests</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-mono text-neutral-500">Booths:</span>
              <span className="text-xs font-mono text-white font-bold">{section.tableNumbers.join(', ')}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onReserve(section.id);
            }}
            className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 cursor-pointer"
          >
            <span>Reserve {section.name}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
