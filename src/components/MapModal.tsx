import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  MapPin,
  Store as StoreIcon,
  Package,
  SlidersHorizontal,
  Navigation,
  Compass,
  ArrowRight
} from 'lucide-react';
import { NEIGHBORHOODS } from '../data/mockData';

export const MapModal: React.FC = () => {
  const {
    isMapModalOpen,
    setIsMapModalOpen,
    stores,
    items,
    radiusMiles,
    setRadiusMiles,
    selectedNeighborhood,
    setSelectedNeighborhood,
    setSelectedStore,
    setSelectedItem
  } = useApp();

  const [activePin, setActivePin] = useState<{
    type: 'store' | 'item';
    id: string;
  } | null>({ type: 'store', id: 'store_palmier_doucen' });

  if (!isMapModalOpen) return null;

  const currentStore = stores.find((s) => s.id === activePin?.id);
  const currentItem = items.find((i) => i.id === activePin?.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-auto flex flex-col h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/90 z-20">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-amber-900 text-white">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-neutral-900">
                Carte des Oasis & Coopératives (Wilaya 51)
              </h3>
              <p className="text-[11px] text-neutral-500">
                Situez les palmeraies de Doucen, les ateliers de Sidi Khaled et les points de retrait d'Ouled Djellal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMapModalOpen(false)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Map Viewport Area */}
        <div className="relative flex-1 bg-neutral-100 overflow-hidden flex flex-col md:flex-row">
          
          {/* Simulated Vector Map Canvas */}
          <div className="relative flex-1 bg-[#f4ede1] overflow-hidden min-h-[300px]">
            {/* Grid street layout SVG */}
            <svg
              className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#e0d4c1" strokeWidth="1.5" />
                  <path d="M 40 0 L 40 80 M 0 40 L 80 40" fill="none" stroke="#eadfc9" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* Oued Djellal river bed */}
              <path
                d="M -100 350 Q 250 200, 500 450 T 1200 380"
                fill="none"
                stroke="#68a37f"
                strokeWidth="20"
                strokeLinecap="round"
                opacity="0.5"
              />
              {/* Route Nationale 46 artery */}
              <line x1="0" y1="120" x2="1000" y2="500" stroke="#d4ab75" strokeWidth="12" />
              <line x1="200" y1="0" x2="600" y2="800" stroke="#d4ab75" strokeWidth="10" />
            </svg>

            {/* Radius rings representation centered around current user pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-72 h-72 rounded-full border border-amber-900/40 border-dashed" />
              <div className="w-[500px] h-[500px] rounded-full border border-amber-900/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>

            {/* User Location Center Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center">
              <div className="w-5 h-5 rounded-full bg-amber-900 border-2 border-white shadow-md mx-auto flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              <span className="text-[10px] font-bold text-neutral-800 bg-white/95 px-1.5 py-0.5 rounded shadow-2xs mt-1 inline-block whitespace-nowrap">
                Vous (Ouled Djellal Centre)
              </span>
            </div>

            {/* Store Pins placed organically on map */}
            {stores.map((s, idx) => {
              const positions = [
                { top: '38%', left: '42%' },
                { top: '30%', left: '62%' },
                { top: '58%', left: '38%' },
                { top: '65%', left: '68%' }
              ];
              const pos = positions[idx % positions.length];
              const isSelected = activePin?.id === s.id;

              return (
                <button
                  key={s.id}
                  onClick={() => setActivePin({ type: 'store', id: s.id })}
                  style={{ top: pos.top, left: pos.left }}
                  className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 p-1.5 rounded-full shadow-md transition-transform hover:scale-110 ${
                    isSelected
                      ? 'bg-amber-900 text-white scale-110 ring-4 ring-amber-900/20'
                      : 'bg-white text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <StoreIcon className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-semibold pr-1.5 max-w-[120px] truncate hidden sm:inline">
                    {s.name}
                  </span>
                </button>
              );
            })}

            {/* Individual Item Pins */}
            {items.slice(0, 3).map((it, idx) => {
              const positions = [
                { top: '48%', left: '30%' },
                { top: '22%', left: '46%' },
                { top: '72%', left: '48%' }
              ];
              const pos = positions[idx];
              const isSelected = activePin?.id === it.id;

              return (
                <button
                  key={it.id}
                  onClick={() => setActivePin({ type: 'item', id: it.id })}
                  style={{ top: pos.top, left: pos.left }}
                  className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 p-1 rounded-full shadow-md transition-transform hover:scale-110 ${
                    isSelected
                      ? 'bg-amber-900 text-white scale-110 ring-4 ring-amber-900/20'
                      : 'bg-white text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <Package className="w-3 h-3 text-neutral-700" />
                  <span className="text-[10px] font-mono font-bold pr-1">{it.price.toLocaleString()} DZD</span>
                </button>
              );
            })}

            {/* Floating Map Controls Overlay */}
            <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md p-2 rounded-xl border border-neutral-200 shadow-md flex items-center gap-2 text-xs">
              <span className="text-neutral-500 font-medium">Rayon:</span>
              {[5, 15, 30, 60].map((r) => (
                <button
                  key={r}
                  onClick={() => setRadiusMiles(r)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold font-mono ${
                    radiusMiles === r ? 'bg-amber-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  {r}km
                </button>
              ))}
            </div>
          </div>

          {/* Right Sidebar: Selected Location Spotlight */}
          <div className="w-full md:w-80 bg-white border-t md:border-t-0 md:border-l border-neutral-200 p-4 sm:p-5 flex flex-col justify-between overflow-y-auto">
            {currentStore ? (
              <div className="space-y-4">
                <div className="aspect-16/9 rounded-xl overflow-hidden bg-neutral-100 relative">
                  <img
                    src={currentStore.image}
                    alt={currentStore.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded font-medium">
                    {currentStore.distanceMiles} km d'ici
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold text-amber-800">{currentStore.category}</span>
                  <h4 className="font-display text-base font-bold text-neutral-900">
                    {currentStore.name}
                  </h4>
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {currentStore.tagline}
                  </p>
                </div>

                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-1 text-neutral-700">
                  <div className="font-semibold">{currentStore.address}</div>
                  <div className="text-neutral-500">{currentStore.openingHours}</div>
                </div>

                <button
                  onClick={() => {
                    setIsMapModalOpen(false);
                    setSelectedStore(currentStore);
                  }}
                  className="w-full py-2 bg-amber-900 hover:bg-amber-800 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Visiter la Boutique</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : currentItem ? (
              <div className="space-y-4">
                <div className="aspect-4/3 rounded-xl overflow-hidden bg-neutral-100 relative">
                  <img
                    src={currentItem.image}
                    alt={currentItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded font-medium">
                    {currentItem.distanceMiles} km de vous
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="font-mono tabular-nums text-lg font-bold text-neutral-900">
                    {currentItem.price.toLocaleString()} DZD
                  </div>
                  <h4 className="text-xs font-semibold text-neutral-900 line-clamp-2">
                    {currentItem.title}
                  </h4>
                  <p className="text-xs text-neutral-500">
                    Lieu : {currentItem.pickupAddress}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsMapModalOpen(false);
                    setSelectedItem(currentItem);
                  }}
                  className="w-full py-2 bg-amber-900 hover:bg-amber-800 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Voir l'Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="text-xs text-neutral-400 text-center py-12">
                Cliquez sur un marqueur pour afficher la palmeraie ou l'article.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
