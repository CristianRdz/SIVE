import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useTheme, Card } from 'react-native-paper'
import { Icon, colors } from 'react-native-elements'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../services/auth/context/AuthContext'
import { getTextSize } from '../../utils/textSizes'
import { getUsersToday } from '../../services/usuarios/usuarioService'

export default function InicioAdmin() {
  const { colors } = useTheme()
  const { textSize } = useContext(AuthContext)
  const textSizes = getTextSize(textSize.valor ? 'medium' : textSize)
  const navigation = useNavigation()
  const [usersToday, setUsersToday] = useState(0)
  useEffect(() => {
    const getUsers = async () => {
      const users = await getUsersToday()
      setUsersToday(users)
    }
    getUsers()
  }, [])

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.background,
        paddingTop: '5%',
      }}
    >
      <Card
        style={{
          width: '90%',
          height: '8%',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '5%',
        }}
      >
        <Text style={{ fontSize: textSizes.Title, fontWeight: 'bold', color: colors.primary }}>¡Bienvenido!</Text>
      </Card>
      <Card style={{ width: '90%', height: '85%' }}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            width: '85%',
            height: '27%',
            marginHorizontal: '7%',
            marginVertical: '5%',
            borderColor: colors.primary,
            borderRadius: 10,
            borderWidth: 1,
          }}
          onPress={() => navigation.navigate('admin-productos')}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: '10%',
            }}
          >
            <Text
              style={{
                fontSize: textSizes.Subtitle,
                fontWeight: 'bold',
                color: colors.primary,
              }}
            >
              Productos
            </Text>
            <Icon type='material-community' name='chevron-right' size={40} color={colors.primary} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            width: '85%',
            height: '27%',
            marginHorizontal: '7%',
            marginVertical: '5%',
            borderColor: colors.primary,
            borderRadius: 10,
            borderWidth: 1,
          }}
          onPress={() => navigation.navigate('admin-usuarios')}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: '10%',
            }}
          >
            <Text
              style={{
                fontSize: textSizes.Subtitle,
                fontWeight: 'bold',
                color: colors.primary,
              }}
            >
              Usuarios
            </Text>
            <Icon type='material-community' name='chevron-right' size={40} color={colors.primary} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            width: '85%',
            height: '27%',
            marginHorizontal: '7%',
            marginVertical: '5%',
            borderColor: colors.primary,
            borderRadius: 10,
            borderWidth: 1,
          }}
          onPress={() => navigation.navigate('admin-ventas')}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: '10%',
            }}
          >
            <Text
              style={{
                fontSize: textSizes.Subtitle,
                fontWeight: 'bold',
                color: colors.primary,
              }}
            >
              Ventas
            </Text>
            <Icon type='material-community' name='chevron-right' size={40} color={colors.primary} />
          </View>
        </TouchableOpacity>
        <View
        style={{
          width: '90%',
          height: '8%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '5%',
        }}
      >
        <Text
          style={{
            fontSize: textSizes.Subtitle,
            fontWeight: 'bold',
            color: colors.primary,
          }}
        >
          Usuarios activos del día
        </Text>
        <Text
          style={{
            fontSize: textSizes.Subtitle,
            fontWeight: 'bold',
            color: colors.primary,
          }}
        >
          {usersToday}
        </Text>
      </View>
      </Card>
      
    </View>
  )
}

const styles = StyleSheet.create({})
