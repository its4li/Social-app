export interface WalletData {
  id: string;
  name: string;
  address: string;
  balance: number;
  currency: string;
  icon: string;
  lastActivity: string;
}

export interface XActivity {
  id: string;
  type: 'like' | 'retweet' | 'reply' | 'mention';
  username: string;
  handle: string;
  avatar: string;
  content: string;
  timestamp: string;
}

export interface CryptoActivity {
  id: string;
  type: 'send' | 'receive' | 'swap';
  amount: number;
  currency: string;
  timestamp: string;
  address: string;
  fee?: number;
  status: 'completed' | 'pending' | 'failed';
}

export type ActivityItem = XActivity | CryptoActivity;
