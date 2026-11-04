import React, { useState } from 'react';
import { Crown, Calendar, Lock, Bot, Menu, X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MobileNavMenu } from './header/MobileNavMenu';
import { GoldSohoLogo } from './common/GoldSohoLogo';
import { SohoNeonLogo } from './common/SohoNeonLogo';

interface HeaderProps {
  onOpenReservation: (sectionId?: string) => void;
  onOpenVipPortal: () => void;
  onOpenConcierge: () => void;
  onOpenContact?: () => void;
  onOpenDressCode?: () => void;
  activeVipMemberName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenReservation,
  onOpenVipPortal,
  onOpenConcierge,
  onOpenContact,
  onOpenDressCode,
  activeVipMemberName
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Official Soho Lounge Brand Logo */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center cursor-pointer group py-1"
          title="Soho Lounge Minneapolis"
        >
          <SohoNeonLogo size="xs" showGlow={false} className="transition-transform group-hover:scale-105" />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">
          <Link to="/sections" onClick={handleLinkClick} className="hover:text-amber-300 transition-colors py-1">
            VIP Sections
          </Link>
          <Link to="/bottle-service" onClick={handleLinkClick} className="hover:text-amber-300 transition-colors py-1">
            Bottle Menu
          </Link>
          <Link to="/vip-card" onClick={handleLinkClick} className="hover:text-amber-300 transition-colors py-1 flex items-center gap-1.5">
            <span>VIP Card</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/40 font-mono tracking-wider lowercase">coming soon</span>
          </Link>
          <Link to="/events" onClick={handleLinkClick} className="hover:text-amber-300 transition-colors py-1">
            Events
          </Link>
          {onOpenDressCode && (
            <button
              onClick={onOpenDressCode}
              className="hover:text-amber-300 text-amber-400/90 transition-colors py-1 uppercase font-semibold text-xs tracking-[0.15em] cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Dress Code</span>
            </button>
          )}
        </nav>

        {/* Action CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenVipPortal}
            className="flex items-center gap-2 px-3.5 py-2 border border-amber-500/40 bg-neutral-900/80 text-amber-300 hover:bg-neutral-800 text-xs font-bold tracking-wider transition-all cursor-pointer rounded-lg"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{activeVipMemberName ? `${activeVipMemberName}` : 'VIP Portal'}</span>
          </button>

          <button
            onClick={() => onOpenReservation()}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 text-black hover:bg-amber-300 text-xs font-black tracking-widest uppercase transition-all shadow-lg shadow-amber-400/20 cursor-pointer rounded-lg"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Table</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <MobileNavMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenReservation={() => onOpenReservation()}
        onOpenVipPortal={onOpenVipPortal}
        onOpenConcierge={onOpenConcierge}
        onOpenDressCode={onOpenDressCode}
      />
    </header>
  );
};
