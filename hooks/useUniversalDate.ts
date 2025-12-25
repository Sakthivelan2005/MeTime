// @/hooks/useUniversalDate.ts
import { parse, parseISO } from 'date-fns';
import { useMemo } from 'react';
import { formatDate } from './formatDate';

interface UniversalDate {
  dateObj: Date;
  formatted: string;
  dayNumber: string;
  weekday: string;
  monthName: string;
  isValid: boolean;
}

export const useUniversalDate = (dateInput: string): UniversalDate => {
  return useMemo(() => {
    let dateObj = new Date(); // Default: today
    let isValid = false;

    // 1. Try ISO
    try {
      dateObj = parseISO(dateInput);
      isValid = !isNaN(dateObj.getTime());
      if (isValid) return formatResult(dateObj);
    } catch {}

    // 2. Try MM/DD/YYYY
    try {
      dateObj = parse(dateInput, 'MM/dd/yyyy', new Date());
      isValid = !isNaN(dateObj.getTime());
      if (isValid) return formatResult(dateObj);
    } catch {}

    // 3. Try DD/MM/YYYY
    try {
      dateObj = parse(dateInput, 'dd/MM/yyyy', new Date());
      isValid = !isNaN(dateObj.getTime());
      if (isValid) return formatResult(dateObj);
    } catch {}

    // 4. Manual parsing
    const parts = dateInput.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
    if (parts) {
      const [, month, day, year] = parts.map(Number);
      dateObj = new Date(year, month - 1, day);
      isValid = !isNaN(dateObj.getTime());
      if (isValid) return formatResult(dateObj);
    }

    // 5. Fallback: today
    return formatResult(new Date());

    // ✅ Helper function - always returns valid Date
    function formatResult(date: Date): UniversalDate {
      return {
        dateObj: date,
        formatted: formatDate(date.toLocaleDateString('en-US')),
        dayNumber: date.getDate().toString().padStart(2, '0'),
        weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
        monthName: date.toLocaleDateString('en-US', { month: 'long' }),
        isValid: true
      };
    }
  }, [dateInput]);
};
