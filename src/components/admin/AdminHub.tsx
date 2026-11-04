import React, { useState, useEffect } from 'react';
import { LogOut, RefreshCw } from 'lucide-react';
import { ReservationRequest, VIPMember } from '../../types';
import { GoldSohoLogo } from '../common/GoldSohoLogo';
import { SohoNeonLogo } from '../common/SohoNeonLogo';
import { AdminAuthGate } from './AdminAuthGate';
import { AdminMetricsBar } from './AdminMetricsBar';
import { AdminReservationsTable } from './AdminReservationsTable';
import { AdminMembersTable } from './AdminMembersTable';

interface AdminHubProps {
  onClose?: () => void;
}

export const AdminHub: React.FC<AdminHubProps> = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'reservations' | 'members'>('reservations');
  const [reservations, setReservations] = useState<ReservationRequest[]>([]);
  const [members, setMembers] = useState<VIPMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      const [resRes, memRes] = await Promise.all([
        fetch('/api/admin/reservations'),
        fetch('/api/admin/vip-members')
      ]);
      if (resRes.ok) {
        const d = await resRes.json();
        setReservations(d.reservations || []);
      }
      if (memRes.ok) {
        const d = await memRes.json();
        setMembers(d.members || []);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchAdminData();
  }, [isAuthenticated]);

  const handleVerifyPasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasscodeError(null);
    try {
      const res = await fetch('/api/admin/verify-passcode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      });
      const data = await res.json();
      if (data.success && data.authorized) {
        setIsAuthenticated(true);
      } else {
        setPasscodeError(data.error || 'Invalid Admin passcode. Access denied.');
      }
    } catch {
      setPasscodeError('Connection error verifying passcode.');
    }
  };

  const handleReservationAction = async (id: string, action: 'approve' | 'reject') => {
    setActionLoadingId(id);
    try {
      const body = action === 'approve'
        ? { adminName: 'Admin (Soho Executive)' }
        : { reason: 'Declined by Admin', adminName: 'Admin' };
      const res = await fetch(`/api/admin/reservations/${id}/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (res.ok) await fetchAdminData();
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleMemberAction = async (id: string, action: 'approve' | 'reject') => {
    setActionLoadingId(id);
    try {
      const body = action === 'approve'
        ? { adminName: 'Admin (Soho Executive)' }
        : { reason: 'Declined by Admin', adminName: 'Admin' };
      const res = await fetch(`/api/admin/vip-members/${id}/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (res.ok) await fetchAdminData();
    } finally {
      setActionLoadingId(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <AdminAuthGate
        passcode={passcode}
        setPasscode={setPasscode}
        passcodeError={passcodeError}
        onVerify={handleVerifyPasscode}
        onExit={onClose || (() => window.location.assign('/'))}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#07070A] text-neutral-200">
      <header className="border-b border-neutral-800 bg-[#0B0B10] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SohoNeonLogo size="xs" showGlow={false} />
          <div>
            <h1 className="text-lg font-bold uppercase tracking-wider text-white">Soho Lounge Admin Portal</h1>
            <span className="text-[10px] font-mono text-amber-400">EXECUTIVE CONSOLE • AUTHORIZED SESSION</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchAdminData}
            disabled={isLoading}
            className="p-2 rounded-xl border border-neutral-800 hover:border-neutral-600 text-neutral-400 hover:text-white"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-neutral-800 hover:border-rose-800 text-xs text-neutral-400 hover:text-rose-400"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <AdminMetricsBar
          reservations={reservations}
          members={members}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {activeTab === 'reservations' ? (
          <AdminReservationsTable
            reservations={reservations}
            onApprove={(id) => handleReservationAction(id, 'approve')}
            onReject={(id) => handleReservationAction(id, 'reject')}
            isActionLoading={actionLoadingId}
          />
        ) : (
          <AdminMembersTable
            members={members}
            onApprove={(id) => handleMemberAction(id, 'approve')}
            onReject={(id) => handleMemberAction(id, 'reject')}
            isActionLoading={actionLoadingId}
          />
        )}
      </main>
    </div>
  );
};
