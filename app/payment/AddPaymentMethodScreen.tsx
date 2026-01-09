import { ThemedText } from '@/components/themed-text';
import { Icons } from '@/config/icons';
import { Images } from '@/config/Images';
import { color } from '@/constants/color';
import { options } from '@/constants/paymentOption';
import { CreateButton } from '@/hooks/Button';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePayment } from './PaymentContext';


const ACCENT = color;
type Props = {
  setShowPopup: (value: boolean) => void;
}
export default function AddPaymentMethodScreen({setShowPopup}:Props) {
  const { method, cards, selectCard, removeCard, setSelectedMethod } = usePayment();
  const onAdd = () => {
    router.navigate('/payment/AddCardScreen')
  }
  
  console.log("ni", cards.length <= 0 && !method)
  
  return (
    <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowPopup(false)} >
          {Icons.cross}
        </TouchableOpacity>
        <ThemedText style={styles.title}>Add payment method</ThemedText>
      </View>

      <View style={styles.listWrap}>
        <FlatList
            data={options}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.optionRow}
                onPress={() => {
                  setShowPopup(false);
                  setSelectedMethod(item.label);
                  selectCard(null);
                }}
              >
                <Image source={item.image} style={styles.image} />
                <ThemedText style={styles.optionLabel}>{item.label}</ThemedText>
                 {Icons.rightArrow}
              </TouchableOpacity>
            )}
          />


        <View style={styles.savedHeader}><ThemedText type='24px'>Saved cards</ThemedText></View>

        {cards.length <= 0 ? <ThemedText type='18px' style={styles.card}>No Cards Available</ThemedText> : cards.map(c => (
          <TouchableOpacity key={c.id} style={styles.cardRow} onPress={() => {setShowPopup(false); selectCard(c.id)}}>
            <Image source={Images.card} style={styles.image}/>
            <ThemedText style={styles.optionLabel}>{c.number}</ThemedText>
            <TouchableOpacity onPress={() => removeCard(c.id)}><ThemedText style={styles.remove}>Remove</ThemedText></TouchableOpacity>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={{top: 15}} onPress={onAdd}> 
          {CreateButton("+ Add Card")}
        </TouchableOpacity> 
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: { height: 56,right: 20, justifyContent: 'space-evenly',flexDirection:'row', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  back: { position: 'absolute', left: 16, top: 16 },
  title: { fontSize: 24, fontWeight: '700' },

  listWrap: { padding: 16 },
  optionRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  iconPlaceholder: { width: 36, height: 24, backgroundColor: '#eee', borderRadius: 6, marginRight: 12 },
  optionLabel: { flex: 1, color: '#111', left: 10 },

  savedHeader: { marginTop: 20, marginBottom: 8 },
  cardRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  remove: { color: '#e85a5a', fontWeight: '700' },

  addCardRow: { marginTop: 20, padding: 14, borderRadius: 8, backgroundColor: ACCENT, alignItems: 'center' },
  addCardText: { color: '#fff', fontWeight: '700' },
  card: {margin: 10, textAlign: 'center'},
  image:{
    height: 50,
    width: 50,
  }
});
