import { ThemedText } from '@/components/themed-text';
import { needs } from '@/constants/need';
import { CreateButton } from '@/hooks/Button';
import { Link, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePayment } from '../payment/PaymentContext';

const ACCENT = '#F6A6A6';
type Props = {
  setShowPopup: (value: boolean) => void;
  page: number;
}
export default function CheckoutScreen({ setShowPopup, page }: Props) {
  const { cards, selectedCardId, method } = usePayment();
  const selected = cards.find(c => c.id === selectedCardId) ?? null;
  const {Date, time, item, shop, location} = useLocalSearchParams();
  const selectedItem = needs.find((i) => i.id === Number(item))
  function onBook() {
    Alert.alert('Booked', 'Your appointment has been booked.');
  }

 
  return (
    <SafeAreaView style={styles.safe}>
      

      <View style={styles.content}>
        
        <ThemedText type='24px' style={styles.mainText}>Please check the details and confirm your appointment</ThemedText>

        <View style={styles.summary}>
          <View style={styles.row}>
            <ThemedText type='18px' style={styles.rowLabel}>Date</ThemedText>
            <ThemedText type='18px' style={styles.rowValue}>{Date}   {time}</ThemedText>
          </View>

          <View style={styles.row}>
           <ThemedText type='18px' style={styles.rowLabel}>Service</ThemedText>
           <ThemedText type='18px' style={styles.rowValue}>{selectedItem?.name}</ThemedText>
            
          </View>

           <View style={styles.row}>
            <ThemedText type='18px' style={styles.rowLabel}>Shop</ThemedText>
            <ThemedText type='18px' style={styles.rowValue}>{shop}</ThemedText>
            </View>

          <TouchableOpacity style={styles.row} onPress={() => Alert.alert('Open map', 'Address tapped')}>
            <ThemedText type='18px' style={styles.rowLabel}>Location</ThemedText>
            <ThemedText type='18px' style={styles.link}>{location}</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={() =>setShowPopup(true)}>
            <ThemedText type='18px' style={styles.rowLabel}>Payment</ThemedText>
            <ThemedText type='18px' style={styles.payment}>{selected ? selected.number : method? method : 'Add payment method'}</ThemedText>
          </TouchableOpacity>

          <View style={[styles.row, { marginTop: 8 }]}> 
            <ThemedText type='18px' style={styles.rowLabel}>Total</ThemedText>
            <ThemedText type='18px' style={styles.total}>${selectedItem?.price}</ThemedText>
          </View>
        </View>

      <Link href={'/Booking/BookingsScreen'} onPress={onBook} asChild>
          {CreateButton("Book")}
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  appBar: { height: 56, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  back: { position: 'absolute', left: 16, top: 16 },
  title: { fontSize: 18, fontWeight: '700' },

  content: { flex: 1, padding: 20, justifyContent: 'space-between' },
  
  mainText: { textAlign: 'center', marginBottom: 16, color: '#333' },

  summary: { backgroundColor: '#fff', padding: 16, borderRadius: 10, borderWidth: 1, borderColor: '#f0f0f0' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 0 },
  rowLabel: { color: '#666' },
  rowValue: { color: '#111', fontWeight: '600', },
  link: { color: ACCENT, textDecorationLine: 'underline', fontWeight: '600' },
  total: { color: '#111', fontSize: 16, fontWeight: '800' },
  payment:{textDecorationLine: 'underline', color: "#000", fontWeight: 'bold'},
  bookButton: { marginTop: 20, backgroundColor: ACCENT, borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  bookButtonText: { color: '#fff', fontWeight: '700' },
});
