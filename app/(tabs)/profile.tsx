import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { LogOut, ChevronRight, Bell, Shield, Moon, HelpCircle, X, Wallet } from 'lucide-react-native';
import { useAuthStore } from '@/store/useAuthStore';
import ConnectModal from '@/components/ConnectModal';
import Colors from '@/constants/colors';

export default function ProfileScreen() {
  const { 
    isXConnected, 
    isWalletConnected, 
    xUsername, 
    connectX, 
    disconnectX, 
    connectWallet, 
    disconnectWallet 
  } = useAuthStore();
  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'x' | 'wallet'>('x');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
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

  const handleDisconnect = (type: 'x' | 'wallet') => {
    if (type === 'x') {
      disconnectX();
    } else {
      // For simplicity, we'll disconnect all wallets
      disconnectWallet('all');
    }
  };

  const renderProfileHeader = () => (
    <View style={styles.profileHeader}>
      <Image
        source={{ uri: isXConnected 
          ? `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop` 
          : 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=200&auto=format&fit=crop'
        }}
        style={styles.profileImage}
        contentFit="cover"
      />
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>
          {isXConnected ? `@${xUsername}` : 'Guest User'}
        </Text>
        <Text style={styles.profileSubtitle}>
          {isXConnected && isWalletConnected 
            ? 'X & Wallet Connected' 
            : isXConnected 
              ? 'X Connected' 
              : isWalletConnected 
                ? 'Wallet Connected' 
                : 'No accounts connected'
          }
        </Text>
      </View>
    </View>
  );

  const renderConnections = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Connections</Text>
      
      <View style={styles.card}>
        <View style={styles.connectionItem}>
          <View style={styles.connectionLeft}>
            <View style={styles.iconContainer}>
              <X size={20} color="#1DA1F2" />
            </View>
            <View>
              <Text style={styles.connectionTitle}>X Account</Text>
              <Text style={styles.connectionSubtitle}>
                {isXConnected ? `@${xUsername}` : 'Not connected'}
              </Text>
            </View>
          </View>
          
          {isXConnected ? (
            <TouchableOpacity 
              style={styles.disconnectButton}
              onPress={() => handleDisconnect('x')}
            >
              <Text style={styles.disconnectText}>Disconnect</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.connectButton}
              onPress={() => handleConnectPress('x')}
            >
              <Text style={styles.connectText}>Connect</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.connectionItem}>
          <View style={styles.connectionLeft}>
            <View style={styles.iconContainer}>
              <Wallet size={20} color={Colors.dark.primary} />
            </View>
            <View>
              <Text style={styles.connectionTitle}>Crypto Wallet</Text>
              <Text style={styles.connectionSubtitle}>
                {isWalletConnected ? 'Connected' : 'Not connected'}
              </Text>
            </View>
          </View>
          
          {isWalletConnected ? (
            <TouchableOpacity 
              style={styles.disconnectButton}
              onPress={() => handleDisconnect('wallet')}
            >
              <Text style={styles.disconnectText}>Disconnect</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.connectButton}
              onPress={() => handleConnectPress('wallet')}
            >
              <Text style={styles.connectText}>Connect</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  const renderSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Settings</Text>
      
      <View style={styles.card}>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(255, 193, 7, 0.1)' }]}>
              <Bell size={20} color="#FFC107" />
            </View>
            <Text style={styles.settingTitle}>Notifications</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: Colors.dark.inactive, true: Colors.dark.primary }}
            thumbColor={Colors.dark.text}
          />
        </View>
        
        <View style={styles.divider} />
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(76, 175, 80, 0.1)' }]}>
              <Shield size={20} color="#4CAF50" />
            </View>
            <Text style={styles.settingTitle}>Security</Text>
          </View>
          <ChevronRight size={20} color={Colors.dark.secondaryText} />
        </TouchableOpacity>
        
        <View style={styles.divider} />
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(108, 99, 255, 0.1)' }]}>
              <Moon size={20} color="#6C63FF" />
            </View>
            <Text style={styles.settingTitle}>Appearance</Text>
          </View>
          <ChevronRight size={20} color={Colors.dark.secondaryText} />
        </TouchableOpacity>
        
        <View style={styles.divider} />
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(78, 205, 196, 0.1)' }]}>
              <HelpCircle size={20} color="#4ECDC4" />
            </View>
            <Text style={styles.settingTitle}>Help & Support</Text>
          </View>
          <ChevronRight size={20} color={Colors.dark.secondaryText} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderLogout = () => (
    <TouchableOpacity style={styles.logoutButton}>
      <LogOut size={20} color={Colors.dark.error} />
      <Text style={styles.logoutText}>Log Out</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderProfileHeader()}
        {renderConnections()}
        {renderSettings()}
        {renderLogout()}
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
      
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
  scrollContent: {
    padding: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.dark.inactive,
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  profileSubtitle: {
    fontSize: 16,
    color: Colors.dark.secondaryText,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 12,
  },
  card: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    overflow: 'hidden',
  },
  connectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  connectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  connectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 2,
  },
  connectionSubtitle: {
    fontSize: 14,
    color: Colors.dark.secondaryText,
  },
  connectButton: {
    backgroundColor: Colors.dark.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  connectText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  disconnectButton: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  disconnectText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark.error,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.dark.border,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.dark.text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.error,
    marginLeft: 8,
  },
  versionText: {
    fontSize: 14,
    color: Colors.dark.secondaryText,
    textAlign: 'center',
  },
});
