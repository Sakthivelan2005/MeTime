// SalonDetailsScreen.tsx
import { ThemedText } from '@/components/themed-text';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

const { name, address, rating } = useLocalSearchParams();
const { width } = Dimensions.get('window');
const ACCENT = '#F6A6A6';

const SalonDetailsScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollInner} showsVerticalScrollIndicator={false}>
        <ImageBackground style={styles.headerImage} source={undefined} imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
          <View style={styles.headerOverlay} />
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <View style={styles.backIcon} />
          </TouchableOpacity>

          <View style={styles.headerContent}>
            <ThemedText style={styles.salonTitle}>{name}</ThemedText>
            <ThemedText style={styles.salonAddress}>{address}</ThemedText>
            <ThemedText style={styles.salonRating}>⭐ {rating}</ThemedText>
          </View>
        </ImageBackground>

        <View style={styles.body}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.actionButton}>
              <ThemedText style={styles.actionText}>Book Now</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.secondaryAction]}>
              <ThemedText style={[styles.actionText, styles.secondaryActionText]}>Call</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Promotions</ThemedText>
            <View style={styles.promoCard}>
              <ThemedText style={styles.promoTitle}>10% off first visit</ThemedText>
              <ThemedText style={styles.promoSub}>Use code: WELCOME10</ThemedText>
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Customer Reviews</ThemedText>
            <View style={styles.reviewCard}>
              <ThemedText style={styles.reviewName}>Alex</ThemedText>
              <ThemedText style={styles.reviewText}>Great service and friendly staff.</ThemedText>
            </View>

            <View style={styles.writeReviewWrap}>
              <TouchableOpacity style={styles.writeReviewBtn}>
                <ThemedText style={styles.writeReviewText}>Write a review</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SalonDetailsScreen;

const pad = 16;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollInner: { paddingBottom: 40 },
  headerImage: { width: '100%', height: Math.round(width * 0.62), justifyContent: 'flex-end', padding: pad },
  headerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.18)', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  backBtn: { position: 'absolute', left: 16, top: 16, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center' },
  backIcon: { width: 14, height: 2, backgroundColor: '#333', transform: [{ rotate: '45deg' }] },
  headerContent: { paddingBottom: 12 },
  salonTitle: { color: '#fff', fontSize: 22, fontWeight: '800' },
  salonAddress: { color: '#fff', marginTop: 6, fontSize: 14 },
  salonRating: { color: '#fff', marginTop: 6, fontSize: 13, fontWeight: '700' },

  body: { padding: pad },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  actionButton: { flex: 1, paddingVertical: 12, borderRadius: 12, backgroundColor: ACCENT, alignItems: 'center', marginRight: 8 },
  secondaryAction: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', marginRight: 0 },
  actionText: { color: '#111', fontWeight: '800' },
  secondaryActionText: { color: '#333' },

  section: { marginBottom: 18 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },

  promoCard: { backgroundColor: '#fff', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#f0f0f0' },
  promoTitle: { fontSize: 15, fontWeight: '800' },
  promoSub: { marginTop: 6, color: '#666' },

  reviewCard: { backgroundColor: '#fff', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#f0f0f0', marginBottom: 10 },
  reviewName: { fontWeight: '800' },
  reviewText: { marginTop: 6, color: '#444' },

  writeReviewWrap: { alignItems: 'flex-start', marginTop: 6 },
  writeReviewBtn: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10, backgroundColor: ACCENT },
  writeReviewText: { fontWeight: '800' },
});