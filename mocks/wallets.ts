import { WalletData } from '@/types';

export const wallets: WalletData[] = [
  {
    id: '1',
    name: 'Main Wallet',
    address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    balance: 1.245,
    currency: 'ETH',
    icon: 'ethereum',
    lastActivity: '2025-06-09T14:32:21Z',
  },
  {
    id: '2',
    name: 'Savings',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    balance: 0.078,
    currency: 'BTC',
    icon: 'bitcoin',
    lastActivity: '2025-06-08T09:15:43Z',
  },
  {
    id: '3',
    name: 'Trading',
    address: '0x3fFC03F3730b7925306Fc9a6b63C81df3a28128c',
    balance: 2580,
    currency: 'USDC',
    icon: 'dollar-sign',
    lastActivity: '2025-06-10T11:05:17Z',
  },
  {
    id: '4',
    name: 'Staking',
    address: '0x8B3392483BA26D65E331dB86D4F430E9B3814E5a',
    balance: 145.32,
    currency: 'SOL',
    icon: 'sun',
    lastActivity: '2025-06-07T18:22:09Z',
  }
];
