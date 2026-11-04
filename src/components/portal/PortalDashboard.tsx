import React from 'react';
import { VIPMember, ReservationRequest } from '../../types';
import { PortalDoorPass } from './PortalDoorPass';
import { PortalReservationsList } from './PortalReservationsList';

interface PortalDashboardProps {
  activeMember: VIPMember;
  userReservations: ReservationRequest[];
  fetchUserReservations: (email: string) => void;
  onSignOut: () => void;
}

export const PortalDashboard: React.FC<PortalDashboardProps> = ({
  activeMember,
  userReservations,
  fetchUserReservations,
  onSignOut
}) => {
  const isPendingApproval =
    activeMember.approvalStatus === 'Pending for Admin Approval' ||
    (activeMember.approvalStatus as string) === 'Pending Super Admin Approval' ||
    activeMember.status === 'Pending for Admin Approval' ||
    (activeMember.status as string) === 'Pending Super Admin Approval' ||
    activeMember.cardIssued === false;

  const isRejected =
    activeMember.approvalStatus === 'Rejected' || activeMember.status === 'Rejected';

  return (
    <div className="space-y-6">
      <PortalDoorPass
        member={activeMember}
        isPendingApproval={isPendingApproval}
        isRejected={isRejected}
      />

      <PortalReservationsList
        userReservations={userReservations}
        email={activeMember.email}
        onRefresh={fetchUserReservations}
      />

      <div className="text-center pt-2">
        <button
          type="button"
          onClick={onSignOut}
          className="text-xs text-neutral-500 hover:text-white uppercase font-mono tracking-wider cursor-pointer"
        >
          Sign Out of Portal Session
        </button>
      </div>
    </div>
  );
};
