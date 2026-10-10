import React from 'react';
import { useApp } from '../context/AppContext';
import { StoreCard } from './StoreCard';
import { Store as StoreIcon, RotateCcw } from 'lucide-react';

export const StoreGrid: React.FC = () => {
  const { filteredStores, setSearchQuery, setSelectedNeighborhood, setRadiusMiles } = useApp();

  if (filteredStores.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <div className="w-12 h-12 mx-auto rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4">
          <StoreIcon className="w-6 h-6" />
        </div>
        <h3 className="font-display text-lg font-semibold text-neutral-900 mb-2">
          Aucune boutique ou palmeraie trouvée
        </h3>
        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
          Élargissez votre rayon de recherche pour découvrir les exploitations de Doucen, Sidi Khaled et Chaiba.
        </p>
        <button
          onClick={() => {
            setSearchQuery('');
            setSelectedNeighborhood('all');
            setRadiusMiles(30);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Réinitialiser les Filtres</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-neutral-900">
            Boutiques d'Oasis, Palmeraies & Ateliers de Tissage
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Établissements physiques et artisans locaux répertoriés dans la Wilaya d'Ouled Djellal (51).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredStores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </div>
  );
};
