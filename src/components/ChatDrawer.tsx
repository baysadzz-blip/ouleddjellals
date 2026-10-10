import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Send,
  Tag,
  CheckCircle2,
  ShoppingBag,
  ShieldCheck
} from 'lucide-react';

const QUICK_CHIPS = [
  'Salam ! Est-ce disponible pour retrait ?',
  'Possibilité de se voir à Ouled Djellal Centre ?',
  'Quel est votre dernier prix avec BaridiMob ?',
  'Est-ce la vraie récolte de Doucen ?'
];

export const ChatDrawer: React.FC = () => {
  const {
    isChatDrawerOpen,
    setIsChatDrawerOpen,
    conversations,
    activeConversationId,
    setActiveConversationId,
    currentUser,
    sendMessage,
    respondToOffer,
    openCheckout,
    items
  } = useApp();

  const [inputMessage, setInputMessage] = useState<string>('');
  const [isMakingOffer, setIsMakingOffer] = useState<boolean>(false);
  const [offerVal, setOfferVal] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentConv = conversations.find((c) => c.id === activeConversationId) || conversations[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConv?.messages, isTyping]);

  if (!isChatDrawerOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !currentConv) return;
    
    sendMessage(currentConv.id, inputMessage.trim());
    setInputMessage('');
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2200);
  };

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(offerVal);
    if (!amount || amount <= 0 || !currentConv) return;

    sendMessage(
      currentConv.id,
      `Salam ! Je vous propose ${amount.toLocaleString()} DZD pour "${currentConv.itemTitle}".`,
      true,
      amount
    );
    setOfferVal('');
    setIsMakingOffer(false);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2200);
  };

  const handleQuickChip = (chip: string) => {
    if (!currentConv) return;
    sendMessage(currentConv.id, chip);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2200);
  };

  const currentItem = items.find((i) => i.id === currentConv?.itemId);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-neutral-200 animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/80">
          <div className="flex items-center gap-3">
            {conversations.length > 1 && (
              <select
                value={currentConv?.id}
                onChange={(e) => setActiveConversationId(e.target.value)}
                className="text-xs font-semibold bg-white border border-neutral-300 rounded-lg px-2 py-1 outline-none max-w-[140px] truncate"
              >
                {conversations.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.otherUserName}
                  </option>
                ))}
              </select>
            )}

            {currentConv && (
              <div className="flex items-center gap-2.5">
                <img
                  src={currentConv.otherUserAvatar}
                  alt={currentConv.otherUserName}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full object-cover border border-neutral-200"
                />
                <div>
                  <div className="text-xs font-bold text-neutral-900 leading-tight">
                    {currentConv.otherUserName}
                  </div>
                  <div className="text-[10px] text-neutral-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block" />
                    <span>En ligne · Wilaya 51</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsChatDrawerOpen(false)}
              className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Item Summary Banner in Chat */}
        {currentConv && (
          <div className="p-3 bg-neutral-100/70 border-b border-neutral-200 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={currentConv.itemImage}
                alt={currentConv.itemTitle}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-md object-cover bg-neutral-200 shrink-0"
              />
              <div className="min-w-0">
                <div className="font-semibold text-neutral-900 truncate">
                  {currentConv.itemTitle}
                </div>
                <div className="font-mono tabular-nums text-neutral-600 font-bold">
                  {currentConv.itemPrice.toLocaleString()} DZD
                </div>
              </div>
            </div>

            {currentItem && (
              <button
                onClick={() => {
                  setIsChatDrawerOpen(false);
                  openCheckout(currentItem);
                }}
                className="px-3 py-1.5 bg-amber-900 hover:bg-amber-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1 shrink-0 shadow-xs"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Commander</span>
              </button>
            )}
          </div>
        )}

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-neutral-50">
          
          <div className="text-center py-2">
            <span className="text-[11px] text-neutral-500 bg-white border border-neutral-200 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3 h-3 text-amber-800" />
              Échanges et offres protégés par le Séquestre Souq Ouled Djellal
            </span>
          </div>

          {currentConv?.messages.map((msg) => {
            const isMe = msg.senderId === currentUser.id;

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs ${
                    isMe
                      ? 'bg-neutral-900 text-white rounded-br-xs'
                      : 'bg-white text-neutral-900 border border-neutral-200 rounded-bl-xs shadow-xs'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                  {/* Render Offer Card if message is an offer */}
                  {msg.isOffer && msg.offerAmount && (
                    <div
                      className={`mt-2.5 p-2.5 rounded-xl border text-xs space-y-2 ${
                        isMe
                          ? 'bg-neutral-800 border-neutral-700 text-neutral-100'
                          : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold">
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          <span>Offre de Prix Directe</span>
                        </span>
                        <span className="font-mono tabular-nums text-sm font-bold">
                          {msg.offerAmount.toLocaleString()} DZD
                        </span>
                      </div>

                      {/* Offer status or response buttons */}
                      {msg.offerStatus === 'pending' ? (
                        isMe ? (
                          <div className="text-[11px] text-neutral-300 italic">
                            En attente de la réponse du vendeur...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 pt-1">
                            <button
                              onClick={() => respondToOffer(currentConv.id, msg.id, 'accepted')}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md text-[11px] flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Accepter {msg.offerAmount.toLocaleString()} DZD</span>
                            </button>
                            <button
                              onClick={() => respondToOffer(currentConv.id, msg.id, 'declined')}
                              className="px-2 py-1 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 rounded-md text-[11px]"
                            >
                              Refuser
                            </button>
                          </div>
                        )
                      ) : msg.offerStatus === 'accepted' ? (
                        <div className="flex items-center justify-between text-emerald-600 font-semibold text-[11px]">
                          <span>Offre acceptée !</span>
                          {currentItem && (
                            <button
                              onClick={() => {
                                setIsChatDrawerOpen(false);
                                openCheckout(currentItem, msg.offerAmount);
                              }}
                              className="px-2 py-0.5 bg-amber-900 text-white rounded text-[10px] font-bold"
                            >
                              Régler @ {msg.offerAmount.toLocaleString()} DZD
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="text-neutral-400 text-[11px] italic">
                          Offre déclinée
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-neutral-400 font-mono px-1">
                  {msg.timestamp}
                </span>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-1.5 bg-white border border-neutral-200 px-3 py-2 rounded-xl text-neutral-400 text-xs w-fit shadow-xs">
              <span className="w-1.5 h-1.5 bg-amber-800 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-amber-800 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-amber-800 rounded-full animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px] ml-1 text-neutral-500">Le vendeur écrit...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2 border-t border-neutral-200 bg-white flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {QUICK_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickChip(chip)}
              className="text-[11px] text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors shrink-0"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Offer form toggle or Drawer Input */}
        <div className="p-3 border-t border-neutral-200 bg-white">
          {isMakingOffer ? (
            <form onSubmit={handleSendOffer} className="space-y-2 p-2 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-800">
                <span>Faire une offre de prix directe</span>
                <button
                  type="button"
                  onClick={() => setIsMakingOffer(false)}
                  className="text-neutral-400 hover:text-neutral-700 text-xs"
                >
                  Annuler
                </button>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="50"
                  min="50"
                  value={offerVal}
                  onChange={(e) => setOfferVal(e.target.value)}
                  placeholder="Montant proposé"
                  className="w-full text-xs font-mono px-3 py-1.5 bg-white border border-neutral-300 rounded-lg outline-none"
                  autoFocus
                />
                <span className="font-bold text-xs text-neutral-600 font-mono">DZD</span>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-amber-900 hover:bg-amber-800 text-white font-semibold text-xs rounded-lg whitespace-nowrap"
                >
                  Envoyer l'Offre
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMakingOffer(true)}
                className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors shrink-0"
                title="Faire une offre de prix"
              >
                <Tag className="w-4 h-4 text-amber-800" />
              </button>

              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Écrivez un message au vendeur (ou négociez)..."
                className="flex-1 text-xs bg-neutral-100 hover:bg-neutral-100/80 focus:bg-white focus:ring-1 focus:ring-neutral-900 px-3 py-2 rounded-lg outline-none transition-all"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-2 bg-amber-900 hover:bg-amber-800 disabled:opacity-40 text-white rounded-lg transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
