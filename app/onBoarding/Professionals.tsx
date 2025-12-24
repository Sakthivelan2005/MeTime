import { ThemedText } from '@/components/themed-text';
import { Images } from '@/config/Images';
import { profiles } from '@/constants/profiles';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';

type professionalsProps = {
  professionals: string;
  setProfessionals: (value: string) => void;
}
export default function Professionals({setProfessionals}:professionalsProps) {
  
const { width, height } = useWindowDimensions();
const styles = StyleSheet.create({
    screen: {
      padding: 5
    },
    container:{
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 20
    },
    pressed:{
      backgroundColor: '#FDCCC540'
    },
    image:{
      height: 100,
      width: 100,
      borderRadius: 10
    },
    details:{
      left: 0
    },
    name:{
      fontSize:20,
      color: '#0F0F0F',
      fontWeight: '700'
    },
    title:{
      fontSize: 30,
      padding: 20,
      textAlign: 'center',
      color: '#0F0F0F'
    },
    star:{
      left: width - 190,
      flexDirection:'column',
      flexWrap: 'wrap',
      height:20,
    },
    starImage:{
      height:20,
      width:20
    },
    link:{
      textAlign: 'center',
      fontSize: 20,
      padding: 30
    }
})
const Profiles =  profiles.map((i) => {
  return(
    <Link href={{
      pathname:"/Booking/Bookings",
      params: { id: i.id}
    }} 
      key={i.id}
      style={styles.container}
      asChild>
      <Pressable  style={({pressed}) =>[styles.container, pressed && styles.pressed]}
      onPress={()=>{setProfessionals(i.name)}}>
        
        <Image source={i.profile} style={styles.image} />
         <View style={styles.star}>
          <Image style={styles.starImage} source={Images.Star} />
          <ThemedText>{parseFloat(String(i.star)).toFixed(1)}</ThemedText>
        </View>
        <View style={styles.details}>
        <ThemedText type='16px' style={styles.name}>
          {i.name}
        </ThemedText>
        <ThemedText>
          {i.designation}
        </ThemedText>
        </View>
       
      </Pressable>
      </Link>
 ) });


  return (
    <View style={styles.screen}>
      <ThemedText type='24px' style={styles.title}>Choose a professional e see the slots available</ThemedText>
      {Profiles}
      <ThemedText type='link' style={styles.link}>I don't have a preference</ThemedText>
    </View>
  );
}

