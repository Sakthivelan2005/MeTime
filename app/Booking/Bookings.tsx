import { ThemedText } from '@/components/themed-text';
import { Images } from '@/config/Images';
import { Months } from '@/constants/date';
import { disabledTimes } from '@/constants/disabledTimes';
import { profiles } from '@/constants/profiles';
import { timeSlots } from '@/constants/Timeslots';
import { addDays } from '@/hooks/addDays';
import { formatDate } from '@/hooks/formatDate';
import { getDaysDiff } from '@/hooks/getDaysDifferent';
import { getWeekday } from '@/hooks/getWeekDay';
import { getYesterday } from '@/hooks/getYesterday';
import { format } from 'date-fns';
import { Link, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';
import CrossPlatformDatePicker from './datePicker';

export default function BookingScreen() {
const {width, height} = useWindowDimensions();
const {ProfileId, itemId} = useLocalSearchParams();
const selected = profiles.find(i => i.id === Number(ProfileId));
const today = format(new Date(), 'MM/dd/yyyy');

const [month, setMonth] = useState(Months[Number(formatDate(String(today)).substring(0,2)) - 1]); // e.g. "December"
console.log("Today: ", today)
const [selectedDate, setSelectedDate] = useState(today); // e.g. "05/31/2024"
const [selectedTime, setSelectedTime] = useState('1:30 pm');
const [showPicker, setShowPicker] = useState(false);
const dateListRef =  useRef<FlatList>(null);
const [dates, setDates] = useState<{day: string, weekday: string}[]>([]);

useEffect(() => {
  const index = dates.findIndex(item => item.day === selectedDate);
  if (index > -1 && dateListRef.current) {
    dateListRef.current.scrollToIndex({ index, animated: true });
  }
}, [selectedDate, dates]);

const length = getDaysDiff(selectedDate,format(getYesterday(), "MM/dd/yyyy")) > 7? getDaysDiff(selectedDate, format(getYesterday(), "MM/dd/yyyy")) : 7;

useEffect(() => {
setDates(Array.from({ length: length}, (_, i) => {
  const dayCount = (addDays( today, i));
  return {
    day: dayCount,
    weekday:  getWeekday(dayCount), // Get weekday name
  };
}));
},[selectedDate]);

const handleDate = () => {
    setShowPicker(true);
};


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
            <View style={styles.DayMonthContainer}>
            <ThemedText type='18px' style={styles.DayText}>Day</ThemedText>
            <Pressable onPress={() => handleDate()}>
            <ThemedText type='18px' style={styles.MonthText}>{`${month} >`}</ThemedText>
            </Pressable>
            {showPicker && (
                <CrossPlatformDatePicker
                selectedDate={selectedDate}
                setSelectedDate = {setSelectedDate}
                setMonth={setMonth}
                onClose={() => setShowPicker(false)}
                 />)}
            </View>
<FlatList
  ref={dateListRef}
  data={dates}
  horizontal
  showsHorizontalScrollIndicator={false}
  keyExtractor={(_, index) => index.toString()}
  getItemLayout={(_, index) => ({
  length: width * 0.22,  // 22% screen width per item
  offset: (width * 0.22) * index,
  index
})}
  renderItem={({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.dateButton,
        selectedDate === item.day && styles.dateButtonSelected,
      ]}
      onPress={() => {
        setSelectedDate(item.day);
        setMonth(Months[Number(formatDate(item.day).substring(0,2)) - 1]);
        dateListRef.current?.scrollToIndex({index, animated: true});
      }}
    >
      <ThemedText type='24px' style={[
        styles.dayNumber,
        selectedDate === item.day && styles.dayNumberSelected
      ]}>
        {item.day.substring(3,5)}
      </ThemedText>
      <ThemedText type='18px' style={[
        styles.weekday, 
        selectedDate === item.day && styles.weekdaySelected
      ]}>
        {item.weekday}
      </ThemedText>
    </TouchableOpacity>
  )}
/>
        </View>

        {/* Availability Grid */}
        <View style={styles.section}>
            <ThemedText type='18px' style={styles.Availability}>Availability</ThemedText>
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

    <Link href={{
        pathname:"/Booking/BookingConfirm",
        params: {
            date: selectedDate,
             time: selectedTime,
            id: selected?.id,
            item: itemId
             }}} asChild>      
        <TouchableOpacity style={styles.bookButton}>
            <ThemedText type='18px' style={styles.bookButtonThemedText}>Book</ThemedText>
        </TouchableOpacity>
    </Link>
    </ScrollView>
);
}
const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 40,


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
    color: "#000",
},
section: {
    paddingHorizontal: 16,
    marginBottom: 24,
},
sectionTitle: {
    marginBottom: 12,
    textAlign: 'center'
},
DayMonthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
},
DayText: {
    margin: 10,
    left: 0,
    color: '#414040ff'
},
MonthText: {
    margin: 10,
    right: 0,
    color: '#414040ff'
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
Availability: {
    marginBottom: 12,
    color: '#414040ff'
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
    marginBottom: 90,
},
bookButtonThemedText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
},
});