import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LocationFilterBar } from './components/LocationFilterBar';
import { ItemGrid } from './components/ItemGrid';
import { StoreGrid } from './components/StoreGrid';
import { OrdersView } from './components/OrdersView';
import { DashboardView } from './components/DashboardView';
import { ItemDetailModal } from './components/ItemDetailModal';
import { StoreDetailModal } from './components/StoreDetailModal';
import { ChatDrawer } from './components/ChatDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ReviewModal } from './components/ReviewModal';
import { AuthModal } from './components/AuthModal';
import { TwoFactorModal } from './components/TwoFactorModal';
import { OnboardingModal } from './components/OnboardingModal';
import { NotificationCenter } from './components/NotificationCenter';
import { MapModal } from './components/MapModal';
import { NewItemModal } from './components/NewItemModal';
import { Footer } from './components/Footer';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Body per view */}
      <main className="flex-1">
        {currentView === 'marketplace' && (
          <>
            <HeroSection />
            <LocationFilterBar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              <ItemGrid />
            </div>
          </>
        )}

        {currentView === 'stores' && (
          <>
            <HeroSection />
            <LocationFilterBar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              <StoreGrid />
            </div>
          </>
        )}

        {currentView === 'orders' && <OrdersView />}

        {currentView === 'dashboard' && <DashboardView />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <ItemDetailModal />
      <StoreDetailModal />
      <ChatDrawer />
      <CheckoutModal />
      <ReviewModal />
      <AuthModal />
      <TwoFactorModal />
      <OnboardingModal />
      <NotificationCenter />
      <MapModal />
      <NewItemModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
