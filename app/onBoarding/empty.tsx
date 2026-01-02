import { ThemedText } from '@/components/themed-text'
import { Images } from '@/config/Images'
import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet } from 'react-native'

export const empty = (Message: string) => {
  return ( <>
  <Image source={Images.empty} style={styles.empty}/> 
  <ThemedText style={styles.emptyText}>{Message}</ThemedText>
  </>)
}

 

const styles = StyleSheet.create({
    empty:{
        height: 400,
        marginTop: 20
    },
    emptyText:{
        fontSize: 25,
        textAlign: "center"
    }
})