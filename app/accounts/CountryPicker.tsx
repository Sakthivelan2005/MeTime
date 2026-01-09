import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

interface CountryPickerProps {
  selectedCountry: { code: string; name: string; phone: string, flag: String };
  onSelect: (country: { code: string; name: string; phone: string ; flag: string}) => void;
}

const COUNTRIES = [
  { code: 'BR', flag: '🇧🇷', name: 'Brazil', phone: '+55' },
  { code: 'US', flag: '🇺🇸', name: 'United States', phone: '+1' },
  { code: 'IN', flag: '🇮🇳', name: 'India', phone: '+91' },
  { code: 'GB', flag: '🇬🇧', name: 'United Kingdom', phone: '+44' },
  { code: 'CA', flag: '🇨🇦', name: 'Canada', phone: '+1' },
  { code: 'AU', flag: '🇦🇺', name: 'Australia', phone: '+61' },
];

const CountryPicker = ({ selectedCountry, onSelect }: CountryPickerProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const colorScheme = useColorScheme();
  const colors = Colors['light'];

  const filteredCountries = COUNTRIES.filter(
    (country) =>
      country.name.toLowerCase().includes(search.toLowerCase()) ||
      country.phone.includes(search)
  );

  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          paddingHorizontal: 12,
          paddingVertical: 10,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 8,
          backgroundColor: colors.surface,
        }}
        onPress={() => setModalVisible(true)}
      >
        <ThemedText style={{ fontSize: 24 }}>{selectedCountry.flag}</ThemedText>
        <ThemedText >{selectedCountry.phone}</ThemedText>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View
            style={{
              flex: 1,
              marginTop: 100,
              backgroundColor: colors.background,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              paddingHorizontal: 16,
              paddingTop: 16,
            }}
          >
            <ThemedText style={{ marginBottom: 16 }}>
              Select Country
            </ThemedText>

            <TextInput
              placeholder="Search country..."
              value={search}
              onChangeText={setSearch}
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 10,
                marginBottom: 16,
                backgroundColor: colors.surface,
                color: colors.text,
              }}
              placeholderTextColor={colors.textSecondary}
            />

            <ScrollView>
              {filteredCountries.map((country) => (
                <TouchableOpacity
                  key={country.code}
                  onPress={() => {
                    onSelect(country);
                    setModalVisible(false);
                    setSearch('');
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                  }}
                >
                  <ThemedText style={{ fontSize: 24 }}>{country.flag}</ThemedText>
                  <View style={{ flex: 1 }}>
                    <ThemedText>{country.name}</ThemedText>
                    <ThemedText >
                      {country.phone}
                    </ThemedText>
                  </View>
                  <ThemedText>{country.code}</ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                marginTop: 16,
                marginBottom: 20,
                paddingHorizontal: 16,
                paddingVertical: 12,
                backgroundColor: colors.border,
                borderRadius: 8,
              }}
            >
              <ThemedText style={{ textAlign: 'center' }}>Close</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CountryPicker;
