
type Booking = {
  id: string;
  salonName: string;
  stylistName: string;
  distanceKm: number;
  serviceDetails: string;
  date: string; // ISO date string
  price: number;
  isUpcoming: boolean;
};
export const SAMPLE_BOOKINGS: Booking[] = [
  { id: '1', salonName: 'Luxe Salon', stylistName: 'Maya', distanceKm: 2.4, serviceDetails: 'Haircut · Blowdry', date: '2022-03-08T10:00:00Z', price: 30, isUpcoming: false },
  { id: '2', salonName: 'Urban Cuts', stylistName: 'Jon', distanceKm: 1.2, serviceDetails: 'Men’s haircut', date: '2023-11-16T14:30:00Z', price: 25, isUpcoming: true },
  { id: '3', salonName: 'Glow Studio', stylistName: 'Priya', distanceKm: 4.1, serviceDetails: 'Facial · Deep Cleanse', date: '2024-06-02T09:00:00Z', price: 60, isUpcoming: true },
  { id: '4', salonName: 'Luxe Salon', stylistName: 'Rafael', distanceKm: 2.4, serviceDetails: 'Color & Treatment', date: '2021-12-20T12:00:00Z', price: 120, isUpcoming: false },
];