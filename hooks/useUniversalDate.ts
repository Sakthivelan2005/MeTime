// @/hooks/useUniversalDate.ts
import { parse, parseISO } from 'date-fns';
import { useCallback, useMemo } from 'react';
import { formatDate } from './formatDate';

interface UniversalDate {
  dateObj: Date;
  formatted: string;
  dayNumber: string;
  weekday: string;
  monthName: string;
  isValid: boolean;
}


interface UseDateToISO {
  (dateStr: string, timeStr: string): string;
}

export const useDateToISO = (): UseDateToISO => {
  return useCallback((dateStr: string, timeStr: string): string => {
    // Parse MM/DD/YYYY -> [month, day, year]
    const parts = dateStr.split('/').map(Number);
    if (parts.length !== 3) return '';
    
    const month = parts[0] - 1;  // MM -> 0-based
    const day = parts[1];        // DD
    const year = parts[2];       // YYYY
    
    // Parse time "3:00 pm"
    const timeMatch = timeStr.match(/(\d{1,2}):(\d{2})\s*(am|pm)/i);
    if (!timeMatch || isNaN(month) || isNaN(day) || isNaN(year)) return '';
    
    let [, hourStr, minStr, period] = timeMatch;
    let hour = parseInt(hourStr, 10);
    const min = parseInt(minStr, 10);
    
    if (period.toLowerCase() === 'pm' && hour !== 12) hour += 12;
    if (period.toLowerCase() === 'am' && hour === 12) hour = 0;
    
    const date = new Date(year, month, day, hour, min);
    return isNaN(date.getTime()) ? '' : date.toISOString();
  }, []);
};

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
