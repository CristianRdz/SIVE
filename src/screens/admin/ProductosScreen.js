import { StyleSheet, ScrollView, RefreshControl } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Products from '../../components/admin/products/Products'
import { useTheme } from 'react-native-paper'
import { View } from 'react-native'
import { getLessSelledProducts, getMostSelledProducts, getProducts } from '../../services/products/productService'
import Searchbar from '../../components/common/Searchbar'
import Goback from '../../components/common/GoBack'
import ScrollCategories from '../../components/common/ScrollCategories'
import Title from '../../components/common/Title'
import { Button ,Icon } from 'react-native-elements'
import { getTextSize } from '../../utils/textSizes'
import { AuthContext } from '../../services/auth/context/AuthContext'
export default function ProductosScreen() {
  const { textSize } = useContext(AuthContext);
  const textSizes = getTextSize(textSize.valor ? "medium" : textSize);
  const { colors } = useTheme();
  const [inputValue, setInputValue] = useState('')
  const [productos, setProductos] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [lessSelled, setLessSelled] = useState(false)
  const [mostSelled, setMostSelled] = useState(false)

  const getProductsFetch = async () => {
    try {
      const data = lessSelled ? await getLessSelledProducts() : mostSelled ? await getMostSelledProducts() : await getProducts()
      setProductos(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getProductsFetch()
  }, [])

  const onRefresh = () => {
    setRefreshing(true)
    getProductsFetch()
    setRefreshing(false)
  }

  useEffect(() => {
    if (inputValue !== '') {
      const filteredProducts = productos.filter((producto) => producto.name.toLowerCase().includes(inputValue.toLowerCase()))
      setProductos(filteredProducts)
    } else {
      getProductsFetch()
    }
  }, [inputValue])

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: '2%',
        backgroundColor: colors.surface,
      }}
    >
      <Goback title={'Productos'} />
      <Searchbar setInputValue={setInputValue} />
      <ScrollCategories setCategoriesOut={() => {}} />
      <Button
        icon={<Icon type='material-community' name='arrow-down-bold-box' size={20} color={colors.surface} />}
        titleStyle={{ color: colors.surface, fontSize: textSizes.Subtitle }}
        containerStyle={{
          ...styles.btnContainer,
          backgroundColor: colors.error,
        }}
        buttonStyle={{ backgroundColor: colors.error }}
        title='Menos vendidos'
        onPress={() => {
          setMostSelled(false)
          setLessSelled(true)
          getProductsFetch()
        }}
      />
      <Button
        icon={<Icon type='material-community' name='minus' color={colors.surface} style={styles.icon} />}
        titleStyle={{ color: colors.surface, fontSize: textSizes.Subtitle }}
        containerStyle={{
          ...styles.btnContainer,
          backgroundColor: colors.error,
        }}
        buttonStyle={{ backgroundColor: colors.error }}
        title='Más vendidos'
        onPress={() => {
          setLessSelled(false)
          setMostSelled(true)
          getProductsFetch()
        }}
      />

      <Button
        icon={<Icon type='material-community' name='plus' color={colors.surface} style={styles.icon} />}
        titleStyle={{ color: colors.surface, fontSize: textSizes.Subtitle }}
        containerStyle={{
          ...styles.btnContainer,
          backgroundColor: colors.primary,
        }}
        buttonStyle={{ backgroundColor: colors.primary }}
        title='Todos'
        onPress={() => {
          setLessSelled(false)
          setMostSelled(false)
          getProductsFetch()
        }}
      />

      <Title title={'Lista de productos'} />

      <ScrollView
        //make reload when scroll
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} style={{ backgroundColor: colors.surface, height: 10 }} />}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colors.surface }}
      >
        <Products productos={productos} fetchDataOut={getProductsFetch} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 15,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
  },
})
