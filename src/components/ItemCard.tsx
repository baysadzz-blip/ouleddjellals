import React from 'react';
import { Item } from '../types';
import { useApp } from '../context/AppContext';
import { MapPin, MessageSquare, ShieldCheck, Heart } from 'lucide-react';

interface ItemCardProps {
  item: Item;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const { setSelectedItem, openChatForItem, openCheckout } = useApp();

  return (
    <article
      onClick={() => setSelectedItem(item)}
      className="group bg-white rounded-xl border border-neutral-200 overflow-hidden flex flex-col cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* Product Image Slot */}
      <div className="relative aspect-4/3 w-full bg-neutral-100 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-102"
          onError={(e) => {
            // Elegant CSS/SVG fallback container if asset fails
            const target = e.currentTarget;
            target.style.display = 'none';
            if (target.parentElement) {
              target.parentElement.classList.add('flex', 'items-center', 'justify-center', 'bg-neutral-100');
              target.parentElement.innerHTML = `
                <div class="text-center p-4">
                  <div class="w-10 h-10 mx-auto rounded-full bg-neutral-200 text-neutral-600 flex items-center justify-center font-bold text-sm mb-2">M</div>
                  <span class="text-xs font-medium text-neutral-600">${item.title}</span>
                </div>
              `;
            }
          }}
        />

        {/* Quiet top overlay status: unboxed stock or condition text */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[11px] text-white font-medium">
          <span>{item.condition === 'Handcrafted' ? 'Artisanal' : item.condition}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums">{item.stock} dispo</span>
        </div>

        {/* Quick Chat Shortcut */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            openChatForItem(item);
          }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-neutral-700 hover:text-neutral-900 flex items-center justify-center shadow-xs transition-colors"
          title="Contacter le vendeur"
          aria-label="Contacter le vendeur"
        >
          <MessageSquare className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Product Details Module */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div className="space-y-1.5">
          {/* Metadata strip: Category & Distance & Location (Zero-Pill discipline) */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
            <span className="text-neutral-700">{item.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-0.5">
              <MapPin className="w-3 h-3 text-amber-700 inline shrink-0" />
              <span className="font-mono tabular-nums">{item.distanceMiles} km</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{item.neighborhood}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-sm sm:text-base font-semibold text-neutral-900 leading-snug line-clamp-2 group-hover:text-amber-900 transition-colors">
            {item.title}
          </h3>

          {/* Quiet description snippet */}
          <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Price & Seller & Purchase Actions */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-2">
          {/* Price with tabular numerals in DZD */}
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono tabular-nums text-base sm:text-lg font-bold text-neutral-900">
              {item.price.toLocaleString()} <span className="text-xs font-semibold text-neutral-500">DZD</span>
            </span>
            {item.originalPrice && (
              <span className="font-mono tabular-nums text-xs text-neutral-400 line-through">
                {item.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Seller avatar and quick purchase button */}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                openCheckout(item);
              }}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-amber-900 hover:bg-amber-800 rounded-lg transition-colors whitespace-nowrap shadow-xs"
            >
              Commander
            </button>
          </div>
        </div>

      </div>
    </article>
  );
};
