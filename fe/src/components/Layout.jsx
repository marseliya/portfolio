// src/components/Layout.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './admin/Header';

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50">
      {!isHome && <Header />}
      <main className={!isHome ? 'pt-14' : ''}>
        <Outlet />
      </main>
    </div>
  );
}