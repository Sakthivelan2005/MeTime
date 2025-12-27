// app/_layout.tsx
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const AppTitle = "MeTime";

  return (
    <ThemeProvider value={ DefaultTheme}>
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
        <Stack.Screen name="Booking/BookingConfirm" options={{ title: ''}} />

      </Stack>
      <StatusBar style='dark' />
    </ThemeProvider>
  );
}
