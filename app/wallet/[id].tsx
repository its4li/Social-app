import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ArrowUpRight, ArrowDownLeft, RefreshCw, Clock, ExternalLink } from 'lucide-react-native';
import { wallets } from '@/mocks/wallets';
import { cryptoActivities } from '@/mocks/activities';
import Colors from '@/constants/colors';

export default function WalletDetailScreen() {
  const { id } = useLocalSearchParams();
  const wallet = wallets.find(w => w.id === id);
  
  if (!wallet) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Wallet not found</Text>
      </View>
    );
  }

  // Filter activities for this wallet
  const walletActivities = cryptoActivities
    .filter(activity => activity.address === wallet.address)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const renderWalletHeader = () => (
    <View style={styles.walletHeader}>
      <Text style={styles.walletName}>{wallet.name}</Text>
      <Text style={styles.walletAddress} numberOfLines={1}>
        {wallet.address.substring(0, 10)}...{wallet.address.substring(wallet.address.length - 6)}
      </Text>
      
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Balance</Text>
        <Text style={styles.balanceValue}>
          {wallet.balance} <Text style={styles.currencyText}>{wallet.currency}</Text>
        </Text>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <ArrowUpRight size={20} color={Colors.dark.text} />
          <Text style={styles.actionText}>Send</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <ArrowDownLeft size={20} color={Colors.dark.text} />
          <Text style={styles.actionText}>Receive</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <RefreshCw size={20} color={Colors.dark.text} />
          <Text style={styles.actionText}>Swap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTransactionItem = (activity: typeof cryptoActivities[0]) => {
    const getIcon = () => {
      switch (activity.type) {
        case 'send':
          return <ArrowUpRight size={20} color={Colors.dark.error} />;
        case 'receive':
          return <ArrowDownLeft size={20} color={Colors.dark.success} />;
        case 'swap':
          return <RefreshCw size={20} color={Colors.dark.warning} />;
        default:
          return null;
      }
    };

    const formatDate = (timestamp: string) => {
      const date = new Date(timestamp);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    return (
      <View style={styles.transactionItem} key={activity.id}>
        <View style={styles.transactionIconContainer}>
          {getIcon()}
        </View>
        
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionType}>
            {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
          </Text>
          <Text style={styles.transactionDate}>
            {formatDate(activity.timestamp)}
          </Text>
        </View>
        
        <View style={styles.transactionAmount}>
          <Text style={[
            styles.amountText,
            activity.type === 'send' ? styles.negativeAmount : styles.positiveAmount
          ]}>
            {activity.type === 'send' ? '-' : activity.type === 'receive' ? '+' : ''}
            {activity.amount} {activity.currency}
          </Text>
          {activity.fee && (
            <Text style={styles.feeText}>Fee: {activity.fee} {activity.currency}</Text>
          )}
        </View>
      </View>
    );
  };

  const renderTransactions = () => (
    <View style={styles.transactionsContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Transactions</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
          <ExternalLink size={16} color={Colors.dark.primary} />
        </TouchableOpacity>
      </View>
      
      {walletActivities.length > 0 ? (
        walletActivities.map(renderTransactionItem)
      ) : (
        <View style={styles.emptyTransactions}>
          <Clock size={32} color={Colors.dark.secondaryText} />
          <Text style={styles.emptyTitle}>No Transactions Yet</Text>
          <Text style={styles.emptyMessage}>
            Your transactions will appear here once you start using this wallet.
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {renderWalletHeader()}
      {renderTransactions()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    padding: 16,
  },
  errorText: {
    fontSize: 18,
    color: Colors.dark.error,
    textAlign: 'center',
    marginTop: 24,
  },
  walletHeader: {
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  walletName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  walletAddress: {
    fontSize: 14,
    color: Colors.dark.secondaryText,
    marginBottom: 24,
  },
  balanceContainer: {
    marginBottom: 24,
  },
  balanceLabel: {
    fontSize: 16,
    color: Colors.dark.secondaryText,
    marginBottom: 4,
  },
  balanceValue: {
    fontSize: 36,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  currencyText: {
    fontSize: 24,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: Colors.dark.primary,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark.text,
    marginTop: 6,
  },
  transactionsContainer: {
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.dark.primary,
    marginRight: 4,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  transactionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.dark.text,
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 14,
    color: Colors.dark.secondaryText,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  positiveAmount: {
    color: Colors.dark.success,
  },
  negativeAmount: {
    color: Colors.dark.error,
  },
  feeText: {
    fontSize: 12,
    color: Colors.dark.secondaryText,
  },
  emptyTransactions: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: Colors.dark.secondaryText,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});
