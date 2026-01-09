import { ThemedText } from '@/components/themed-text';
import { Icons } from '@/config/icons';
import { Images } from '@/config/Images';
import { color } from '@/constants/color';
import { SAMPLE_BOOKINGS, type Booking } from '@/data/BookingDetails';
import { Image } from 'expo-image';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Past from './sections/Past';
import Upcoming from './sections/Upcoming';

const ACCENT = color;
const LIGHT_GRAY = '#9aa0a6';

const BookingsScreen: React.FC<{ navigation?: any }> = () => {
  const [bookings, setBookings] = useState<Booking[]>(SAMPLE_BOOKINGS);
  const [activeTab, setActiveTab] = useState<'Past' | 'Upcoming'>('Upcoming');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Receive booking from CheckoutScreen
  const { bookingJson } = useLocalSearchParams<{ bookingJson: string }>();
  
  console.log("received booking: ", bookingJson)
  const pastBookings = useMemo(() => bookings.filter(b => !b.isUpcoming), [bookings]);
  const upcomingBookings = useMemo(() => bookings.filter(b => b.isUpcoming), [bookings]);

  const flatRef = useRef<FlatList<any> | null>(null);
  const { width } = useWindowDimensions();

  const goBack = () =>{
    router.push('/Home')
  }
  // Add incoming booking from CheckoutScreen
  useEffect(() => {
    if (bookingJson) {
      try {
        const newBooking: Booking = JSON.parse(bookingJson);
        
        // Prepend to bookings list (newest first)
        setBookings(prev => [newBooking, ...prev]);
        
        // Clear param to prevent duplicate adds
        
        console.log('Added new booking:', newBooking.id);
      } catch (error) {
        console.error('Failed to parse bookingJson:', error);
      }
    }
  }, [bookingJson]);
  // Existing: Update lastId for CheckoutScreen
  useEffect(() => {
    const lastBookingId = bookings.findLast((item) => item.id)?.id;
    if (lastBookingId) {
      router.setParams({ lastId: lastBookingId });
    }
  }, [bookings]);

  function openCancelModal(id: string) {
    setSelectedId(id);
    setModalVisible(true);
  }

  function closeModal() {
    setSelectedId(null);
    setModalVisible(false);
  }

  function confirmCancel() {
    if (!selectedId) return closeModal();
    
    // Move to past OR remove completely
    setBookings(prev => 
      prev.map(b => 
        b.id === selectedId ? { ...b, isUpcoming: false } : b
      )
    );
    
    closeModal();
  }

  return (
    <>
    <Stack.Screen options={{
      headerLeft: () => (
        <TouchableOpacity onPress={goBack} >
          <ThemedText>{Icons.leftArrow}</ThemedText>
        </TouchableOpacity>
      ),
      title: "MeTime",
      headerTitleAlign: 'center'
    }} /> 
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <ThemedText style={styles.sectionTitle}>Your Bookings</ThemedText>

        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => {
              flatRef.current?.scrollToIndex({ index: 0, animated: true });
              setActiveTab('Past');
            }}
          >
            <ThemedText style={[styles.tabLabel, activeTab === 'Past' ? styles.tabLabelActive : styles.tabLabelInactive]}>
              Past
            </ThemedText>
            <View style={[styles.tabUnderline, activeTab === 'Past' ? styles.underlineActive : styles.underlineInactive]} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab}
            onPress={() => {
              flatRef.current?.scrollToIndex({ index: 1, animated: true });
              setActiveTab('Upcoming');
            }}
          >
            <ThemedText style={[styles.tabLabel, activeTab === 'Upcoming' ? styles.tabLabelActive : styles.tabLabelInactive]}>
              Upcoming
            </ThemedText>
            <View style={[styles.tabUnderline, activeTab === 'Upcoming' ? styles.underlineActive : styles.underlineInactive]} />
          </TouchableOpacity>
        </View>

        <FlatList
          ref={flatRef}
          data={['Past', 'Upcoming']}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item}
          initialScrollIndex={activeTab === 'Upcoming' ? 1 : 0}
          getItemLayout={(_, index) => ({ length: width, offset: width/1.1 * index, index })}
          onMomentumScrollEnd={e => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            setActiveTab(index === 0 ? 'Past' : 'Upcoming');
          }}
          renderItem={({ item }) => (
            <View style={{ width: width/1.1}}>
              {item === 'Past' ? (
                <Past bookings={pastBookings} />
              ) : (
                <Upcoming bookings={upcomingBookings} onPressCancel={openCancelModal} />
              )}
            </View>
          )}
        />
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconWrap}>
              <Image source={Images.cancel} style={styles.modalIconBox} />
            </View>

            <ThemedText style={styles.modalTitle}>
              Are you sure, you want to{' '}
              <ThemedText style={styles.accentText}>cancel</ThemedText> this appointment?
            </ThemedText>

            <View style={styles.modalButtonsRow}>
              <Pressable style={styles.ghostButton} onPress={closeModal}>
                <ThemedText style={styles.ghostButtonText}>No</ThemedText>
              </Pressable>

              <Pressable style={styles.fillButton} onPress={confirmCancel}>
                <ThemedText style={styles.fillButtonText}>Cancel</ThemedText>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
   </>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fbfbfd' },

  container: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  sectionTitle: { fontSize: 24, fontWeight: '700', marginBottom: 12, color: '#222' },

  tabsRow: { flexDirection: 'row', marginBottom: 12 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 6 },
  tabLabel: { fontSize: 15, marginBottom: 6 },
  tabLabelActive: { color: '#222', fontWeight: '600' },
  tabLabelInactive: { color: LIGHT_GRAY },
  tabUnderline: { height: 3, width: '60%', borderRadius: 2 },
  underlineActive: { backgroundColor: ACCENT },
  underlineInactive: { backgroundColor: 'transparent' },

  listContent: { paddingBottom: 24 },
  card: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  salonName: { fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 6 },
  secondLine: { fontSize: 13, color: '#666', marginBottom: 6 },
  serviceDetails: { fontSize: 13, color: '#333', marginBottom: 8 },
  datePrice: { fontSize: 13, color: '#333', marginBottom: 6 },
  cancelText: { color: '#d9534f', fontWeight: '600' },

  separator: { height: 12 },

  emptyWrap: { padding: 24, alignItems: 'center' },
  emptyText: { color: '#888' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  modalCard: { width: '100%', maxWidth: 360, backgroundColor: '#fff', borderRadius: 14, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 12, elevation: 6 },
  modalIconWrap: { marginTop: -36, marginBottom: 8 },
  modalIconBox: { width: 64, height: 64, borderRadius: 14, backgroundColor: ACCENT, justifyContent: 'center', alignItems: 'center' },
  modalIcon: { color: '#fff', fontSize: 24, fontWeight: '700' },
  modalTitle: { fontSize: 16, color: '#222', textAlign: 'center', marginVertical: 12 },
  accentText: { color: ACCENT, fontWeight: '700' },

  modalButtonsRow: { flexDirection: 'row', width: '100%', marginTop: 8 },
  ghostButton: { flex: 1, paddingVertical: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginRight: 8, alignItems: 'center' },
  ghostButtonText: { color: '#333', fontWeight: '600' },
  fillButton: { flex: 1, paddingVertical: 12, borderRadius: 8, backgroundColor: ACCENT, alignItems: 'center' },
  fillButtonText: { color: '#fff', fontWeight: '700' },
});

export default BookingsScreen;
