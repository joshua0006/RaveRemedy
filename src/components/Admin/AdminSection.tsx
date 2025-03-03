/**
 * AdminSection Component
 * 
 * Handles the admin dashboard functionality including:
 * - Stripe Connect integration
 * - Account status monitoring
 * - Dashboard navigation
 */

import React, { useState, useEffect } from 'react';
import { AdminHeader } from './AdminHeader';
import { AdminDashboard } from './AdminDashboard';
import { AdminConnect } from './AdminConnect';
import { AdminInfo } from './AdminInfo';

export const AdminSection: React.FC = () => {
  const [accountId, setAccountId] = useState<string | null>(null);

  useEffect(() => {
    const storedAccountId = localStorage.getItem('stripeConnectAccountId');
    if (storedAccountId) {
      setAccountId(storedAccountId);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black text-white">
      <AdminHeader />
      <div className="pt-32 pb-16 max-w-4xl mx-auto px-4">
        {accountId ? (
          <AdminDashboard accountId={accountId} />
        ) : (
          <AdminConnect onConnect={setAccountId} />
        )}
        <AdminInfo />
      </div>
    </div>
  );
};