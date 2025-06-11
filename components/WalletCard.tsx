import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Bitcoin, DollarSign, Sun, Coins } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { WalletData } from '@/types';

interface WalletCardProps {
  wallet: WalletData;
  onPress: () => void;
}

export default function WalletCard({ wallet, onPress }: WalletCardProps) {
  const renderIcon = () => {
    switch (wallet.icon) {
      case 'bitcoin':
        return <Bitcoin size={24} color="#F7931A" />;
      case 'ethereum':
        return <Coins size={24} color="#627EEA" />;
      case 'dollar-sign':
        return <DollarSign size={24} color="#2775CA" />;
      case 'sun':
        return <Sun size={24} color="#14F195" />;
      default:
        return <DollarSign size={24} color={Colors.dark.primary} />;
    }
  };

  const formatBalance = (balance: number) => {
    if (balance < 0.001) return balance.toFixed(6);
    if (balance < 1) return balance.toFixed(4);
    if (balance < 1000) return balance.toFixed(2);
    return balance.toLocaleString('en-US', { maximumFractionDigits: 2 });
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{wallet.name}</Text>
        <Text style={styles.address} numberOfLines={1}>
          {wallet.address.substring(0, 8)}...{wallet.address.substring(wallet.address.length - 6)}
        </Text>
      </View>
      <View style={styles.balanceContainer}>
        <Text style={styles.balance}>{formatBalance(wallet.balance)}</Text>
        <Text style={styles.currency}>{wallet.currency}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: Colors.dark.secondaryText,
  },
  balanceContainer: {
    alignItems: 'flex-end',
  },
  balance: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 2,
  },
  currency: {
    fontSize: 14,
    color: Colors.dark.secondaryText,
  },
});
