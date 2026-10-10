import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Plus, Package, MapPin, Truck, DollarSign } from 'lucide-react';
import { ItemCondition, DeliveryType } from '../types';

const SAMPLE_IMAGE_OPTIONS = [
  { label: 'Dattes Deglet Nour', url: '/src/assets/images/deglet_nour_dates_1791631792185.jpg' },
  { label: 'Kachabia & Burnous', url: '/src/assets/images/kachabia_wool_burnous_1791631803560.jpg' },
  { label: 'Tapis Zerbiya Laine', url: '/src/assets/images/saharan_wool_carpet_1791631814588.jpg' },
  { label: 'Miel Sidr & Robb', url: '/src/assets/images/sidr_honey_datesyrup_1791631825208.jpg' }
];

export const NewItemModal: React.FC = () => {
  const { isNewItemModalOpen, setIsNewItemModalOpen, addItem, currentUser } = useApp();

  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [category, setCategory] = useState<string>('Terroir & Dattes');
  const [condition, setCondition] = useState<ItemCondition>('Handcrafted');
  const [stock, setStock] = useState<number>(5);
  const [description, setDescription] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>(SAMPLE_IMAGE_OPTIONS[0].url);
  const [pickupAddress, setPickupAddress] = useState<string>(
    'Place du Marché / Rue des Artisans, Ouled Djellal (51)'
  );
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryType[]>([
    'local_pickup',
    'same_day_dropoff'
  ]);

  if (!isNewItemModalOpen) return null;

  const toggleDelivery = (opt: DeliveryType) => {
    if (deliveryOptions.includes(opt)) {
      if (deliveryOptions.length > 1) {
        setDeliveryOptions(deliveryOptions.filter((d) => d !== opt));
      }
    } else {
      setDeliveryOptions([...deliveryOptions, opt]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedPrice = parseFloat(price);
    if (!title.trim() || !parsedPrice || parsedPrice <= 0) return;

    addItem({
      title: title.trim(),
      price: parsedPrice,
      category,
      condition,
      image: selectedImage,
      description: description.trim() || 'Produit authentique de la région d’Ouled Djellal.',
      neighborhood: currentUser.neighborhood,
      distanceMiles: 1.2,
      sellerId: currentUser.id,
      sellerName: `${currentUser.name} (Vendeur Local)`,
      sellerAvatar: currentUser.avatar,
      sellerRating: 5.0,
      stock,
      deliveryOptions,
      pickupAddress: pickupAddress.trim()
    });

    setIsNewItemModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/80">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-amber-900" />
            <h3 className="font-display text-sm font-bold text-neutral-900">
              Déposer une Annonce à Ouled Djellal
            </h3>
          </div>
          <button
            onClick={() => setIsNewItemModalOpen(false)}
            className="p-1 text-neutral-400 hover:text-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto text-xs">
          
          <div>
            <label className="font-semibold text-neutral-800 block mb-1">
              Titre de l'Annonce
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ex. Dattes Deglet Nour de Doucen (Caisse 5kg)"
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg outline-none font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-neutral-800 block mb-1">
                Prix (Dinar Algérien - DZD)
              </label>
              <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-white">
                <input
                  type="number"
                  required
                  step="50"
                  min="50"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="3500"
                  className="w-full py-2 pl-3 outline-none font-mono font-medium"
                />
                <span className="px-2.5 text-neutral-500 font-bold text-[11px]">DZD</span>
              </div>
            </div>

            <div>
              <label className="font-semibold text-neutral-800 block mb-1">
                Quantité en Stock
              </label>
              <input
                type="number"
                min="1"
                value={stock}
                onChange={(e) => setStock(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg outline-none font-mono font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-neutral-800 block mb-1">
                Catégorie de Terroir
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg outline-none font-medium bg-white"
              >
                <option value="Terroir & Dattes">Terroir & Dattes</option>
                <option value="Artisanat & Laine">Artisanat & Laine</option>
                <option value="Tissage & Décoration">Tissage & Décoration</option>
                <option value="Miel & Terroir">Miel & Terroir</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-neutral-800 block mb-1">
                État / Type
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as ItemCondition)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg outline-none font-medium bg-white"
              >
                <option value="Handcrafted">Fait main / Artisanal</option>
                <option value="Brand New">Neuf / Récolte fraîche</option>
                <option value="Like New">Excellent état</option>
                <option value="Good">Bon état</option>
              </select>
            </div>
          </div>

          {/* Image preset selector */}
          <div className="space-y-1.5">
            <label className="font-semibold text-neutral-800 block">
              Sélectionner la Photo d'Illustration
            </label>
            <div className="grid grid-cols-4 gap-2">
              {SAMPLE_IMAGE_OPTIONS.map((img) => (
                <button
                  key={img.label}
                  type="button"
                  onClick={() => setSelectedImage(img.url)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === img.url
                      ? 'border-amber-900 ring-2 ring-amber-900/20'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.label}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-semibold text-neutral-800 block mb-1">
              Lieu de Rendez-vous / Retrait
            </label>
            <input
              type="text"
              required
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              placeholder="ex. Devant la Grande Poste d'Ouled Djellal"
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg outline-none font-medium"
            />
          </div>

          <div>
            <label className="font-semibold text-neutral-800 block mb-1">
              Description & Origine
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Détails sur la récolte, la qualité de la laine ou l'emballage..."
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg outline-none font-medium"
            />
          </div>

          {/* Fulfillment Modes */}
          <div className="space-y-1.5 pt-1">
            <label className="font-semibold text-neutral-800 block">
              Modes de Remise Proposés
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'local_pickup', label: 'Retrait en main propre' },
                { id: 'same_day_dropoff', label: 'Livraison Oasis' },
                { id: 'neighborhood_courier', label: 'Envoi 58 Wilayas (Yalidine)' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggleDelivery(opt.id as DeliveryType)}
                  className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                    deliveryOptions.includes(opt.id as DeliveryType)
                      ? 'border-amber-900 bg-amber-900 text-white'
                      : 'border-neutral-200 text-neutral-700 bg-white hover:bg-neutral-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-amber-900 hover:bg-amber-800 text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
          >
            Publier l'Annonce Immédiatement
          </button>

        </form>
      </div>
    </div>
  );
};
