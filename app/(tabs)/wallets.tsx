import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/useAuthStore';
import WalletCard from '@/components/WalletCard';
import EmptyState from '@/components/EmptyState';
import ConnectModal from '@/components/ConnectModal';
import { wallets } from '@/mocks/wallets';
import Colors from '@/constants/colors';

export default function WalletsScreen() {
  const router = useRouter();
  const { isWalletConnected, connectWallet } = useAuthStore();
  const [modalVisible, setModalVisible] = useState(false);

  const handleWalletPress = (id: string) => {
    router.push(`/wallet/${id}`);
  };

  const handleConnect = (address: string) => {
    connectWallet(address);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Wallets</Text>
      <Text style={styles.headerSubtitle}>Manage your crypto wallets</Text>
    </View>
  );

  const renderEmptyState = () => (
    <EmptyState 
      title="No Wallets Connected"
      message="Connect your crypto wallet to track your balances and transactions."
      actionLabel="Connect Wallet"
      onAction={() => setModalVisible(true)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={isWalletConnected ? wallets : []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WalletCard wallet={item} onPress={() => handleWalletPress(item.id)} />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContent}
      />
      
      <ConnectModal
        visible={modalVisible}
        type="wallet"
        onClose={() => setModalVisible(false)}
        onConnect={handleConnect}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.dark.secondaryText,
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
});
