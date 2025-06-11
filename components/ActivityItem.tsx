import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { ArrowUpRight, ArrowDownLeft, RefreshCw, Heart, Repeat, MessageCircle, AtSign } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { XActivity, CryptoActivity } from '@/types';

interface ActivityItemProps {
  item: any;
  onPress: () => void;
}

export default function ActivityItem({ item, onPress }: ActivityItemProps) {
  const isXActivity = 'handle' in item;
  
  const renderXActivityIcon = () => {
    switch (item.type) {
      case 'like':
        return <Heart size={16} color="#F91880" />;
      case 'retweet':
        return <Repeat size={16} color="#00BA7C" />;
      case 'reply':
        return <MessageCircle size={16} color="#1DA1F2" />;
      case 'mention':
        return <AtSign size={16} color="#794BC4" />;
      default:
        return null;
    }
  };

  const renderCryptoActivityIcon = () => {
    switch (item.type) {
      case 'send':
        return <ArrowUpRight size={16} color={Colors.dark.error} />;
      case 'receive':
        return <ArrowDownLeft size={16} color={Colors.dark.success} />;
      case 'swap':
        return <RefreshCw size={16} color={Colors.dark.warning} />;
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

  const renderXActivity = (activity: XActivity) => (
    <>
      <View style={styles.avatarContainer}>
        <Image 
          source={{ uri: activity.avatar }}
          style={styles.avatar}
          contentFit="cover"
        />
        <View style={styles.iconBadge}>
          {renderXActivityIcon()}
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.username}>{activity.username}</Text>
          <Text style={styles.timestamp}>{formatDate(activity.timestamp)}</Text>
        </View>
        <Text style={styles.handle}>@{activity.handle}</Text>
        <Text style={styles.content} numberOfLines={2}>{activity.content}</Text>
      </View>
    </>
  );

  const renderCryptoActivity = (activity: CryptoActivity) => (
    <>
      <View style={styles.cryptoIconContainer}>
        <View style={styles.iconBadge}>
          {renderCryptoActivityIcon()}
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.username}>
            {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
          </Text>
          <Text style={styles.timestamp}>{formatDate(activity.timestamp)}</Text>
        </View>
        <Text style={styles.handle}>
          {activity.amount} {activity.currency}
        </Text>
        <Text style={styles.cryptoAddress} numberOfLines={1}>
          {activity.address.substring(0, 10)}...{activity.address.substring(activity.address.length - 6)}
        </Text>
        <View style={styles.statusContainer}>
          <View style={[
            styles.statusDot, 
            { backgroundColor: activity.status === 'completed' 
              ? Colors.dark.success 
              : activity.status === 'pending' 
                ? Colors.dark.warning 
                : Colors.dark.error 
            }
          ]} />
          <Text style={styles.statusText}>
            {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
          </Text>
        </View>
      </View>
    </>
  );

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      {isXActivity 
        ? renderXActivity(item as XActivity) 
        : renderCryptoActivity(item as CryptoActivity)
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    marginBottom: 12,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.dark.inactive,
  },
  iconBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.dark.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.dark.background,
  },
  cryptoIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.dark.inactive,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.dark.secondaryText,
  },
  handle: {
    fontSize: 14,
    color: Colors.dark.secondaryText,
    marginBottom: 6,
  },
  content: {
    fontSize: 14,
    color: Colors.dark.text,
    lineHeight: 20,
  },
  cryptoAddress: {
    fontSize: 14,
    color: Colors.dark.secondaryText,
    marginBottom: 6,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
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
