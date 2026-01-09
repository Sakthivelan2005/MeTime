import { ThemedText } from '@/components/themed-text';
import { Images } from '@/config/Images';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, usePayment } from './PaymentContext';

export default function AddCardScreen() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { addCard } = usePayment();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [exp, setExp] = useState('');
  const [cvv, setCvv] = useState('');

  const valid = name.trim() && number.trim() && exp.trim() && cvv.trim();

  // Responsive sizing
  const isSmallScreen = width < 375;
  const isMediumScreen = width < 600;
  const isLargeScreen = width >= 768;

  // Calculate padding based on screen size
  const horizontalPadding = isSmallScreen ? 16 : isMediumScreen ? 20 : 24;
  const verticalPadding = height * 0.05;

  // Calculate image size based on screen width
  const imageSize = Math.min(width * 0.15, 50);

  function onAdd() {
    if (!valid) return Alert.alert('Invalid', 'Please fill all fields');
    const id = `card_${Date.now()}`;
    const newCard: Card = {
      id,
      cardHolder: name,
      number: `${number.slice(-4) ? number : number}`,
      exp,
      cvv,
    };
    addCard(newCard);
    router.back();
  }

  const styles = StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: '#fff',
    },
    container: {
      flex: 1,
      paddingHorizontal: horizontalPadding,
      paddingTop: verticalPadding,
      paddingBottom: verticalPadding + insets.bottom,
      justifyContent: 'space-between',
    },
    headerSection: {
      marginBottom: verticalPadding * 1.5,
    },
    pageTitle: {
      fontWeight: '700',
      marginBottom: 16,
      fontSize: isSmallScreen ? 24 : isMediumScreen ? 28 : 32,
    },
    formSection: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    inputWrapper: {
      marginBottom: 16,
      position: 'relative',
    },
    label: {
      fontSize: 13,
      fontWeight: '600',
      marginBottom: 8,
      color: '#666',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    input: {
      borderWidth: 1.5,
      borderColor: '#e0e0e0',
      borderRadius: 10,
      padding: isSmallScreen ? 12 : 14,
      fontSize: isSmallScreen ? 14 : 15,
      backgroundColor: '#fafafa',
      color: '#000',
    },
    inputFocused: {
      borderColor: '#F6A6A6',
      backgroundColor: '#fff',
    },
    row: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 16,
    },
    expInput: {
      flex: 1.2,
    },
    cvvInput: {
      flex: 1,
    },
    cardImageContainer: {
      position: 'absolute',
      right: -10,
      top: isSmallScreen ? 35 : 40,
      zIndex: 10,
    },
    cardImage: {
      height: imageSize,
      width: imageSize,
      borderRadius: 6,
    },
    buttonSection: {
      marginTop: verticalPadding,
      marginBottom: isSmallScreen ? 8 : 12,
    },
    addButton: {
      backgroundColor: '#F6A6A6',
      paddingVertical: isSmallScreen ? 12 : 14,
      paddingHorizontal: horizontalPadding,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#F6A6A6',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
    },
    addButtonDisabled: {
      opacity: 0.5,
    },
    addButtonText: {
      color: '#fff',
      fontWeight: '700',
      fontSize: isSmallScreen ? 14 : 15,
      letterSpacing: 0.5,
    },
  });

  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleInputFocus = (fieldName: string) => {
    setFocusedInput(fieldName);
  };

  const handleInputBlur = () => {
    setFocusedInput(null);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerSection}>
          <ThemedText style={styles.pageTitle}>Add Card</ThemedText>
        </View>

        {/* Form */}
        <View style={styles.formSection}>
          {/* Cardholder Name */}
          <View style={styles.inputWrapper}>
            <ThemedText style={styles.label}>Cardholder Name</ThemedText>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'name' && styles.inputFocused,
              ]}
              placeholder="John Doe"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
              onFocus={() => handleInputFocus('name')}
              onBlur={handleInputBlur}
              maxLength={30}
            />
          </View>

          {/* Card Number */}
          <View style={styles.inputWrapper}>
            <ThemedText style={styles.label}>Card Number</ThemedText>
            <View>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === 'number' && styles.inputFocused,
                ]}
                placeholder="1234 5678 9012 3456"
                placeholderTextColor="#999"
                value={number}
                onChangeText={setNumber}
                keyboardType="number-pad"
                onFocus={() => handleInputFocus('number')}
                onBlur={handleInputBlur}
                maxLength={19}
              />
              <View style={styles.cardImageContainer}>
                <Image
                  source={Images.Mastercard}
                  style={styles.cardImage}
                  contentFit="contain"
                />
              </View>
            </View>
          </View>

          {/* Expiry and CVV Row */}
          <View style={styles.row}>
            <View style={[styles.inputWrapper, styles.expInput]}>
              <ThemedText style={styles.label}>Expires</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === 'exp' && styles.inputFocused,
                ]}
                placeholder="MM/YY"
                placeholderTextColor="#999"
                value={exp}
                onChangeText={setExp}
                keyboardType="number-pad"
                onFocus={() => handleInputFocus('exp')}
                onBlur={handleInputBlur}
                maxLength={5}
              />
            </View>

            <View style={[styles.inputWrapper, styles.cvvInput]}>
              <ThemedText style={styles.label}>CVV</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === 'cvv' && styles.inputFocused,
                ]}
                placeholder="123"
                placeholderTextColor="#999"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="number-pad"
                onFocus={() => handleInputFocus('cvv')}
                onBlur={handleInputBlur}
                maxLength={4}
                secureTextEntry
              />
            </View>
          </View>
        </View>

        {/* Button */}
        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={[styles.addButton, !valid && styles.addButtonDisabled]}
            onPress={onAdd}
            disabled={!valid}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.addButtonText}>Add Card</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}