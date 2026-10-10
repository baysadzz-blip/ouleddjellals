import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Phone } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginWithSocial } = useApp();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isPhoneMode, setIsPhoneMode] = useState<boolean>(false);

  if (!isAuthModalOpen) return null;

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;
    loginWithSocial('phone');
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
            <div className="w-7 h-7 rounded-lg bg-amber-900 text-white flex items-center justify-center font-bold text-xs">
              OD
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-neutral-900 leading-tight">
                Souq Ouled Djellal
              </h3>
              <p className="text-[10px] text-neutral-500">Connexion sécurisée · Wilaya 51</p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1 text-neutral-400 hover:text-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-neutral-600 leading-relaxed">
            Rejoignez les producteurs de dattes, artisans tisserands et éleveurs d'Ouled Djellal. Commandes en séquestre et retraits directs.
          </p>
        </div>

        {!isPhoneMode ? (
          <div className="space-y-2.5">
            {/* Google Sign In */}
            <button
              onClick={() => loginWithSocial('google')}
              className="w-full py-2.5 px-4 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold rounded-xl border border-neutral-300 transition-colors flex items-center justify-center gap-2.5 shadow-2xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continuer avec Google</span>
            </button>

            {/* Apple Sign In */}
            <button
              onClick={() => loginWithSocial('apple')}
              className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2.5 shadow-2xs"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.7-7.98-12.02-14.7-6.09-9.5-10.9-20.08-14.43-31.73-3.53-11.66-5.3-22.61-5.3-32.84 0-14.94 3.82-27.42 11.45-37.45 7.64-10.03 17.26-15.17 28.87-15.42 5.11 0 10.85 1.47 17.22 4.4 6.38 2.94 10.22 4.47 11.53 4.58 1.95-.23 6.09-1.9 12.42-5.01 6.33-3.12 11.96-4.56 16.89-4.32 12.83.65 23.36 5.48 31.6 14.51-11.27 6.83-16.77 16.32-16.51 28.47.26 9.69 3.87 17.84 10.84 24.45 6.97 6.61 15.35 10.37 25.13 11.28-2.22 6.87-4.99 13.6-8.32 20.19zM119.22 31.84c0-7.39 2.65-14.54 7.96-21.46 5.3-6.91 11.9-11.39 19.8-13.43 1.09 7.72-.88 15.12-5.91 22.19-5.04 7.07-11.61 11.29-19.72 12.65-.54-.04-1.25-.09-2.13-.15z" />
              </svg>
              <span>Continuer avec Apple ID</span>
            </button>

            {/* Phone SMS Toggle */}
            <button
              onClick={() => setIsPhoneMode(true)}
              className="w-full py-2.5 px-4 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-amber-800" />
              <span>Numéro de Téléphone Mobile (Algérie +213)</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handlePhoneSubmit} className="space-y-3">
            <label className="text-xs font-semibold text-neutral-800 block">
              Numéro Mobile (Mobilis, Djezzy, Ooredoo)
            </label>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2.5 py-2 bg-neutral-100 rounded-lg border border-neutral-300 font-semibold text-neutral-700">
                +213
              </span>
              <input
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="6 61 42 19 88"
                className="flex-1 text-xs font-mono px-3 py-2 border border-neutral-300 rounded-lg outline-none focus:border-amber-900"
                autoFocus
              />
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsPhoneMode(false)}
                className="px-3 py-2 text-xs text-neutral-500 hover:text-neutral-800"
              >
                Retour
              </button>
              <button
                type="submit"
                className="flex-1 py-2 bg-amber-900 hover:bg-amber-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs"
              >
                Envoyer le code OTP (2FA)
              </button>
            </div>
          </form>
        )}

        <div className="text-[11px] text-neutral-400 text-center">
          Sécurisé par double authentification 2FA pour la protection des transactions à Ouled Djellal.
        </div>
      </div>
    </div>
  );
};
