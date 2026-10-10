import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ShieldCheck,
  CreditCard,
  Wallet,
  CheckCircle2,
  MapPin,
  QrCode,
  Truck,
  ArrowRight
} from 'lucide-react';
import { DeliveryType, Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutModalOpen,
    closeCheckout,
    checkoutItem,
    checkoutCustomPrice,
    currentUser,
    createOrder,
    setCurrentView
  } = useApp();

  const [quantity, setQuantity] = useState<number>(1);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('local_pickup');
  const [paymentMethod, setPaymentMethod] = useState<'baridimob' | 'edahabia_cib' | 'local_wallet' | 'cash_on_pickup'>('baridimob');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isCheckoutModalOpen || !checkoutItem) return null;

  const unitPrice = checkoutCustomPrice !== null ? checkoutCustomPrice : checkoutItem.price;
  const subtotal = unitPrice * quantity;
  const localServiceFee = 50; // 50 DZD nominal escrow fee
  const deliveryFee = deliveryType === 'neighborhood_courier' ? 500 : deliveryType === 'same_day_dropoff' ? 250 : 0;
  const total = subtotal + deliveryFee + localServiceFee;

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const order = createOrder({
        item: checkoutItem,
        quantity,
        paymentMethod,
        deliveryType,
        unitPrice
      });
      setIsProcessing(false);
      setConfirmedOrder(order);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/80">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-amber-900 text-white flex items-center justify-center font-bold text-xs">
              OD
            </div>
            <h3 className="font-display text-sm font-bold text-neutral-900">
              {confirmedOrder ? 'Commande Validée' : 'Paiement Sécurisé — Souq Ouled Djellal'}
            </h3>
          </div>
          <button
            onClick={closeCheckout}
            className="p-1 rounded-md text-neutral-400 hover:text-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmation Screen */}
        {confirmedOrder ? (
          <div className="p-6 space-y-6 text-center">
            
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="font-display text-xl font-bold text-neutral-900">
                Paiement Sécurisé en Séquestre !
              </h3>
              <p className="text-xs text-neutral-500">
                Commande #{confirmedOrder.id} enregistrée. Vos fonds sont protégés jusqu'à vérification de l'article.
              </p>
            </div>

            {/* Pickup Pass Card with QR Code Representation */}
            <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-200 text-left space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 text-xs">
                <span className="font-semibold text-neutral-700">Passe de Retrait & Code QR</span>
                <span className="font-mono tabular-nums text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  SÉQUESTRE ACTIF
                </span>
              </div>

              <div className="flex items-center justify-center py-2">
                <div className="p-3 bg-white rounded-xl border-2 border-dashed border-neutral-300 text-center space-y-2">
                  <QrCode className="w-20 h-20 mx-auto text-neutral-900" />
                  <div className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">
                    Code de Retrait à Fournir au Vendeur
                  </div>
                  <div className="text-xl font-mono font-bold tracking-widest text-neutral-900 bg-neutral-100 px-3 py-1 rounded">
                    {confirmedOrder.pickupVerificationCode}
                  </div>
                </div>
              </div>

              <div className="text-xs space-y-1.5 text-neutral-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-neutral-900">Lieu de rendez-vous : </span>
                    <span>{confirmedOrder.pickupAddress}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span>Présentez ce code à {confirmedOrder.sellerName} après avoir vérifié vos dattes ou articles.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  closeCheckout();
                  setCurrentView('orders');
                }}
                className="w-full py-2.5 bg-amber-900 hover:bg-amber-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Suivre dans Mes Commandes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleCompletePayment} className="p-6 space-y-5">
            
            {/* Item Summary */}
            <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
              <img
                src={checkoutItem.image}
                alt={checkoutItem.title}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-lg object-cover bg-neutral-200 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold text-neutral-900 truncate">
                  {checkoutItem.title}
                </h4>
                <div className="text-[11px] text-neutral-500 mt-0.5">
                  Vendeur : {checkoutItem.sellerName}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono tabular-nums text-sm font-bold text-neutral-900">
                    {unitPrice.toLocaleString()} DZD
                  </span>
                  {checkoutCustomPrice !== null && (
                    <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded font-medium">
                      Offre acceptée
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity selector */}
              <div className="flex items-center border border-neutral-300 rounded-lg bg-white shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-1 text-xs text-neutral-600 hover:text-neutral-900"
                >
                  -
                </button>
                <span className="font-mono text-xs px-2 font-semibold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(checkoutItem.stock, quantity + 1))}
                  className="px-2 py-1 text-xs text-neutral-600 hover:text-neutral-900"
                >
                  +
                </button>
              </div>
            </div>

            {/* Delivery Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-900 block">
                Mode de Réception
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'local_pickup', label: 'Main à main', fee: 'Gratuit' },
                  { id: 'same_day_dropoff', label: 'Livreur Oasis', fee: '+250 DZD' },
                  { id: 'neighborhood_courier', label: '58 Wilayas', fee: '+500 DZD' }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setDeliveryType(mode.id as DeliveryType)}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      deliveryType === mode.id
                        ? 'border-amber-900 bg-amber-900 text-white'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="text-xs font-bold leading-tight">{mode.label}</div>
                    <div className="text-[10px] opacity-80 font-mono mt-0.5">{mode.fee}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-900 block">
                Mode de Paiement (Séquestre Garanti)
              </label>
              <div className="space-y-1.5">
                {[
                  {
                    id: 'baridimob',
                    title: 'BaridiMob (Algérie Poste)',
                    desc: 'Virement sécurisé instantané avec RIP',
                    icon: Wallet
                  },
                  {
                    id: 'edahabia_cib',
                    title: 'Carte Edahabia / CIB',
                    desc: 'Paiement électronique avec validation SMS',
                    icon: CreditCard
                  },
                  {
                    id: 'cash_on_pickup',
                    title: 'Espèces Main à main (يد بيد)',
                    desc: 'Paiement en liquide lors du rendez-vous',
                    icon: ShieldCheck
                  },
                  {
                    id: 'local_wallet',
                    title: `Portefeuille Souq (${currentUser.walletBalance.toLocaleString()} DZD)`,
                    desc: 'Déduire de votre solde local',
                    icon: Wallet
                  }
                ].map((pm) => {
                  const Icon = pm.icon;
                  return (
                    <label
                      key={pm.id}
                      className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-colors ${
                        paymentMethod === pm.id
                          ? 'border-amber-900 bg-amber-50/50'
                          : 'border-neutral-200 hover:bg-neutral-50/50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === pm.id}
                          onChange={() => setPaymentMethod(pm.id as any)}
                          className="text-amber-900 focus:ring-amber-900"
                        />
                        <div>
                          <div className="text-xs font-semibold text-neutral-900">{pm.title}</div>
                          <div className="text-[11px] text-neutral-500">{pm.desc}</div>
                        </div>
                      </div>
                      <Icon className="w-4 h-4 text-amber-800 shrink-0" />
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Order Price Breakdown in DZD */}
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-1 font-mono">
              <div className="flex justify-between text-neutral-600">
                <span>Sous-total ({quantity} article{quantity > 1 ? 's' : ''})</span>
                <span className="tabular-nums">{subtotal.toLocaleString()} DZD</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Garantie SécuriSouq</span>
                <span className="tabular-nums">{localServiceFee} DZD</span>
              </div>
              {deliveryFee > 0 && (
                <div className="flex justify-between text-neutral-600">
                  <span>Frais de livraison</span>
                  <span className="tabular-nums">{deliveryFee} DZD</span>
                </div>
              )}
              <div className="pt-2 border-t border-neutral-200 flex justify-between font-bold text-neutral-900 text-sm">
                <span>Total à régler</span>
                <span className="tabular-nums text-amber-900">{total.toLocaleString()} DZD</span>
              </div>
            </div>

            {/* Escrow Guarantee Statement */}
            <div className="flex items-center gap-2 text-[11px] text-neutral-700 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                <strong>Protection de l'Acheteur :</strong> Le vendeur ne reçoit les fonds qu'après vérification physique du produit à Ouled Djellal.
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 bg-amber-900 hover:bg-amber-800 disabled:opacity-50 text-white font-semibold text-xs rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Validation du séquestre BaridiMob...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirmer la commande ({total.toLocaleString()} DZD)</span>
                </>
              )}
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
