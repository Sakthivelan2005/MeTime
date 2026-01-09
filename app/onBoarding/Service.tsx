import { ThemedText } from '@/components/themed-text';
import { services } from '@/data/services';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';

type ServiceProps = {
  goToPage: (value: number) => void;
  setService: (value: string) => void;
};

function Service({setService, goToPage}:ServiceProps) {

  const {width, height} =  useWindowDimensions();
  const ImageSize = width/3;
  const Styles = StyleSheet.create({
  screen:{
    top: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle:{
    textAlign:'center',
    fontWeight:'thin',
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
    height: ImageSize,
    width: ImageSize,
    borderRadius:20
  },
  serviceName:{
    marginTop: 10,
    textAlign:'center',
    color: '#1C1C28'
  },
   skipLink:{
    fontWeight: 'normal',
    textAlign:'center',
    top: height/10,
    fontSize: 24
  }
});


    const Services = services.map((item) =>(
        <View key={item.id} style={Styles.services}>
          <Pressable onPress={() => {setService(item.serviceName); goToPage(1) /* This navigate to next page */}}>
            <Image source={item.serviceImage} style={Styles.serviceImage} />
            <ThemedText type='18px' style={Styles.serviceName}>{item.serviceName}</ThemedText>
          </Pressable>
        </View>
   ))

    return (
        <View style={Styles.screen}>
            <ThemedText type='24px' style={Styles.subtitle}>Please, Choose a Service:</ThemedText>
           <View style={Styles.gridContainer}>{Services}</View>
           <Link href="/Home" asChild>
                       <ThemedText 
                       style={Styles.skipLink}
                       type="link" >skip</ThemedText>
                   </Link>
        </View>
    );
}

export default Service;