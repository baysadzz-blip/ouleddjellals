import React from 'react';
import { Store } from '../types';
import { useApp } from '../context/AppContext';
import { MapPin, Star, ShieldCheck, Clock, ArrowRight } from 'lucide-react';

interface StoreCardProps {
  store: Store;
}

export const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  const { setSelectedStore } = useApp();

  return (
    <article
      onClick={() => setSelectedStore(store)}
      className="group bg-white rounded-xl border border-neutral-200 overflow-hidden flex flex-col cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* Store Front Image */}
      <div className="relative aspect-16/9 w-full bg-neutral-100 overflow-hidden">
        <img
          src={store.image}
          alt={store.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-102"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Verified Local Tag (Quiet text unboxed) */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-semibold text-neutral-900 shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-800" />
          <span>Producteur & Artisan Vérifié</span>
        </div>

        {/* Rating and Distance bottom overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-mono tabular-nums font-bold">{store.rating}</span>
            <span className="text-white/80">({store.reviewCount} avis)</span>
          </div>

          <div className="flex items-center gap-1 text-white/90">
            <MapPin className="w-3 h-3 inline text-amber-300" />
            <span className="font-mono tabular-nums">{store.distanceMiles} km</span>
          </div>
        </div>
      </div>

      {/* Store Meta */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-amber-800">{store.category}</span>
            <span className="text-xs text-neutral-400 font-mono">Fondé en {store.establishedYear}</span>
          </div>

          <h3 className="font-display text-lg font-bold text-neutral-900 group-hover:text-amber-900 transition-colors">
            {store.name}
          </h3>

          <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
            {store.tagline}
          </p>

          <div className="pt-2 flex items-center gap-1.5 text-xs text-neutral-500">
            <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="truncate">{store.openingHours}</span>
          </div>
        </div>

        {/* Footer: Owner & Visit */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <img
              src={store.ownerAvatar}
              alt={store.ownerName}
              referrerPolicy="no-referrer"
              className="w-6 h-6 rounded-full object-cover border border-neutral-200"
            />
            <span className="text-xs font-medium text-neutral-700">{store.ownerName}</span>
          </div>

          <span className="text-xs font-semibold text-amber-900 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
            <span>Découvrir l'Atelier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

      </div>
    </article>
  );
};
