import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card , useTheme} from 'react-native-paper'

export default function InicioCliente() {
  const { colors } = useTheme()
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background}}>
      <Card style={{width: '90%', height: '90%', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.primary}}>Bienvenido Cliente</Text>
      </Card>

    </View>
  )
}
