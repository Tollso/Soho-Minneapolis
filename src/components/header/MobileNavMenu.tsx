import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Lock, Calendar, Sparkles, ShieldCheck } from 'lucide-react';

interface MobileNavMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReservation: () => void;
  onOpenVipPortal: () => void;
  onOpenConcierge: () => void;
  onOpenDressCode?: () => void;
}

export const MobileNavMenu: React.FC<MobileNavMenuProps> = ({
  isOpen,
  onClose,
  onOpenReservation,
  onOpenVipPortal,
  onOpenConcierge,
  onOpenDressCode
}) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-neutral-950 border-b border-neutral-800 px-4 pt-3 pb-6 space-y-4">
      <nav className="flex flex-col space-y-3 text-xs font-semibold uppercase tracking-wider text-neutral-300">
        <Link to="/sections" onClick={onClose} className="hover:text-amber-400 py-1">
          VIP Sections
        </Link>
        <Link to="/bottle-service" onClick={onClose} className="hover:text-amber-400 py-1">
          Bottle Menu
        </Link>
        <Link to="/vip-card" onClick={onClose} className="hover:text-amber-400 py-1 flex items-center justify-between">
          <span>VIP Card Program</span>
          <span className="text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">Coming Soon</span>
        </Link>
        <Link to="/events" onClick={onClose} className="hover:text-amber-400 py-1">
          Events & DJs
        </Link>
        {onOpenDressCode && (
          <button
            onClick={() => {
              onClose();
              onOpenDressCode();
            }}
            className="text-left hover:text-amber-400 py-1 uppercase text-amber-300 font-bold"
          >
            Dress Code Requirements
          </button>
        )}
      </nav>

      <div className="pt-4 border-t border-neutral-800 space-y-2.5">
        <button
          onClick={() => {
            onClose();
            onOpenVipPortal();
          }}
          className="w-full py-2.5 rounded-lg border border-amber-500/40 bg-neutral-900 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 text-amber-300"
        >
          <Lock className="w-4 h-4" />
          <span>VIP Member Portal</span>
        </button>

        <button
          onClick={() => {
            onClose();
            onOpenReservation();
          }}
          className="w-full py-3 rounded-lg bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
        >
          <Calendar className="w-4 h-4" />
          <span>Book VIP Table</span>
        </button>

        <Link
          to="/admin"
          onClick={onClose}
          className="w-full py-2 rounded-lg border border-neutral-800 text-xs font-mono text-neutral-400 hover:text-white flex items-center justify-center gap-2"
        >
          <Lock className="w-3.5 h-3.5 text-amber-400" />
          <span>Admin Login Portal</span>
        </Link>
      </div>
    </div>
  );
};
