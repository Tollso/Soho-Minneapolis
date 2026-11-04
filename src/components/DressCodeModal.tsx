import React from 'react';
import { X, CheckCircle, AlertTriangle, Sparkles, ShieldCheck } from 'lucide-react';
import { GoldSohoLogo } from './common/GoldSohoLogo';

interface DressCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DressCodeModal: React.FC<DressCodeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const acceptable = [
    'Button-down and collared shirts',
    'Fashionable fitted shirts & blazers',
    'Dresses, skirts and fashionable jumpsuits',
    'Dress pants and fitted tailored trousers',
    'Clean, well-fitted premium denim',
    'Heels, boots and upscale dress shoes',
    'Clean, upscale fashion sneakers',
    'Tasteful designer and elevated streetwear'
  ];

  const notPermitted = [
    'Sweatpants, joggers or athletic pants',
    'Gym or workout clothing & athletic shorts',
    'Jerseys or team apparel',
    'Pajamas, sleepwear or plain white undershirts',
    'Tank tops, undershirts or sleeveless gym shirts',
    'Excessively oversized or baggy clothing',
    'Torn, heavily distressed or ripped clothing',
    'Flip-flops, slides, slippers or Crocs',
    'Work boots or construction-style footwear',
    'Dirty, heavily worn or damaged athletic shoes',
    'Baseball caps and casual athletic hats',
    'Backpacks or large casual bags'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 bg-neutral-950 border border-amber-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 text-neutral-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-900 border border-neutral-800"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <GoldSohoLogo size="sm" subtitle="SOHO NIGHT CLUB • MINNEAPOLIS" />
          <h2 className="text-2xl font-serif text-white font-bold tracking-wider mt-3">
            UPSCALE NIGHTLIFE ATTIRE
          </h2>
          <p className="text-amber-400 text-xs tracking-widest font-mono uppercase mt-1">
            Dress to Impress • Elevated Club Standards
          </p>
          <p className="text-xs text-neutral-400 mt-2 max-w-lg mx-auto">
            SOHO maintains an upscale nightlife atmosphere. Guests are expected to arrive in stylish, clean, well-fitted attire appropriate for an elevated nightclub environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-neutral-900/80 border border-emerald-500/20">
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Acceptable Attire
            </h3>
            <ul className="space-y-1.5 text-xs text-neutral-300">
              {acceptable.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 text-[10px] mt-0.5">✔</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/80 border border-rose-500/20">
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400 mb-3">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              Not Permitted
            </h3>
            <ul className="space-y-1.5 text-xs text-neutral-300">
              {notPermitted.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-rose-400 text-[10px] mt-0.5">✖</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs">
          <div className="p-3 bg-neutral-900/60 rounded-lg border border-neutral-800">
            <h4 className="font-semibold text-amber-300 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Sneaker Policy
            </h4>
            <p className="text-neutral-400 leading-relaxed text-[11px]">
              Fashionable, clean sneakers are welcome. Running shoes, gym shoes, heavily worn sneakers and obviously athletic footwear may not be permitted.
            </p>
          </div>
          <div className="p-3 bg-neutral-900/60 rounded-lg border border-neutral-800">
            <h4 className="font-semibold text-amber-300 flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Denim Policy
            </h4>
            <p className="text-neutral-400 leading-relaxed text-[11px]">
              Clean, fitted and fashionable denim is welcome. Excessively baggy, heavily distressed, torn or dirty denim is not permitted.
            </p>
          </div>
        </div>

        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center">
          <p className="text-[11px] text-amber-300/90 font-medium">
            <strong>Entry Policy:</strong> Meeting dress code does not guarantee admission. Entry remains subject to venue capacity, age/ID requirements, reservations, and security policies. When in doubt: dress up, not down.
          </p>
        </div>
      </div>
    </div>
  );
};
