import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminHub } from './components/admin/AdminHub';
import { MainGuestExperience } from './components/MainGuestExperience';

export default function App() {
  const isHubDomain = typeof window !== 'undefined' && window.location.hostname === 'hub.sohompls.com';

  if (isHubDomain) {
    return <AdminHub />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/hub" element={<AdminHub />} />
        <Route path="/admin" element={<AdminHub />} />
        <Route path="*" element={<MainGuestExperience />} />
      </Routes>
    </BrowserRouter>
  );
}
