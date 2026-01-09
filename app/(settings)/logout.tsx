import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    View,
    useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LogoutScreen = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors['light'];
  const { resetAuth } = useAuth();

  useEffect(() => {
    // Show confirmation dialog
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => router.back(),
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: handleLogout,
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  }, []);

  const handleLogout = () => {
    // Reset auth context
    resetAuth();

    // Show goodbye message
    Alert.alert('Logged Out', 'You have been successfully logged out.', [
      {
        text: 'OK',
        onPress: () => {
          // Navigate back to login screen
          router.replace('/accounts/login');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <ThemedText style={styles.message}>Logging out...</ThemedText>
      </View>
    </SafeAreaView>
  );
};

export default LogoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
  },
});
