import React from 'react';
import { useApp } from '../context/AppContext';
import { Search, MapPin, SlidersHorizontal, ShieldCheck, Zap } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedNeighborhood,
    setSelectedNeighborhood,
    radiusMiles,
    setRadiusMiles,
    setIsMapModalOpen,
    setIsNewItemModalOpen
  } = useApp();

  return (
    <section className="relative overflow-hidden bg-neutral-900 text-white border-b border-neutral-800">
      {/* Background Image with Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_ouled_djellal_1791631781135.jpg"
          alt="Palmeraie et oasis d'Ouled Djellal au coucher de soleil"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-45 mix-blend-luminosity filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-neutral-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl space-y-6">
          
          {/* Subtle text kicker without static pills */}
          <div className="flex items-center gap-2 text-xs font-medium text-amber-200">
            <span>Wilaya d’Ouled Djellal (51)</span>
            <span aria-hidden="true">·</span>
            <span>Séquestre BaridiMob</span>
            <span aria-hidden="true">·</span>
            <span>Direct Producteurs & Artisans</span>
          </div>

          {/* Hero Headline */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12] [text-wrap:balance]">
            Le marché local d’Ouled Djellal, Doucen & Sidi Khaled.
          </h1>

          <p className="text-base sm:text-lg text-neutral-200 leading-relaxed font-normal">
            Achetez et vendez en direct les dattes Deglet Nour de l’oasis, la pure laine ovine d’Ouled Djellal, kachabias, burnous, miel de Sidr et matériel agricole entre voisins.
          </p>

          {/* Integrated Search & Local Filter Bar */}
          <div className="pt-2">
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-2 shadow-xl border border-neutral-200/20 text-neutral-900 flex flex-col md:flex-row items-stretch gap-2">
              
              {/* Search text input */}
              <div className="flex-1 flex items-center gap-2.5 px-3 py-2 border-b md:border-b-0 md:border-r border-neutral-200">
                <Search className="w-4 h-4 text-neutral-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Deglet Nour, kachabia laine, miel sidr, zerbiya..."
                  className="w-full text-sm bg-transparent outline-none text-neutral-900 placeholder:text-neutral-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-neutral-400 hover:text-neutral-700 px-1"
                  >
                    Effacer
                  </button>
                )}
              </div>

              {/* Neighborhood select */}
              <div className="flex items-center gap-2 px-3 py-2 border-b md:border-b-0 md:border-r border-neutral-200 shrink-0">
                <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                <select
                  value={selectedNeighborhood}
                  onChange={(e) => setSelectedNeighborhood(e.target.value)}
                  aria-label="Commune d'Ouled Djellal"
                  className="text-xs sm:text-sm font-medium bg-transparent outline-none text-neutral-800 cursor-pointer pr-4"
                >
                  <option value="all">Toute la Wilaya (51)</option>
                  <option value="Ouled Djellal Centre">Ouled Djellal Centre</option>
                  <option value="Doucen">Doucen (الدوسن)</option>
                  <option value="Sidi Khaled">Sidi Khaled (سيدي خالد)</option>
                  <option value="Chaiba">Chaiba (الشعيبة)</option>
                  <option value="Ras El Miaad">Ras El Miaad (رأس الميعاد)</option>
                  <option value="Besbes">Besbes (البسباس)</option>
                </select>
              </div>

              {/* Distance radius quick selector in KM */}
              <div className="flex items-center justify-between px-3 py-2 gap-2 shrink-0">
                <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-medium">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Rayon:</span>
                </div>
                <div className="flex items-center gap-1">
                  {[5, 15, 30, 60].map((m) => (
                    <button
                      key={m}
                      onClick={() => setRadiusMiles(m)}
                      className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors ${
                        radiusMiles === m
                          ? 'bg-neutral-900 text-white'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {m}km
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Map Button */}
              <button
                onClick={() => setIsMapModalOpen(true)}
                className="px-4 py-2.5 bg-amber-900 hover:bg-amber-800 text-white rounded-lg text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-1.5 shrink-0"
              >
                <span>Carte d’Oasis</span>
              </button>
            </div>
          </div>

          {/* Trust strip below search */}
          <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-300">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Garantie BaridiMob & remise en main propre sécurisée</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Messagerie en direct et offres de prix négociables</span>
            </div>
            <button
              onClick={() => setIsNewItemModalOpen(true)}
              className="text-amber-200 hover:text-white underline underline-offset-4 transition-colors font-medium"
            >
              Publier une annonce gratuite en 60s
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
