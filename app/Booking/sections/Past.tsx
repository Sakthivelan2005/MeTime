import type { Booking } from '@/data/BookingDetails';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import BookingCard from '../components/BookingCard';
const Past: React.FC<{ bookings: Booking[] }> = ({ bookings }) => {
  return (
    <View style={styles.page}>
      <FlatList
        data={bookings}
        keyExtractor={i => i.id}
        renderItem={({ item }) => <BookingCard booking={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: { flex: 1 },
});

export default Past;
