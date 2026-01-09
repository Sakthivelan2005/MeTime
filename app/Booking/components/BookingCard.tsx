import { ThemedText } from '@/components/themed-text';
import type { Booking } from '@/data/BookingDetails';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
function formatDateLabel(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}

const BookingCard: React.FC<{ booking: Booking; onPressCancel?: (id: string) => void }> = ({ booking, onPressCancel }) => {
  return (
    <View style={styles.card}>
      <ThemedText style={styles.salonName}>{booking.shop}</ThemedText>
      <ThemedText style={styles.secondLine}>{`with ${booking.person} · ${booking.distanceKm} Kms`}</ThemedText>
      <ThemedText style={styles.serviceDetails}>{booking.serviceDetails}</ThemedText>
      <ThemedText style={styles.datePrice}>{`${formatDateLabel(booking.date)} · $${booking.price}`}</ThemedText>
      {booking.isUpcoming && (
        <TouchableOpacity onPress={() => onPressCancel?.(booking.id)}>
          <ThemedText style={styles.cancelText}>Cancel</ThemedText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 14,
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
});

export default BookingCard;
