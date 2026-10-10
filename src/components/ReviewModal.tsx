import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Star, ShieldCheck } from 'lucide-react';

export const ReviewModal: React.FC = () => {
  const {
    isReviewModalOpen,
    closeReviewModal,
    reviewOrder,
    reviewRole,
    currentUser,
    submitReview
  } = useApp();

  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [communication, setCommunication] = useState<number>(5);
  const [accuracy, setAccuracy] = useState<number>(5);
  const [punctuality, setPunctuality] = useState<number>(5);

  if (!isReviewModalOpen || !reviewOrder) return null;

  const targetName = reviewRole === 'buyer' ? reviewOrder.sellerName : reviewOrder.buyerName;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    submitReview({
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: reviewRole,
      targetId: reviewRole === 'buyer' ? reviewOrder.itemId : reviewOrder.buyerId,
      rating,
      comment: comment.trim(),
      verifiedPurchase: true,
      attributes: {
        communication,
        accuracy,
        punctuality
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-auto p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
          <div>
            <h3 className="font-display text-base font-bold text-neutral-900">
              {reviewRole === 'buyer' ? 'Évaluer le Vendeur / Artisan' : 'Évaluer l\'Acheteur'}
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Commande #{reviewOrder.id} · {reviewOrder.itemTitle}
            </p>
          </div>
          <button
            onClick={closeReviewModal}
            className="p-1 text-neutral-400 hover:text-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Target User Info */}
          <div className="flex items-center gap-2 text-xs text-neutral-700 bg-neutral-50 p-3 rounded-xl border border-neutral-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Évaluation vérifiée de <strong>{targetName}</strong> avec badge de transaction locale.
            </span>
          </div>

          {/* Overall Star Rating */}
          <div className="space-y-1.5 text-center py-2">
            <div className="text-xs font-semibold text-neutral-700">Note Globale</div>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-neutral-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="text-xs font-mono font-semibold text-neutral-700">
              {rating === 5 ? 'Excellent (5/5)' : rating === 4 ? 'Très Bien (4/5)' : rating === 3 ? 'Correct (3/5)' : 'Insatisfaisant'}
            </div>
          </div>

          {/* Granular Criteria Sliders */}
          <div className="space-y-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-neutral-600">Communication & Respect</span>
              <div className="flex items-center gap-1 font-mono font-bold text-neutral-800">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    type="button"
                    key={val}
                    onClick={() => setCommunication(val)}
                    className={`w-5 h-5 rounded text-[10px] ${
                      communication >= val ? 'bg-amber-900 text-white' : 'bg-neutral-200 text-neutral-600'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-neutral-600">Conformité du produit / dattes</span>
              <div className="flex items-center gap-1 font-mono font-bold text-neutral-800">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    type="button"
                    key={val}
                    onClick={() => setAccuracy(val)}
                    className={`w-5 h-5 rounded text-[10px] ${
                      accuracy >= val ? 'bg-amber-900 text-white' : 'bg-neutral-200 text-neutral-600'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-neutral-600">Ponctualité au rendez-vous</span>
              <div className="flex items-center gap-1 font-mono font-bold text-neutral-800">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    type="button"
                    key={val}
                    onClick={() => setPunctuality(val)}
                    className={`w-5 h-5 rounded text-[10px] ${
                      punctuality >= val ? 'bg-amber-900 text-white' : 'bg-neutral-200 text-neutral-600'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Written Comment */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-neutral-800 block">
              Commentaire public pour la communauté d'Ouled Djellal
            </label>
            <textarea
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Partagez votre expérience sur la qualité de la marchandise, le respect des horaires et le déroulement du paiement..."
              className="w-full text-xs p-3 bg-neutral-50 border border-neutral-300 rounded-xl outline-none focus:bg-white focus:border-amber-900 leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-amber-900 hover:bg-amber-800 text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
          >
            Publier l'Avis Vérifié
          </button>
        </form>
      </div>
    </div>
  );
};
