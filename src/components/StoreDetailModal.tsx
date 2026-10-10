import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  MapPin,
  Clock,
  ShieldCheck,
  Star,
  MessageSquare,
  Package,
  ArrowRight
} from 'lucide-react';

export const StoreDetailModal: React.FC = () => {
  const {
    selectedStore,
    setSelectedStore,
    items,
    setSelectedItem,
    reviews
  } = useApp();

  if (!selectedStore) return null;

  const storeItems = items.filter((i) => i.storeId === selectedStore.id);
  const storeReviews = reviews.filter((r) => r.targetId === selectedStore.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Cover Banner */}
        <div className="relative h-48 sm:h-64 w-full bg-neutral-900 shrink-0">
          <img
            src={selectedStore.image}
            alt={selectedStore.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={() => setSelectedStore(null)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-neutral-800 transition-colors shadow-xs"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Store Title & Badges in Cover */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Producteur & Artisan Local Agréé
                </span>
                <span className="text-xs text-neutral-300">Fondé en {selectedStore.establishedYear}</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                {selectedStore.name}
              </h2>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 bg-white/95 px-3 py-1.5 rounded-lg text-neutral-900 text-xs font-semibold shadow-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-mono tabular-nums font-bold">{selectedStore.rating}</span>
              <span className="text-neutral-500">({selectedStore.reviewCount} avis)</span>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          {/* Store Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs">
            
            <div className="space-y-1">
              <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-800" />
                <span>Emplacement</span>
              </div>
              <p className="text-neutral-600 leading-relaxed">{selectedStore.address}</p>
              <p className="text-neutral-400 font-mono">{selectedStore.distanceMiles} km d'ici</p>
            </div>

            <div className="space-y-1">
              <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-800" />
                <span>Horaires d'Ouverture</span>
              </div>
              <p className="text-neutral-600 leading-relaxed">{selectedStore.openingHours}</p>
              <p className="text-emerald-700 font-medium">Ouvert pour retrait en main propre</p>
            </div>

            <div className="space-y-1">
              <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-amber-800" />
                <span>Temps de Réponse</span>
              </div>
              <p className="text-neutral-600 leading-relaxed">Répond en {selectedStore.responseRate}</p>
              <p className="text-neutral-400 font-mono">{selectedStore.totalSales}+ commandes locales livrées</p>
            </div>

          </div>

          {/* About / Bio */}
          <div className="space-y-2">
            <h3 className="font-display text-base font-bold text-neutral-900">
              À Propos de l'Établissement & Savoir-Faire
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {selectedStore.bio}
            </p>
          </div>

          {/* Active Inventory by this Store */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-neutral-900 flex items-center gap-2">
                <Package className="w-4 h-4 text-neutral-600" />
                <span>Articles Disponibles ({storeItems.length})</span>
              </h3>
            </div>

            {storeItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {storeItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedStore(null);
                      setSelectedItem(item);
                    }}
                    className="p-3 bg-white border border-neutral-200 rounded-xl hover:border-neutral-400 cursor-pointer transition-colors flex items-center gap-3.5 group"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-lg object-cover bg-neutral-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-neutral-900 truncate group-hover:text-neutral-700">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-0.5">
                        {item.condition === 'Handcrafted' ? 'Artisanal' : item.condition} · {item.stock} dispo
                      </div>
                      <div className="font-mono tabular-nums text-sm font-bold text-neutral-900 mt-1">
                        {item.price.toLocaleString()} DZD
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-neutral-500 italic">
                Tous les articles de cette palmeraie/boutique sont momentanément indisponibles.
              </p>
            )}
          </div>

          {/* Store Reviews */}
          {storeReviews.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-neutral-200">
              <h3 className="font-display text-base font-bold text-neutral-900">
                Avis de la Communauté ({storeReviews.length})
              </h3>
              <div className="space-y-3">
                {storeReviews.map((rev) => (
                  <div key={rev.id} className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={rev.authorAvatar}
                          alt={rev.authorName}
                          referrerPolicy="no-referrer"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="font-semibold text-neutral-900">{rev.authorName}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 font-mono">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{rev.rating}.0</span>
                      </div>
                    </div>
                    <p className="text-neutral-600">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
