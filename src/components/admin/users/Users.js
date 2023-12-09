import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'
import { Icon, Image, Button } from 'react-native-elements'
import { loadFirstImage } from '../../../utils/constants'
import Modal from '../../common/Modal'
import { Form } from 'formik'
import FormUser from './FormUser'
import { remove } from 'lodash'

export default function Users({ usuarios , fetchDataOut}) {
  const { colors } = useTheme()
  const openClose = () => setShowModal((prevState) => !prevState)
  const [showModal, setShowModal] = useState(false)
  const [renderComponent, setRenderComponent] = useState(null)
  const renderUser = (usuario) => (
    <TouchableOpacity key={usuario.uid} style={[styles.userContainer, { backgroundColor: colors.surface, borderColor: colors.primary }]}>
      <View style={styles.infoContainer}>
        <Text style={{ fontSize: 19, fontWeight: 'bold', color: colors.primary }}>{usuario.name + ' ' + usuario.lastname}</Text>
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: colors.tertiary }}>{usuario.email}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconContainer}>
          <Icon
            type='material-community'
            name='pencil-outline'
            size={30}
            color={colors.primary}
            onPress={() => {
              setRenderComponent(<FormUser usuario={usuario} close={openClose} fetchDataOut={fetchDataOut} />)
              openClose()
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Icon type='material-community' name='trash-can-outline' size={30} color={colors.primary} onPress={() => {removeUser(usuario.uid); fetchDataOut()}} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )

  const isEmpty = usuarios.length === 0

  if (isEmpty) {
    return (
      <>
      <Button text icon={<Icon type='material-community' name='plus' color={colors.surface} style={styles.icon} />} titleStyle={{ color: colors.surface }} title={'Agregar usuario'} containerStyle={{ ...styles.btnContainer, backgroundColor: colors.primary }} buttonStyle={{ backgroundColor: colors.primary }} onPress={() => {
        setRenderComponent(<FormUser close={openClose} fetchDataOut={fetchDataOut} />)
        openClose()
      }} />
      <Modal isVisible={showModal} close={openClose}>
        {renderComponent}
      </Modal>
     
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: '20%',
        }}
      >
        <Icon type='material-community' name='emoticon-sad-outline' size={60} color={colors.primary} style={{ opacity: 0.5 }} />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.primary,
            opacity: 0.5,
          }}
        >
          No hay usuarios
        </Text>
      </View>
      </>
    )
  }

  return (
    <View>
      <Button text icon={<Icon type='material-community' name='plus' color={colors.surface} style={styles.icon} />} titleStyle={{ color: colors.surface }} title={'Agregar usuario'} containerStyle={{ ...styles.btnContainer, backgroundColor: colors.primary }} buttonStyle={{ backgroundColor: colors.primary }} onPress={() => {
        setRenderComponent(<FormUser close={openClose} fetchDataOut={fetchDataOut} />)
        openClose()
      }} />
      {usuarios.map((usuario) => render(usuario))}
      <Modal isVisible={showModal} close={openClose}>
        {renderComponent}
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    height: 80,
    width: '100%',
    borderWidth: 0.5,
    borderRadius: 10,
    marginBottom: 10,
  },
  imageContainer: {
    width: '40%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: 'hidden',
  },
  imagen: {
    width: '100%',
    height: 80,
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
    marginHorizontal: '3%',
    marginVertical: '1%',
    justifyContent: 'space-evenly',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '2%',
  },

  btnContainer: {
    marginTop: 15,
    marginBottom: 15,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '30%',
  },
})
