import { ThemedText } from '@/components/themed-text';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

type ServiceProps = {
  goToPage: (value: number) => void;
  setService: (value: string) => void;
};

function Service({setService, goToPage}:ServiceProps) {

    const services = [
        {
            id: 1,
            serviceImage: require('D:/MyFirstReactNativeApp/assets/images/Onboarding/services/Eyebrows.jpg'),
            serviceName: 'Eyebrows'
        },
        {
            id: 2,
            serviceImage: require('D:/MyFirstReactNativeApp/assets/images/Onboarding/services/Hair.jpg'),
            serviceName: 'Hair'
        },
        {
            id: 3,
            serviceImage: require('D:/MyFirstReactNativeApp/assets/images/Onboarding/services/Massage.jpg'),
            serviceName: 'Massage'
        },
        {
            id: 4,
            serviceImage: require('D:/MyFirstReactNativeApp/assets/images/Onboarding/services/Nail.jpg'),
            serviceName: 'Nail'
        }
        
    ]

    const Services = services.map((item) =>(
        <View key={item.id} style={Styles.services}>
          <Pressable onPress={() => {setService(item.serviceName); goToPage(1) /* This navigate to next page */}}>
            <Image source={item.serviceImage} style={Styles.serviceImage} />
            <ThemedText style={Styles.serviceName}>{item.serviceName}</ThemedText>
          </Pressable>
        </View>
   ))

    return (
        <View style={Styles.screen}>
            <ThemedText type='subtitle' style={Styles.subtitle}>Please, Choose a Service:</ThemedText>
           <View style={Styles.gridContainer}>{Services}</View>
           <Link href="/(tabs)" asChild>
                       <ThemedText 
                       style={Styles.skipLink}
                       type="link" >skip</ThemedText>
                   </Link>
        </View>
    );
}
const Styles = StyleSheet.create({
  screen:{
    top: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle:{
    textAlign:'center',
    fontWeight:'thin',
    fontSize: 30,
    marginBottom: 20
  },
  gridContainer:{
    flexDirection:'row',
    flexWrap: 'wrap',
    justifyContent:'center',
    gap: 50,
    marginLeft: 10,
    marginRight: 10,
    top: 40
  },
  services:{
    alignItems:'center',
    display: 'flex'
  },
  serviceImage:{
    height:150,
    width:150,
    borderRadius:20
  },
  serviceName:{
    marginTop: 10,
    fontSize: 20
  },
   skipLink:{
    fontSize: 20,
    fontWeight: 'normal',
    textAlign:'center',
    top: 100,
  }
});
export default Service;