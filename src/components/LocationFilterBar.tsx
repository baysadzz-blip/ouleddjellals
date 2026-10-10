import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowUpDown, Bike, Store as StoreIcon, Package } from 'lucide-react';
import { DeliveryType } from '../types';

const CATEGORIES = [
  'all',
  'Terroir & Dattes',
  'Artisanat & Laine',
  'Tissage & Décoration',
  'Miel & Terroir'
];

export const LocationFilterBar: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedDeliveryType,
    setSelectedDeliveryType,
    sortBy,
    setSortBy,
    filteredItems,
    currentView,
    setCurrentView,
    radiusMiles
  } = useApp();

  return (
    <div className="bg-white border-b border-neutral-200 sticky top-16 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-3">
        
        {/* Top row: View Switcher & Result Count & Sorting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* View tabs: Marketplace items vs Stores directory */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg shrink-0">
            <button
              onClick={() => setCurrentView('marketplace')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                currentView === 'marketplace'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Articles & Produits ({filteredItems.length})</span>
            </button>
            <button
              onClick={() => setCurrentView('stores')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                currentView === 'stores'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <StoreIcon className="w-3.5 h-3.5" />
              <span>Boutiques d'Oasis</span>
            </button>
          </div>

          {/* Result count and sorting controls */}
          <div className="flex items-center justify-between sm:justify-end gap-4 text-xs">
            <div className="text-neutral-500">
              <span className="font-mono tabular-nums font-semibold text-neutral-900">{filteredItems.length}</span> annonces dans un rayon de <span className="font-mono tabular-nums font-semibold text-neutral-900">{radiusMiles} km</span>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-neutral-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Trier les annonces"
                className="bg-transparent font-medium text-neutral-800 outline-none cursor-pointer text-xs"
              >
                <option value="distance">Plus Proche (Distance)</option>
                <option value="newest">Plus Récent</option>
                <option value="price_asc">Prix : Croissant (DZD)</option>
                <option value="price_desc">Prix : Décroissant (DZD)</option>
                <option value="rating">Mieux Notés</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bottom row: Interactive Category segmented buttons & Delivery Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pt-1 border-t border-neutral-100">
          
          {/* Categories horizontal scroll / buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {cat === 'all' ? 'Toutes les catégories' : cat}
              </button>
            ))}
          </div>

          {/* Delivery Mode selector */}
          <div className="flex items-center gap-1 text-xs shrink-0 self-end md:self-auto">
            <span className="text-neutral-400 text-[11px] mr-1 hidden lg:inline">Mode de retrait :</span>
            {(
              [
                { id: 'all', label: 'Tous modes' },
                { id: 'local_pickup', label: 'Main à main' },
                { id: 'same_day_dropoff', label: 'Livraison Oasis' },
                { id: 'neighborhood_courier', label: '58 Wilayas Express' }
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedDeliveryType(opt.id as any)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedDeliveryType === opt.id
                    ? 'bg-neutral-800 text-white'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
