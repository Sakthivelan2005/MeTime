import { ThemedText } from '@/components/themed-text';
import { Images } from '@/config/Images';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, usePayment } from './PaymentContext';

export default function AddCardScreen() {
  const {height} = useWindowDimensions();
  const router = useRouter();
  const { addCard } = usePayment();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [exp, setExp] = useState('');
  const [cvv, setCvv] = useState('');

  const valid = name.trim() && number.trim() && exp.trim() && cvv.trim();

  function onAdd() {
    if (!valid) return Alert.alert('Invalid', 'Please fill all fields');
    const id = `card_${Date.now()}`;
    const newCard: Card = { id, cardHolder: name, number: `${number.slice(-4) ? number : number}`, exp, cvv };
    addCard(newCard);
    router.back();
  }

  const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
 
  content: { padding: 16 },
  pageTitle: {fontWeight: '700', marginBottom: 16 },

  input: { borderWidth: 1, borderColor: '#eee', padding: 12, borderRadius: 8, marginBottom: 12 },
  row: { flexDirection: 'row' },

  addButton: { marginTop: 12, backgroundColor: '#F6A6A6', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  addButtonDisabled: { opacity: 0.5 },
  addButtonText: { color: '#fff', fontWeight: '700' },

  image:{
    height: 40,
    width: 40,
    position: 'absolute',
    right: 30,
    top: height/7
  }
});

  return (
    <SafeAreaView style={styles.safe}>

      <View style={styles.content}>
        <ThemedText type="32px" style={styles.pageTitle}>Add Card</ThemedText>

        <TextInput style={styles.input} placeholder="Cardholder name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Card number" value={number} onChangeText={setNumber} keyboardType="number-pad" />

        <Image source={Images.Mastercard} style={styles.image} />
        <View style={styles.row}>
          <TextInput style={[styles.input, { flex: 1, marginRight: 8 }]} placeholder="MM/YY" value={exp} onChangeText={setExp} />
          <TextInput style={[styles.input, { width: 100 }]} placeholder="123" value={cvv} onChangeText={setCvv} keyboardType="number-pad" />
        </View>

        <TouchableOpacity style={[styles.addButton, !valid && styles.addButtonDisabled]} onPress={onAdd} disabled={!valid}>
          <ThemedText style={styles.addButtonText}>Add Card</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  
}

