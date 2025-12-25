
export function formatDate(dateStr: string): string {
  const parts = dateStr.split('/');
  if (parts.length !== 3) return "Invalid Date";
  
  const [month, day, year] = parts.map(p => p.padStart(2, '0'));
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  
  // Validate date is real (handles Feb 30, etc.)
  if (isNaN(date.getTime())) return "Invalid Date";
  
  return `${month}/${day}/${year}`;
}
