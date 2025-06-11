import { XActivity, CryptoActivity } from '@/types';

export const xActivities: XActivity[] = [
  {
    id: 'x1',
    type: 'like',
    username: 'Vitalik Buterin',
    handle: 'vitalikbuterin',
    avatar: 'https://images.unsplash.com/photo-1602992708529-c9fdb12905c9?q=80&w=100&auto=format&fit=crop',
    content: "Excited about the latest Ethereum upgrade! The future of decentralized applications is looking brighter than ever.",
    timestamp: '2025-06-10T10:23:15Z'
  },
  {
    id: 'x2',
    type: 'retweet',
    username: 'CryptoNews',
    handle: 'cryptonews',
    avatar: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=100&auto=format&fit=crop',
    content: "Breaking: Bitcoin reaches new all-time high as institutional adoption continues to grow.",
    timestamp: '2025-06-09T15:45:22Z'
  },
  {
    id: 'x3',
    type: 'mention',
    username: 'Web3 Developer',
    handle: 'web3dev',
    avatar: 'https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?q=80&w=100&auto=format&fit=crop',
    content: "@user Check out this new DeFi protocol I've been working on. Would love your thoughts!",
    timestamp: '2025-06-08T21:12:05Z'
  },
  {
    id: 'x4',
    type: 'reply',
    username: 'Crypto Analyst',
    handle: 'cryptoanalyst',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop',
    content: "I agree with your analysis on the market trends. The correlation between traditional finance and crypto is becoming more evident.",
    timestamp: '2025-06-07T18:33:41Z'
  }
];

export const cryptoActivities: CryptoActivity[] = [
  {
    id: 'c1',
    type: 'receive',
    amount: 0.5,
    currency: 'ETH',
    timestamp: '2025-06-10T09:15:30Z',
    address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    status: 'completed'
  },
  {
    id: 'c2',
    type: 'send',
    amount: 0.025,
    currency: 'BTC',
    timestamp: '2025-06-09T14:22:10Z',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    fee: 0.0005,
    status: 'completed'
  },
  {
    id: 'c3',
    type: 'swap',
    amount: 500,
    currency: 'USDC',
    timestamp: '2025-06-08T11:45:22Z',
    address: '0x3fFC03F3730b7925306Fc9a6b63C81df3a28128c',
    fee: 2.5,
    status: 'completed'
  },
  {
    id: 'c4',
    type: 'send',
    amount: 25,
    currency: 'SOL',
    timestamp: '2025-06-07T16:30:45Z',
    address: '0x8B3392483BA26D65E331dB86D4F430E9B3814E5a',
    fee: 0.01,
    status: 'pending'
  }
];

export const getAllActivities = () => {
  const xItems = xActivities.map(item => ({ ...item, source: 'x' }));
  const cryptoItems = cryptoActivities.map(item => ({ ...item, source: 'crypto' }));
  
  return [...xItems, ...cryptoItems].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};
