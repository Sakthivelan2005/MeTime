
export type Booking = {
  id: string;
  shop: string;
  person: string;
  distanceKm: number;
  serviceDetails: string;
  date: string; // ISO date string
  price: number;
  isUpcoming: boolean;
};
export const SAMPLE_BOOKINGS: Booking[] = [
  { id: '1', shop: 'Luxe Salon', person: 'Maya', distanceKm: 2.4, serviceDetails: 'Haircut · Blowdry', date: '2022-03-08T10:00:00Z', price: 30, isUpcoming: false },
  { id: '2', shop: 'Urban Cuts', person: 'Jon', distanceKm: 1.2, serviceDetails: 'Men’s haircut', date: '2023-11-16T14:30:00Z', price: 25, isUpcoming: true },
  { id: '3', shop: 'Glow Studio', person: 'Priya', distanceKm: 4.1, serviceDetails: 'Facial · Deep Cleanse', date: '2024-06-02T09:00:00Z', price: 60, isUpcoming: true },
  { id: '4', shop: 'Luxe Salon', person: 'Rafael', distanceKm: 2.4, serviceDetails: 'Color & Treatment', date: '2021-12-20T12:00:00Z', price: 120, isUpcoming: false },
];