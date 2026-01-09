import { ThemedText } from '@/components/themed-text';
import { Images } from '@/config/Images';
import { needs } from '@/data/need';
import { profiles } from '@/data/profiles';
import { CreateButton } from '@/hooks/Button';
import { useUniversalDate } from '@/hooks/useUniversalDate';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
const BookingConfirm = () => {
  const route = useRouter();
  const {width, height} = useWindowDimensions();
   const{iso ,date, time, id, item} = useLocalSearchParams();
   const selectedItem = needs.find((i)=> i.id === Number(item))
   const selected = profiles.find(i => i.id === Number(id));
   const formattedDate = `${useUniversalDate(String(date)).weekday}, ${useUniversalDate(String(date)).dayNumber}`;
   const onBook = () => {
 route.navigate({
      pathname: "/onBoarding/Screens",
      params: {iso: iso , formattedDate: formattedDate, time: time,id: id, item: item, shop: selected?.shop, location: selected?.location, page: 3}
     })
}
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
    height: width/2,
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
    textDecorationLine:'none' 
  },
  button:{
    margin: 1,
    width: "90%"
  }
})
   return (
    <View style={styles.screen}>
      <View style={styles.ImageContainer}>
        <Image source={Images.heart} style={styles.Image} />
      </View>
      <ThemedText type="24px" style={styles.Message}>Thank you for booking with <Text style={styles.MeTime}>MeTime</Text></ThemedText>
     
     <ThemedText type='18px' style={styles.details}>Your Booking Details</ThemedText>
     <ThemedText type='18px' style={styles.details}>{formattedDate}        {time}</ThemedText>
     <ThemedText type='18px' style={styles.details}>You Booking for  {selectedItem?.name} </ThemedText>     
     <ThemedText type='18px' style={styles.details}>At {selected?.shop} </ThemedText>
     <ThemedText type='32px' style={styles.location}>At {selected?.location} </ThemedText>     
     <TouchableOpacity style={styles.button} onPress={onBook}>
     {CreateButton("Keep Booking")}
     </TouchableOpacity>
     <ThemedText type='link' style={styles.link}>Main Page</ThemedText>
    </View>
  )
}

export default BookingConfirm


