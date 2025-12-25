// app/_layout.tsx
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, usePathname, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const AppTitle = "MeTime";
  const isOnboardingVisited = false; //  User Visiting Onboarding screen status
  const router = useRouter();
  const pathname = usePathname();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (hasRedirected.current) return;
    
    if (isOnboardingVisited && pathname === '/') {
      router.replace('/(tabs)');
      hasRedirected.current = true;
    }
  }, [isOnboardingVisited, pathname]);

  return (
    <ThemeProvider value={ DefaultTheme}>
      <Stack>
        <Stack.Screen name="onBoarding/OnBoardingScreen" options={{ headerShown: false }} />
        <Stack.Screen name="onBoarding/Screens" options={{presentation: 'modal', title: AppTitle, headerTitleAlign:'center', headerTitleStyle: {fontWeight: 'bold'} }} />
        <Stack.Screen name="onBoarding/Needs" options={{presentation: 'modal', title: AppTitle,  headerTitleAlign:'center' }} />
        <Stack.Screen name="onBoarding/Professionals" options={{ headerShown: false }} />
        <Stack.Screen name='accounts/Login' options={{title: AppTitle,  headerTitleAlign:'center'}} />
        <Stack.Screen name='accounts/SignUp' options={{title: AppTitle,  headerTitleAlign:'center'}} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="Booking/Bookings" options={{ title: '' }} />
        <Stack.Screen name="Booking/BookingConfirm" options={{ title: ''}} />

      </Stack>
      <StatusBar style='dark' />
    </ThemeProvider>
  );
}
