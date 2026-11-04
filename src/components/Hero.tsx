import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, MapPin, CreditCard, ChevronDown, Clock, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { heroImg } from '../data/mockData';
import { GoldSohoLogo } from './common/GoldSohoLogo';
import { RotatingSohoLogo } from './common/RotatingSohoLogo';
import { SohoNeonLogo } from './common/SohoNeonLogo';

interface HeroProps {
  onOpenReservation: () => void;
  onOpenVipCardModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenReservation,
  onOpenVipCardModal,
}) => {
  // Legacy variable preservation (Rule #1)
  const _legacyHeroImg = heroImg;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#07070A] pt-8 pb-16">
      {/* Ambient Nocturnal Background Atmosphere (Replacing Stock Photos with Velvet & Gold Mesh) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(212,175,55,0.06)_0%,transparent_65%)]" />
        <div className="absolute inset-0 bg-neutral-950/70" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center mt-20">
        {/* Location & Status Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-800 text-neutral-400 text-xs uppercase tracking-[0.2em] mb-6"
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>MINNEAPOLIS, MN 55402</span>
        </motion.div>

        {/* Official Soho Neon Brand Logo — Centered in the middle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center justify-center mb-6"
        >
          <h1 className="sr-only">Soho Lounge Minneapolis</h1>
          <SohoNeonLogo
            size="2xl"
            showGlow={true}
            className="my-3 transform scale-95 sm:scale-105 md:scale-115 drop-shadow-[0_0_50px_rgba(245,190,90,0.35)]"
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-base sm:text-xl text-neutral-300 font-light tracking-wide mb-8 leading-relaxed"
        >
          Minneapolis’ definitive nightlife sanctuary & VIP lounge. Elevate your evening with premium bottle service, bespoke velvet suites, and an exclusive digital member portal.
        </motion.p>

        {/* Feature Highlights Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-12 text-xs text-neutral-300"
        >
          <div className="flex flex-col items-center justify-center p-2 border-r border-neutral-800 last:border-none">
            <span className="text-white font-bold uppercase tracking-widest mb-1">VIP Tables</span>
            <span className="text-[10px] text-neutral-500 uppercase">4 Exclusive Sections</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 border-r border-neutral-800 last:border-none">
            <span className="text-white font-bold uppercase tracking-widest mb-1">Bottle Service</span>
            <span className="text-[10px] text-neutral-500 uppercase">Sparkler Shows & Parades</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 border-r border-neutral-800 last:border-none">
            <span className="text-white font-bold uppercase tracking-widest mb-1">VIP Card</span>
            <span className="text-[10px] text-neutral-500 uppercase">Digital Wallet & Door Pass</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <span className="text-white font-bold uppercase tracking-widest mb-1">Hours</span>
            <span className="text-[10px] text-neutral-500 uppercase">Thu-Sun 10PM - 2AM</span>
          </div>
        </motion.div>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onOpenReservation}
            className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-neutral-200 font-bold text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Book Table</span>
          </button>

          <button
            onClick={onOpenVipCardModal}
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white hover:bg-white/5 font-bold text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Apply for VIP</span>
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex justify-center">
          <Link
            to="/sections"
            className="flex flex-col items-center text-xs text-[#D4AF37]/70 hover:text-[#D4AF37] tracking-widest uppercase transition-colors"
          >
            <span>Explore Floorplan</span>
            <ChevronDown className="w-4 h-4 mt-1 animate-bounce" />
          </Link>
        </div>
      </div>
    </section>
  );
};
