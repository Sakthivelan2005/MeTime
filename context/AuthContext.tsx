import { AuthContextType } from '@/types';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { createContext, useContext, useState } from 'react';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true
  }),
});

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [flag, setFlag] = useState('🇧🇷');
  const [countryCode, setCountryCode] = useState('+55');
  const [countryName, setCountryName] = useState('Brazil');
  const [verificationCode, setVerificationCode] = useState('');
  const [otp, setOtp] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentStep, setCurrentStep] = useState<'login' | 'verification' | 'signup'>('login');

  // Request notification permissions on initialization
  React.useEffect(() => {
    requestNotificationPermissions();
  }, []);

  // Request notification permissions
  const requestNotificationPermissions = async () => {
    if (!Device.isDevice) {
      console.log('Notifications only work on physical devices');
      return;
    }

    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Notification permission not granted');
      }
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
    }
  };

  // Generate 6-digit OTP
  const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Send verification code with local notification
  const sendVerificationCode = async (phone: string) => {
    try {
      // Generate OTP
      const mockOtp = generateOTP();
      setVerificationCode(mockOtp);
      setOtp('');

      // Send local notification with OTP
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Your OTP Code',
          body: `Your verification code is: ${mockOtp}`,
          data: {
            otp: mockOtp,
            type: 'otp_verification',
            phone,
          },
          sound: 'default',
          badge: 1,
        },
        trigger: {
          type:Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 1, // Show immediately
        },
      });

      console.log('OTP sent:', mockOtp);
    } catch (error) {
      console.error('Error sending verification code:', error);
    }
  };

  const resetAuth = () => {
    setPhoneNumber('');
    setFlag('🇧🇷');
    setCountryCode('+55');
    setCountryName('Brazil');
    setVerificationCode('');
    setOtp('');
    setFullName('');
    setEmail('');
    setPassword('');
    setCurrentStep('login');
  };

  return (
    <AuthContext.Provider
      value={{
        phoneNumber,
        setPhoneNumber,
        flag,
        setFlag,
        countryCode,
        setCountryCode,
        countryName,
        setCountryName,
        verificationCode,
        setVerificationCode,
        otp,
        setOtp,
        fullName,
        setFullName,
        email,
        setEmail,
        password,
        setPassword,
        currentStep,
        setCurrentStep,
        sendVerificationCode,
        resetAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};