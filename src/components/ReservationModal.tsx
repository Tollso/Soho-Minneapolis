import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SECTIONS, BOTTLE_MENU } from '../data/mockData';
import { TableSection, BottleItem, ReservationRequest } from '../types';
import { ReservationModalHeader } from './reservation/ReservationModalHeader';
import { ReservationStep1 } from './reservation/ReservationStep1';
import { ReservationStep2 } from './reservation/ReservationStep2';
import { ReservationStep3 } from './reservation/ReservationStep3';
import { ReservationStep4 } from './reservation/ReservationStep4';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedSectionId?: string;
  preselectedBottles?: BottleItem[];
  onReservationComplete: (res: ReservationRequest) => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  preselectedSectionId,
  preselectedBottles,
  onReservationComplete,
}) => {
  const getTodayDateStr = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  };

  const [step, setStep] = useState<number>(1);
  const [date, setDate] = useState<string>(getTodayDateStr());
  const [timeSlot, setTimeSlot] = useState<string>('11:00 PM');
  const [guestCount, setGuestCount] = useState<number>(6);
  const [selectedSection, setSelectedSection] = useState<TableSection>(
    SECTIONS.find(s => s.id === preselectedSectionId) || SECTIONS[0]
  );
  const [selectedTableNumber, setSelectedTableNumber] = useState<string>(
    (SECTIONS.find(s => s.id === preselectedSectionId) || SECTIONS[0]).tableNumbers[0]
  );
  const [bottleCart, setBottleCart] = useState<{ [bottleId: string]: number }>({});
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [vipCardNumber, setVipCardNumber] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      const today = getTodayDateStr();
      if (!date || date < today) setDate(today);
    }
    if (preselectedSectionId) {
      const sec = SECTIONS.find(s => s.id === preselectedSectionId);
      if (sec) {
        setSelectedSection(sec);
        setSelectedTableNumber(sec.tableNumbers[0]);
      }
    }
  }, [isOpen, preselectedSectionId]);

  useEffect(() => {
    if (preselectedBottles?.length) {
      const cart: { [id: string]: number } = {};
      preselectedBottles.forEach(b => { cart[b.id] = (cart[b.id] || 0) + 1; });
      setBottleCart(cart);
    }
  }, [preselectedBottles]);

  const updateBottleQty = (bottleId: string, delta: number) => {
    setBottleCart(prev => ({ ...prev, [bottleId]: Math.max(0, (prev[bottleId] || 0) + delta) }));
  };

  const handleNextStep = () => {
    setErrorMsg('');
    if (step === 1 && !date) {
      setErrorMsg('Please select a reservation date.');
      return;
    }
    if (step < 4) setStep(step + 1);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const selectedBottles = Object.entries(bottleCart)
        .filter(([_, qty]) => Number(qty) > 0)
        .map(([bottleId, quantity]) => {
          const item = BOTTLE_MENU.find(b => b.id === bottleId)!;
          return { bottleId, quantity, name: item?.name || bottleId, price: item?.price || 0 };
        });

      const payload = {
        fullName, email, phone, date, timeSlot, guestCount,
        sectionId: selectedSection.id,
        sectionName: selectedSection.name,
        tableNumber: selectedTableNumber || selectedSection.tableNumbers[0] || 'L-101',
        selectedBottles, specialRequests,
        vipCardNumber: vipCardNumber.trim() || undefined,
        totalEstimatedSpend: 0,
      };

      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to submit reservation.');

      // Clear all state & form fields
      setStep(1);
      setBottleCart({});
      setFullName('');
      setEmail('');
      setPhone('');
      setVipCardNumber('');
      setSpecialRequests('');

      // Send to Management completed, clear path for website immediately
      onReservationComplete(data.reservation);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-2xl bg-[#09090D] border border-neutral-700 rounded-2xl p-6 sm:p-8 shadow-2xl my-8 text-neutral-200"
      >
        <ReservationModalHeader step={step} onClose={onClose} />
        {step === 1 && (
          <ReservationStep1
            date={date} setDate={setDate} timeSlot={timeSlot} setTimeSlot={setTimeSlot}
            guestCount={guestCount} setGuestCount={setGuestCount} onNext={handleNextStep} errorMsg={errorMsg}
          />
        )}
        {step === 2 && (
          <ReservationStep2
            selectedSection={selectedSection} setSelectedSection={setSelectedSection}
            selectedTableNumber={selectedTableNumber} setSelectedTableNumber={setSelectedTableNumber}
            date={date} timeSlot={timeSlot}
            onNext={handleNextStep} onPrev={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <ReservationStep3
            selectedSection={selectedSection} bottleCart={bottleCart} updateBottleQty={updateBottleQty}
            onNext={handleNextStep} onPrev={() => setStep(2)}
          />
        )}
        {step === 4 && (
          <ReservationStep4
            date={date} timeSlot={timeSlot} guestCount={guestCount} selectedSection={selectedSection}
            selectedTableNumber={selectedTableNumber || selectedSection.tableNumbers[0]}
            bottleCart={bottleCart} fullName={fullName} setFullName={setFullName}
            email={email} setEmail={setEmail} phone={phone} setPhone={setPhone}
            vipCardNumber={vipCardNumber} setVipCardNumber={setVipCardNumber}
            specialRequests={specialRequests} setSpecialRequests={setSpecialRequests}
            isSubmitting={isSubmitting} errorMsg={errorMsg} onPrev={() => setStep(3)} onSubmit={handleFormSubmit}
          />
        )}
      </motion.div>
    </div>
  );
};
