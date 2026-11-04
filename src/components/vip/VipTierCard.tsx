import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Crown, ArrowRight } from 'lucide-react';

export interface VipTierItem {
  name: 'Gold' | 'Platinum' | 'Black Card';
  price: string;
  tagline: string;
  perks: string[];
  color: string;
  border: string;
  isExclusive?: boolean;
}

interface VipTierCardProps {
  tier: VipTierItem;
  isSelected: boolean;
  onSelect: () => void;
  onApply: (tierName: string) => void;
}

export const VipTierCard: React.FC<VipTierCardProps> = ({
  tier,
  isSelected,
  onSelect,
  onApply
}) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      onClick={onSelect}
      className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all cursor-pointer relative overflow-hidden ${
        isSelected
          ? 'bg-[#15151F] border-2 border-amber-400 shadow-2xl shadow-amber-400/10 scale-100 sm:scale-105 z-20'
          : 'bg-[#101015] border border-neutral-800/80 hover:border-neutral-600 z-10'
      }`}
    >
      {tier.isExclusive && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-700 text-black text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-bl-xl shadow-md">
          Most Exclusive
        </div>
      )}

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Crown className={`w-5 h-5 ${isSelected ? 'text-amber-400' : 'text-neutral-500'}`} />
          <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
            {tier.name}
          </h3>
        </div>

        <p className="text-xs text-neutral-400 mb-6">{tier.tagline}</p>

        <div className="mb-6 pb-6 border-b border-neutral-800">
          <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {tier.price}
          </span>
          <span className="block text-[10px] uppercase font-mono tracking-widest text-amber-400 mt-1">
            Annual Membership
          </span>
        </div>

        <div className="space-y-3 mb-8">
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold block">
            PRIVILEGES INCLUDED
          </span>
          {tier.perks.map((perk, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{perk}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onApply(tier.name);
          }}
          className={`w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
            isSelected
              ? 'bg-amber-400 text-black hover:bg-amber-300 shadow-lg shadow-amber-400/20'
              : 'bg-neutral-800 text-white hover:bg-neutral-700'
          }`}
        >
          <span>Apply for {tier.name}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
