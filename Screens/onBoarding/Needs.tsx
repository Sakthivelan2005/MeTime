import { ThemedText } from '@/components/themed-text';
import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';

type NeedsProps = {
    service: string,
    setItem: (value: string) => void,
    goToPage: (value: number) => void;
    
}

function Needs({service,setItem,goToPage}:NeedsProps) {

    const {width} = Dimensions.get('window');

    const need = [
    {
        id: 1,
        name: 'Basic Manicure',
        image: require('D:/MyFirstReactNativeApp/assets/images/Onboarding/needs/Basic Manicure.jpg'),
        price: 30,
        type: 'Nail'
    },
    {
        id: 2,
        name: 'Basic Pedicure',
        image: require('D:/MyFirstReactNativeApp/assets/images/Onboarding/needs/Basic Pedicure.jpg'),
        price: 30,
        type: 'Nail'
    },
    {
        id: 3,
        name: 'Gel Manicure',
        image: require('D:/MyFirstReactNativeApp/assets/images/Onboarding/needs/Gel Manicure.jpg'),
        price: 30,
        type: 'Nail'
    },
    {
        id: 4,
        name: 'Gel Pedicure',
        image: require('D:/MyFirstReactNativeApp/assets/images/Onboarding/needs/Gel Pedicure.jpg'),
        price: 30,
        type: 'Nail'
    },
    {
        id: 5,
        name: 'Acrylic Extensions',
        image: require('D:/MyFirstReactNativeApp/assets/images/Onboarding/needs/Acrylic Extensions.jpg'),
        price: 30,
        type: 'Nail'
    }
]
    const Need = need.map((i) => {
        return (
         <Pressable key={i.id} style={({ pressed }) => [
          styles.box,
          pressed && styles.boxPressed, // "hover-like" state while finger is down
            ]}
          onPress={() => {setItem(i.name); goToPage(2) }}
            >            
                <Image style={styles.needsImage} source={i.image} />
                <Image style={styles.arrow} source={require('D:/MyFirstReactNativeApp/assets/images/Onboarding/needs/long-arrow-right.png')} />
        
                <View>
                    <ThemedText type='title' style={styles.text}>{i.name}</ThemedText>
                    <ThemedText style={styles.text}>{i.price}</ThemedText>
                </View>
                </Pressable>
        )
    })
    return (
        <View >
            <ThemedText style={styles.title}>Now, choose one that fit your needs:</ThemedText>
            <ThemedText>You selected: {service}</ThemedText>
           <View> {Need} </View>
           
        </View>
    );
}

const styles = StyleSheet.create(
    {
        title:{
            fontSize: 30,
            padding:20,
            textAlign: 'center' 
        },
        needsImage:{
            height:100,
            width:100,
            borderRadius:20
        },
        text:{
            fontSize: 20
        },
        box:{
            flexDirection: 'row',
            flexWrap:'wrap',
            padding: 20,
                       
        },
        boxPressed:{
            backgroundColor: '#FDCCC540',
            
        },
        arrow:{
            width: 30,
            height: 20,
            left: 230,
            
            justifyContent: 'center',
            alignItems: 'flex-end'
        }
    },
    
)

export default Needs;