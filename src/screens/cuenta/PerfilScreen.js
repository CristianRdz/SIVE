import {ScrollView, View } from 'react-native'
import React from 'react'
import OpcionesPerfil from '../../components/cuenta/OpcionesPerfil'
import { useTheme } from 'react-native-paper'

export default function PerfilScreen() {
  const { colors } = useTheme()

  return (
    <ScrollView style={{backgroundColor: colors.background}}>
      <OpcionesPerfil />
    </ScrollView>
  )
}
