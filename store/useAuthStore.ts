import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isXConnected: boolean;
  isWalletConnected: boolean;
  xUsername: string | null;
  walletAddresses: string[];
  connectX: (username: string) => void;
  disconnectX: () => void;
  connectWallet: (address: string) => void;
  disconnectWallet: (address: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isXConnected: false,
      isWalletConnected: false,
      xUsername: null,
      walletAddresses: [],
      
      connectX: (username) => set({ 
        isXConnected: true, 
        xUsername: username 
      }),
      
      disconnectX: () => set({ 
        isXConnected: false, 
        xUsername: null 
      }),
      
      connectWallet: (address) => set((state) => {
        const updatedAddresses = [...state.walletAddresses, address];
        return { 
          isWalletConnected: true, 
          walletAddresses: updatedAddresses 
        };
      }),
      
      disconnectWallet: (address) => set((state) => {
        const updatedAddresses = state.walletAddresses.filter(addr => addr !== address);
        return { 
          isWalletConnected: updatedAddresses.length > 0, 
          walletAddresses: updatedAddresses 
        };
      }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
