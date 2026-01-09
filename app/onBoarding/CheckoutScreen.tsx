import { ThemedText } from '@/components/themed-text';
import { color } from '@/constants/color';
import { empty } from '@/constants/empty';
import { SAMPLE_BOOKINGS, type Booking } from '@/data/BookingDetails';
import { needs } from '@/data/need';
import { profiles } from '@/data/profiles';
import { CreateButton } from '@/hooks/Button';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePayment } from '../payment/PaymentContext';
const ACCENT = color;
type Props = {
  setShowPopup: (value: boolean) => void;
}
export default function CheckoutScreen({ setShowPopup }: Props) {
  const route = useRouter();
  const { cards, selectedCardId, method } = usePayment();
  const selected = cards.find(c => c.id === selectedCardId) ?? null;
  const {iso, formattedDate, time, item, shop, location, lastId, id} = useLocalSearchParams();
  const selectedPerson = profiles.find((i)=> i.id === Number(id))
  const selectedItem = needs.find((i) => i.id === Number(item))
  console.log("lastID", lastId)
      console.log("date 66: ", iso)
  function onBook() {
    if(cards.length <= 0 && !method){
      Alert.alert("Error", "Please select a payment")
    }else{
      const BookingData: Booking = {
        id:`${!lastId? SAMPLE_BOOKINGS.length+1 : Number(lastId)+1 }`,
        shop: String(shop),
        person: String(selectedPerson?.name),
        distanceKm: Math.round(Math.random() * 10 * 10) / 10,  // results in .1 decimal,
        serviceDetails: String(selectedItem?.name),
        date: String(iso),
        price: Number(selectedItem?.price),
        isUpcoming: true,
      }
      Alert.alert('Booked', 'Your appointment has been booked.');
      route.navigate({pathname:"/Booking/BookingsScreen", params: {bookingJson: JSON.stringify(BookingData)}})
      console.log("Bookings",JSON.stringify(BookingData))
    }    
  }

  return (
    <SafeAreaView style={styles.safe}>
      

     {(formattedDate === undefined && time === undefined && item === undefined && shop === undefined && location === undefined)? 
     (empty("Please Book any one item to view Checkouts.")) : 
     (
       <View style={styles.content}>
        
        <ThemedText type='24px' style={styles.mainText}>Please check the details and confirm your appointment</ThemedText>

        <View style={styles.summary}>
          <View style={styles.row}>
            <ThemedText type='18px' style={styles.rowLabel}>Date</ThemedText>
            <ThemedText type='18px' style={styles.rowValue}>{formattedDate}   {time}</ThemedText>
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

      <TouchableOpacity onPress={onBook}>
          {CreateButton("Book")}
        </TouchableOpacity>
      </View>)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  appBar: { height: 56, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  back: { position: 'absolute', left: 16, top: 16 },
  title: { fontSize: 18, fontWeight: '700' },

  content: { flex: 1, padding: 20, justifyContent: 'space-between', marginBottom: 10 },
  
  mainText: { textAlign: 'center', marginBottom: 16, color: '#333' },

  summary: { backgroundColor: '#fff', padding: 16, borderRadius: 10, borderWidth: 1, borderColor: '#f0f0f0', marginBottom: 50 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 0 },
  rowLabel: { color: '#666' },
  rowValue: { color: '#111', fontWeight: '600', },
  link: { color: ACCENT, textDecorationLine: 'underline', fontWeight: 'bold' },
  total: { color: '#111', fontSize: 16, fontWeight: '800' },
  payment:{textDecorationLine: 'underline', color: "#000", fontWeight: 'bold'},
 
});
