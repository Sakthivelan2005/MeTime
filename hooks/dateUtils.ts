// @/hooks/dateUtils.ts
import { differenceInDays } from 'date-fns';

/**
 * Date utility types for TypeScript
 */
export type DateInput = Date | string | number;
export type FormattedDate = string; // "MM/DD/YYYY"
export type Weekday = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';

/**
 * Adds specified number of days to a base date
 * @param baseDate - Date string, Date object, or timestamp
 * @param days - Number of days to add (can be negative)
 * @returns New Date object
 */
export function addDays(baseDate: DateInput, days: number): Date {
  const date = new Date(baseDate);
  date.setDate(date.getDate() + days);
  return date;
}

/**
 * Formats date string consistently across platforms
 * @param dateStr - Input date string, Date, or timestamp
 * @returns Formatted as "MM/DD/YYYY"
 */
export function formatDate(dateStr: string): string {
  const parts = dateStr.split('/');
  if (parts.length !== 3) return "Invalid Date";
  
  const [month, day, year] = parts.map(p => p.padStart(2, '0'));
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  
  // Validate date is real (handles Feb 30, etc.)
  if (isNaN(date.getTime())) return "Invalid Date";
  
  return `${month}/${day}/${year}`;
}


/**
 * Calculates difference in days between two dates
 * @param date1 - First date (later date)
 * @param date2 - Second date (earlier date) 
 * @returns Days difference (date1 - date2)
 */
export function getDaysDiff(date1: DateInput, date2: DateInput): number {
  return differenceInDays(new Date(date1), new Date(date2));
}

/**
 * Gets weekday name from date
 * @param date - Date object, string, or timestamp
 * @returns Weekday name (e.g. "Mon")
 */
export function getWeekday(date: DateInput): Weekday {
  const weekdays: Weekday[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dateObj = new Date(date);
  return weekdays[dateObj.getDay()] as Weekday;
}

/**
 * Gets full month name from date
 * @param date - Date object, string, or timestamp
 * @returns Month name (e.g. "December")
 */
export function getMonthName(date: DateInput): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dateObj = new Date(date);
  return months[dateObj.getMonth()];
}

/**
 * Checks if date is today
 * @param date - Date to check
 * @returns True if date is today
 */
export function isToday(date: DateInput): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  return today.getTime() === checkDate.getTime();
}

/**
 * Checks if date is in future (after today)
 * @param date - Date to check
 * @returns True if date is in the future
 */
export function isFutureDate(date: DateInput): boolean {
  const today = new Date();
  return new Date(date) > today;
}

/**
 * Formats time string consistently
 * @param timeStr - Time like "1:30 pm"
 * @returns Normalized time string
 */
export function formatTime(timeStr: string): string {
  return timeStr.toLowerCase().trim();
}

/**
 * Generates date range array
 * @param startDate - Start date
 * @param daysCount - Number of days
 * @returns Array of Date objects
 */
export function generateDateRange(startDate: DateInput, daysCount: number): Date[] {
  return Array.from({ length: daysCount }, (_, i) => 
    addDays(startDate, i)
  );
}

/**
 * Converts date to consistent string format for comparisons
 * @param date - Date input
 * @returns YYYY-MM-DD format for reliable comparisons
 */
export function toDateString(date: DateInput): string {
  return new Date(date).toISOString().split('T')[0];
}

/**
 * Validates if input is a valid date
 * @param date - Date input to validate
 * @returns True if valid date
 */
export function isValidDate(date: DateInput): boolean {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
}
