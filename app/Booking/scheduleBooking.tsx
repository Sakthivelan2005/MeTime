import React, { useState } from 'react';
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const COLORS = {
background: '#FFFFFF',
text: '#1C1C28',
pink: '#FDCCC5',
pinkDark: '#E8A89F',
disabled: '#C4C4C4',
border: '#E0E0E0',
};

const getNext7Days = () => {
const days = [];
for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    days.push({
        day: date.getDate(),
        weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: new Date(date),
        isPast: i === 0 ? false : false,
    });
}
return days;
};

const TIME_SLOTS = [
{ time: '10:00 am', with: 'Jordan', disabled: true },
{ time: '10:30 am', with: 'Anna', disabled: false },
{ time: '04:30 pm', with: 'Paty', disabled: false },
{ time: '06:00 pm', with: 'Jordan', disabled: false },
];

const scheduleBooking = () => {
const [selectedDate, setSelectedDate] = useState<Date | null>(null);
const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
const days = getNext7Days();
const currentMonth = new Date().toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
});

const isBookingDisabled = !selectedDate || !selectedSlot;

return (
    <SafeAreaView style={styles.container}>
        {/* App Bar */}
        <View style={styles.appBar}>
            <Text style={styles.appBarTitle}>MeTime</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
            {/* Heading */}
            <View style={styles.headingContainer}>
                <Text style={styles.headingText}>
                    Select a date to see the{'\n'}
                    <Text style={styles.headingPink}>next </Text>
                    <Text style={styles.headingText}>slot available for you</Text>
                </Text>
            </View>

            {/* Month Header */}
            <View style={styles.monthHeader}>
                <Text style={styles.monthText}>
                    {currentMonth} <Text style={styles.arrow}>›</Text>
                </Text>
            </View>

            {/* Day Picker */}
            <View style={styles.dayPickerContainer}>
                <Text style={styles.sectionLabel}>Day</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.dayScroll}
                    contentContainerStyle={styles.dayScrollContent}
                >
                    {days.map((item, index) => (
                        <Pressable
                            key={index}
                            onPress={() => setSelectedDate(item.date)}
                            style={[
                                styles.dayCard,
                                selectedDate?.toDateString() === item.date.toDateString()
                                    ? styles.dayCardSelected
                                    : styles.dayCardUnselected,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.dayNumber,
                                    selectedDate?.toDateString() === item.date.toDateString()
                                        ? styles.dayNumberSelected
                                        : styles.dayNumberUnselected,
                                ]}
                            >
                                {item.day}
                            </Text>
                            <Text
                                style={[
                                    styles.dayWeekday,
                                    selectedDate?.toDateString() === item.date.toDateString()
                                        ? styles.dayWeekdaySelected
                                        : styles.dayWeekdayUnselected,
                                ]}
                            >
                                {item.weekday}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>

            {/* Availability */}
            <View style={styles.availabilityContainer}>
                <Text style={styles.sectionLabel}>Availability</Text>
                <View style={styles.slotsGrid}>
                    {TIME_SLOTS.map((slot, index) => (
                        <Pressable
                            key={index}
                            disabled={slot.disabled}
                            onPress={() => setSelectedSlot(slot.time)}
                            style={[
                                styles.slotCard,
                                slot.disabled && styles.slotCardDisabled,
                                selectedSlot === slot.time && styles.slotCardSelected,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.slotTime,
                                    slot.disabled && styles.slotTextDisabled,
                                    selectedSlot === slot.time && styles.slotTextSelected,
                                ]}
                            >
                                {slot.time}
                            </Text>
                            <Text
                                style={[
                                    styles.slotWith,
                                    slot.disabled && styles.slotTextDisabled,
                                    selectedSlot === slot.time && styles.slotTextSelected,
                                ]}
                            >
                                with {slot.with}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </View>

            {/* Spacer */}
            <View style={styles.spacer} />
        </ScrollView>

        {/* Book Button */}
        <Pressable
            disabled={isBookingDisabled}
            style={[
                styles.bookButton,
                isBookingDisabled && styles.bookButtonDisabled,
            ]}
        >
            <Text style={styles.bookButtonText}>Book</Text>
        </Pressable>
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: COLORS.background,
},
appBar: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
},
appBarTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
},
headingContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
},
headingText: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.text,
    lineHeight: 24,
},
headingPink: {
    color: COLORS.pinkDark,
    fontWeight: '600',
},
monthHeader: {
    paddingHorizontal: 24,
    paddingBottom: 16,
},
monthText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
},
arrow: {
    fontSize: 16,
},
dayPickerContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
},
sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.disabled,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
},
dayScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
},
dayScrollContent: {
    paddingRight: 24,
},
dayCard: {
    width: 56,
    height: 76,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1.5,
},
dayCardSelected: {
    backgroundColor: COLORS.pink,
    borderColor: COLORS.pinkDark,
},
dayCardUnselected: {
    backgroundColor: COLORS.background,
    borderColor: COLORS.border,
},
dayNumber: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
},
dayNumberSelected: {
    color: COLORS.text,
},
dayNumberUnselected: {
    color: COLORS.text,
},
dayWeekday: {
    fontSize: 12,
    fontWeight: '400',
},
dayWeekdaySelected: {
    color: COLORS.text,
},
dayWeekdayUnselected: {
    color: COLORS.disabled,
},
availabilityContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
},
slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
},
slotCard: {
    width: '48%',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
},
slotCardDisabled: {
    opacity: 0.5,
    borderColor: COLORS.disabled,
},
slotCardSelected: {
    backgroundColor: COLORS.pinkDark,
    borderColor: COLORS.pinkDark,
},
slotTime: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
},
slotWith: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.disabled,
},
slotTextDisabled: {
    color: COLORS.disabled,
},
slotTextSelected: {
    color: '#FFFFFF',
},
spacer: {
    height: 20,
},
bookButton: {
    marginHorizontal: 24,
    marginBottom: 20,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: COLORS.pinkDark,
    justifyContent: 'center',
    alignItems: 'center',
},
bookButtonDisabled: {
    backgroundColor: '#E8D4CF',
    opacity: 0.6,
},
bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
},
});

export default scheduleBooking;