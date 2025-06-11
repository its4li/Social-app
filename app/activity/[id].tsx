import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { Heart, Repeat, MessageCircle, AtSign, ArrowUpRight, ArrowDownLeft, RefreshCw, ExternalLink, Clock } from 'lucide-react-native';
import { xActivities, cryptoActivities } from '@/mocks/activities';
import Colors from '@/constants/colors';

export default function ActivityDetailScreen() {
  const { id, type } = useLocalSearchParams();
  
  const activity = type === 'x' 
    ? xActivities.find(a => a.id === id)
    : cryptoActivities.find(a => a.id === id);
  
  if (!activity) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Activity not found</Text>
      </View>
    );
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderXActivity = () => {
    const xActivity = activity as typeof xActivities[0];
    
    const getIcon = () => {
      switch (xActivity.type) {
        case 'like':
          return <Heart size={24} color="#F91880" />;
        case 'retweet':
          return <Repeat size={24} color="#00BA7C" />;
        case 'reply':
          return <MessageCircle size={24} color="#1DA1F2" />;
        case 'mention':
          return <AtSign size={24} color="#794BC4" />;
        default:
          return null;
      }
    };

    const getActivityTitle = () => {
      switch (xActivity.type) {
        case 'like':
          return 'Liked your post';
        case 'retweet':
          return 'Retweeted your post';
        case 'reply':
          return 'Replied to your post';
        case 'mention':
          return 'Mentioned you in a post';
        default:
          return 'Interacted with you';
      }
    };

    return (
      <View style={styles.xActivityContainer}>
        <View style={styles.userInfoContainer}>
          <Image 
            source={{ uri: xActivity.avatar }}
            style={styles.avatar}
            contentFit="cover"
          />
          <View style={styles.userInfo}>
            <Text style={styles.username}>{xActivity.username}</Text>
            <Text style={styles.handle}>@{xActivity.handle}</Text>
          </View>
        </View>
        
        <View style={styles.activityTypeContainer}>
          <View style={styles.iconContainer}>
            {getIcon()}
          </View>
          <Text style={styles.activityTypeText}>{getActivityTitle()}</Text>
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>{xActivity.content}</Text>
        </View>
        
        <View style={styles.metadataContainer}>
          <View style={styles.metadataItem}>
            <Clock size={16} color={Colors.dark.secondaryText} />
            <Text style={styles.metadataText}>{formatDate(xActivity.timestamp)}</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View on X</Text>
          <ExternalLink size={16} color={Colors.dark.text} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderCryptoActivity = () => {
    const cryptoActivity = activity as typeof cryptoActivities[0];
    
    const getIcon = () => {
      switch (cryptoActivity.type) {
        case 'send':
          return <ArrowUpRight size={24} color={Colors.dark.error} />;
        case 'receive':
          return <ArrowDownLeft size={24} color={Colors.dark.success} />;
        case 'swap':
          return <RefreshCw size={24} color={Colors.dark.warning} />;
        default:
          return null;
      }
    };

    const getStatusColor = () => {
      switch (cryptoActivity.status) {
        case 'completed':
          return Colors.dark.success;
        case 'pending':
          return Colors.dark.warning;
        case 'failed':
          return Colors.dark.error;
        default:
          return Colors.dark.secondaryText;
      }
    };

    return (
      <View style={styles.cryptoActivityContainer}>
        <View style={styles.activityTypeContainer}>
          <View style={[styles.iconContainer, { backgroundColor: 'rgba(255, 255, 255, 0.05)' }]}>
            {getIcon()}
          </View>
          <Text style={styles.activityTypeText}>
            {cryptoActivity.type.charAt(0).toUpperCase() + cryptoActivity.type.slice(1)} Transaction
          </Text>
        </View>
        
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Amount</Text>
          <Text style={styles.amountValue}>
            {cryptoActivity.amount} <Text style={styles.currencyText}>{cryptoActivity.currency}</Text>
          </Text>
          {cryptoActivity.fee && (
            <Text style={styles.feeText}>
              Fee: {cryptoActivity.fee} {cryptoActivity.currency}
            </Text>
          )}
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Status</Text>
            <View style={styles.statusContainer}>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
              <Text style={[styles.statusText, { color: getStatusColor() }]}>
                {cryptoActivity.status.charAt(0).toUpperCase() + cryptoActivity.status.slice(1)}
              </Text>
            </View>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Date & Time</Text>
            <Text style={styles.detailValue}>{formatDate(cryptoActivity.timestamp)}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Address</Text>
            <Text style={styles.detailValue} numberOfLines={1}>{cryptoActivity.address}</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View on Explorer</Text>
          <ExternalLink size={16} color={Colors.dark.text} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {type === 'x' ? renderXActivity() : renderCryptoActivity()}
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
  xActivityContainer: {
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 20,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.dark.inactive,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  handle: {
    fontSize: 16,
    color: Colors.dark.secondaryText,
  },
  activityTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  activityTypeText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  contentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  contentText: {
    fontSize: 16,
    color: Colors.dark.text,
    lineHeight: 24,
  },
  metadataContainer: {
    marginBottom: 24,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metadataText: {
    fontSize: 14,
    color: Colors.dark.secondaryText,
    marginLeft: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.primary,
    borderRadius: 12,
    padding: 16,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
    marginRight: 8,
  },
  cryptoActivityContainer: {
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 20,
  },
  amountContainer: {
    marginBottom: 24,
  },
  amountLabel: {
    fontSize: 16,
    color: Colors.dark.secondaryText,
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  currencyText: {
    fontSize: 24,
    fontWeight: '600',
  },
  feeText: {
    fontSize: 14,
    color: Colors.dark.secondaryText,
  },
  detailsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  detailItem: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.dark.secondaryText,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: Colors.dark.text,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
