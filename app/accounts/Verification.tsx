import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

const VerificationScreen = () => {
  const {
    countryCode,
    phoneNumber,
    otp,
    setOtp,
    verificationCode,
    setCurrentStep,
    sendVerificationCode,
  } = useAuth();

  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');
  const [otpExpired, setOtpExpired] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors['light'];
  const notificationListener = useRef<Notifications.EventSubscription | null>(null);

  // Listen for notifications to auto-fill OTP
  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      const receivedOtp = notification.request.content.data?.otp as string;
      if (receivedOtp) {
        setOtp(receivedOtp);
        console.log('OTP auto-filled from notification');
      }
    });

    return () => {
      notificationListener.current?.remove();
    };
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !otpExpired) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !otpExpired) {
      setOtpExpired(true);
      setCanResend(true);
    }
  }, [timeLeft, otpExpired]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpInput = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    setOtp(cleaned.slice(0, 6));
    setError('');
  };

  const handleVerify = () => {
    if (otp.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    if (otpExpired) {
      setError('OTP has expired. Please request a new one.');
      return;
    }

    console.log('Verifying OTP:', otp, 'Expected:', verificationCode);

    if (otp === verificationCode) {
      setError('');
      Alert.alert('Success', 'Phone number verified successfully!');
      setCurrentStep('signup');
      router.navigate('/Home');
    } else {
      setError('Incorrect verification code. Please try again.');
    }
  };

  const handleResendCode = async () => {
    try {
      setCanResend(false);
      setTimeLeft(300); // Reset to 5 minutes
      setOtp('');
      setError('');
      setOtpExpired(false);
      
      // Send new OTP
      await sendVerificationCode(countryCode + phoneNumber);
      Alert.alert('Success', 'New OTP sent to your device');
    } catch (error) {
      console.error('Error resending code:', error);
      Alert.alert('Error', 'Failed to resend OTP');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={{ flex: 1, padding: 20, justifyContent: 'space-between' }}>
          {/* Header */}
          <View style={{ marginTop: 30 }}>
            <ThemedText style={{ textAlign: 'center', marginBottom: 30, fontSize: 28, fontWeight: 'bold' }}>
              Enter code
            </ThemedText>

            <ThemedText style={{ marginBottom: 20, textAlign: 'center' }}>
              We've sent an SMS with an activation code to your phone {countryCode} {phoneNumber}
            </ThemedText>

            {/* OTP Input Fields */}
            <View style={{ marginBottom: 20 }}>
              <TextInput
                value={otp}
                onChangeText={handleOtpInput}
                keyboardType="number-pad"
                maxLength={6}
                placeholder="••••••"
                editable={!otpExpired}
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  letterSpacing: 10,
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  borderWidth: 1,
                  borderColor: error ? colors.primary : colors.border,
                  borderRadius: 8,
                  backgroundColor: colors.surface,
                  color: colors.text,
                }}
                placeholderTextColor={colors.textSecondary}
              />

              {/* Visual OTP Boxes */}
              <View
                style={{
                  flexDirection: 'row',
                  gap: 8,
                  marginTop: 12,
                  justifyContent: 'center',
                }}
              >
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <View
                    key={index}
                    style={{
                      width: 45,
                      height: 45,
                      borderWidth: 1,
                      borderColor: otp[index] ? colors.primary : colors.border,
                      borderRadius: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: otp[index] ? colors.primary : colors.surface,
                    }}
                  >
                    <ThemedText
                      style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: otp[index] ? '#FFFFFF' : 'transparent',
                      }}
                    >
                      {otp[index] || '•'}
                    </ThemedText>
                  </View>
                ))}
              </View>
            </View>

            {/* Timer */}
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <ThemedText
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: timeLeft <= 60 ? colors.primary : colors.textSecondary,
                }}
              >
                OTP expires in: {formatTime(timeLeft)}
              </ThemedText>
            </View>

            {/* Error Message */}
            {error && (
              <ThemedText
                style={{
                  textAlign: 'center',
                  marginBottom: 20,
                  color: colors.primary,
                  fontWeight: '600',
                }}
              >
                {error}
              </ThemedText>
            )}

            {/* Resend Section */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4 }}>
              <ThemedText>Send code again</ThemedText>
              {canResend ? (
                <TouchableOpacity onPress={handleResendCode}>
                  <ThemedText style={{ fontWeight: '600', color: colors.primary }}>
                    Resend
                  </ThemedText>
                </TouchableOpacity>
              ) : (
                <ThemedText style={{ fontWeight: '600', color: colors.primary }}>
                  {formatTime(timeLeft)}
                </ThemedText>
              )}
            </View>
          </View>

          {/* Verify Button */}
          <View style={{ marginBottom: 30 }}>
            <TouchableOpacity
              onPress={handleVerify}
              disabled={otp.length !== 6 || otpExpired}
              style={{
                backgroundColor:
                  otp.length === 6 && !otpExpired ? colors.primary : colors.border,
                paddingVertical: 14,
                borderRadius: 8,
              }}
            >
              <ThemedText
                style={{
                  textAlign: 'center',
                  fontWeight: '600',
                  color:
                    otp.length === 6 && !otpExpired ? '#FFFFFF' : colors.textSecondary,
                }}
              >
                Verify
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default VerificationScreen;