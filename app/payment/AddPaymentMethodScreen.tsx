import { ThemedText } from '@/components/themed-text';
import { Icons } from '@/config/icons';
import { Images } from '@/config/Images';
import { options } from '@/constants/paymentOption';
import { CreateButton } from '@/hooks/Button';
import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePayment } from './PaymentContext';

const ACCENT = '#F6A6A6';
type Props = {
  setShowPopup: (value: boolean) => void;
}
export default function AddPaymentMethodScreen({setShowPopup}:Props) {
  const router = useRouter();
  const { cards, selectCard, removeCard, setSelectedMethod } = usePayment();
  
  return (
    <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowPopup(false)} style={styles.back}>{Icons.cross}</TouchableOpacity>
        <ThemedText style={styles.title}>Add payment method</ThemedText>
      </View>

      <View style={styles.listWrap}>
        <FlatList
          data={options}
          keyExtractor={i => i.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.optionRow} onPress={() =>{setShowPopup(false); setSelectedMethod(item.label); selectCard(null) }}>
             <Image source={item.image} style={styles.image}/>
              <ThemedText style={styles.optionLabel}>{item.label}</ThemedText>
              <ThemedText type='32px' style={styles.chev}>›</ThemedText>
            </TouchableOpacity>
          )}
        />

        <View style={styles.savedHeader}><ThemedText style={{fontWeight: '700'}}>Saved cards</ThemedText></View>

        {cards.map(c => (
          <TouchableOpacity key={c.id} style={styles.cardRow} onPress={() => {setShowPopup(false); selectCard(c.id)}}>
            <Image source={Images.card} style={styles.image}/>
            <ThemedText style={styles.optionLabel}>{c.number}</ThemedText>
            <TouchableOpacity onPress={() => removeCard(c.id)}><ThemedText style={styles.remove}>Remove</ThemedText></TouchableOpacity>
          </TouchableOpacity>
        ))}

        <Link href={'/payment/AddCardScreen'} asChild> 
          {CreateButton("+ Add Card")}
        </Link> 
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: { height: 56, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  back: { position: 'absolute', left: 16, top: 16 },
  title: { fontSize: 18, fontWeight: '700' },

  listWrap: { padding: 16 },
  optionRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  iconPlaceholder: { width: 36, height: 24, backgroundColor: '#eee', borderRadius: 6, marginRight: 12 },
  optionLabel: { flex: 1, color: '#111', left: 10 },
  chev: { color: '#9a9a9aff' },

  savedHeader: { marginTop: 20, marginBottom: 8 },
  cardRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  remove: { color: '#e85a5a', fontWeight: '700' },

  addCardRow: { marginTop: 20, padding: 14, borderRadius: 8, backgroundColor: ACCENT, alignItems: 'center' },
  addCardText: { color: '#fff', fontWeight: '700' },

  image:{
    height: 50,
    width: 50
  }
});
