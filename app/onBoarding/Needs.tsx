import { ThemedText } from '@/components/themed-text';
import { Images } from '@/config/Images';
import { needs } from '@/data/need';
import { Image } from 'expo-image';
import React from 'react';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { empty } from '../../constants/empty';

type NeedsProps = {
  service: string;
  setItem: (value: number) => void;
  goToPage: (value: number) => void;
};

function Needs({ service, setItem, goToPage }: NeedsProps) {
  const {width} = useWindowDimensions();
  const SelectService = needs.filter((item) => item.type === service);
  console.log("service: ", service)
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
        },
       
    },
   
)
  const NeedItems = SelectService.map((item) => (
    <Pressable
      key={item.id}
      style={({ pressed }) => [
        styles.box,
        pressed && styles.boxPressed,
      ]}
      onPress={() => {
        setItem(item.id);
        goToPage(2);
      }}
    >
      <Image style={styles.needsImage} source={item.image} />
      <View style={{ marginLeft: 15, flex: 1 }}>
        <ThemedText type="16px" style={styles.text}>
          {item.name}
        </ThemedText>
        <ThemedText style={styles.text}>${item.price}</ThemedText>
        <Image source={Images.Arrow} style={styles.arrow} />
      </View>
    </Pressable>
  ));

  return (
    <View style={{ flex: 1 }}>
      <ThemedText type="24px" style={styles.title}>
        Now, choose one that fit your needs:
      </ThemedText>
     
      <View style={{ flex: 1, paddingHorizontal: 10 }}>{(service === "")? (empty("Please Choose a service")) : (NeedItems) }</View>
    </View>
  );
}

export default Needs;
