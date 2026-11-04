import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Wine, Flame, Plus, Check } from 'lucide-react';
import { BOTTLE_MENU, cocktailBarImg } from '../data/mockData';
import { BottleItem } from '../types';

interface BottleServiceMenuProps {
  onOpenReservationWithBottles?: (bottles: BottleItem[]) => void;
  onOpenContactModal?: (bottleName?: string) => void;
}

export const BottleServiceMenu: React.FC<BottleServiceMenuProps> = ({
  onOpenReservationWithBottles,
  onOpenContactModal
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedBottles, setSelectedBottles] = useState<BottleItem[]>([]);

  const categories = [
    'All',
    'Tequila',
    'Vodka',
    'Whiskey',
    'Gin',
    'Rum',
    'Champagne',
    'White Wine',
    'Red Wine',
    'Buckets & Mixers'
  ];

  const filteredItems = activeCategory === 'All'
    ? BOTTLE_MENU
    : BOTTLE_MENU.filter(item => item.category === activeCategory);

  const toggleBottleSelect = (item: BottleItem) => {
    if (selectedBottles.some(b => b.id === item.id)) {
      setSelectedBottles(selectedBottles.filter(b => b.id !== item.id));
    } else {
      setSelectedBottles([...selectedBottles, item]);
    }
  };

  const handleStartReservation = () => {
    if (onOpenReservationWithBottles) {
      onOpenReservationWithBottles(selectedBottles);
    }
  };

  return (
    <section id="bottle-service" className="py-20 bg-[#0B0B0E] relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121217] border border-white/30 text-white text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            <Wine className="w-3.5 h-3.5" />
            <span>TOP-SHELF CURATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase font-serif tracking-tight mb-4">
            BOTTLE <span className="text-white">SERVICE & PARADES</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light">
            Hand-selected rare spirits, vintage champagnes, and illuminating bottle parade presentations with LED name displays and sparklers.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white text-black hover:bg-neutral-200  '
                    : 'bg-[#121217] text-neutral-400 border border-neutral-800 hover:text-white hover:border-white/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Bottles Bar Banner (If items selected) */}
        {selectedBottles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-xl bg-[#121217] border border-white flex flex-col sm:flex-row items-center justify-between gap-4 "
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-white" />
              <div>
                <span className="text-sm font-bold text-white uppercase">
                  {selectedBottles.length} Bottle{selectedBottles.length > 1 ? 's' : ''} Pre-Selected
                </span>
                <p className="text-xs text-neutral-400">
                  Pricing: <span className="text-white font-bold">Contact for Pricing</span>
                </p>
              </div>
            </div>

            <button
              onClick={handleStartReservation}
              className="px-6 py-2.5 rounded-lg bg-white  font-extrabold text-xs uppercase tracking-wider hover:bg-[#F3E5AB] transition-all cursor-pointer"
            >
              Continue Table Reservation →
            </button>
          </motion.div>
        )}

        {/* Bottle Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isSelected = selectedBottles.some(b => b.id === item.id);
            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -4 }}
                className={`p-6 rounded-2xl bg-[#121217] border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-white '
                    : 'border-neutral-800/80 hover:border-white/50'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-white bg-[#1A1A24] px-2.5 py-1 rounded border border-white/30">
                      {item.category} • {item.volume}
                    </span>
                    {onOpenContactModal ? (
                      <button
                        type="button"
                        onClick={() => onOpenContactModal(item.name)}
                        className="text-xs font-extrabold text-white uppercase tracking-wider bg-[#181822] hover:bg-white hover:text-black transition-all px-2.5 py-1 rounded border border-white/30 cursor-pointer"
                        title="Click to submit pricing inquiry via Hostinger Mail"
                      >
                        Contact for Pricing
                      </button>
                    ) : (
                      <span className="text-xs font-extrabold text-white uppercase tracking-wider bg-[#181822] px-2.5 py-1 rounded border border-white/30">
                        Contact for Pricing
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white uppercase font-serif tracking-wide mb-2 flex items-center gap-2">
                    {item.name}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed font-light mb-4">
                    {item.description}
                  </p>

                  {item.includesSparklers && (
                    <div className="inline-flex items-center gap-1.5 text-[11px] text-white font-semibold mb-4 bg-[#181822] px-2.5 py-1 rounded">
                      <Flame className="w-3.5 h-3.5 text-white" />
                      <span>Includes Sparkler Show & Server Parade</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-500 uppercase tracking-widest">Complimentary Mixers</span>
                  <button
                    onClick={() => toggleBottleSelect(item)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white '
                        : 'bg-[#181822] text-neutral-300 border border-neutral-700 hover:border-white hover:text-white'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Reservation</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
