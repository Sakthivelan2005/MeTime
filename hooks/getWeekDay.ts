import { formatDate } from "./formatDate";

export const getWeekday = (dateString: string): string => {
  const [month, day, year] = formatDate(dateString).split('/').map(Number);
  const date = new Date(year, month - 1, day);
  
  // Always return valid weekday, fallback to 'Mon'
  return date.toLocaleDateString('en-US', { weekday: 'short' }) || 'Mon';
};
