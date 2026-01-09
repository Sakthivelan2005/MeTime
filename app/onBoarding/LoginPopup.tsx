import { ThemedText } from '@/components/themed-text'
import { Link } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const LoginPopup = () => {
  return (
    <SafeAreaView>
     <ThemedText type="32px" style={styles.popupTitle}>
              Hey there!
            </ThemedText>
            <ThemedText type='18px' style={styles.popupSubTitle}>
              Before schedule, please enter your account or create one!
            </ThemedText>

            <Link href="/accounts/login" asChild>
              <Pressable
                style={styles.loginButton}
              >
                <ThemedText type="16px" style={styles.loginText}>
                  Log In
                </ThemedText>
              </Pressable>
            </Link>

            <Link href="/accounts/signup" asChild>
              <Pressable>
                <ThemedText type="16px" style={styles.createButton}>
                  Create Account
                </ThemedText>
              </Pressable>
            </Link>
    </SafeAreaView>
  )
}

export default LoginPopup

const styles = StyleSheet.create({
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
})