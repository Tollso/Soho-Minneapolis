import React, { useRef } from 'react';
import { Camera, Upload, Check, AlertCircle, Trash2 } from 'lucide-react';

interface VipStepPhotoProps {
  photoPreview: string | null;
  onPhotoSelected: (dataUrl: string) => void;
  onPhotoCleared: () => void;
  onBack: () => void;
  onProceed: () => void;
  isSubmitting?: boolean;
  errorMsg: string | null;
}

export const VipStepPhoto: React.FC<VipStepPhotoProps> = ({
  photoPreview,
  onPhotoSelected,
  onPhotoCleared,
  onBack,
  onProceed,
  isSubmitting = false,
  errorMsg
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onPhotoSelected(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-5">
      <div className="p-4 rounded-xl bg-[#121217] border border-amber-500/30 text-xs text-neutral-300 leading-relaxed flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white block uppercase tracking-wider mb-0.5">VIP Identification Pass</span>
          Soho Lounge VIP Cards include a portrait photograph for personalized host greeting and red carpet line bypass.
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 justify-center py-4">
        {photoPreview ? (
          <div className="relative group">
            <img
              src={photoPreview}
              alt="Applicant Portrait"
              className="w-36 h-44 object-cover rounded-xl border-2 border-amber-400 shadow-xl"
            />
            <button
              type="button"
              onClick={onPhotoCleared}
              className="absolute -top-2 -right-2 p-1.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white shadow-lg"
              title="Remove photo"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <div className="absolute bottom-2 inset-x-2 py-1 bg-black/80 rounded text-[9px] text-amber-400 text-center font-mono uppercase">
              Photo Loaded
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-36 h-44 rounded-xl border-2 border-dashed border-neutral-700 hover:border-amber-400/80 bg-[#121217] flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all hover:bg-neutral-900"
          >
            <Camera className="w-8 h-8 text-neutral-500 mb-2" />
            <span className="text-[11px] font-semibold text-neutral-300">Upload Photo</span>
            <span className="text-[9px] text-neutral-500 mt-1 font-mono">PNG, JPG, WEBP</span>
          </div>
        )}

        <div className="space-y-2 text-xs text-neutral-400 max-w-xs">
          <p className="font-semibold text-white">Portrait Guidelines:</p>
          <ul className="space-y-1 text-[11px]">
            <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> Clear front-facing portrait photo</li>
            <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> Solid or neutral background preferred</li>
            <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> No sunglasses or face coverings</li>
          </ul>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-[11px] font-semibold transition-all cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Select File from Device</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <p className="text-xs text-rose-400 bg-rose-950/40 p-3 rounded-lg border border-rose-800">
          {errorMsg}
        </p>
      )}

      <div className="pt-4 border-t border-neutral-800 flex justify-between items-center">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white cursor-pointer"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onProceed}
          disabled={!photoPreview || isSubmitting}
          className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
            photoPreview && !isSubmitting
              ? 'bg-amber-400 hover:bg-amber-300 text-black shadow-lg shadow-amber-400/20'
              : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? 'Sending to Admin...' : 'Send VIP Application to Admin'}
        </button>
      </div>
    </div>
  );
};
