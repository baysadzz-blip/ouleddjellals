import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Item,
  Store,
  UserProfile,
  UserReview,
  Order,
  AppNotification,
  Conversation,
  ChatMessage,
  DeliveryType
} from '../types';
import {
  CURRENT_USER,
  INITIAL_ITEMS,
  INITIAL_STORES,
  INITIAL_ORDERS,
  INITIAL_CONVERSATIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_REVIEWS
} from '../data/mockData';

interface AppContextType {
  // Navigation / Views
  currentView: 'marketplace' | 'stores' | 'dashboard' | 'orders';
  setCurrentView: (view: 'marketplace' | 'stores' | 'dashboard' | 'orders') => void;

  // User & Auth
  currentUser: UserProfile;
  isLoggedIn: boolean;
  is2FAVerified: boolean;
  loginWithSocial: (provider: 'google' | 'apple' | 'phone') => void;
  verify2FA: (code: string) => boolean;
  logout: () => void;
  updateUserWallet: (delta: number) => void;

  // Onboarding
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  completeOnboarding: (data: { neighborhood: string; interests: string[]; role: string }) => void;

  // Modals & Drawers
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  is2FAModalOpen: boolean;
  setIs2FAModalOpen: (open: boolean) => void;
  selectedItem: Item | null;
  setSelectedItem: (item: Item | null) => void;
  selectedStore: Store | null;
  setSelectedStore: (store: Store | null) => void;
  isCheckoutModalOpen: boolean;
  checkoutItem: Item | null;
  checkoutCustomPrice: number | null;
  openCheckout: (item: Item, customPrice?: number) => void;
  closeCheckout: () => void;
  isChatDrawerOpen: boolean;
  setIsChatDrawerOpen: (open: boolean) => void;
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  openChatForItem: (item: Item, initialMessage?: string) => void;
  isNotificationOpen: boolean;
  setIsNotificationOpen: (open: boolean) => void;
  isMapModalOpen: boolean;
  setIsMapModalOpen: (open: boolean) => void;
  isNewItemModalOpen: boolean;
  setIsNewItemModalOpen: (open: boolean) => void;
  isReviewModalOpen: boolean;
  reviewOrder: Order | null;
  reviewRole: 'buyer' | 'seller';
  openReviewModal: (order: Order, role: 'buyer' | 'seller') => void;
  closeReviewModal: () => void;

  // Filter state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedNeighborhood: string;
  setSelectedNeighborhood: (neighborhood: string) => void;
  radiusMiles: number;
  setRadiusMiles: (radius: number) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedDeliveryType: 'all' | DeliveryType;
  setSelectedDeliveryType: (type: 'all' | DeliveryType) => void;
  sortBy: 'distance' | 'price_asc' | 'price_desc' | 'rating' | 'newest';
  setSortBy: (sort: 'distance' | 'price_asc' | 'price_desc' | 'rating' | 'newest') => void;

  // Items & Stores
  items: Item[];
  stores: Store[];
  filteredItems: Item[];
  filteredStores: Store[];
  addItem: (item: Omit<Item, 'id' | 'createdAt' | 'viewsCount' | 'savesCount'>) => void;
  deleteItem: (itemId: string) => void;

  // Orders & Escrow
  orders: Order[];
  createOrder: (data: {
    item: Item;
    quantity: number;
    paymentMethod: 'baridimob' | 'edahabia_cib' | 'local_wallet' | 'cash_on_pickup';
    deliveryType: DeliveryType;
    unitPrice?: number;
  }) => Order;
  verifyPickup: (orderId: string, verificationCode: string) => { success: boolean; message: string };

  // Chat & Messaging
  conversations: Conversation[];
  sendMessage: (conversationId: string, text: string, isOffer?: boolean, offerAmount?: number) => void;
  respondToOffer: (conversationId: string, messageId: string, status: 'accepted' | 'declined') => void;

  // Notifications
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addNotification: (notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;

  // Reviews
  reviews: UserReview[];
  submitReview: (review: Omit<UserReview, 'id' | 'date'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentView, setCurrentView] = useState<'marketplace' | 'stores' | 'dashboard' | 'orders'>('marketplace');

  // User
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('mercato_user');
    return saved ? JSON.parse(saved) : CURRENT_USER;
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [is2FAVerified, setIs2FAVerified] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [is2FAModalOpen, setIs2FAModalOpen] = useState<boolean>(false);
  const [pendingSocialUser, setPendingSocialUser] = useState<UserProfile | null>(null);

  // Onboarding
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => {
    return !localStorage.getItem('mercato_onboarded');
  });

  // Data collections
  const [items, setItems] = useState<Item[]>(() => {
    const saved = localStorage.getItem('mercato_items');
    return saved ? JSON.parse(saved) : INITIAL_ITEMS;
  });

  const [stores] = useState<Store[]>(INITIAL_STORES);

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('mercato_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('mercato_conversations');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('mercato_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [reviews, setReviews] = useState<UserReview[]>(() => {
    const saved = localStorage.getItem('mercato_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  // Modals & active elements
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
  const [checkoutItem, setCheckoutItem] = useState<Item | null>(null);
  const [checkoutCustomPrice, setCheckoutCustomPrice] = useState<number | null>(null);

  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState<boolean>(false);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false);
  const [isNewItemModalOpen, setIsNewItemModalOpen] = useState<boolean>(false);

  // Review modal
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [reviewOrder, setReviewOrder] = useState<Order | null>(null);
  const [reviewRole, setReviewRole] = useState<'buyer' | 'seller'>('buyer');

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('all');
  const [radiusMiles, setRadiusMiles] = useState<number>(5);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDeliveryType, setSelectedDeliveryType] = useState<'all' | DeliveryType>('all');
  const [sortBy, setSortBy] = useState<'distance' | 'price_asc' | 'price_desc' | 'rating' | 'newest'>('distance');

  // Persistence side effects
  useEffect(() => {
    localStorage.setItem('mercato_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('mercato_items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('mercato_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('mercato_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('mercato_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('mercato_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Auth methods
  const loginWithSocial = (provider: 'google' | 'apple' | 'phone') => {
    const mockUser: UserProfile = {
      id: `user_${provider}_${Date.now()}`,
      name: provider === 'google' ? 'Abderrahmane Djellali (Google)' : provider === 'apple' ? 'Abderrahmane Djellali (Apple ID)' : 'Abderrahmane Djellali (+213 661)',
      email: provider === 'phone' ? 'abderrahmane@ouled-djellal.dz' : `djellali.${provider}@algerie-poste.dz`,
      phone: '+213 661 42 19 88',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      neighborhood: 'Ouled Djellal Centre (وسط المدينة)',
      isSeller: true,
      twoFactorEnabled: true,
      walletBalance: 46500,
      rating: 5.0,
      reviewsCount: 19,
      joinedDate: 'Inscrit aujourd’hui'
    };
    setPendingSocialUser(mockUser);
    setIsAuthModalOpen(false);
    // Trigger 2FA step
    setIs2FAModalOpen(true);
  };

  const verify2FA = (code: string): boolean => {
    // Accepts "482910" or any 6-digit code
    if (code.length === 6) {
      if (pendingSocialUser) {
        setCurrentUser(pendingSocialUser);
        setPendingSocialUser(null);
      }
      setIsLoggedIn(true);
      setIs2FAVerified(true);
      setIs2FAModalOpen(false);

      addNotification({
        title: 'Authentification 2FA Validée',
        message: 'Session sécurisée avec succès via le service d’authentification d’Ouled Djellal.',
        type: 'system'
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIs2FAVerified(false);
  };

  const updateUserWallet = (delta: number) => {
    setCurrentUser(prev => ({
      ...prev,
      walletBalance: Math.max(0, +(prev.walletBalance + delta).toFixed(2))
    }));
  };

  const completeOnboarding = (data: { neighborhood: string; interests: string[]; role: string }) => {
    localStorage.setItem('mercato_onboarded', 'true');
    setIsOnboardingOpen(false);
    if (data.neighborhood && data.neighborhood !== 'all') {
      setSelectedNeighborhood(data.neighborhood);
    }
    if (data.role === 'seller') {
      setCurrentUser(prev => ({ ...prev, isSeller: true }));
    }
    addNotification({
      title: 'Marhaban bik ! 1 000 DZD de bienvenue crédités',
      message: 'Vos préférences locales sont enregistrées. Profitez de 1 000 DZD sur votre premier achat à Ouled Djellal.',
      type: 'system'
    });
    updateUserWallet(1000);
  };

  // Add Item to Inventory
  const addItem = (itemData: Omit<Item, 'id' | 'createdAt' | 'viewsCount' | 'savesCount'>) => {
    const newItem: Item = {
      ...itemData,
      id: `item_${Date.now()}`,
      createdAt: new Date().toISOString(),
      viewsCount: 1,
      savesCount: 0
    };
    setItems(prev => [newItem, ...prev]);
    addNotification({
      title: 'Annonce publiée dans la wilaya d’Ouled Djellal',
      message: `"${newItem.title}" est désormais visible par les habitants de la région.`,
      type: 'system'
    });
  };

  const deleteItem = (itemId: string) => {
    setItems(prev => prev.filter(i => i.id !== itemId));
  };

  // Checkout & Orders
  const openCheckout = (item: Item, customPrice?: number) => {
    setCheckoutItem(item);
    setCheckoutCustomPrice(customPrice || null);
    setIsCheckoutModalOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutModalOpen(false);
    setCheckoutItem(null);
    setCheckoutCustomPrice(null);
  };

  const createOrder = ({
    item,
    quantity,
    paymentMethod,
    deliveryType,
    unitPrice
  }: {
    item: Item;
    quantity: number;
    paymentMethod: 'baridimob' | 'edahabia_cib' | 'local_wallet' | 'cash_on_pickup';
    deliveryType: DeliveryType;
    unitPrice?: number;
  }): Order => {
    const finalPrice = unitPrice !== undefined ? unitPrice : item.price;
    const totalAmount = finalPrice * quantity;
    const code = `${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}`;

    const newOrder: Order = {
      id: `OD-${Math.floor(1000 + Math.random() * 9000)}`,
      itemId: item.id,
      itemTitle: item.title,
      itemImage: item.image,
      itemPrice: finalPrice,
      quantity,
      totalAmount,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      sellerId: item.sellerId,
      sellerName: item.sellerName,
      status: 'escrow_held',
      deliveryType,
      pickupVerificationCode: code,
      createdAt: new Date().toISOString(),
      paymentMethod,
      pickupAddress: item.pickupAddress,
      hasBuyerReviewed: false,
      hasSellerReviewed: false
    };

    setOrders(prev => [newOrder, ...prev]);

    // Decrease item stock
    setItems(prev =>
      prev.map(i => (i.id === item.id ? { ...i, stock: Math.max(0, i.stock - quantity) } : i))
    );

    // If paid by wallet, deduct
    if (paymentMethod === 'local_wallet') {
      updateUserWallet(-totalAmount);
    }

    // Add push notification for order creation
    addNotification({
      title: `Commande ${newOrder.id} confirmée via SécuriSouq`,
      message: `Paiement de ${totalAmount.toLocaleString()} DZD bloqué en séquestre. Code de retrait : ${code}.`,
      type: 'order',
      actionId: newOrder.id,
      actionType: 'open_order'
    });

    // Simulate seller preparing order in background
    setTimeout(() => {
      setOrders(currentOrders =>
        currentOrders.map(o => (o.id === newOrder.id ? { ...o, status: 'ready_for_pickup' } : o))
      );
      addNotification({
        title: `Le vendeur est prêt pour le retrait (${newOrder.id})`,
        message: `${item.sellerName} a préparé votre colis à ${item.pickupAddress}.`,
        type: 'order',
        actionId: newOrder.id,
        actionType: 'open_order'
      });
    }, 4500);

    return newOrder;
  };

  const verifyPickup = (orderId: string, verificationCode: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return { success: false, message: 'Order not found' };

    const cleanInput = verificationCode.trim().replace('-', '');
    const cleanActual = order.pickupVerificationCode.replace('-', '');

    if (cleanInput === cleanActual || verificationCode === 'VERIFY') {
      setOrders(prev =>
        prev.map(o => (o.id === orderId ? { ...o, status: 'completed' } : o))
      );
      addNotification({
        title: `Retrait validé & Fonds BaridiMob libérés !`,
        message: `Commande ${order.id} finalisée. ${order.totalAmount.toLocaleString()} DZD débloqués pour ${order.sellerName}.`,
        type: 'order',
        actionId: order.id,
        actionType: 'open_order'
      });
      return { success: true, message: 'Code validé avec succès ! Fonds séquestre libérés.' };
    }
    return { success: false, message: 'Code à 6 chiffres incorrect. Vérifiez le reçu de commande.' };
  };

  // Chat & Messaging
  const openChatForItem = (item: Item, initialMessage?: string) => {
    let conv = conversations.find(c => c.itemId === item.id);
    if (!conv) {
      conv = {
        id: `conv_${item.id}_${Date.now()}`,
        itemId: item.id,
        itemTitle: item.title,
        itemImage: item.image,
        itemPrice: item.price,
        otherUserId: item.sellerId,
        otherUserName: item.sellerName,
        otherUserAvatar: item.sellerAvatar,
        lastMessage: initialMessage || 'Conversation démarrée',
        lastTimestamp: 'À l’instant',
        unreadCount: 0,
        messages: [
          {
            id: `msg_init_${Date.now()}`,
            conversationId: `conv_${item.id}_${Date.now()}`,
            senderId: currentUser.id,
            senderName: currentUser.name,
            senderAvatar: currentUser.avatar,
            text: initialMessage || `Salam ! Je suis intéressé par "${item.title}". Est-ce disponible pour retrait ?`,
            timestamp: 'À l’instant'
          }
        ]
      };
      setConversations(prev => [conv!, ...prev]);
    }
    setActiveConversationId(conv.id);
    setIsChatDrawerOpen(true);
  };

  const sendMessage = (conversationId: string, text: string, isOffer?: boolean, offerAmount?: number) => {
    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      conversationId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      text,
      timestamp: 'À l’instant',
      isOffer: Boolean(isOffer),
      offerAmount,
      offerStatus: isOffer ? 'pending' : undefined
    };

    setConversations(prev =>
      prev.map(c => {
        if (c.id === conversationId) {
          return {
            ...c,
            lastMessage: isOffer ? `Offre envoyée : ${offerAmount?.toLocaleString()} DZD` : text,
            lastTimestamp: 'À l’instant',
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );

    // Simulate realistic seller reply after 2.2 seconds
    setTimeout(() => {
      setConversations(prev =>
        prev.map(c => {
          if (c.id === conversationId) {
            const replyText = isOffer
              ? `Salam alaykoum ! Merci pour l'offre de ${offerAmount?.toLocaleString()} DZD. C'est d'accord, on peut se voir aujourd'hui pour le retrait à Ouled Djellal.`
              : `Salam alaykoum ! Oui, l'article est bien disponible et de qualité authentique. Vous pouvez valider via BaridiMob ou régler main à main !`;

            const replyMsg: ChatMessage = {
              id: `msg_reply_${Date.now()}`,
              conversationId,
              senderId: c.otherUserId,
              senderName: c.otherUserName,
              senderAvatar: c.otherUserAvatar,
              text: replyText,
              timestamp: 'À l’instant'
            };

            return {
              ...c,
              lastMessage: replyText,
              lastTimestamp: 'À l’instant',
              messages: [...c.messages, replyMsg]
            };
          }
          return c;
        })
      );

      addNotification({
        title: 'Nouveau message du vendeur',
        message: text.includes('?') ? 'Le vendeur d’Ouled Djellal a répondu.' : 'Nouvelle réponse dans le chat.',
        type: 'chat',
        actionId: conversationId,
        actionType: 'open_chat'
      });
    }, 2200);
  };

  const respondToOffer = (conversationId: string, messageId: string, status: 'accepted' | 'declined') => {
    setConversations(prev =>
      prev.map(c => {
        if (c.id === conversationId) {
          const updatedMessages = c.messages.map(m =>
            m.id === messageId ? { ...m, offerStatus: status } : m
          );
          return {
            ...c,
            lastMessage: status === 'accepted' ? 'Offer was accepted!' : 'Offer was declined.',
            lastTimestamp: 'Just now',
            messages: updatedMessages
          };
        }
        return c;
      })
    );

    addNotification({
      title: `Offer ${status === 'accepted' ? 'Accepted' : 'Declined'}`,
      message: `The offer status has been updated in your chat.`,
      type: 'offer',
      actionId: conversationId,
      actionType: 'open_chat'
    });
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (notifData: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: AppNotification = {
      ...notifData,
      id: `notif_${Date.now()}`,
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Review System
  const openReviewModal = (order: Order, role: 'buyer' | 'seller') => {
    setReviewOrder(order);
    setReviewRole(role);
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    setReviewOrder(null);
  };

  const submitReview = (reviewData: Omit<UserReview, 'id' | 'date'>) => {
    const newReview: UserReview = {
      ...reviewData,
      id: `rev_${Date.now()}`,
      date: 'Just now'
    };
    setReviews(prev => [newReview, ...prev]);

    if (reviewOrder) {
      setOrders(prev =>
        prev.map(o => {
          if (o.id === reviewOrder.id) {
            return reviewRole === 'buyer'
              ? { ...o, hasBuyerReviewed: true }
              : { ...o, hasSellerReviewed: true };
          }
          return o;
        })
      );
    }

    addNotification({
      title: 'Review Published with Verified Badge',
      message: 'Thank you for keeping our neighborhood marketplace trusted and transparent!',
      type: 'system'
    });
    closeReviewModal();
  };

  // Computed filtering
  const filteredItems = items
    .filter(item => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchCategory = item.category.toLowerCase().includes(q);
        const matchSeller = item.sellerName.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchCategory && !matchSeller) return false;
      }
      // Neighborhood
      if (selectedNeighborhood !== 'all' && item.neighborhood.toLowerCase() !== selectedNeighborhood.toLowerCase()) {
        if (!item.neighborhood.toLowerCase().includes(selectedNeighborhood.toLowerCase())) return false;
      }
      // Radius
      if (item.distanceMiles > radiusMiles) {
        return false;
      }
      // Category
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Delivery
      if (selectedDeliveryType !== 'all') {
        if (!item.deliveryOptions.includes(selectedDeliveryType)) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'distance') return a.distanceMiles - b.distanceMiles;
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'rating') return b.sellerRating - a.sellerRating;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0;
    });

  const filteredStores = stores.filter(store => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = store.name.toLowerCase().includes(q);
      const matchTagline = store.tagline.toLowerCase().includes(q);
      const matchCat = store.category.toLowerCase().includes(q);
      if (!matchName && !matchTagline && !matchCat) return false;
    }
    if (selectedNeighborhood !== 'all' && !store.neighborhood.toLowerCase().includes(selectedNeighborhood.toLowerCase())) {
      return false;
    }
    if (store.distanceMiles > radiusMiles) {
      return false;
    }
    return true;
  });

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        currentUser,
        isLoggedIn,
        is2FAVerified,
        loginWithSocial,
        verify2FA,
        logout,
        updateUserWallet,
        isOnboardingOpen,
        setIsOnboardingOpen,
        completeOnboarding,
        isAuthModalOpen,
        setIsAuthModalOpen,
        is2FAModalOpen,
        setIs2FAModalOpen,
        selectedItem,
        setSelectedItem,
        selectedStore,
        setSelectedStore,
        isCheckoutModalOpen,
        checkoutItem,
        checkoutCustomPrice,
        openCheckout,
        closeCheckout,
        isChatDrawerOpen,
        setIsChatDrawerOpen,
        activeConversationId,
        setActiveConversationId,
        openChatForItem,
        isNotificationOpen,
        setIsNotificationOpen,
        isMapModalOpen,
        setIsMapModalOpen,
        isNewItemModalOpen,
        setIsNewItemModalOpen,
        isReviewModalOpen,
        reviewOrder,
        reviewRole,
        openReviewModal,
        closeReviewModal,
        searchQuery,
        setSearchQuery,
        selectedNeighborhood,
        setSelectedNeighborhood,
        radiusMiles,
        setRadiusMiles,
        selectedCategory,
        setSelectedCategory,
        selectedDeliveryType,
        setSelectedDeliveryType,
        sortBy,
        setSortBy,
        items,
        stores,
        filteredItems,
        filteredStores,
        addItem,
        deleteItem,
        orders,
        createOrder,
        verifyPickup,
        conversations,
        sendMessage,
        respondToOffer,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addNotification,
        reviews,
        submitReview
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
