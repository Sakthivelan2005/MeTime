import { ThemedText } from '@/components/themed-text';
import { Images } from '@/config/Images';
import { need } from '@/constants/need';
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
            fontSize: 20,
            color: '#0F0F0F'
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
            left: width - 180,
            
            justifyContent: 'center',
            alignItems: 'flex-end'
        }
    },
    
) 
    const Need = need.map((i) => {
        return (
         <Pressable key={i.id} style={({ pressed }) => [
          styles.box,
          pressed && styles.boxPressed, // "hover-like" state while finger is down
            ]}
          onPress={() => {setItem(i.name); goToPage(2) }}
            >            
                <Image style={styles.needsImage} source={i.image} />
                <Image style={styles.arrow} source={Images.Arrow} />
        
                <View>
                    <ThemedText type='16px' style={styles.text}>{i.name}</ThemedText>
                    <ThemedText style={styles.text}>${i.price}</ThemedText>
                </View>
                </Pressable>
        )
    })
    return (
        <View >
            <ThemedText type="24px" style={styles.title}>Now, choose one that fit your needs:</ThemedText>
            <ThemedText>You selected: {service}</ThemedText>
           <View> {Need} </View>
           
        </View>
    );
}



export default Needs;