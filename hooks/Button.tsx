import { ThemedText } from '@/components/themed-text'
import { color } from '@/constants/color'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export const CreateButton = (ButtonName: string) => {
  return (
    <>
     <View style={styles.bookButton} >
                <ThemedText type='18px' style={styles.bookButtonThemedText}>{ButtonName}</ThemedText>
      </View>
    </>
  )
}


const styles = StyleSheet.create({
  bookButton: {
    paddingVertical: 15,
    width: '90%',
    backgroundColor: color,
    borderRadius: 12,
    alignSelf: 'center',
},
bookButtonThemedText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
},
})