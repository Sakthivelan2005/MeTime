import { ThemedText } from '@/components/themed-text';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const profiles= [
  {
    id: 1,
    name: 'Anna Smith',
    profile: require('D:/MyFirstReactNativeApp/assets/images/Onboarding/Professionals/Anna Smith.jpeg'),
    designation: 'Nail designer',
    star: 5.0
  },
  {
    id: 2,
    name: 'Jordan Mcmiller',
    profile: require('D:/MyFirstReactNativeApp/assets/images/Onboarding/Professionals/Jordan Mcmiller.jpg'),
    designation: 'Nail designer',
    star: 4.9
  },
  {
    id: 3,
    name: 'Paty Sinclair',
    profile: require('D:/MyFirstReactNativeApp/assets/images/Onboarding/Professionals/Paty Sinclair.jpg'),
    designation: 'Nail designer',
    star: 4.9
  },
];

function Bookings() {
    const {id} = useLocalSearchParams();
    const selected = profiles.find(i => i.id === Number(id));
   
    
    return (
       <View style={styles.screen}>
        <Image source={selected?.profile} style={styles.profile} />
        <ThemedText type='title'>{selected?.name}</ThemedText>
        <ThemedText>{selected?.designation}</ThemedText>
        <ThemedText>{selected?.star}</ThemedText>
        <ThemedText>{}</ThemedText>
       </View>
    );
}

const styles = StyleSheet.create({
    screen:{
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    profile:{
        width:150,
        height:150,
        alignItems:'center',
        borderRadius: 10
    }
})
export default Bookings;