import {View } from 'react-native'
import React from 'react'
import OpcionesPerfil from '../../components/cuenta/OpcionesPerfil'
import { ScrollView } from 'react-native-gesture-handler'

export default function PerfilScreen() {

  return (
    <ScrollView>
      <OpcionesPerfil />
    </ScrollView>
  )
}
