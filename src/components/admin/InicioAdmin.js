import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme , Card} from 'react-native-paper'

export default function InicioAdmin() {
  const { colors } = useTheme();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background}}>
      <Card style={{width: '90%', height: '90%', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.primary}}>Bienvenido Administrador</Text>
      </Card>

    </View>
  )
}

const styles = StyleSheet.create({})