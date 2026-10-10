import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  MapPin,
  ShieldCheck,
  MessageSquare,
  Tag,
  Truck,
  CheckCircle2,
  Star,
  Share2,
  AlertCircle
} from 'lucide-react';

export const ItemDetailModal: React.FC = () => {
  const {
    selectedItem,
    setSelectedItem,
    openCheckout,
    openChatForItem,
    reviews
  } = useApp();

  const [isOfferMode, setIsOfferMode] = useState<boolean>(false);
  const [offerPrice, setOfferPrice] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  if (!selectedItem) return null;

  const itemReviews = reviews.filter((r) => r.targetId === selectedItem.id);

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(offerPrice);
    if (!parsed || parsed <= 0) return;

    // Close detail modal, open chat with an offer
    setSelectedItem(null);
    openChatForItem(
      selectedItem,
      `Salam alaykoum ! Je vous propose ${parsed.toLocaleString()} DZD pour "${selectedItem.title}". Est-ce que cela vous convient pour un retrait à Ouled Djellal ?`
    );
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-neutral-700 hover:text-neutral-900 shadow-xs transition-colors"
            title="Partager l'annonce"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setSelectedItem(null)}
            className="p-2 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-neutral-700 hover:text-neutral-900 shadow-xs transition-colors"
            title="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {copiedLink && (
          <div className="absolute top-16 right-4 z-20 bg-neutral-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-md">
            Lien copié dans le presse-papier !
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Image Gallery */}
          <div className="bg-neutral-100 flex flex-col justify-center relative min-h-[320px] md:min-h-full">
            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover max-h-[500px]"
            />
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-2">
              <span className="font-medium">{selectedItem.condition === 'Handcrafted' ? 'Artisanal' : selectedItem.condition}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{selectedItem.stock} dispo</span>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              
              {/* Category & Location metadata */}
              <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
                <span className="text-amber-800 font-semibold">{selectedItem.category}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-neutral-700">
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  <span className="font-mono tabular-nums">{selectedItem.distanceMiles} km</span> d’ici
                </span>
                <span aria-hidden="true">·</span>
                <span>{selectedItem.neighborhood}</span>
              </div>

              {/* Title */}
              <h2 className="font-display text-2xl font-bold text-neutral-900 leading-tight">
                {selectedItem.title}
              </h2>

              {/* Price display in DZD */}
              <div className="flex items-baseline gap-3">
                <span className="font-mono tabular-nums text-3xl font-bold text-neutral-900">
                  {selectedItem.price.toLocaleString()} <span className="text-lg font-bold text-neutral-600">DZD</span>
                </span>
                {selectedItem.originalPrice && (
                  <span className="font-mono tabular-nums text-base text-neutral-400 line-through">
                    {selectedItem.originalPrice.toLocaleString()} DZD
                  </span>
                )}
                <span className="text-xs text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Garantie Authenticité Wilaya 51
                </span>
              </div>

              {/* Description */}
              <div className="pt-2 text-sm text-neutral-600 leading-relaxed">
                <p>{selectedItem.description}</p>
              </div>

              {/* Pickup & Delivery Info */}
              <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-2">
                <div className="flex items-start gap-2 text-neutral-800">
                  <MapPin className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Lieu de retrait : </span>
                    <span className="text-neutral-600">{selectedItem.pickupAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-neutral-800">
                  <Truck className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Modes de réception : </span>
                    <span className="text-neutral-600">
                      {selectedItem.deliveryOptions
                        .map((d) => (d === 'local_pickup' ? 'Main à main (يد بيد)' : d === 'same_day_dropoff' ? 'Livraison locale oasis' : 'Envoi 58 Wilayas (Yalidine)'))
                        .join(' · ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Seller Trust Profile */}
              <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedItem.sellerAvatar}
                    alt={selectedItem.sellerName}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                  />
                  <div>
                    <div className="text-xs font-bold text-neutral-900">{selectedItem.sellerName}</div>
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 mt-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="font-mono tabular-nums font-semibold">{selectedItem.sellerRating}</span>
                      <span>Producteur vérifié d'Ouled Djellal</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedItem(null);
                    openChatForItem(selectedItem);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-neutral-800 hover:bg-neutral-100 border border-neutral-200 rounded-lg transition-colors flex items-center gap-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Discussion</span>
                </button>
              </div>

            </div>

            {/* Contiguous Purchase Action Module */}
            <div className="space-y-3 pt-4 border-t border-neutral-100">
              
              {!isOfferMode ? (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setIsOfferMode(true);
                      setOfferPrice((selectedItem.price * 0.9).toFixed(0));
                    }}
                    className="px-4 py-2.5 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Tag className="w-3.5 h-3.5" />
                    <span>Négocier / Offre</span>
                  </button>

                  <button
                    onClick={() => {
                      const itemToCheckout = selectedItem;
                      setSelectedItem(null);
                      openCheckout(itemToCheckout);
                    }}
                    className="px-4 py-2.5 text-xs font-semibold text-white bg-amber-900 hover:bg-amber-800 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Commander ({selectedItem.price.toLocaleString()} DZD)</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSendOffer} className="space-y-2 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="flex items-center justify-between text-xs font-medium text-neutral-700">
                    <span>Proposer une Offre de Prix Directe</span>
                    <button
                      type="button"
                      onClick={() => setIsOfferMode(false)}
                      className="text-neutral-400 hover:text-neutral-700"
                    >
                      Annuler
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="50"
                      min="100"
                      value={offerPrice}
                      onChange={(e) => setOfferPrice(e.target.value)}
                      placeholder="Montant en DZD"
                      className="w-full text-xs font-mono px-3 py-1.5 bg-white border border-neutral-300 rounded-lg outline-none"
                    />
                    <span className="text-xs font-bold text-neutral-500">DZD</span>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-amber-900 hover:bg-amber-800 text-white text-xs font-semibold rounded-lg shrink-0"
                    >
                      Envoyer au vendeur
                    </button>
                  </div>
                  <div className="text-[11px] text-neutral-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 text-neutral-400" />
                    <span>Le vendeur recevra votre offre dans le chat et pourra l'accepter immédiatement.</span>
                  </div>
                </form>
              )}

              {/* Escrow Guarantee Note */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Paiement sécurisé BaridiMob : fonds bloqués jusqu'à vérification physique à Ouled Djellal.</span>
              </div>

            </div>

          </div>

        </div>

        {/* Reviews Section at bottom of modal */}
        {itemReviews.length > 0 && (
          <div className="border-t border-neutral-200 p-6 sm:p-8 bg-neutral-50/50">
            <h4 className="font-display text-sm font-bold text-neutral-900 mb-3">
              Avis Acheteurs Vérifiés ({itemReviews.length})
            </h4>
            <div className="space-y-3">
              {itemReviews.map((rev) => (
                <div key={rev.id} className="bg-white p-3.5 rounded-xl border border-neutral-200 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={rev.authorAvatar}
                        alt={rev.authorName}
                        referrerPolicy="no-referrer"
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="font-semibold text-neutral-900">{rev.authorName}</span>
                      {rev.verifiedPurchase && (
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-medium border border-emerald-200">
                          Achat Local Vérifié
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 font-mono">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{rev.rating}.0</span>
                    </div>
                  </div>
                  <p className="text-neutral-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
