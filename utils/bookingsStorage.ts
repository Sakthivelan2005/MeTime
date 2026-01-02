// utils/bookingsStorage.ts
import { SAMPLE_BOOKINGS, type Booking } from '@/data/BookingDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKINGS_KEY = 'bookings_data';

export const loadBookings = async (): Promise<Booking[]> => {
  try {
    const json = await AsyncStorage.getItem(BOOKINGS_KEY);
    return json ? JSON.parse(json) : SAMPLE_BOOKINGS;
  } catch {
    return SAMPLE_BOOKINGS;
  }
};

export const saveBookings = async (bookings: Booking[]): Promise<void> => {
  try {
    const json = JSON.stringify(bookings);
    await AsyncStorage.setItem(BOOKINGS_KEY, json);
  } catch (error) {
    console.error('Save failed:', error);
  }
};
