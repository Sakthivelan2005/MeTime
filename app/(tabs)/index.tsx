// HomeScreen.tsx
import { ThemedText } from '@/components/themed-text';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const SERVICE_CARD_WIDTH = Math.round(width * 0.68);
const ACCENT = '#F6A6A6';
const BG = '#F9F5F4';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<'Recommended' | 'Packages' | 'Professionals'>('Recommended');
  const [search, setSearch] = useState('');


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollInner} showsVerticalScrollIndicator={false}>
        {/* Topbar */}
        <View style={styles.topbar}>
          <TouchableOpacity style={styles.hamburger}>
            <View style={styles.hamLine} />
            <View style={[styles.hamLine, { width: 18 }]} />
            <View style={[styles.hamLine, { width: 22 }]} />
          </TouchableOpacity>

          <ThemedText type="32px" style={styles.appTitle}>
            MeTime
          </ThemedText>

          <TouchableOpacity style={styles.profile} />
        </View>

        {/* Greeting + Search */}
        <View style={styles.greetingRow}>
          <ThemedText style={styles.greeting}>
            Hello,{' '}
            <ThemedText style={styles.greetingName}>
              Carol
            </ThemedText>
          </ThemedText>

          <View style={styles.searchWrap}>
            <View style={styles.searchIcon} />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#8c8c8c"
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* Banner */}
        <View style={styles.bannerCard}>
          <View style={styles.bannerImagePlaceholder} />
          <ThemedText style={styles.bannerText}>
            Find the best hair stylist for you.
          </ThemedText>
        </View>

        {/* Tabs */}
        <View style={styles.tabsRow}>
          {(['Recommended', 'Packages', 'Professionals'] as const).map(tab => {
            const active = tab === activeTab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[styles.tabButton, active ? styles.tabActive : styles.tabInactive]}
              >
                <ThemedText style={[styles.tabLabel, active ? styles.tabLabelActive : styles.tabLabelInactive]}>
                  {tab}
                </ThemedText>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Upcoming */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Upcoming</ThemedText>

          <View style={styles.upcomingCard}>
            <View style={styles.dateBlock}>
              <ThemedText style={styles.dateDay}>19</ThemedText>
              <ThemedText style={styles.dateMonth}>Oct</ThemedText>
            </View>

            <View style={styles.upcomingInfo}>
              <ThemedText style={styles.serviceTitle}>Basic Pedicure with Paty</ThemedText>
              <ThemedText style={styles.serviceTime}>Tuesday, 04:30pm</ThemedText>
            </View>

            <TouchableOpacity style={styles.editWrap}>
              <ThemedText style={styles.editText}>Edit</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Services / Recommended with a salon card */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Recommended</ThemedText>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.servicesRow}>
            {/* Salon card (navigates to details) */}
            <TouchableOpacity style={[styles.salonCard, { width: SERVICE_CARD_WIDTH }]}>
              <Link href={{
                pathname: "/(tabs)/ShopDetails" ,
                params:{
                    id: 'gallery-salon',
                    name: 'The Gallery Salon',
                    address: '8502 Preston Rd, Inglewood',
                    rating: 4.8,
                }
              }}>
              <ImageBackground style={styles.salonImage} imageStyle={{ borderRadius: 12 }} source={undefined}>
                <View style={styles.salonImageOverlay} />
              </ImageBackground>

              <View style={styles.salonBody}>
                <ThemedText style={styles.salonName}>The Gallery Salon</ThemedText>
                <ThemedText style={styles.salonSubtitle}>8502 Preston Rd, Inglewood</ThemedText>
                <ThemedText style={styles.salonMeta}>Rating: 4.8 · $$</ThemedText>
              </View>
              </Link>
            </TouchableOpacity>

            {/* Example service card */}
            <View style={[styles.serviceCard, { width: SERVICE_CARD_WIDTH }]}>
              <View style={styles.serviceImage} />
              <View style={styles.serviceBody}>
                <ThemedText style={styles.serviceName}>Haircut</ThemedText>
                <ThemedText style={styles.serviceSub}>45 mins</ThemedText>
                <ThemedText style={styles.servicePrice}>$90</ThemedText>
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const pad = 16;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  scrollInner: { padding: pad, paddingBottom: 44 },
  topbar: { height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  hamburger: { width: 36, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 2 },
  hamLine: { height: 2, backgroundColor: '#333', width: 28, borderRadius: 2, marginVertical: 2 },
  appTitle: { fontSize: 18, fontWeight: '700', textAlign: 'center' },
  profile: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#e6e6e6' },

  greetingRow: { marginBottom: 14 },
  greeting: { fontSize: 20, marginBottom: 12 },
  greetingName: { color: ACCENT, fontWeight: '700', fontSize: 20 },

  searchWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8 },
  searchIcon: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: '#bbb', marginRight: 10 },
  searchInput: { flex: 1, padding: 0, fontSize: 16, color: '#111' },

  bannerCard: { height: 160, borderRadius: 16, overflow: 'hidden', marginBottom: 16, justifyContent: 'flex-end', padding: 16, backgroundColor: '#7b5e57' },
  bannerImagePlaceholder: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.18)' },
  bannerText: { color: '#fff', fontSize: 20, fontWeight: '700' },

  tabsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  tabButton: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, marginRight: 10 },
  tabActive: { backgroundColor: ACCENT },
  tabInactive: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#ddd' },
  tabLabel: { fontSize: 14, fontWeight: '600' },
  tabLabelActive: { color: '#fff' },
  tabLabelInactive: { color: '#333' },

  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },

  upcomingCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 8, elevation: 1, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4 },
  dateBlock: { width: 64, borderRadius: 8, backgroundColor: ACCENT, alignItems: 'center', justifyContent: 'center', paddingVertical: 8, marginRight: 12 },
  dateDay: { fontSize: 20, fontWeight: '800', color: '#111' },
  dateMonth: { fontSize: 12, color: '#111', marginTop: 2 },
  upcomingInfo: { flex: 1 },
  serviceTitle: { fontSize: 15, fontWeight: '700' },
  serviceTime: { fontSize: 13, color: '#666', marginTop: 4 },
  editWrap: { paddingHorizontal: 12, paddingVertical: 6 },
  editText: { color: ACCENT, fontWeight: '700' },

  servicesRow: { paddingVertical: 8 },
  salonCard: { height: 180, borderRadius: 12, backgroundColor: '#fff', marginRight: 12, overflow: 'hidden' },
  salonImage: { height: 110, width: '100%', backgroundColor: '#d9cfc9', justifyContent: 'flex-end' },
  salonImageOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.12)' },
  salonBody: { padding: 10 },
  salonName: { fontSize: 16, fontWeight: '700' },
  salonSubtitle: { fontSize: 13, color: '#666', marginTop: 4 },
  salonMeta: { marginTop: 8, fontSize: 13, color: '#333', fontWeight: '600' },

  serviceCard: { height: 140, borderRadius: 12, backgroundColor: '#fff', marginRight: 12, padding: 12, justifyContent: 'space-between' },
  serviceImage: { height: 70, borderRadius: 10, backgroundColor: '#efe1dc' },
  serviceBody: { marginTop: 8 },
  serviceName: { fontSize: 16, fontWeight: '700' },
  serviceSub: { fontSize: 13, color: '#666', marginTop: 4 },
  servicePrice: { marginTop: 6, fontSize: 15, fontWeight: '800' },
});