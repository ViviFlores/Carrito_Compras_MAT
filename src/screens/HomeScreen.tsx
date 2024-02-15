import React from 'react'
import { Text, View } from 'react-native'
import { TitleComponent } from '../components/TitleComponent'
import { BodyComponent } from '../components/BodyComponent'

export const HomeScreen = () => {
  return (
    <View>
        <TitleComponent title='Productos'/>
        <BodyComponent/>
    </View>
  )
}
