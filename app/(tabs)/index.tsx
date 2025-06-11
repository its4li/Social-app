import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Filter } from 'lucide-react-native';
import { useAuthStore } from '@/store/useAuthStore';
import ActivityItem from '@/components/ActivityItem';
import EmptyState from '@/components/EmptyState';
import ConnectCard from '@/components/ConnectCard';
import ConnectModal from '@/components/ConnectModal';
import { getAllActivities } from '@/mocks/activities';
import Colors from '@/constants/colors';

export default function ActivityScreen() {
  const router = useRouter();
  const { isXConnected, isWalletConnected, connectX, connectWallet } = useAuthStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'x' | 'wallet'>('x');
  const [filter, setFilter] = useState<'all' | 'x' | 'crypto'>('all');

  const activities = getAllActivities();
  
  const filteredActivities = activities.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'x') return 'handle' in item;
    if (filter === 'crypto') return 'currency' in item;
    return true;
  });

  const handleConnectPress = (type: 'x' | 'wallet') => {
    setModalType(type);
    setModalVisible(true);
  };

  const handleConnect = (value: string) => {
    if (modalType === 'x') {
      connectX(value);
    } else {
      connectWallet(value);
    }
  };

  const handleActivityPress = (item: any) => {
    if ('handle' in item) {
      // X activity
      router.push(`/activity/${item.id}?type=x`);
    } else {
      // Crypto activity
      router.push(`/activity/${item.id}?type=crypto`);
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerTitle}>Activity</Text>
        <Text style={styles.headerSubtitle}>Track your social and crypto activities</Text>
      </View>
      <TouchableOpacity 
        style={styles.filterButton}
        onPress={() => {
          setFilter(current => {
            if (current === 'all') return 'x';
            if (current === 'x') return 'crypto';
            return 'all';
          });
        }}
      >
        <Filter size={20} color={Colors.dark.text} />
        <Text style={styles.filterText}>
          {filter === 'all' ? 'All' : filter === 'x' ? 'X Only' : 'Crypto Only'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderConnectCards = () => (
    <View style={styles.connectCardsContainer}>
      <ConnectCard 
        type="x" 
        isConnected={isXConnected} 
        onPress={() => handleConnectPress('x')} 
      />
      <ConnectCard 
        type="wallet" 
        isConnected={isWalletConnected} 
        onPress={() => handleConnectPress('wallet')} 
      />
    </View>
  );

  const renderEmptyState = () => {
    if (!isXConnected && !isWalletConnected) {
      return (
        <EmptyState 
          title="No Accounts Connected"
          message="Connect your X account or crypto wallet to start tracking your activities."
          actionLabel="Connect Account"
          onAction={() => handleConnectPress('x')}
        />
      );
    }
    
    return (
      <EmptyState 
        title="No Activities Yet"
        message="Your activities will appear here once you start using your connected accounts."
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredActivities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ActivityItem item={item} onPress={() => handleActivityPress(item)} />
        )}
        ListHeaderComponent={
          <>
            {renderHeader()}
            {renderConnectCards()}
            {filteredActivities.length > 0 && (
              <Text style={styles.sectionTitle}>Recent Activity</Text>
            )}
          </>
        }
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContent}
      />
      
      <ConnectModal
        visible={modalVisible}
        type={modalType}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
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
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterText: {
    fontSize: 14,
    color: Colors.dark.text,
    marginLeft: 6,
  },
  connectCardsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },
});
