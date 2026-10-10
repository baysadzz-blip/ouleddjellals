import React from 'react';
import { useApp } from '../context/AppContext';
import { ItemCard } from './ItemCard';
import { PackageOpen, RotateCcw } from 'lucide-react';

export const ItemGrid: React.FC = () => {
  const {
    filteredItems,
    setSearchQuery,
    setSelectedNeighborhood,
    setSelectedCategory,
    setRadiusMiles
  } = useApp();

  if (filteredItems.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <div className="w-12 h-12 mx-auto rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4">
          <PackageOpen className="w-6 h-6" />
        </div>
        <h3 className="font-display text-lg font-semibold text-neutral-900 mb-2">
          Aucun article trouvé dans ce rayon
        </h3>
        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
          Essayez d'élargir le rayon kilométrique ou sélectionnez une autre commune de la Wilaya d'Ouled Djellal.
        </p>
        <button
          onClick={() => {
            setSearchQuery('');
            setSelectedNeighborhood('all');
            setSelectedCategory('all');
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {filteredItems.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};
