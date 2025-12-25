export function getDaysDiff(date1Str: string, date2Str: string) : number {
  const [month1, day1, year1] = date1Str.split('/').map(Number);
  const [month2, day2, year2] = date2Str.split('/').map(Number);
  const date1 = new Date(year1, month1 - 1, day1); // Month is 0-indexed
  const date2 = new Date(year2, month2 - 1, day2); // Month is 0-indexed
 
  
  // Validate dates first
  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
    return 0; // or throw new Error("Invalid dates")
  }
  
  const diffInMs = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
}
