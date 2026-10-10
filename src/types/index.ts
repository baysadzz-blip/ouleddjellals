export type ItemCondition = 'Handcrafted' | 'Brand New' | 'Like New' | 'Good';
export type DeliveryType = 'local_pickup' | 'neighborhood_courier' | 'same_day_dropoff';

export interface UserReview {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole: 'buyer' | 'seller';
  targetId: string; // itemId or storeId or userId
  rating: number; // 1-5
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  attributes: {
    communication: number;
    accuracy: number;
    punctuality: number;
  };
}

export interface Store {
  id: string;
  name: string;
  tagline: string;
  neighborhood: string;
  address: string;
  distanceMiles: number;
  image: string;
  rating: number;
  reviewCount: number;
  verifiedLocal: boolean;
  ownerName: string;
  ownerAvatar: string;
  establishedYear: number;
  openingHours: string;
  category: string;
  totalSales: number;
  bio: string;
  responseRate: string;
}

export interface Item {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  category: string;
  condition: ItemCondition;
  image: string;
  additionalImages?: string[];
  description: string;
  neighborhood: string;
  distanceMiles: number;
  storeId?: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  sellerRating: number;
  stock: number;
  deliveryOptions: DeliveryType[];
  pickupAddress: string;
  featured?: boolean;
  createdAt: string;
  viewsCount: number;
  savesCount: number;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isOffer?: boolean;
  offerAmount?: number;
  offerStatus?: 'pending' | 'accepted' | 'declined';
}

export interface Conversation {
  id: string;
  itemId: string;
  itemTitle: string;
  itemImage: string;
  itemPrice: number;
  otherUserId: string;
  otherUserName: string;
  otherUserAvatar: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface Order {
  id: string;
  itemId: string;
  itemTitle: string;
  itemImage: string;
  itemPrice: number;
  quantity: number;
  totalAmount: number;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  status: 'escrow_held' | 'preparing' | 'ready_for_pickup' | 'completed' | 'cancelled';
  deliveryType: DeliveryType;
  pickupVerificationCode: string;
  createdAt: string;
  paymentMethod: 'baridimob' | 'edahabia_cib' | 'local_wallet' | 'cash_on_pickup';
  pickupAddress: string;
  hasBuyerReviewed?: boolean;
  hasSellerReviewed?: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'order' | 'chat' | 'offer' | 'price_drop' | 'system';
  read: boolean;
  actionId?: string;
  actionType?: 'open_order' | 'open_chat';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  neighborhood: string;
  isSeller: boolean;
  storeId?: string;
  twoFactorEnabled: boolean;
  walletBalance: number;
  rating: number;
  reviewsCount: number;
  joinedDate: string;
}

export interface NeighborhoodLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  activeStoresCount: number;
  activeItemsCount: number;
}
