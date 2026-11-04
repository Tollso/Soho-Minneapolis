import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Crown } from 'lucide-react';
import { MembershipTier, VIPMember } from '../types';
import { VipStepDetails } from './vip/VipStepDetails';
import { VipStepPhoto } from './vip/VipStepPhoto';
import { VipStepSubmitted } from './vip/VipStepSubmitted';

interface VipCardApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTier?: string;
  preselectedTier?: string;
  onApplicationCompleted?: (member: VIPMember) => void;
  onApplicationSuccess?: (member: VIPMember) => void;
  onOpenPortal?: () => void;
}

export const VipCardApplicationModal: React.FC<VipCardApplicationModalProps> = ({
  isOpen,
  onClose,
  defaultTier = 'Black Card',
  preselectedTier,
  onApplicationCompleted,
  onApplicationSuccess,
  onOpenPortal
}) => {
  const chosenTier = preselectedTier || defaultTier || 'Black Card';
  const [step, setStep] = useState<'details' | 'photo' | 'submitted'>('details');
  const [tier, setTier] = useState<MembershipTier>((chosenTier as MembershipTier) || 'Black Card');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profession, setProfession] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedMember, setSubmittedMember] = useState<VIPMember | null>(null);

  useEffect(() => {
    if (isOpen) {
      const initial = preselectedTier || defaultTier;
      if (initial && (initial === 'Gold' || initial === 'Platinum' || initial === 'Black Card')) {
        setTier(initial as MembershipTier);
      }
      setStep('details');
      setErrorMsg(null);
    }
  }, [isOpen, defaultTier, preselectedTier]);

  if (!isOpen) return null;

  const handleProceedToPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      setErrorMsg('Full legal name and email address are required.');
      return;
    }
    setErrorMsg(null);
    setStep('photo');
  };

  const handleSubmitApplication = async () => {
    setIsProcessing(true);
    setErrorMsg(null);

    try {
      const payload = {
        fullName,
        email,
        phone,
        profession,
        tier,
        photoUrl: photoPreview,
      };

      const res = await fetch('/api/vip-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit VIP Card application.');
      }

      // Reset form state & inputs
      setStep('details');
      setFullName('');
      setEmail('');
      setPhone('');
      setProfession('');
      setPhotoPreview(null);
      setErrorMsg(null);

      // Notify caller & immediately close modal to clear path for website
      if (onApplicationCompleted) {
        onApplicationCompleted(data.member);
      }
      if (onApplicationSuccess) {
        onApplicationSuccess(data.member);
      }
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Submission error. Please retry.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-2xl bg-[#0B0B0E] border border-neutral-700 rounded-2xl p-6 sm:p-8 shadow-2xl my-6"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#181822] text-neutral-400 hover:text-white border border-neutral-700 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
            <Crown className="w-4 h-4" />
            <span>SOHO LOUNGE MINNEAPOLIS • VIP MEMBERSHIP</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white uppercase font-serif">
            {step === 'details' && `Apply for ${tier} Tier Membership`}
            {step === 'photo' && 'Add Cardholder Portrait Photo'}
            {step === 'submitted' && 'Membership Application Received'}
          </h2>
        </div>

        {step === 'details' && (
          <VipStepDetails
            tier={tier}
            setTier={setTier}
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            profession={profession}
            setProfession={setProfession}
            errorMsg={errorMsg}
            onProceed={handleProceedToPhoto}
            onClose={onClose}
          />
        )}

        {step === 'photo' && (
          <VipStepPhoto
            photoPreview={photoPreview}
            onPhotoSelected={(url) => {
              setPhotoPreview(url);
              setErrorMsg(null);
            }}
            onPhotoCleared={() => setPhotoPreview(null)}
            onBack={() => setStep('details')}
            onProceed={handleSubmitApplication}
            isSubmitting={isProcessing}
            errorMsg={errorMsg}
          />
        )}

        {step === 'submitted' && submittedMember && (
          <VipStepSubmitted
            member={submittedMember}
            onClose={onClose}
            onOpenPortal={onOpenPortal || onClose}
          />
        )}
      </motion.div>
    </div>
  );
};
