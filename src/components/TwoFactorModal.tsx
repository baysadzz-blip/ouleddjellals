import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, X, Smartphone } from 'lucide-react';

export const TwoFactorModal: React.FC = () => {
  const { is2FAModalOpen, setIs2FAModalOpen, verify2FA } = useApp();
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [trustedDevice, setTrustedDevice] = useState<boolean>(true);

  if (!is2FAModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = verify2FA(code);
    if (!success) {
      setError('Veuillez saisir un code de vérification valide à 6 chiffres (ex. 482910).');
    }
  };

  const handleQuickFill = () => {
    setCode('482910');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-auto p-6 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-neutral-900">
                Vérification en Deux Étapes (2FA)
              </h3>
              <p className="text-[11px] text-neutral-500">Protection renforcée du compte</p>
            </div>
          </div>
          <button
            onClick={() => setIs2FAModalOpen(false)}
            className="p-1 text-neutral-400 hover:text-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-xs text-neutral-600 space-y-2">
          <p>
            Un code d'authentification à 6 chiffres a été envoyé par SMS à votre numéro mobile en Algérie.
          </p>
          <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-neutral-500" />
              <span className="font-medium text-neutral-800">Code Démo : 482910</span>
            </div>
            <button
              type="button"
              onClick={handleQuickFill}
              className="text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 px-2.5 py-0.5 rounded transition-colors"
            >
              Insérer le code
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-neutral-800 block text-center">
              Entrez le code à 6 chiffres
            </label>
            <input
              type="text"
              maxLength={6}
              value={code}
              onChange={(e) => {
                setCode(e.target.value.replace(/\D/g, ''));
                setError('');
              }}
              placeholder="482910"
              className="w-full text-center font-mono text-2xl tracking-[0.35em] py-2 px-3 border border-neutral-300 rounded-xl outline-none focus:border-amber-900 font-bold"
              autoFocus
            />
            {error && <p className="text-[11px] text-red-600 text-center pt-1">{error}</p>}
          </div>

          <label className="flex items-center gap-2 text-xs text-neutral-600 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={trustedDevice}
              onChange={(e) => setTrustedDevice(e.target.checked)}
              className="rounded text-amber-900 focus:ring-amber-900"
            />
            <span>Mémoriser cet appareil pendant 30 jours</span>
          </label>

          <button
            type="submit"
            className="w-full py-2.5 bg-amber-900 hover:bg-amber-800 text-white font-semibold text-xs rounded-xl transition-colors shadow-xs"
          >
            Valider et Continuer
          </button>
        </form>
      </div>
    </div>
  );
};
