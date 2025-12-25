import { subDays } from "date-fns";

export function getYesterday(): Date {
  return subDays(new Date(), 1);
}