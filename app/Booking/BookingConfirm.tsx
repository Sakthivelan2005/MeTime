import { ThemedText } from '@/components/themed-text';
import { useUniversalDate } from '@/hooks/useUniversalDate';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const BookingConfirm = () => {
   const{date, time} = useLocalSearchParams();
   const formattedDate = `${useUniversalDate(String(date)).weekday}, ${useUniversalDate(String(date)).dayNumber}`;
  return (
    <View>
     <ThemedText type='24px'>date: {formattedDate}</ThemedText>
     <ThemedText type='24px'>time: {time}</ThemedText>     
    </View>
  )
}

export default BookingConfirm

const styles = StyleSheet.create({})
