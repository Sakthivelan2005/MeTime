import { ThemedText } from '@/components/themed-text';
import { Images } from '@/config/Images';
import { profiles } from '@/constants/profiles';
import { CreateButton } from '@/hooks/Button';
import { useUniversalDate } from '@/hooks/useUniversalDate';
import { Image } from 'expo-image';
import { Link, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

const BookingConfirm = () => {
  const {width, height} = useWindowDimensions();
   const{date, time, id} = useLocalSearchParams();
   
   const selected = profiles.find(i => i.id === Number(id));
   const formattedDate = `${useUniversalDate(String(date)).weekday}, ${useUniversalDate(String(date)).dayNumber}`;
 const styles = StyleSheet.create({
  screen:{
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingLeft: width/15,
    paddingRight: width/15,
    flexDirection: 'column',
    gap: height/40,
  },
  ImageContainer: {
    width: width,
    height: width/1.5,
  },
  Image:{
    width: width/3.5,
    height: width/3.5,
    alignSelf: 'center',
    marginTop: width/6
  },
  MeTime:{
    fontWeight: 'bold',
    color: "black",
  },
  Message:{
    textAlign: 'center',
    marginBottom: height/30,
  },
  details:{
    color: '#000'
  },
  location:{
    textDecorationLine: 'underline',
    color: "#000",
    fontSize: 18,
    marginBottom: height/18
  },
  link:{
    fontSize: 18,
    textDecorationLine:'none'  }
})
   return (
    <View style={styles.screen}>
      <View style={styles.ImageContainer}>
        <Image source={Images.heart} style={styles.Image} />
      </View>
      <ThemedText type="24px" style={styles.Message}>Thank you for booking with <Text style={styles.MeTime}>MeTime</Text></ThemedText>
     
     <ThemedText type='18px' style={styles.details}>Your Booking Details</ThemedText>
     <ThemedText type='18px' style={styles.details}>{formattedDate}        {time}</ThemedText>
     <ThemedText type='18px' style={styles.details}>At {selected?.shop} </ThemedText>
     <ThemedText type='32px' style={styles.location}>At {selected?.location} </ThemedText>     
     <Link  href={'/Booking/BookingsScreen'} asChild>
     {CreateButton("Keep Booking")}
     </Link>
     <ThemedText type='link' style={styles.link}>Main Page</ThemedText>
    </View>
  )
}

export default BookingConfirm


