import React, { useState } from 'react';
import { Crown, Sparkles, CreditCard, Lock, BellRing, CheckCircle2 } from 'lucide-react';
import { VipTierItem } from './vip/VipTierCard';
import { GoldSohoLogo } from './common/GoldSohoLogo';
import { SohoNeonLogo } from './common/SohoNeonLogo';

interface VipCardSectionProps {
  onOpenVipCardModal: (tier?: string) => void;
  onOpenVipPortal: () => void;
}

export const VipCardSection: React.FC<VipCardSectionProps> = ({
  onOpenVipCardModal,
  onOpenVipPortal
}) => {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'Gold' | 'Platinum' | 'Black Card'>('Black Card');

  // Preserved tier specifications for program launch
  const tiers: VipTierItem[] = [
    {
      name: 'Gold',
      price: '$500 / year',
      tagline: 'Essential Nightlife Access',
      perks: [
        'Priority Express Line Bypass for Cardholder + 1',
        'Guaranteed Table Booking Lead Time',
        '10% Discount on Champagne Packages',
        'Official Photo ID Badge & Digital Wallet Pass'
      ],
      color: 'from-[#B8860B] via-[#D4AF37] to-[#8B6508]',
      border: 'border-amber-400/60'
    },
    {
      name: 'Platinum',
      price: '$1,200 / year',
      tagline: 'Elevated VIP Experience',
      perks: [
        'Line Bypass for Cardholder + 3 Guests',
        'Complimentary Welcome Champagne Bottle on monthly visits',
        'Dedicated VIP Host & Concierge Hotline',
        'Access to Private Afterparties & Artist Meet-and-Greets',
        'Official Photo ID Badge & Digital Wallet Pass'
      ],
      color: 'from-slate-400 via-slate-200 to-slate-400',
      border: 'border-slate-300'
    },
    {
      name: 'Black Card',
      price: '$2,500 / year',
      tagline: 'Ultra-Exclusive Sanctuary Access',
      perks: [
        'Unlimited Line Bypass for Cardholder + 4 Guests',
        'Private Elevator & Amuse / The Suite Priority Access',
        '24/7 Dedicated Concierge & Bottle Vault Storage',
        'Custom Engraved Anodized Black Metal Card + Photo Badge',
        'Complimentary Dom Pérignon Bottle on Birthday Month',
        'Invitation-Only Private Member Tastings'
      ],
      color: 'from-neutral-900 via-neutral-800 to-neutral-950',
      border: 'border-amber-500/60',
      isExclusive: true
    }
  ];

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail || !waitlistEmail.includes('@')) return;
    setWaitlistSubmitted(true);
    try {
      await fetch('/api/vip-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: waitlistEmail })
      });
    } catch (err) {
      console.warn('Waitlist submission notice:', err);
    }
  };

  return (
    <section id="vip-card" className="py-20 bg-[#0B0B0E] relative overflow-hidden border-t border-neutral-900">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121217] border border-amber-400/30 text-amber-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Crown className="w-3.5 h-3.5" />
            <span>MEMBERSHIP PRIVILEGES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase font-serif tracking-tight mb-3">
            SOHO <span className="text-amber-400">VIP CARD PROGRAM</span>
          </h2>
          <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs uppercase tracking-widest font-bold mb-4">
            Coming Soon
          </div>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl mx-auto">
            Our personalized photo ID VIP card tiers are currently being curated for official release. Join the priority waitlist to be notified when enrollment opens.
          </p>
        </div>

        {/* Coming Soon Featured Showcase (Replaces individual card tiers) */}
        <div className="relative rounded-2xl bg-gradient-to-b from-[#181822] via-[#121217] to-[#0D0D12] border border-amber-500/30 p-8 sm:p-12 mb-12 text-center shadow-2xl">
          <div className="flex justify-center mb-6">
            <SohoNeonLogo size="lg" showGlow={true} />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white mb-2">
            VIP Membership Program Launching Soon
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto mb-8 leading-relaxed">
            Personalized laser-engraved anodized metal photo cards offering guaranteed red-carpet line bypass, private concierge booking hotline, and exclusive lounge privileges at 923 Nicollet Mall.
          </p>

          {/* Early Access Notification Form */}
          <div className="max-w-md mx-auto mb-6">
            {waitlistSubmitted ? (
              <div className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>You are on the Soho VIP priority launch waitlist!</span>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-[#0B0B0E] border border-neutral-700 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-amber-400 font-mono"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-amber-400 text-black hover:bg-amber-300 text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BellRing className="w-3.5 h-3.5" />
                  <span>Notify Me</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Member Privileges Highlight Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#121217] border border-neutral-800 max-w-4xl mx-auto mb-10">
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-400 mb-6 text-center">
            Upcoming Soho VIP Card Privileges
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-4 rounded-xl bg-black/40 border border-neutral-800/80">
              <Sparkles className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <h4 className="text-xs font-bold text-white uppercase mb-1">Express Red Carpet Entry</h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed">Line bypass for cardholders and invited guests at every signature weekend event.</p>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-neutral-800/80">
              <CreditCard className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <h4 className="text-xs font-bold text-white uppercase mb-1">Digital Wallet Pass</h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed">Instant digital pass access for seamless door clearance and table placement.</p>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-neutral-800/80">
              <Crown className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <h4 className="text-xs font-bold text-white uppercase mb-1">Priority Concierge</h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed">Direct concierge hotline for reserved suites, champagne packages, and bespoke arrangements.</p>
            </div>
          </div>
        </div>

        {/* Access Existing Portal Button */}
        <div className="text-center">
          <button
            type="button"
            onClick={onOpenVipPortal}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 border border-amber-500/40 text-amber-300 hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            <span>Already a Member? Access Digital VIP Portal</span>
          </button>
        </div>
      </div>
    </section>
  );
};
