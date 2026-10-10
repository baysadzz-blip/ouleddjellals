import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Package,
  Clock,
  CheckCircle2,
  QrCode,
  Star,
  MessageSquare,
  KeyRound
} from 'lucide-react';

export const OrdersView: React.FC = () => {
  const {
    orders,
    currentUser,
    verifyPickup,
    openReviewModal,
    openChatForItem,
    items
  } = useApp();

  const [activeTab, setActiveTab] = useState<'purchases' | 'sales'>('purchases');
  const [codeInput, setCodeInput] = useState<{ [orderId: string]: string }>({});
  const [verifyMessage, setVerifyMessage] = useState<{ [orderId: string]: string }>({});

  const myPurchases = orders.filter((o) => o.buyerId === currentUser.id);
  const mySales = orders.filter((o) => o.sellerId === currentUser.id);

  const displayOrders = activeTab === 'purchases' ? myPurchases : mySales;

  const handleVerifyCode = (orderId: string) => {
    const code = codeInput[orderId] || '';
    const res = verifyPickup(orderId, code);
    setVerifyMessage((prev) => ({ ...prev, [orderId]: res.message }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title & Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
        <div>
          <h1 className="font-display text-2xl font-bold text-neutral-900">
            Historique des Commandes & Séquestre BaridiMob
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Statut en direct, passes de retrait numériques, déblocage des fonds et évaluations bilatérales.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('purchases')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'purchases'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Mes Achats ({myPurchases.length})
          </button>
          <button
            onClick={() => setActiveTab('sales')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'sales'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Mes Ventes ({mySales.length})
          </button>
        </div>
      </div>

      {/* Orders List */}
      {displayOrders.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-xl border border-neutral-200 p-8">
          <Package className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
          <h3 className="font-display text-base font-semibold text-neutral-800">
            Aucune commande {activeTab === 'purchases' ? 'd\'achat' : 'de vente'} pour le moment
          </h3>
          <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
            {activeTab === 'purchases'
              ? 'Explorez le marché local pour trouver des dattes, tapis ou kachabias près de chez vous.'
              : 'Déposez une annonce pour recevoir des commandes de vos voisins à Ouled Djellal.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayOrders.map((order) => {
            const isPurchase = activeTab === 'purchases';
            const relatedItem = items.find((i) => i.id === order.itemId);

            return (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs hover:border-neutral-300 transition-colors"
              >
                {/* Order Top Bar */}
                <div className="p-4 bg-neutral-50/70 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-neutral-900">{order.id}</span>
                    <span className="text-neutral-400">·</span>
                    <span className="text-neutral-500">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="text-neutral-400">·</span>
                    <span className="text-neutral-600 font-medium">Paiement : BaridiMob Sécurisé</span>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    {order.status === 'escrow_held' && (
                      <span className="text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Séquestre Actif · Préparation en cours</span>
                      </span>
                    )}
                    {order.status === 'ready_for_pickup' && (
                      <span className="text-indigo-800 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5">
                        <QrCode className="w-3.5 h-3.5" />
                        <span>Prêt pour Retrait</span>
                      </span>
                    )}
                    {order.status === 'completed' && (
                      <span className="text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Terminé · Fonds Débloqués</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Order Content */}
                <div className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  
                  {/* Left: Product & Counterparty Details */}
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={order.itemImage}
                      alt={order.itemTitle}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover bg-neutral-100 shrink-0 border border-neutral-200"
                    />
                    <div className="space-y-1 min-w-0">
                      <h3 className="font-semibold text-neutral-900 text-sm leading-snug">
                        {order.itemTitle}
                      </h3>
                      <div className="text-xs text-neutral-500 flex items-center gap-1.5">
                        <span>
                          {isPurchase ? `Vendeur : ${order.sellerName}` : `Acheteur : ${order.buyerName}`}
                        </span>
                        <span>·</span>
                        <span>Qté : {order.quantity}</span>
                      </div>
                      <div className="text-xs text-neutral-400">
                        Lieu de rendez-vous : {order.pickupAddress}
                      </div>
                    </div>
                  </div>

                  {/* Right: Price & Digital Pass / Verification Action */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0 w-full md:w-auto justify-end">
                    
                    <div className="text-right">
                      <div className="text-[11px] text-neutral-400 uppercase tracking-wide">
                        Montant Total
                      </div>
                      <div className="font-mono tabular-nums text-lg font-bold text-neutral-900">
                        {order.totalAmount.toLocaleString()} <span className="text-xs font-semibold text-neutral-500">DZD</span>
                      </div>
                    </div>

                    {/* Buyer view of code */}
                    {isPurchase && (
                      <div className="p-2.5 bg-neutral-100 rounded-lg text-center border border-neutral-200">
                        <div className="text-[10px] text-neutral-500 font-medium">Code Passe de Retrait</div>
                        <div className="font-mono text-sm font-bold text-neutral-900 tracking-wider">
                          {order.pickupVerificationCode}
                        </div>
                      </div>
                    )}

                    {/* Actions cluster */}
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Contact in Chat */}
                      {relatedItem && (
                        <button
                          onClick={() => openChatForItem(relatedItem)}
                          className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 border border-neutral-200 rounded-lg transition-colors"
                          title="Ouvrir la discussion"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      )}

                      {/* Seller Verification Input */}
                      {!isPurchase && order.status !== 'completed' && (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            placeholder="Code 6 chiffres"
                            value={codeInput[order.id] || ''}
                            onChange={(e) =>
                              setCodeInput({ ...codeInput, [order.id]: e.target.value })
                            }
                            className="text-xs font-mono px-2.5 py-1.5 border border-neutral-300 rounded-lg w-32 outline-none"
                          />
                          <button
                            onClick={() => handleVerifyCode(order.id)}
                            className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                          >
                            <KeyRound className="w-3.5 h-3.5" />
                            <span>Valider</span>
                          </button>
                        </div>
                      )}

                      {/* Review Buttons */}
                      {order.status === 'completed' && (
                        <div>
                          {isPurchase ? (
                            order.hasBuyerReviewed ? (
                              <span className="text-xs text-neutral-400 font-medium flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Avis publié</span>
                              </span>
                            ) : (
                              <button
                                onClick={() => openReviewModal(order, 'buyer')}
                                className="px-3 py-1.5 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors flex items-center gap-1"
                              >
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                <span>Noter le Vendeur</span>
                              </button>
                            )
                          ) : order.hasSellerReviewed ? (
                            <span className="text-xs text-neutral-400 font-medium flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Avis publié</span>
                            </span>
                          ) : (
                            <button
                              onClick={() => openReviewModal(order, 'seller')}
                              className="px-3 py-1.5 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors flex items-center gap-1"
                            >
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              <span>Noter l'Acheteur</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                  </div>
                </div>

                {/* Seller verification feedback banner if any */}
                {verifyMessage[order.id] && (
                  <div className="px-5 py-2 bg-neutral-100 text-xs text-neutral-800 border-t border-neutral-200 font-medium">
                    {verifyMessage[order.id]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
