import { Booking } from '@/data/BookingDetails';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import BookingCard from '../components/BookingCard';

const Upcoming: React.FC<{ bookings: Booking[]; onPressCancel?: (id: string) => void }> = ({ bookings, onPressCancel }) => {
  return (
    <View style={styles.page}>
      <FlatList
        data={bookings}
        keyExtractor={i => i.id}
        renderItem={({ item }) => <BookingCard booking={item} onPressCancel={onPressCancel} />}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: { flex: 1 },
});

export default Upcoming;
