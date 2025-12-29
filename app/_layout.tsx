// app/_layout.tsx
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { PaymentProvider } from './payment/PaymentContext';


export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const AppTitle = "MeTime";



  useEffect(() => {
    const setupNavBar = async () => {
      // Hide nav bar initially
      await NavigationBar.setVisibilityAsync('hidden');   
    };
    setupNavBar();
  }, []);




  return (
    <ThemeProvider value={ DefaultTheme}>
      <PaymentProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onBoarding/OnBoardingScreen" options={{ headerShown: false }} />
        <Stack.Screen name="onBoarding/Screens" options={{presentation: 'modal', title: AppTitle, headerTitleAlign:'center', headerTitleStyle: {fontWeight: 'bold'} }} />
        <Stack.Screen name="onBoarding/Needs" options={{presentation: 'modal', title: AppTitle,  headerTitleAlign:'center' }} />
        <Stack.Screen name="onBoarding/Professionals" options={{ headerShown: false }} />
        <Stack.Screen name='accounts/Login' options={{title: AppTitle,  headerTitleAlign:'center'}} />
        <Stack.Screen name='accounts/SignUp' options={{title: AppTitle,  headerTitleAlign:'center'}} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="Booking/Bookings" options={{ title: '' }} />
        <Stack.Screen name="Booking/BookingsScreen" options={{ title: AppTitle, headerTitleAlign: 'center' }} />
        <Stack.Screen name="Booking/BookingConfirm" options={{ title: ''}} />
        <Stack.Screen name="payment/AddPaymentMethodScreen" options={{ title: 'Add payment method', headerTitleAlign: 'center' }} />
        <Stack.Screen name="payment/AddCardScreen" options={{ title: AppTitle, headerTitleAlign: 'center' }} />

      </Stack>
      <StatusBar style='dark' />
      </PaymentProvider>
    </ThemeProvider>
  );
}
