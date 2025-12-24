import { ThemedText } from '@/components/themed-text';
import { Images } from '@/config/Images';
import { disabledTimes } from '@/constants/disabledTimes';
import { profiles } from '@/constants/profiles';
import { timeSlots } from '@/constants/Timeslots';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';

import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

export default function BookingScreen() {
const {id} = useLocalSearchParams();
const selected = profiles.find(i => i.id === Number(id));
const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');  // "01".."31"

const [selectedDate, setSelectedDate] = useState(dd);
const [selectedTime, setSelectedTime] = useState('1:30 pm');

const dates = Array.from({ length: 7 }, (_, i) => ({
    day: Number(dd) + i,
    weekday: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
}));


return (
    <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
            <Image
                source={selected?.profile}
                style={styles.profileImage}
            />
            <View style={styles.infoContainer}>
                <ThemedText type='24px' style={styles.name}>{selected?.name}</ThemedText>
                <ThemedText type='18px' style={styles.role}>{selected?.designation}</ThemedText>
                <View style={styles.ratingContainer}>
                    <Image source={Images.Star} style={{ width: 20, height: 20, alignSelf:'center' }} />
                    <ThemedText type='18px' style={styles.rating}>{parseFloat(String(selected?.star)).toFixed(1)}</ThemedText>
                </View>
            </View>
        </View>

        {/* Date Picker */}
        <View style={styles.section}>
            <ThemedText type='24px' style={styles.sectionTitle}>Select date & time</ThemedText>
            <FlatList
                data={dates}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.day.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.dateButton,
                            selectedDate === String(item.day) && styles.dateButtonSelected,
                        ]}
                        onPress={() => setSelectedDate((String(item.day)))}
                    >
                         <ThemedText type='24px'
                            style={[
                                styles.dayNumber,
                                selectedDate === String(item.day) && styles.dayNumberSelected,
                            ]}
                        >
                            {item.day}
                        </ThemedText>
                        <ThemedText  type='18px'
                         style={[
                            styles.weekday, 
                            selectedDate === String(item.day) && styles.weekdaySelected
                            ]}>
                             {item.weekday}
                            </ThemedText>
                       
                    </TouchableOpacity>
                )}
            />
        </View>

        {/* Availability Grid */}
        <View style={styles.section}>
            <ThemedText type='24px' style={styles.sectionTitle}>Availability</ThemedText>
            <View style={styles.timeGrid}>
                {timeSlots.map((time) => (
                    <TouchableOpacity
                        key={time}
                        style={[
                            styles.timeSlot,
                            selectedTime === time && styles.timeSlotSelected,
                            disabledTimes.includes(time) && styles.timeSlotDisabled,
                        ]}
                        onPress={() => !disabledTimes.includes(time) && setSelectedTime(time)}
                        disabled={disabledTimes.includes(time)}
                    >
                        <ThemedText type='24px'
                            style={[
                                styles.timeThemedText,
                                selectedTime === time && styles.timeThemedTextSelected,
                                disabledTimes.includes(time) && styles.timeThemedTextDisabled,
                            ]}
                        >
                            {time}
                        </ThemedText>
                    </TouchableOpacity>
                ))}
            </View>
        </View>

        {/* Book Button */}
        <TouchableOpacity style={styles.bookButton}>
            <ThemedText type='18px' style={styles.bookButtonThemedText}>Book</ThemedText>
        </TouchableOpacity>
    </ScrollView>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,

},
header: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
},
profileImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
},
infoContainer: {
    flex: 1,
},
name: {
    marginBottom: 4,
    textAlign: 'center',
},
role: {
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
},
ratingContainer: {
    flexDirection: 'row',
    textAlign: 'center',
    alignSelf: 'center',
},
rating: {
    textAlign: 'center',
},
section: {
    paddingHorizontal: 16,
    marginBottom: 24,
},
sectionTitle: {
    marginBottom: 12,
},
dateButton: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 12,
    borderRadius: 8,
    borderColor: '#CDCDCD',
    borderWidth:2
},
dateButtonSelected: {
    borderColor: '#FDCCC5',
    borderWidth: 2,
},
weekday: {
    
    color: '#7A7A7A',
},
weekdaySelected: {
    color: '#FDCCC5',
},
dayNumber: {
    marginTop: 3,
    color: '#7A7A7A',
},
dayNumberSelected: {
    color: '#FDCCC5',
},
timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
},
timeSlot: {
    width: '48%',
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
},
timeSlotSelected: {
    borderColor: '#FDCCC5',
},
timeSlotDisabled: {
    opacity: 0.4,
},
timeThemedText: {
    color: '#7A7A7A',
},
timeThemedTextSelected: {
    color: '#FDCCC5',
},
timeThemedTextDisabled: {
    color: '#999',
},
bookButton: {
    paddingVertical: 15,
    width: '90%',
    backgroundColor: '#FDCCC5',
    borderRadius: 12,
    alignSelf: 'center',
},
bookButtonThemedText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
},
});