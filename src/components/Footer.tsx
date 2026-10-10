import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentView, setIsMapModalOpen, selectedNeighborhood } = useApp();

  return (
    <footer className="bg-white border-t border-neutral-200 mt-20 text-neutral-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-neutral-100">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-amber-900 text-white flex items-center justify-center font-bold text-xs">
                OD
              </div>
              <span className="font-display text-base font-bold text-neutral-900">
                Souq Ouled Djellal
              </span>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Plateforme communautaire de la Wilaya d'Ouled Djellal (51) connectant producteurs de dattes Deglet Nour, éleveurs de la célèbre race ovine, artisans tisserands et boutiques d'oasis.
            </p>
            <div className="text-xs text-neutral-400 font-mono">
              Zone active : {selectedNeighborhood === 'all' ? 'Toute la Wilaya (51)' : selectedNeighborhood}
            </div>
          </div>

          {/* Nav links */}
          <div className="space-y-2 text-xs">
            <h4 className="font-semibold text-neutral-900 font-display">Explorer l'Oasis</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setCurrentView('marketplace')}
                  className="hover:text-neutral-900 transition-colors"
                >
                  Annonces du Marché Local
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('stores')}
                  className="hover:text-neutral-900 transition-colors"
                >
                  Boutiques & Palmeraies
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsMapModalOpen(true)}
                  className="hover:text-neutral-900 transition-colors"
                >
                  Carte Interactive des Oasis (51)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="hover:text-neutral-900 transition-colors"
                >
                  Espace Artisan & Éleveur
                </button>
              </li>
            </ul>
          </div>

          {/* Safety & Escrow */}
          <div className="space-y-2 text-xs">
            <h4 className="font-semibold text-neutral-900 font-display">Confiance & Sécurité</h4>
            <ul className="space-y-2 text-neutral-500">
              <li className="flex items-center gap-1.5 text-neutral-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Séquestre Garanti BaridiMob / CIB</span>
              </li>
              <li>Passe de retrait sécurisée par code QR</li>
              <li>Points de rendez-vous sécurisés (Marché / Palmeraies)</li>
              <li>Vérification de compte en 2 étapes (2FA SMS)</li>
              <li>Avis vérifiés bilatéraux acheteurs / vendeurs</li>
            </ul>
          </div>

          {/* Local Districts */}
          <div className="space-y-2 text-xs">
            <h4 className="font-semibold text-neutral-900 font-display">Communes de la Wilaya (51)</h4>
            <ul className="space-y-1.5 text-neutral-500">
              <li>Ouled Djellal Centre (وسط المدينة)</li>
              <li>Doucen — Oasis des Dattes (الدوسن)</li>
              <li>Sidi Khaled — Tissage Zerbiya (سيدي خالد)</li>
              <li>Chaiba — Miel & Terroir (الشعيبة)</li>
              <li>Ras El Miaad — Steppes & Élevage (رأس الميعاد)</li>
              <li>Besbes (البسباس)</li>
            </ul>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-1">
            <span>Développé pour les citoyens et artisans de la Wilaya d'Ouled Djellal</span>
            <Heart className="w-3.5 h-3.5 text-amber-800 fill-amber-800 inline ml-1" />
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => setIsMapModalOpen(true)} className="hover:text-neutral-700">
              Repères Géographiques
            </button>
            <span>·</span>
            <span>Séquestre BaridiMob</span>
            <span>·</span>
            <span>Dinar Algérien (DZD)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
