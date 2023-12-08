import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Toast from 'react-native-toast-message'
import { AuthContext } from '../../../services/auth/context/AuthContext'
import { TextInput, useTheme } from 'react-native-paper'
import { Button, Icon } from 'react-native-elements'
import { getTextSize } from '../../../utils/textSizes'
import { getCategories } from '../../../services/categories/catgoriesService'
import { ScrollView } from 'react-native-web'
import DropdownComponent from '../../common/DropdownComponent'

export default function FormProduct(props) {
  const { textSize } = useContext(AuthContext)
  const textSizes = getTextSize(textSize.valor ? 'medium' : textSize)
  const { colors } = useTheme()
  let { producto } = props
  const { close, fetchDataOut } = props
  const [categorias, setCategorias] = useState([])
  const [categoria, setCategoria] = useState(producto ? producto.category : '')
  const [loading, setLoading] = useState(false)
  console.log(producto)

  async function fetchLineas() {
    setLoading(true)
    const lineas = await getCategories()
    setCategorias(lineas)
    setLoading(false)
  }
  useEffect(() => {
    fetchLineas()
  }, [])
  useEffect(() => {
    formik.setFieldValue('category', categoria)
  }, [categoria])

  const formik = useFormik({
    initialValues: {
      name: producto ? producto.name : '',
      price: producto ? producto.price.toString() : '',
      priceDiscount: producto ? producto.priceDiscount.toString() : '',
      stock: producto ? producto.stock.toString() : '',
      description: producto ? producto.description : '',
      category: producto ? producto.category : '',
      images: producto ? producto.images : [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required('El nombre es obligatorio'),
      price: Yup.string().required('El precio es obligatorio'),
      priceDiscount: Yup.string(),
      stock: Yup.string().required('El stock es obligatorio'),
      category: Yup.object().required('La categoria es obligatoria'),
      description: Yup.string().required('La descripción es obligatoria'),
      images: Yup.array().required('Las imagenes son obligatorias'),
    }),

    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        console.log(formValue)
      } catch (error) {
        close()
        console.log(error)
        Toast.show({
          type: 'error',
          text1: 'Error al contactar con el servidor',
          text2: 'Por favor, intentelo más tarde',
        })
      }
    },
  })

  return (
    <ScrollView style={styles.viewContent}>
      <Text
        style={{
          fontSize: textSizes.Title,
          fontWeight: 'bold',
          color: colors.primary,
          marginBottom: 10,
        }}
      >
        {producto ? 'Editar producto' : 'Nuevo producto'}
      </Text>
      <TextInput mode='outlined' label='Nombre' containerStyle={styles.input} style={{ fontSize: textSizes.Text }} onChangeText={(text) => formik.setFieldValue('name', text)} error={formik.errors.name ? true : false} value={formik.values.name} />
      <Text style={formik.errors.name ? { color: colors.error, fontSize: textSizes.Text } : {}}>{formik.errors.name}</Text>
      <TextInput mode='outlined' label='Precio' containerStyle={styles.input} style={{ fontSize: textSizes.Text }} onChangeText={(text) => formik.setFieldValue('price', text)} error={formik.errors.price ? true : false} value={formik.values.price} type='number' />
      <Text style={formik.errors.price ? { color: colors.error, fontSize: textSizes.Text } : {}}>{formik.errors.price}</Text>
      <TextInput mode='outlined' label='Precio con descuento' containerStyle={styles.input} style={{ fontSize: textSizes.Text }} onChangeText={(text) => formik.setFieldValue('priceDiscount', text)} error={formik.errors.priceDiscount ? true : false} type='number' />
      <TextInput mode='outlined' label='Stock' containerStyle={styles.input} style={{ fontSize: textSizes.Text }} onChangeText={(text) => formik.setFieldValue('stock', text)} error={formik.errors.stock ? true : false} value={formik.values.stock} type='number' />
      <Text style={formik.errors.stock ? { color: colors.error, fontSize: textSizes.Text } : {}}>{formik.errors.stock}</Text>
      <DropdownComponent data={categorias} id={'uid_category'} nombre={'name'} placeholder={'Selecciona una categoria'} setValueOut={setCategoria} selectedValue={producto ? producto.category : null} />
      <Text style={formik.errors.linea ? { color: colors.error, fontSize: textSizes.Text } : {}}>{formik.errors.category}</Text>
      <TextInput mode='outlined' label='Descripción' containerStyle={styles.input} style={{ fontSize: textSizes.Text }} onChangeText={(text) => formik.setFieldValue('description', text)} error={formik.errors.description ? true : false} value={formik.values.description} multiline={true} numberOfLines={4} />
      <Text style={formik.errors.description ? { color: colors.error, fontSize: textSizes.Text } : {}}>{formik.errors.description}</Text>

      <Button
        text
        icon={<Icon type='material-community' name='content-save' color={colors.surface} style={styles.icon} />}
        titleStyle={{ color: colors.surface, fontSize: textSizes.Subtitle }}
        title={'Guardar'}
        containerStyle={{
          ...styles.btnContainer,
          backgroundColor: colors.primary,
        }}
        buttonStyle={{ backgroundColor: colors.primary }}
        onPress={formik.handleSubmit}
      />
      <Button
        text
        icon={<Icon type='material-community' name='cancel' color={colors.surface} style={styles.icon} />}
        titleStyle={{ color: colors.surface, fontSize: textSizes.Subtitle }}
        title={'Cancelar'}
        containerStyle={{
          ...styles.btnContainer,
          backgroundColor: colors.error,
        }}
        buttonStyle={{ backgroundColor: colors.error }}
        onPress={close}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  viewContent: {
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
  input: {
    width: '100%',
    marginTop: 15,
    borderRadius: 10,
  },
  icon: {
    marginRight: 10,
  },
  btnContainer: {
    marginTop: 15,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
  },
})
