import { ThemedText } from '@/components/themed-text';
import { Icons } from '@/config/icons';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors['light'];
  const { fullName, email } = useAuth();

  // Settings states
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(colorScheme === 'dark');
  const [locationEnabled, setLocationEnabled] = useState(true);

  const handleBackPress = () => {
    router.back();
  };

  const handleNotificationToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
    Alert.alert(
      'Notifications',
      `Notifications ${!notificationsEnabled ? 'enabled' : 'disabled'}`
    );
  };

  const handleEmailToggle = () => {
    setEmailNotifications(!emailNotifications);
  };

  const handleLocationToggle = () => {
    setLocationEnabled(!locationEnabled);
    Alert.alert(
      'Location Services',
      `Location services ${!locationEnabled ? 'enabled' : 'disabled'}`
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleBackPress}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ThemedText >{Icons.leftArrow}</ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Settings</ThemedText>
          <View style={{ width: 50 }} />
        </View>

        {/* Profile Section */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <ThemedText style={styles.sectionTitle}>Account</ThemedText>
          <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
            <View>
              <ThemedText style={styles.settingLabel}>Name</ThemedText>
              <ThemedText style={styles.settingValue}>
                {fullName || 'Not set'}
              </ThemedText>
            </View>
          </View>
          <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
            <View>
              <ThemedText style={styles.settingLabel}>Email</ThemedText>
              <ThemedText style={styles.settingValue}>
                {email || 'Not set'}
              </ThemedText>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.settingItem, { borderBottomWidth: 0 }]}
            onPress={() => router.push('/accounts/signup')}
          >
            <ThemedText style={styles.settingAction}>
              Edit Profile {Icons.front}
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Notifications Section */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <ThemedText style={styles.sectionTitle}>Notifications</ThemedText>

          <View
            style={[
              styles.settingItemWithSwitch,
              { borderBottomColor: colors.border },
            ]}
          >
            <View>
              <ThemedText style={styles.settingLabel}>
                Push Notifications
              </ThemedText>
              <ThemedText style={styles.settingDescription}>
                Receive booking reminders and updates
              </ThemedText>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationToggle}
              trackColor={{ false: '#767577', true: '#81C784' }}
              thumbColor={notificationsEnabled ? '#4CAF50' : '#f4f3f4'}
            />
          </View>

          <View
            style={[
              styles.settingItemWithSwitch,
              { borderBottomColor: colors.border },
            ]}
          >
            <View>
              <ThemedText style={styles.settingLabel}>
                Email Notifications
              </ThemedText>
              <ThemedText style={styles.settingDescription}>
                Get updates via email
              </ThemedText>
            </View>
            <Switch
              value={emailNotifications}
              onValueChange={handleEmailToggle}
              trackColor={{ false: '#767577', true: '#81C784' }}
              thumbColor={emailNotifications ? '#4CAF50' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Privacy & Security Section */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <ThemedText style={styles.sectionTitle}>Privacy & Security</ThemedText>

          <View
            style={[
              styles.settingItemWithSwitch,
              { borderBottomColor: colors.border },
            ]}
          >
            <View>
              <ThemedText style={styles.settingLabel}>
                Location Services
              </ThemedText>
              <ThemedText style={styles.settingDescription}>
                Allow access to your location
              </ThemedText>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={handleLocationToggle}
              trackColor={{ false: '#767577', true: '#81C784' }}
              thumbColor={locationEnabled ? '#4CAF50' : '#f4f3f4'}
            />
          </View>

          <TouchableOpacity
            style={[styles.settingItem, { borderBottomWidth: 0 }]}
          >
            <ThemedText style={styles.settingAction}>
              Privacy Policy {Icons.front}
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <View style={styles.settingItem}>
            <ThemedText style={styles.settingLabel}>App Version</ThemedText>
            <ThemedText style={styles.settingValue}>1.0.0</ThemedText>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  section: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  settingItemWithSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  settingLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 15,
    opacity: 0.6,
    marginTop: 4,
  },
  settingValue: {
    fontSize: 15,
    opacity: 0.7,
    marginTop: 4,
  },
  settingAction: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2196F3',
  },
});
