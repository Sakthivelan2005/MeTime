import { Months } from '@/constants/date';

import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { format, parse } from 'date-fns';
import React, { useState } from 'react';
import { Platform, View } from 'react-native';

type DatePickerProps = {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  setMonth: React.Dispatch<React.SetStateAction<string>>;
  onClose?: () => void;
};

export default function CrossPlatformDatePicker({
  selectedDate,
  setSelectedDate,
  setMonth,
  onClose,
}: DatePickerProps) {
  const [date, setDate] = useState(parse(selectedDate, 'MM/dd/yyyy', new Date()));

  const onChange = (event: DateTimePickerEvent, selected?: Date) => {
    const current = selected ?? date;
    setDate(current);
    
    // Update BookingScreen state as strings
    const dd = format(current, 'MM/dd/yyyy'); // e.g. "12/25/2025"


  // e.g. "Mon", "Tue"

    setSelectedDate(dd);
    setMonth(Months[Number(dd.substring(0,2)) - 1]);

    if (Platform.OS !== 'ios' && onClose) {
      onClose();
    }
  };

  const today = new Date();
  const maxDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()+14
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
