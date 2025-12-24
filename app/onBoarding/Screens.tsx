import { ThemedText } from '@/components/themed-text';
import { Link } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Needs from './Needs';
import Professionals from './Professionals';
import Service from './Service';

const { width } = Dimensions.get('window');

export default function OnBoarding() {
  const [index, setIndex] = React.useState(0);
  const scrollRef = React.useRef<ScrollView>(null);
  const [service, setService] = React.useState('');
  const [item, setItem] = React.useState('');
  const [professionals, setProfessionals] = React.useState('');

  const isLogin = true

  const goToPage = (page: number) => {
    scrollRef.current?.scrollTo({ x: width * page, animated: true });
    setIndex(page);
  };

  const SCREENS = [
    {
      id: '1',
      name: 'Service',
      component: (
        <Service
          goToPage={goToPage}
          setService={setService}
        />
      ),
    },
    {
      id: '2',
      name: 'Needs',
      component: (
        <Needs
          goToPage={goToPage}
          service={service}
          setItem={setItem}
        />
      ),
    },
    {
      id: '3',
      name: 'Professionals',
      component: (
        <Professionals
          professionals={professionals}
          setProfessionals={setProfessionals}
        />
      ),
    },
  ];

  const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: '#fff',
    },
    container: {
      flex: 1,
    },
    page: { width },
    dotsContainer: {
      marginTop: 60,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    dot: {
      width: 15,
      height: 15,
      borderRadius: 10,
      marginHorizontal: 4,
      backgroundColor: '#e0e0e0',
    },
    dotActive: {
      width: 55,
      backgroundColor: '#ff9fb5',
      borderRadius: 10,
    },

    // dark transparent overlay over everything
    dimOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.4)',
    },

    // bottom popup card
    popup: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      paddingHorizontal: 24,
      paddingTop: 24,
      paddingBottom: 32,
      backgroundColor: '#fff',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: -4 },
      elevation: 10,
    },
    popupTitle: {
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom: 8,
    },
    popupSubTitle: {
      textAlign: 'center',
      marginBottom: 24,
    },
    loginButton: {
      backgroundColor: '#FDCCC5',
      paddingVertical: 16,
      alignItems: 'center',
      borderRadius: 10,
    },
    loginText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    createButton: {
      paddingVertical: 16,
      textAlign: 'center',
      color: '#FDCCC5',
    },
  });

  return (
    <View style={styles.root}>
      {/* main content (dots + pages) */}
      <View style={styles.container}>
        <View style={styles.dotsContainer}>
          {SCREENS.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === index && styles.dotActive]}
              onTouchEnd={() => goToPage(i)}
            />
          ))}
        </View>

        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(e) => {
            const page = Math.round(e.nativeEvent.contentOffset.x / width);
            setIndex(page);
          }}
          scrollEventThrottle={16}
        >
          {SCREENS.map((screen, i) => (
            <ScrollView key={i} style={styles.page}>
              {screen.component}
            </ScrollView>
          ))}
        </ScrollView>
      </View>

      {/* show overlay + popup only when not logged in */}
      {!isLogin && (
        <>
          <View style={styles.dimOverlay} />
          <View style={styles.popup}>
            <ThemedText type="32px" style={styles.popupTitle}>
              Hey there!
            </ThemedText>
            <ThemedText type='18px' style={styles.popupSubTitle}>
              Before schedule, please enter your account or create one!
            </ThemedText>

            <Link href="/accounts/Login" asChild>
              <Pressable
                style={styles.loginButton}
              >
                <ThemedText type="16px" style={styles.loginText}>
                  Log In
                </ThemedText>
              </Pressable>
            </Link>

            <Link href="/accounts/SignUp" asChild>
              <Pressable>
                <ThemedText type="16px" style={styles.createButton}>
                  Create Account
                </ThemedText>
              </Pressable>
            </Link>
          </View>
        </>
      )}
    </View>
  );
}
