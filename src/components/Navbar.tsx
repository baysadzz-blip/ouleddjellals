import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Plus, MessageSquare, ShieldCheck, MapPin } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    currentUser,
    isLoggedIn,
    setIsAuthModalOpen,
    notifications,
    setIsNotificationOpen,
    setIsChatDrawerOpen,
    conversations,
    setIsNewItemModalOpen,
    setIsMapModalOpen,
    selectedNeighborhood
  } = useApp();

  const unreadNotifs = notifications.filter(n => !n.read).length;
  const unreadChats = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setCurrentView('marketplace')}
            className="text-left group flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-900 text-amber-50 flex items-center justify-center font-bold text-sm tracking-tight shadow-xs">
              OD
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold tracking-tight text-neutral-900 leading-none">
                Souq Ouled Djellal
              </span>
              <span className="text-[10px] text-amber-800 font-medium tracking-wide flex items-center gap-1 mt-0.5">
                <MapPin className="w-2.5 h-2.5 text-amber-700 inline" />
                <span>{selectedNeighborhood === 'all' ? 'Wilaya 51 (Ouled Djellal)' : selectedNeighborhood}</span>
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-5 single-line clean nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
          <button
            onClick={() => setCurrentView('marketplace')}
            className={`whitespace-nowrap transition-colors pb-0.5 ${
              currentView === 'marketplace'
                ? 'text-neutral-900 font-semibold border-b-2 border-neutral-900'
                : 'hover:text-neutral-900'
            }`}
          >
            Marché & Dattes
          </button>

          <button
            onClick={() => setCurrentView('stores')}
            className={`whitespace-nowrap transition-colors pb-0.5 ${
              currentView === 'stores'
                ? 'text-neutral-900 font-semibold border-b-2 border-neutral-900'
                : 'hover:text-neutral-900'
            }`}
          >
            Boutiques d'Oasis
          </button>

          <button
            onClick={() => setIsMapModalOpen(true)}
            className="whitespace-nowrap hover:text-neutral-900 transition-colors flex items-center gap-1.5"
          >
            <span>Carte Wilaya (51)</span>
          </button>

          <button
            onClick={() => setCurrentView('orders')}
            className={`whitespace-nowrap transition-colors pb-0.5 ${
              currentView === 'orders'
                ? 'text-neutral-900 font-semibold border-b-2 border-neutral-900'
                : 'hover:text-neutral-900'
            }`}
          >
            Mes Commandes
          </button>

          <button
            onClick={() => setCurrentView('dashboard')}
            className={`whitespace-nowrap transition-colors pb-0.5 ${
              currentView === 'dashboard'
                ? 'text-neutral-900 font-semibold border-b-2 border-neutral-900'
                : 'hover:text-neutral-900'
            }`}
          >
            Espace Artisan / Éleveur
          </button>
        </nav>

        {/* Zone 3: Primary action + interactive utilities */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick List Item CTA */}
          <button
            onClick={() => setIsNewItemModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Déposer une Annonce</span>
          </button>

          {/* Chat Messages */}
          <button
            onClick={() => setIsChatDrawerOpen(true)}
            className="relative p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
            title="Messages & Négociation"
            aria-label="Messages & Négociation"
          >
            <MessageSquare className="w-4 h-4" />
            {unreadChats > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-neutral-900 rounded-full" />
            )}
          </button>

          {/* Push Notifications */}
          <button
            onClick={() => setIsNotificationOpen(true)}
            className="relative p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
            title="Notifications BaridiMob & Commandes"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifs > 0 && (
              <span className="absolute top-1 right-1 min-w-4 h-4 px-1 bg-amber-800 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {unreadNotifs}
              </span>
            )}
          </button>

          {/* User profile / login */}
          {isLoggedIn ? (
            <button
              onClick={() => setCurrentView('dashboard')}
              className="flex items-center gap-2 p-1 pl-2 text-left hover:bg-neutral-100 rounded-lg transition-colors border border-neutral-200"
              title="Profil & Portefeuille"
            >
              <div className="hidden lg:flex flex-col text-right">
                <span className="text-xs font-semibold text-neutral-900 leading-tight">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-emerald-700 font-mono tabular-nums leading-tight font-bold">
                  {currentUser.walletBalance.toLocaleString()} DZD
                </span>
              </div>
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full object-cover border border-neutral-200"
              />
            </button>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors whitespace-nowrap"
            >
              Connexion
            </button>
          )}
        </div>
      </div>

      {/* Mobile nav links sub-strip */}
      <div className="flex md:hidden items-center justify-around px-2 py-2 border-t border-neutral-100 bg-neutral-50/90 text-xs font-medium text-neutral-600">
        <button
          onClick={() => setCurrentView('marketplace')}
          className={`px-2 py-1 rounded ${currentView === 'marketplace' ? 'text-neutral-900 font-semibold' : ''}`}
        >
          Articles
        </button>
        <button
          onClick={() => setCurrentView('stores')}
          className={`px-2 py-1 rounded ${currentView === 'stores' ? 'text-neutral-900 font-semibold' : ''}`}
        >
          Boutiques
        </button>
        <button
          onClick={() => setIsMapModalOpen(true)}
          className="px-2 py-1 rounded"
        >
          Carte (51)
        </button>
        <button
          onClick={() => setCurrentView('orders')}
          className={`px-2 py-1 rounded ${currentView === 'orders' ? 'text-neutral-900 font-semibold' : ''}`}
        >
          Commandes
        </button>
        <button
          onClick={() => setCurrentView('dashboard')}
          className={`px-2 py-1 rounded ${currentView === 'dashboard' ? 'text-neutral-900 font-semibold' : ''}`}
        >
          Espace Vendeur
        </button>
      </div>
    </header>
  );
};
