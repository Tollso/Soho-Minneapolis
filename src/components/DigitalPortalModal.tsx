import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Lock } from 'lucide-react';
import { VIPMember, ReservationRequest } from '../types';
import { SAMPLE_VIP_MEMBERS } from '../data/mockData';
import { PortalLoginForm } from './portal/PortalLoginForm';
import { PortalDashboard } from './portal/PortalDashboard';

interface DigitalPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeMember?: VIPMember | null;
  onSelectMember: (member: VIPMember) => void;
}

export const DigitalPortalModal: React.FC<DigitalPortalModalProps> = ({
  isOpen,
  onClose,
  activeMember,
  onSelectMember,
}) => {
  const [cardLookupInput, setCardLookupInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [userReservations, setUserReservations] = useState<ReservationRequest[]>([]);

  useEffect(() => {
    if (activeMember) {
      fetchUserReservations(activeMember.email);
    }
  }, [activeMember]);

  const fetchUserReservations = async (email: string) => {
    try {
      const res = await fetch(`/api/reservations?email=${encodeURIComponent(email)}`);
      if (res.ok) {
        const data = await res.json();
        setUserReservations(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!cardLookupInput.trim()) {
      setErrorMsg('Please enter your VIP Card Number, Member ID, or Email.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/vip-members/${encodeURIComponent(cardLookupInput.trim())}`);
      if (res.ok) {
        const memberData = await res.json();
        onSelectMember(memberData);
        fetchUserReservations(memberData.email);
      } else {
        const localMatch = SAMPLE_VIP_MEMBERS.find(
          m => m.cardNumber.toLowerCase() === cardLookupInput.toLowerCase() || m.id.toLowerCase() === cardLookupInput.toLowerCase() || m.email.toLowerCase() === cardLookupInput.toLowerCase()
        );
        if (localMatch) {
          onSelectMember(localMatch);
          fetchUserReservations(localMatch.email);
        } else {
          setErrorMsg('VIP Card or Member email not recognized. Please check your credentials or apply for membership.');
        }
      }
    } catch (err) {
      setErrorMsg('Error verifying credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-3xl bg-[#0B0B0E] border border-neutral-700 rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#181822] text-neutral-400 hover:text-white border border-neutral-700 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-800">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white uppercase font-serif tracking-wider">
              SOHO <span className="text-amber-400">VIP MEMBER PORTAL</span>
            </h2>
            <p className="text-xs text-neutral-400">923 Nicollet Mall • Member Verification & Door Pass</p>
          </div>
        </div>

        {!activeMember ? (
          <PortalLoginForm
            cardLookupInput={cardLookupInput}
            setCardLookupInput={setCardLookupInput}
            errorMsg={errorMsg}
            loading={loading}
            handleLookup={handleLookup}
          />
        ) : (
          <PortalDashboard
            activeMember={activeMember}
            userReservations={userReservations}
            fetchUserReservations={fetchUserReservations}
            onSignOut={() => onSelectMember(null as any)}
          />
        )}
      </motion.div>
    </div>
  );
};
