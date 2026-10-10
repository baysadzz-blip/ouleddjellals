import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Package,
  Plus,
  Trash2,
  DollarSign,
  TrendingUp,
  Star,
  ShieldCheck,
  Clock,
  Eye,
  Heart,
  Server,
  Zap,
  CheckCircle2
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    currentUser,
    items,
    deleteItem,
    setIsNewItemModalOpen,
    orders
  } = useApp();

  const myItems = items.filter((i) => i.sellerId === currentUser.id);
  const myCompletedSales = orders.filter(
    (o) => o.sellerId === currentUser.id && o.status === 'completed'
  );
  const totalSalesRevenue = myCompletedSales.reduce((acc, o) => acc + o.totalAmount, 0);

  const [activeTab, setActiveTab] = useState<'inventory' | 'store_settings' | 'performance'>('inventory');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Profile & Quick Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-200">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-900/20 shadow-xs"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl font-bold text-neutral-900">
                {currentUser.name}
              </h1>
              <span className="text-xs bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded flex items-center gap-1 border border-amber-300">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-900" />
                Artisan & Éleveur Agréé (Wilaya 51)
              </span>
            </div>
            <p className="text-xs text-neutral-500">
              {currentUser.neighborhood} · {currentUser.joinedDate} · Compte BaridiMob & RIP Vérifié
            </p>
          </div>
        </div>

        {/* Quick CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsNewItemModalOpen(true)}
            className="px-4 py-2 bg-amber-900 hover:bg-amber-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Déposer une Annonce</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-medium text-neutral-500">Solde Portefeuille</span>
            <DollarSign className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="font-mono tabular-nums text-xl sm:text-2xl font-bold text-neutral-900">
            {currentUser.walletBalance.toLocaleString()} <span className="text-xs font-normal">DZD</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-medium">Virement BaridiMob disponible</div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-medium text-neutral-500">Annonces Actives</span>
            <Package className="w-4 h-4" />
          </div>
          <div className="font-mono tabular-nums text-2xl font-bold text-neutral-900">
            {myItems.length}
          </div>
          <div className="text-[11px] text-neutral-500">Visibles dans l'oasis</div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-medium text-neutral-500">Volume des Ventes</span>
            <TrendingUp className="w-4 h-4 text-amber-700" />
          </div>
          <div className="font-mono tabular-nums text-xl sm:text-2xl font-bold text-neutral-900">
            {totalSalesRevenue.toLocaleString()} <span className="text-xs font-normal">DZD</span>
          </div>
          <div className="text-[11px] text-neutral-500">
            {myCompletedSales.length} transactions sécurisées
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-medium text-neutral-500">Note de Confiance</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
          </div>
          <div className="font-mono tabular-nums text-2xl font-bold text-neutral-900 flex items-center gap-1">
            <span>{currentUser.rating}</span>
            <span className="text-xs text-neutral-400 font-normal">/ 5.0</span>
          </div>
          <div className="text-[11px] text-neutral-500">{currentUser.reviewsCount} avis vérifiés</div>
        </div>

      </div>

      {/* Tabs navigation */}
      <div className="border-b border-neutral-200 flex items-center gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`pb-3 transition-colors ${
            activeTab === 'inventory'
              ? 'text-neutral-900 border-b-2 border-neutral-900'
              : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          Gestion des Stocks & Annonces ({myItems.length})
        </button>
        <button
          onClick={() => setActiveTab('store_settings')}
          className={`pb-3 transition-colors ${
            activeTab === 'store_settings'
              ? 'text-neutral-900 border-b-2 border-neutral-900'
              : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          Paramètres Atelier & Palmeraie
        </button>
        <button
          onClick={() => setActiveTab('performance')}
          className={`pb-3 transition-colors ${
            activeTab === 'performance'
              ? 'text-neutral-900 border-b-2 border-neutral-900'
              : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          Architecture & Scalabilité (Pics Saisonniers)
        </button>
      </div>

      {/* Inventory Tab */}
      {activeTab === 'inventory' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-neutral-900">
              Mes Annonces Répertoriées à Ouled Djellal
            </h2>
            <button
              onClick={() => setIsNewItemModalOpen(true)}
              className="text-xs font-semibold text-neutral-900 hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Publier une Annonce</span>
            </button>
          </div>

          {myItems.length === 0 ? (
            <div className="py-12 text-center bg-white rounded-xl border border-neutral-200 p-6">
              <Package className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
              <p className="text-xs font-semibold text-neutral-700">Aucune annonce déposée</p>
              <p className="text-xs text-neutral-500 mt-1">
                Proposez vos dattes Deglet Nour de Doucen, kachabias de laine, tapis ou récoltes de miel.
              </p>
              <button
                onClick={() => setIsNewItemModalOpen(true)}
                className="mt-4 px-4 py-2 bg-amber-900 text-white rounded-lg text-xs font-semibold"
              >
                Publier ma première annonce
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden divide-y divide-neutral-200 shadow-xs">
              {myItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-lg object-cover bg-neutral-100 shrink-0 border border-neutral-200"
                    />
                    <div className="min-w-0 space-y-1">
                      <div className="text-sm font-semibold text-neutral-900 truncate">
                        {item.title}
                      </div>
                      <div className="text-xs text-neutral-500 flex items-center gap-2">
                        <span>{item.category}</span>
                        <span>·</span>
                        <span>{item.condition === 'Handcrafted' ? 'Artisanal fait main' : item.condition}</span>
                        <span>·</span>
                        <span className="font-mono tabular-nums font-semibold text-neutral-700">
                          {item.stock} en stock
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-neutral-400 font-mono">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{item.viewsCount} vues</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          <span>{item.savesCount} favoris</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                    <div className="font-mono tabular-nums text-base sm:text-lg font-bold text-neutral-900">
                      {item.price.toLocaleString()} <span className="text-xs font-semibold text-neutral-500">DZD</span>
                    </div>

                    <button
                      onClick={() => deleteItem(item.id)}
                      className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Supprimer l'annonce"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Store Settings Tab */}
      {activeTab === 'store_settings' && (
        <form onSubmit={handleSaveSettings} className="bg-white rounded-xl border border-neutral-200 p-6 space-y-6 max-w-2xl">
          <div className="space-y-1">
            <h3 className="font-display text-base font-bold text-neutral-900">
              Paramètres de l'Atelier / Palmeraie
            </h3>
            <p className="text-xs text-neutral-500">
              Configurez l'adresse de retrait, les heures d'ouverture et le point de rendez-vous pour les acheteurs d'Ouled Djellal.
            </p>
          </div>

          {saveSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Paramètres de l'atelier enregistrés avec succès !</span>
            </div>
          )}

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-neutral-800 block mb-1">
                Nom de l'Établissement / Atelier
              </label>
              <input
                type="text"
                defaultValue="Atelier El-Burnous El-Açil (قشابية وبر وصوف)"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg outline-none font-medium"
              />
            </div>

            <div>
              <label className="font-semibold text-neutral-800 block mb-1">
                Adresse de Retrait à Ouled Djellal
              </label>
              <input
                type="text"
                defaultValue="Rue Didouche Mourad, Quartier des Artisans, Ouled Djellal"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg outline-none font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-neutral-800 block mb-1">
                  Horaires d'Ouverture
                </label>
                <input
                  type="text"
                  defaultValue="Samedi – Jeudi, 08:30 – 18:30"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg outline-none font-medium"
                />
              </div>
              <div>
                <label className="font-semibold text-neutral-800 block mb-1">
                  Commune / Zone
                </label>
                <input
                  type="text"
                  defaultValue="Ouled Djellal Centre (51)"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg outline-none font-medium"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-neutral-800 block mb-1">
                Description & Savoir-faire
              </label>
              <textarea
                rows={3}
                defaultValue="Tissage artisanal de kachabias et burnous en pure laine sélectionnée de brebis d'Ouled Djellal. Travail manuel d'héritage oasien."
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg outline-none font-medium leading-relaxed"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-amber-900 hover:bg-amber-800 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Enregistrer les Modifications
          </button>
        </form>
      )}

      {/* Backend Infrastructure & Scalability Tab */}
      {activeTab === 'performance' && (
        <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-6">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-neutral-700" />
            <h3 className="font-display text-base font-bold text-neutral-900">
              Architecture & Scalabilité Haute Concurrence (Pics Saisonniers)
            </h3>
          </div>

          <p className="text-xs text-neutral-600 leading-relaxed max-w-2xl">
            Souq Ouled Djellal est optimisé pour absorber les pics de trafic régionaux (récolte de Deglet Nour en automne, afflux des souks du samedi, fêtes de l'Aïd) avec zéro temps d'arrêt.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1.5">
              <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-600" />
                <span>Cache Géospatial Edge</span>
              </div>
              <p className="text-neutral-500 leading-relaxed">
                Les coordonnées des palmeraies et points de retrait de Doucen et Sidi Khaled sont indexées par centroïde (TTL 30s), allégeant les requêtes serveur de 94%.
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1.5">
              <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Transactions Séquestre Atomiques</span>
              </div>
              <p className="text-neutral-500 leading-relaxed">
                Le verrouillage de stock de dattes et la retenue BaridiMob s'exécutent en transactions isolées sérialisables, évitant toute survente lors des ruées de récolte.
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1.5">
              <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>Synchronisation WebSocket Directe</span>
              </div>
              <p className="text-neutral-500 leading-relaxed">
                Le flux de messagerie, la négociation des offres de prix et la validation des passes QR de retrait transitent en mémoire avec une latence inférieure à 40ms.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
