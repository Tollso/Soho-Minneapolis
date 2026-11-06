import React from 'react';
import { Crown, MapPin, Sparkles, Shield, CreditCard, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoldSohoLogo } from './common/GoldSohoLogo';

interface FooterProps {
  onOpenReservation: () => void;
  onOpenVipCardModal: () => void;
  onOpenVipPortal: () => void;
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenReservation,
  onOpenVipCardModal,
  onOpenVipPortal,
  onOpenContact,
}) => {
  const handleLinkClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#070709] border-t border-neutral-900 text-neutral-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-900">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center">
              <GoldSohoLogo size="sm" showEmblemOnly />
            </div>

            <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-sm">
              Minneapolis’ premier high-end nightclub and VIP sanctuary. Offering luxury bottle service, bespoke suites, and an exclusive digital member portal.
            </p>

            <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
              <MapPin className="w-4 h-4" />
              <span>923 Nicollet Mall, Minneapolis, MN 55402</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">Sanctuary Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/sections" onClick={handleLinkClick} className="hover:text-white transition-colors">VIP Sections & Floorplan</Link>
              </li>
              <li>
                <Link to="/bottle-service" onClick={handleLinkClick} className="hover:text-white transition-colors">Champagne & Bottle Menu</Link>
              </li>
              <li>
                <Link to="/vip-card" onClick={handleLinkClick} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>VIP Card Program</span>
                  <span className="text-[10px] text-amber-400/90 font-mono uppercase tracking-wider">(Coming Soon)</span>
                </Link>
              </li>
              <li>
                <Link to="/events" onClick={handleLinkClick} className="hover:text-white transition-colors">Headline Events & Guestlist</Link>
              </li>
              <li>
                <Link to="/venue" onClick={handleLinkClick} className="hover:text-white transition-colors">Dress Code & Location</Link>
              </li>
            </ul>
          </div>

          {/* Member Privileges */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em]">VIP Member Quick Access</h4>
            
            <div className="flex flex-col gap-2.5">
              <button
                onClick={onOpenVipPortal}
                className="w-full py-2.5 px-4 rounded-xl bg-[#121217] border border-[#D4AF37]/40 text-neutral-200 text-xs font-bold uppercase tracking-wider hover:border-[#D4AF37] hover:text-white transition-all flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                  Digital Wallet Door Pass Portal
                </span>
                <span>→</span>
              </button>

              <button
                onClick={onOpenReservation}
                className="w-full py-2.5 px-4 rounded-xl bg-white text-black hover:bg-neutral-200 text-xs font-black uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0B0B0E]" />
                  Reserve Table & Bottle Service
                </span>
                <span>→</span>
              </button>

              {onOpenContact && (
                <button
                  onClick={onOpenContact}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#121217] border border-neutral-700 text-neutral-200 text-xs font-bold uppercase tracking-wider hover:border-white hover:text-white transition-all flex items-center justify-between cursor-pointer"
                >
                  <span>Contact for Pricing (Email Host)</span>
                  <span>→</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Legal Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} Soho Lounge Minneapolis. All Rights Reserved. 923 Nicollet Mall, Minneapolis MN 55402.</p>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 font-mono font-bold">
              21+ STRICTLY ENFORCED
            </span>
            <span>Upscale Dress Code Applies</span>
            <Link
              to="/admin"
              className="text-neutral-400 hover:text-amber-300 font-mono transition-colors flex items-center gap-1 border border-neutral-800 hover:border-amber-500/50 px-2.5 py-1 rounded bg-neutral-900/80 text-[11px]"
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span>Admin Login</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
