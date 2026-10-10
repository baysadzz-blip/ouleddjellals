import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Check,
  Sparkles,
  ShoppingBag,
  Store,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { NEIGHBORHOODS } from '../data/mockData';

const INTERESTS = [
  'Dattes Deglet Nour de Doucen',
  'Pure Laine d’Ouled Djellal & Burnous',
  'Tapis Zerbiya de Sidi Khaled',
  'Miel de Sidr Saharien & Robb',
  'Huile d’Olive & Chakhchoukha',
  'Matériel Oasien & Palmeraies'
];

export const OnboardingModal: React.FC = () => {
  const { isOnboardingOpen, completeOnboarding } = useApp();

  const [step, setStep] = useState<number>(1);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('Ouled Djellal Centre (وسط المدينة)');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Dattes Deglet Nour de Doucen',
    'Pure Laine d’Ouled Djellal & Burnous'
  ]);
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');

  if (!isOnboardingOpen) return null;

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleFinish = () => {
    completeOnboarding({
      neighborhood: selectedNeighborhood,
      interests: selectedInterests,
      role
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-auto p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Step indicator */}
        <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-900 text-white flex items-center justify-center font-bold text-xs">
              OD
            </div>
            <div>
              <span className="font-display text-sm font-bold text-neutral-900">
                Bienvenue sur Souq Ouled Djellal
              </span>
              <div className="text-[11px] text-neutral-500">Étape {step} sur 3 · Wilaya 51</div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-5 h-1.5 rounded-full transition-colors ${
                  s === step ? 'bg-amber-900' : s < step ? 'bg-emerald-600' : 'bg-neutral-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Neighborhood */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="font-display text-xl font-bold text-neutral-900">
                Quelle est votre commune de résidence ?
              </h2>
              <p className="text-xs text-neutral-600">
                Sélectionnez votre commune pour privilégier les annonces et retraits dans votre oasis.
              </p>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {NEIGHBORHOODS.filter((n) => n.id !== 'all').map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => setSelectedNeighborhood(n.name)}
                  className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                    selectedNeighborhood === n.name
                      ? 'border-amber-900 bg-amber-900 text-white'
                      : 'border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 shrink-0 opacity-80" />
                    <div>
                      <div className="text-xs font-semibold leading-tight">{n.name}</div>
                      <div className="text-[11px] opacity-80 mt-0.5">
                        {n.activeStoresCount} boutiques d'oasis · {n.activeItemsCount} annonces
                      </div>
                    </div>
                  </div>
                  {selectedNeighborhood === n.name && (
                    <Check className="w-4 h-4 shrink-0" />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-2.5 bg-amber-900 hover:bg-amber-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Continuer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Step 2: Interests */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="font-display text-xl font-bold text-neutral-900">
                Quels produits d'oasis vous intéressent ?
              </h2>
              <p className="text-xs text-neutral-600">
                Personnalisez votre fil d'actualité avec le meilleur du terroir saharien.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {INTERESTS.map((interest) => {
                const selected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex flex-col justify-between ${
                      selected
                        ? 'border-amber-900 bg-amber-900 text-white'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <span>{interest}</span>
                    <span className="text-[10px] opacity-70 mt-2 font-mono">
                      {selected ? '✓ Sélectionné' : '+ Ajouter'}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs text-neutral-600 hover:text-neutral-900"
              >
                Retour
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-2.5 bg-amber-900 hover:bg-amber-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Continuer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Role & Welcome Reward */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="font-display text-xl font-bold text-neutral-900">
                Comment souhaitez-vous participer ?
              </h2>
              <p className="text-xs text-neutral-600">
                Vous pourrez acheter et vendre avec le même compte à tout moment.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('buyer')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  role === 'buyer'
                    ? 'border-amber-900 bg-amber-50/50 ring-1 ring-amber-900'
                    : 'border-neutral-200 hover:bg-neutral-50/50'
                }`}
              >
                <ShoppingBag className="w-5 h-5 text-amber-900 mb-2" />
                <div className="text-xs font-bold text-neutral-900">Acheteur Local</div>
                <div className="text-[11px] text-neutral-500 mt-1">
                  Commander dattes, laine, kachabia et miel auprès des producteurs.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole('seller')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  role === 'seller'
                    ? 'border-amber-900 bg-amber-50/50 ring-1 ring-amber-900'
                    : 'border-neutral-200 hover:bg-neutral-50/50'
                }`}
              >
                <Store className="w-5 h-5 text-amber-900 mb-2" />
                <div className="text-xs font-bold text-neutral-900">Artisan & Producteur</div>
                <div className="text-[11px] text-neutral-500 mt-1">
                  Vendre votre récolte de dattes, tissages, ovins ou matériel agricole.
                </div>
              </button>
            </div>

            {/* Welcome Gift Card in DZD */}
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-xs text-emerald-950">
                <div className="font-bold">Bon d'Achat de Bienvenue de 1 000 DZD</div>
                <div className="text-[11px] text-emerald-800">
                  Automatiquement crédité sur votre compte BaridiMob / Souq dès validation !
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs text-neutral-600 hover:text-neutral-900"
              >
                Retour
              </button>
              <button
                onClick={handleFinish}
                className="flex-1 py-3 bg-amber-900 hover:bg-amber-800 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
              >
                Réclamer mes 1 000 DZD & Entrer
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
