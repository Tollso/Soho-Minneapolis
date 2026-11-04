import React from 'react';
import { MapPin, Clock, ShieldCheck, Car, Shirt, Phone, Mail } from 'lucide-react';
import { cocktailBarImg } from '../data/mockData';
import { RotatingSohoLogo } from './common/RotatingSohoLogo';

interface VenueInfoProps {
  onOpenContact?: () => void;
}

export const VenueInfo: React.FC<VenueInfoProps> = ({ onOpenContact }) => {
  // Legacy variable preservation (Rule #1)
  const _legacyCocktailImg = cocktailBarImg;
  return (
    <section id="venue-info" className="py-20 bg-[#0B0B0E] relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121217] border border-[#white]/30 text-[#white] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>MINNEAPOLIS FLAGSHIP LOCATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase font-serif tracking-tight mb-4">
            VISIT <span className="text-[#white]">SOHO LOUNGE</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light">
            Conveniently situated in the heart of downtown Minneapolis along historic Nicollet Mall.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Address Card & Interactive Visual Map Banner */}
          <div className="lg:col-span-7 bg-[#121217] border border-[#white]/30 rounded-2xl overflow-hidden p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6 pb-4 border-b border-neutral-800">
                <div>
                  <span className="text-xs font-bold text-[#white] uppercase tracking-widest block mb-1">
                    EXACT LOCATION & NAVIGATION
                  </span>
                  <h3 className="text-2xl font-bold text-white uppercase font-serif">
                    923 Nicollet Mall
                  </h3>
                  <p className="text-sm text-neutral-300">Minneapolis, MN 55402</p>
                </div>

                <a
                  href="https://maps.google.com/?q=923+Nicollet+Mall+Minneapolis+MN+55402"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[#181822] border border-[#white]/40 text-[#white] text-xs font-bold uppercase tracking-wider hover:bg-[#white] hover:text-[#0B0B0E] transition-all"
                >
                  Open in Maps ↗
                </a>
              </div>

              {/* Graphical Simulated Street Map Container */}
              <div className="relative h-64 rounded-xl overflow-hidden border border-neutral-800 bg-gradient-to-b from-[#13131A] via-[#0E0E14] to-[#0A0A0D] flex items-center justify-center p-4 my-4">
                <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                  <RotatingSohoLogo size="lg" speed={16} showGlow={false} />
                </div>
                
                <div className="relative z-10 text-center p-6 rounded-xl bg-[#0B0B0E]/90 border border-[#white] backdrop-blur-md max-w-sm shadow-2xl">
                  <div className="w-10 h-10 rounded-full bg-[#white] text-[#0B0B0E] flex items-center justify-center mx-auto mb-2 ">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-extrabold text-white uppercase tracking-wider block">
                    SOHO LOUNGE MINNEAPOLIS
                  </span>
                  <span className="text-xs text-[#white] font-mono block mt-0.5">
                    923 Nicollet Mall • MN 55402
                  </span>
                  <span className="text-[10px] text-neutral-400 block mt-2">
                    Main Entrance directly on Nicollet Mall
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-800 text-xs">
              <div className="flex items-center gap-2 text-neutral-300">
                <Phone className="w-4 h-4 text-[#white]" />
                <span>Concierge: (612) 555-SOHO</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <Mail className="w-4 h-4 text-[#white]" />
                <span className="font-mono text-white">gungordubc@gmail.com</span>
              </div>
            </div>

            {onOpenContact && (
              <div className="mt-4 pt-4 border-t border-neutral-800">
                <button
                  onClick={onOpenContact}
                  className="w-full py-3 rounded-xl bg-white text-black hover:bg-neutral-200 font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact for Pricing / Send Inquiry</span>
                </button>
                <span className="text-[11px] text-neutral-500 text-center block mt-1.5">
                  Submissions routed directly to gungordubc@gmail.com via Google Mail
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Operating Hours, Valet & Dress Code Rules */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Hours Card */}
            <div className="p-6 rounded-2xl bg-[#121217] border border-neutral-800">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-[#white]" />
                <h4 className="text-base font-bold text-white uppercase tracking-wider font-serif">Hours of Operation</h4>
              </div>
              <div className="space-y-2 text-xs text-neutral-300 border-t border-neutral-800/80 pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-white">Thursday - Sunday:</span>
                  <span className="font-mono text-[#white]">10:00 PM - 2:00 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Monday - Wednesday:</span>
                  <span className="text-neutral-500">Available for Private Events</span>
                </div>
              </div>
            </div>

            {/* Dress Code Rules */}
            <div className="p-6 rounded-2xl bg-[#121217] border border-neutral-800">
              <div className="flex items-center gap-3 mb-3">
                <Shirt className="w-5 h-5 text-[#white]" />
                <h4 className="text-base font-bold text-white uppercase tracking-wider font-serif">Dress Code Policy</h4>
              </div>
              <p className="text-xs text-neutral-300 font-light leading-relaxed mb-3">
                Soho Lounge enforces a stylish, fashionable dress code.
              </p>
              <div className="space-y-1.5 text-[11px] text-neutral-400">
                <p className="text-emerald-400 font-semibold">✓ Encouraged: Clean luxury sneakers, designer denim, stylish streetwear, fashion-forward nightwear, collared shirts.</p>
                <p className="text-rose-400 font-semibold">✗ Strictly Prohibited: Athletic wear (sweatpants, basketball shorts), jerseys, flip-flops, excessively baggy clothing, ski masks, or work boots. Management reserves all rights.</p>
              </div>
            </div>

            {/* Security Card */}
            <div className="p-6 rounded-2xl bg-[#121217] border border-neutral-800">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="w-5 h-5 text-[#white]" />
                <h4 className="text-base font-bold text-white uppercase tracking-wider font-serif">Security</h4>
              </div>
              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                21+ government ID mandatory at entry.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
