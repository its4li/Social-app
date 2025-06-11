import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Wallet } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface ConnectCardProps {
  type: 'x' | 'wallet';
  isConnected: boolean;
  onPress: () => void;
}

export default function ConnectCard({ type, isConnected, onPress }: ConnectCardProps) {
  const title = type === 'x' ? 'X Account' : 'Crypto Wallet';
  const description = isConnected 
    ? `Your ${type === 'x' ? 'X account' : 'wallet'} is connected` 
    : `Connect your ${type === 'x' ? 'X account' : 'crypto wallet'} to track activities`;
  
  const gradientColors = type === 'x' 
    ? ['#1DA1F2', '#0C85D0'] as const
    : [Colors.dark.primary, '#2A9E97'] as const;

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={isConnected ? gradientColors : ['#2A2A2D', '#232325'] as const}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.iconContainer}>
          {type === 'x' ? (
            <X size={24} color={isConnected ? '#FFFFFF' : Colors.dark.secondaryText} />
          ) : (
            <Wallet size={24} color={isConnected ? '#FFFFFF' : Colors.dark.secondaryText} />
          )}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.statusContainer}>
          <View style={[
            styles.statusIndicator, 
            { backgroundColor: isConnected ? Colors.dark.success : Colors.dark.inactive }
          ]} />
          <Text style={styles.statusText}>
            {isConnected ? 'Connected' : 'Not Connected'}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gradient: {
    padding: 16,
    borderRadius: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  textContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: Colors.dark.secondaryText,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: Colors.dark.secondaryText,
  },
});
