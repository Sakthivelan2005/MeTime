// app/_layout.tsx
import { AuthProvider } from '@/context/AuthContext';
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
  const AppTitle = 'MeTime';

  useEffect(() => {
    const setupNavBar = async () => {
      // Hide nav bar initially
      await NavigationBar.setVisibilityAsync('hidden');
    };
    setupNavBar();
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider value={DefaultTheme}>
        <PaymentProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="onBoarding/OnBoardingScreen"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="onBoarding/Screens"
              options={{
                presentation: 'modal',
                title: AppTitle,
                headerTitleAlign: 'center',
                headerTitleStyle: { fontWeight: 'bold' },
              }}
            />
            <Stack.Screen
              name="onBoarding/Needs"
              options={{
                presentation: 'modal',
                title: AppTitle,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="onBoarding/Professionals"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="accounts/login"
              options={{ title: "Login", headerTitleAlign: 'center' }}
            />
            <Stack.Screen
              name="accounts/signup"
              options={{ title: "Sign Up", headerTitleAlign: 'center' }}
            />
            <Stack.Screen
              name="accounts/Verification"
              options={{ title: "Verification", headerTitleAlign: 'center' }}
            />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="Home" options={{ headerShown: false }} />
            <Stack.Screen
              name="pages/Profiles"
              options={{ title: 'Professionals', headerTitleAlign: 'center' }}
            />
            <Stack.Screen
              name="pages/ProfileDetail"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Booking/Bookings" options={{ title: '' }} />
            <Stack.Screen name="Booking/BookingConfirm" options={{ title: '' }} />
            <Stack.Screen
              name="payment/AddPaymentMethodScreen"
              options={{
                title: 'Add payment method',
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="payment/AddCardScreen"
              options={{ title: AppTitle, headerTitleAlign: 'center' }}
            />
            <Stack.Screen
              name="(settings)"
              options={{ headerShown: false }}
            />
          </Stack>
          <StatusBar style="dark" />
        </PaymentProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
