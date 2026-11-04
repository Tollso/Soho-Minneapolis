import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Header } from './Header';
import { Hero } from './Hero';
import { SectionsMap } from './SectionsMap';
import { BottleServiceMenu } from './BottleServiceMenu';
import { VipCardSection } from './VipCardSection';
import { EventsSection } from './EventsSection';
import { VenueInfo } from './VenueInfo';
import { Footer } from './Footer';

import { ReservationModal } from './ReservationModal';
import { DigitalPortalModal } from './DigitalPortalModal';
import { VipCardApplicationModal } from './VipCardApplicationModal';
import { ContactModal } from './ContactModal';
import { DressCodeModal } from './DressCodeModal';

import { VIPMember, BottleItem, ReservationRequest } from '../types';

export const MainGuestExperience: React.FC = () => {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [preselectedSectionId, setPreselectedSectionId] = useState<string | undefined>(undefined);
  const [preselectedBottles, setPreselectedBottles] = useState<BottleItem[]>([]);
  const [isVipPortalOpen, setIsVipPortalOpen] = useState(false);
  const [isVipApplyOpen, setIsVipApplyOpen] = useState(false);
  const [vipApplyTier, setVipApplyTier] = useState<string>('Gold');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState('');
  const [contactInquiryType, setContactInquiryType] = useState('VIP Table & Bottle Pricing Inquiry');
  const [isDressCodeOpen, setIsDressCodeOpen] = useState(false);
  const [activeVipMember, setActiveVipMember] = useState<VIPMember | null>(null);
  const [bookingNotice, setBookingNotice] = useState<string | null>(null);

  const handleOpenReservation = (sectionId?: string) => {
    setPreselectedSectionId(sectionId);
    setPreselectedBottles([]);
    setIsReservationOpen(true);
  };

  const handleOpenReservationWithBottles = (bottles: BottleItem[]) => {
    setPreselectedBottles(bottles);
    setIsReservationOpen(true);
  };

  const handleOpenVipCardApply = (tier?: string) => {
    if (tier) setVipApplyTier(tier);
    setIsVipApplyOpen(true);
  };

  const handleOpenContact = (subject?: string, inquiryType?: string) => {
    setContactSubject(subject || '');
    setContactInquiryType(inquiryType || 'VIP Table & Bottle Pricing Inquiry');
    setIsContactOpen(true);
  };

  const showNotice = (msg: string) => {
    setBookingNotice(msg);
    setTimeout(() => setBookingNotice(null), 5000);
  };

  const handleVipApplicationSuccess = (newMember: VIPMember) => {
    setActiveVipMember(newMember);
    showNotice(`VIP Card application form sent to Admin for ${newMember.fullName} (${newMember.tier} Tier).`);
  };

  const handleReservationCompleted = (res: ReservationRequest) => {
    showNotice(`Table reservation form sent to Admin for ${res.fullName} (${res.sectionName} ${res.tableNumber}).`);
  };

  const handleContactSuccess = (senderName: string, inquiryType: string) => {
    showNotice(`Inquiry form sent to Admin for ${senderName} (${inquiryType}).`);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0E] text-neutral-100 font-sans selection:bg-[#D4AF37] selection:text-[#0B0B0E]">
      <Header
        onOpenReservation={handleOpenReservation}
        onOpenVipPortal={() => setIsVipPortalOpen(true)}
        onOpenContact={() => handleOpenContact()}
        onOpenDressCode={() => setIsDressCodeOpen(true)}
        activeVipMemberName={activeVipMember ? activeVipMember.fullName : undefined}
      />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Hero
                onOpenReservation={() => handleOpenReservation()}
                onOpenVipCardModal={() => handleOpenVipCardApply()}
              />
            }
          />
          <Route
            path="/sections"
            element={
              <SectionsMap
                onSelectSectionForReservation={(secId) => handleOpenReservation(secId)}
              />
            }
          />
          <Route
            path="/bottle-service"
            element={
              <BottleServiceMenu
                onOpenReservationWithBottles={handleOpenReservationWithBottles}
                onOpenContactModal={(name) => handleOpenContact(name, 'VIP Table & Bottle Pricing Inquiry')}
              />
            }
          />
          <Route
            path="/vip-card"
            element={
              <VipCardSection
                onOpenVipCardModal={handleOpenVipCardApply}
                onOpenVipPortal={() => setIsVipPortalOpen(true)}
              />
            }
          />
          <Route
            path="/events"
            element={
              <EventsSection
                onOpenReservationForEvent={() => handleOpenReservation()}
                onGuestlistRsvpSubmitted={(name, ev) => showNotice(`Guestlist RSVP form sent to Admin for ${name} (${ev}).`)}
              />
            }
          />
          <Route
            path="/venue"
            element={
              <VenueInfo
                onOpenContact={() => handleOpenContact('Venue & Private Booking', 'Private Event Buyout')}
              />
            }
          />
        </Routes>
      </main>

      <Footer
        onOpenReservation={() => handleOpenReservation()}
        onOpenVipCardModal={() => handleOpenVipCardApply()}
        onOpenVipPortal={() => setIsVipPortalOpen(true)}
        onOpenContact={() => handleOpenContact()}
      />

      {/* Floating temporary toast for forms dispatched to Admin */}
      {bookingNotice && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-md bg-[#121217] border border-amber-400/60 rounded-xl p-4 shadow-2xl flex items-start gap-3 text-xs text-neutral-200">
          <CheckCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold text-amber-400 uppercase tracking-wider block text-[11px] mb-0.5">
              Form Transmitted to Admin
            </span>
            <span>{bookingNotice}</span>
          </div>
          <button onClick={() => setBookingNotice(null)} className="text-neutral-400 hover:text-white text-sm cursor-pointer ml-1">✕</button>
        </div>
      )}

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        preselectedSectionId={preselectedSectionId}
        preselectedBottles={preselectedBottles}
        onReservationComplete={handleReservationCompleted}
      />

      <DigitalPortalModal
        isOpen={isVipPortalOpen}
        onClose={() => setIsVipPortalOpen(false)}
        activeMember={activeVipMember}
        onSelectMember={(mem) => setActiveVipMember(mem)}
      />

      <VipCardApplicationModal
        isOpen={isVipApplyOpen}
        onClose={() => setIsVipApplyOpen(false)}
        preselectedTier={vipApplyTier}
        onApplicationSuccess={handleVipApplicationSuccess}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultSubject={contactSubject}
        defaultInquiryType={contactInquiryType}
        onInquirySubmitted={handleContactSuccess}
      />

      <DressCodeModal isOpen={isDressCodeOpen} onClose={() => setIsDressCodeOpen(false)} />
    </div>
  );
};
