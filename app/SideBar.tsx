import { ThemedText } from '@/components/themed-text';
import { Icons } from '@/config/icons';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'expo-router';
import React, { useEffect } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

type SideBarProps = {
  setShowBar: (value: boolean) => void;
  isVisible: boolean;
};

const SIDEBAR_WIDTH = 280;
const { width, height } = Dimensions.get('window');

const SideBar = ({ setShowBar, isVisible }: SideBarProps) => {
  const colorScheme = useColorScheme();
  const colors = Colors['light'];
  const {fullName,phoneNumber} = useAuth();

  // Animation refs
  const slideAnim = React.useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  // Trigger animation when visibility changes
  useEffect(() => {
    if (isVisible) {
      // Slide in + fade in
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Slide out + fade out
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -SIDEBAR_WIDTH,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible]);
  console.log("status: ",(!!fullName || !!phoneNumber))
 console.log("status: ",fullName ,"    ",phoneNumber)

  const handleClose = () => {
    setShowBar(false);
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="none"
      onRequestClose={handleClose}
    >
      {/* Overlay Backdrop */}
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: fadeAnim,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        ]}
      >
        <TouchableOpacity
          style={styles.overlayTouchable}
          activeOpacity={1}
          onPress={handleClose}
        />
      </Animated.View>

      {/* Sidebar Panel */}
      <Animated.View
        style={[
          styles.sidebar,
          {
            backgroundColor: colors.surface,
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        {/* Header with Close Button */}
        <View style={styles.sidebarHeader}>
          <TouchableOpacity
            onPress={handleClose}
            style={styles.closeButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {Icons.cross}
          </TouchableOpacity>
          <ThemedText style={styles.sidebarTitle}>Menu</ThemedText>
          
        </View>

       {/* Navigation Links */}
        <View style={styles.navContainer}>
          {/* Booking Link */}
          <Link href="/onBoarding/Screens" asChild>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.navLink}
            >
              <ThemedText style={styles.navLinkText}>
                📅 Place Appointment
              </ThemedText>
            </TouchableOpacity>
          </Link>

          {/* Booking Link */}
          <Link href="/Booking/BookingsScreen" asChild>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.navLink}
            >
              <ThemedText style={styles.navLinkText}>
                📋 Bookings
              </ThemedText>
            </TouchableOpacity>
          </Link>

          {/* Professionals Link */}
          <Link href="/pages/Profiles" asChild>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.navLink}
            >
              <ThemedText style={styles.navLinkText}>
                👥 Professionals
              </ThemedText>
            </TouchableOpacity>
          </Link>

          {/* Divider */}
          <View style={[styles.divider, { borderColor: colors.border }]} />

          {/* Settings Link */}
          <Link href="/(settings)/settings" asChild>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.navLink}
            >
              <ThemedText style={styles.navLinkText}>
                ⚙️ Settings
              </ThemedText>
            </TouchableOpacity>
          </Link>

          {/* Help & Support Link */}
          <Link href="/(settings)/help-support" asChild>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.navLink}
            >
              <ThemedText style={styles.navLinkText}>
                ❓ Help & Support
              </ThemedText>
            </TouchableOpacity>
          </Link>

          {/* Logout Link */}
          {(!!fullName || !!phoneNumber)? 
        
          ( <Link href="/(settings)/logout" asChild>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.navLink}
            >
              <ThemedText style={styles.navLinkText}>
                🚪 Logout
              </ThemedText>
            </TouchableOpacity>
          </Link>)
          :
          (<Link href="/accounts/login" asChild>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.navLink}
            >
              <ThemedText style={styles.navLinkText}>
                🚪 Login
              </ThemedText>
            </TouchableOpacity>
          </Link>)}
         
        </View>


        {/* Footer */}
        <View style={styles.sidebarFooter}>
          <ThemedText style={styles.footerText}>MeTime v1.0</ThemedText>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default SideBar;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  overlayTouchable: {
    flex: 1,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SIDEBAR_WIDTH,
    height: height,
    zIndex: 2,
    paddingTop: 20,
    paddingHorizontal: 0,
    flexDirection: 'column',
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    marginBottom: 12,
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center'
  },
  closeButton: {
    padding: 8,
  },
  navContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  navLink: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  navLinkText: {
    fontSize: 15,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    marginVertical: 12,
    borderTopWidth: 1,
  },
  sidebarFooter: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    opacity: 0.6,
  },
});
