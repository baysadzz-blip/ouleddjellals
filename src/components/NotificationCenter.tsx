import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Bell,
  Package,
  MessageSquare,
  Tag
} from 'lucide-react';

export const NotificationCenter: React.FC = () => {
  const {
    isNotificationOpen,
    setIsNotificationOpen,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setCurrentView,
    setIsChatDrawerOpen,
    setActiveConversationId
  } = useApp();

  const [pushEnabled, setPushEnabled] = useState<boolean>(true);

  if (!isNotificationOpen) return null;

  const handleActionClick = (notif: any) => {
    markNotificationAsRead(notif.id);
    setIsNotificationOpen(false);

    if (notif.actionType === 'open_order') {
      setCurrentView('orders');
    } else if (notif.actionType === 'open_chat') {
      if (notif.actionId) setActiveConversationId(notif.actionId);
      setIsChatDrawerOpen(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col border-l border-neutral-200 animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/80">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-900" />
            <h3 className="font-display text-sm font-bold text-neutral-900">
              Centre de Notifications Push
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsAsRead}
              className="text-[11px] text-neutral-500 hover:text-neutral-900"
            >
              Tout marquer lu
            </button>
            <button
              onClick={() => setIsNotificationOpen(false)}
              className="p-1 text-neutral-400 hover:text-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Push Notification System Status Banner */}
        <div className="p-3 bg-neutral-100/70 border-b border-neutral-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${pushEnabled ? 'bg-emerald-500' : 'bg-neutral-400'}`} />
            <span className="font-medium text-neutral-700">
              {pushEnabled ? 'Flux Push Actif' : 'Alertes en sourdine'}
            </span>
          </div>
          <button
            onClick={() => setPushEnabled(!pushEnabled)}
            className="text-[11px] text-amber-900 hover:underline font-medium"
          >
            {pushEnabled ? 'Désactiver' : 'Activer'}
          </button>
        </div>

        {/* Notification Feed */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-neutral-50">
          {notifications.length === 0 ? (
            <div className="py-16 text-center text-xs text-neutral-400">
              Aucune notification pour le moment.
            </div>
          ) : (
            notifications.map((notif) => {
              const Icon =
                notif.type === 'order'
                  ? Package
                  : notif.type === 'chat'
                  ? MessageSquare
                  : Tag;

              return (
                <div
                  key={notif.id}
                  onClick={() => handleActionClick(notif)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    notif.read
                      ? 'bg-white border-neutral-200 text-neutral-600'
                      : 'bg-amber-50/70 border-amber-200 text-neutral-900 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`p-2 rounded-lg shrink-0 ${
                        notif.read ? 'bg-neutral-100 text-neutral-500' : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-semibold truncate">{notif.title}</span>
                        <span className="text-[10px] text-neutral-400 font-mono shrink-0">
                          {notif.timestamp}
                        </span>
                      </div>
                      <p className="text-neutral-600 leading-relaxed text-[11px]">{notif.message}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
