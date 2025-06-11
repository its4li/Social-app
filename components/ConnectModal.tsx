import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput } from 'react-native';
import { X } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface ConnectModalProps {
  visible: boolean;
  type: 'x' | 'wallet';
  onClose: () => void;
  onConnect: (value: string) => void;
}

export default function ConnectModal({ visible, type, onClose, onConnect }: ConnectModalProps) {
  const [value, setValue] = useState('');
  
  const title = type === 'x' ? 'Connect X Account' : 'Connect Wallet';
  const placeholder = type === 'x' ? 'Enter your X username' : 'Enter your wallet address';
  
  const handleConnect = () => {
    if (value.trim()) {
      onConnect(value.trim());
      setValue('');
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={20} color={Colors.dark.secondaryText} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.description}>
            {type === 'x' 
              ? "Enter your X username to connect and track your social activities."
              : "Enter your wallet address to track your crypto transactions and balances."
            }
          </Text>
          
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={Colors.dark.secondaryText}
            value={value}
            onChangeText={setValue}
            autoCapitalize="none"
            autoCorrect={false}
          />
          
          <TouchableOpacity 
            style={[styles.button, !value.trim() && styles.buttonDisabled]}
            onPress={handleConnect}
            disabled={!value.trim()}
          >
            <Text style={styles.buttonText}>Connect</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    color: Colors.dark.secondaryText,
    marginBottom: 24,
    lineHeight: 22,
  },
  input: {
    backgroundColor: Colors.dark.background,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.dark.text,
    marginBottom: 24,
  },
  button: {
    backgroundColor: Colors.dark.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: Colors.dark.inactive,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
  },
});
