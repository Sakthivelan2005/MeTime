import { ThemedText } from '@/components/themed-text'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

export const CreateButton = (ButtonName: string) => {
  return (
     <TouchableOpacity style={styles.bookButton}>
                <ThemedText type='18px' style={styles.bookButtonThemedText}>{ButtonName}</ThemedText>
      </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  bookButton: {
    paddingVertical: 15,
    width: '90%',
    backgroundColor: '#FDCCC5',
    borderRadius: 12,
    alignSelf: 'center',
},
bookButtonThemedText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
},
})