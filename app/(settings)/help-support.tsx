import { ThemedText } from '@/components/themed-text';
import { Icons } from '@/config/icons';
import { Colors } from '@/constants/Colors';
import { faqs } from '@/data/faqs';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HelpSupportScreen = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors['light'];
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const handleBackPress = () => {
    router.back();
  };

 

  const handleEmailSupport = () => {
    Linking.openURL('mailto:support@metime.com?subject=Help Request');
  };

  const handlePhoneSupport = () => {
    Linking.openURL('tel:+1234567890');
  };

  const handleSubmitMessage = () => {
    if (message.trim()) {
      Alert.alert(
        'Message Sent',
        'Thank you for reaching out. We will get back to you soon!'
      );
      setMessage('');
    } else {
      Alert.alert('Error', 'Please enter a message');
    }
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
            <ThemedText style={styles.backButtonText}>{Icons.leftArrow}</ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Help & Support</ThemedText>
          <View style={{ width: 50 }} />
        </View>

        {/* Contact Support Section */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <ThemedText style={styles.sectionTitle}>Contact Us</ThemedText>

          <TouchableOpacity
            style={[styles.contactItem, { borderBottomColor: colors.border }]}
            onPress={handleEmailSupport}
          >
            <View>
              <ThemedText style={styles.contactLabel}>📧 Email</ThemedText>
              <ThemedText style={styles.contactValue}>
                support@metime.com
              </ThemedText>
            </View>
            <ThemedText style={styles.arrow}>→</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.contactItem, { borderBottomWidth: 0 }]}
            onPress={handlePhoneSupport}
          >
            <View>
              <ThemedText style={styles.contactLabel}>📞 Phone</ThemedText>
              <ThemedText style={styles.contactValue}>+1 (234) 567-890</ThemedText>
            </View>
            <ThemedText style={styles.arrow}>→</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Message Section */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <ThemedText style={styles.sectionTitle}>Send Message</ThemedText>

          <View style={styles.messageContainer}>
            <TextInput
              style={[
                styles.messageInput,
                {
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              placeholder="Describe your issue..."
              placeholderTextColor={colors.textSecondary}
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <TouchableOpacity
              onPress={handleSubmitMessage}
              style={styles.submitButton}
            >
              <ThemedText style={styles.submitButtonText}>Send</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQ Section */}
        <View style={[styles.section, { backgroundColor: colors.surface, marginBottom: 30 }]}>
          <ThemedText style={styles.sectionTitle}>
            Frequently Asked Questions
          </ThemedText>

          {faqs.map((faq) => (
            <View key={faq.id}>
              <TouchableOpacity
                style={[
                  styles.faqItem,
                  {
                    borderBottomColor: colors.border,
                    backgroundColor:
                      expandedFAQ === faq.id
                        ? 'rgba(0, 0, 0, 0.02)'
                        : 'transparent',
                  },
                ]}
                onPress={() =>
                  setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)
                }
              >
                <ThemedText style={styles.faqQuestion}>
                  {faq.question}
                </ThemedText>
                <ThemedText style={styles.faqToggle}>
                  {expandedFAQ === faq.id ? '−' : '+'}
                </ThemedText>
              </TouchableOpacity>

              {expandedFAQ === faq.id && (
                <View style={styles.faqAnswer}>
                  <ThemedText style={styles.faqAnswerText}>
                    {faq.answer}
                  </ThemedText>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpSupportScreen;

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
  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
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
    fontSize: 14,
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  contactLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 13,
    opacity: 0.7,
    marginTop: 4,
  },
  arrow: {
    fontSize: 18,
    opacity: 0.5,
  },
  messageContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 14,
    maxHeight: 150,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  faqToggle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12,
    color: '#2196F3',
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  faqAnswerText: {
    fontSize: 13,
    lineHeight: 20,
    opacity: 0.8,
  },
});
