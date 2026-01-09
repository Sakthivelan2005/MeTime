import { ThemedText } from '@/components/themed-text';
import { Images } from '@/config/Images';
import { color } from '@/constants/color';
import { Months } from '@/constants/date';
import { disabledTimes } from '@/constants/disabledTimes';
import { timeSlots } from '@/constants/Timeslots';
import { profiles } from '@/data/profiles';
import { addDays } from '@/hooks/addDays';
import { CreateButton } from '@/hooks/Button';
import { formatDate } from '@/hooks/formatDate';
import { getDaysDiff } from '@/hooks/getDaysDifferent';
import { getWeekday } from '@/hooks/getWeekDay';
import { getYesterday } from '@/hooks/getYesterday';
import { useDateToISO } from '@/hooks/useUniversalDate';
import { format } from 'date-fns';
import { useLocalSearchParams, useRouter } from 'expo-router';
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
const Theme = color;
export default function BookingScreen() {

const dateToISO = useDateToISO();
const route = useRouter();
const {width, height} = useWindowDimensions();
const {ProfileId, itemId} = useLocalSearchParams();
const today = format(new Date(), 'MM/dd/yyyy');

const [month, setMonth] = useState(Months[Number(formatDate(String(today)).substring(0,2)) - 1]); // e.g. "December"
const [selectedDate, setSelectedDate] = useState(today); // e.g. "05/31/2024"
const [selectedTime, setSelectedTime] = useState('1:30 pm');
const [showPicker, setShowPicker] = useState(false);
const dateListRef =  useRef<FlatList>(null);
const [dates, setDates] = useState<{day: string, weekday: string}[]>([]);

const selected = profiles.find(i => i.id === Number(ProfileId));
console.log("select Date: ", selectedDate, "Time", selectedTime )
useEffect(() => {
  const index = dates.findIndex(item => item.day === selectedDate);
  if (index > -1 && dateListRef.current) {
    dateListRef.current.scrollToIndex({ index, animated: true });
  }

  setDates(Array.from({ length: length}, (_, i) => {
  const dayCount = (addDays( today, i));
  return {
    day: dayCount,
    weekday:  getWeekday(dayCount), // Get weekday name
  };
}));
}, [selectedDate]);

const length = getDaysDiff(selectedDate,format(getYesterday(), "MM/dd/yyyy")) > 7? getDaysDiff(selectedDate, format(getYesterday(), "MM/dd/yyyy")) : 7;


const handleDate = () => {
    setShowPicker(true);
};

const onBook = () => {
    const ISO = dateToISO(selectedDate, selectedTime);
 route.navigate({
        pathname:"/Booking/BookingConfirm",
        params: {
            iso: ISO,
            date: selectedDate,
            time: selectedTime,
            id: ProfileId,
            item: itemId
             }})
}

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

    <TouchableOpacity style={styles.button} onPress={onBook}  >
            {CreateButton("Book")}
    </ TouchableOpacity> 
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
    borderColor: Theme,
    borderWidth: 2,
},
weekday: {
    
    color: '#7A7A7A',
},
weekdaySelected: {
    color: Theme,
},
dayNumber: {
    marginTop: 3,
    color: '#7A7A7A',
},
dayNumberSelected: {
    color: Theme,
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
    borderColor: Theme,
},
timeSlotDisabled: {
    opacity: 0.4,
},
timeThemedText: {
    color: '#7A7A7A',
},
timeThemedTextSelected: {
    color: Theme,
},
timeThemedTextDisabled: {
    color: '#999',
},
button : {
    marginBottom: 100
}
});