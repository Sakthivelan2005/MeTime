import { format } from "date-fns";

export function addDays(dateString: string, days: number): string {
  // Split MM/DD/YYYY → create Date manually to avoid locale issues
  const parts = dateString.split('/');
  const date = new Date(
    parseInt(parts[2]), // year
    parseInt(parts[0]) - 1, // month (0-indexed)
    parseInt(parts[1])  // day
  );
  
  date.setDate(date.getDate() + days);
  return format(date, 'MM/dd/yyyy'); // Output: "12/27/2025"
}
