import DateTimePicker, {
    DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, View } from 'react-native';

type DatePickerProps = {
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  setMonth: React.Dispatch<React.SetStateAction<string>>;
  setDay: React.Dispatch<React.SetStateAction<string>>;
  onClose?: () => void;
};

export default function CrossPlatformDatePicker({
  setSelectedDate,
  setMonth,
  onClose,
  setDay
}: DatePickerProps) {
  const [date, setDate] = useState(new Date());

  const onChange = (event: DateTimePickerEvent, selected?: Date) => {
    const current = selected ?? date;
    setDate(current);

    // Update BookingScreen state as strings
    const dd = String(current.getDate()).padStart(2, '0');
    const monthName = current.toLocaleString('en-US', { month: 'long' });
    const weekdayName = current.toLocaleString('en-US', { weekday: 'short' }); 
  // e.g. "Mon", "Tue"

    setSelectedDate(dd);
    setMonth(monthName);
    setDay(weekdayName);

    if (Platform.OS !== 'ios' && onClose) {
      onClose();
    }
  };

  const today = new Date();
  const maxDate = new Date(
    today.getFullYear(),
    today.getMonth() + 2,
    today.getDate()
  );

  return (
    <View>
      <DateTimePicker
        value={date}
        mode="date"
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        minimumDate={today}
        maximumDate={maxDate}
        onChange={onChange}
      />
    </View>
  );
}
