import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import { useTheme } from 'react-native-paper'
import Goback from '../../components/common/GoBack'
import Title from '../../components/common/Title'
import { AuthContext } from '../../services/auth/context/AuthContext'
import { getSales, getSalesByUser } from '../../services/sale/saleService'
import Sales from '../../components/admin/sales/Sales'
import { dias, getAnioByFecha, getAnios, getDiaSemanaPorFecha, getMesPorFecha, getSemanaPorFecha, meses, semanas } from '../../data/dateUtils'
import { isEqual } from 'lodash'

export default function VentasScreen() {
  const { colors } = useTheme()
  const { textSize, userInfo } = useContext(AuthContext)
  const [ventas, setVentas] = useState([])
  const [ventasFiltradas, setVentasFiltradas] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const [selectedYears, setSelectedYears] = useState([])
  const [selectedMonths, setSelectedMonths] = useState([])
  const [selectedWeeks, setSelectedWeeks] = useState([])
  const [selectedDays, setSelectedDays] = useState([])

  const getSalesFetch = async () => {
    try {
      let data
      if (userInfo.role.name === 'admin') {
        data = await getSales()
      } else {
        data = await getSalesByUser()
      }

      setVentas(data)
    } catch (error) {
      console.error(error)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await getSalesFetch()
    setRefreshing(false)
  }

  useEffect(() => {
    getSalesFetch()
  }, []) // Asegúrate de que este useEffect solo se ejecute una vez al montar el componente

  const filterSales = () => {
    let ventasFiltradas = [...ventas]

    if (selectedYears.length > 0) {
      ventasFiltradas = ventasFiltradas.filter((venta) => selectedYears.includes(getAnioByFecha(venta.date)))
    }

    if (selectedMonths.length > 0) {
      ventasFiltradas = ventasFiltradas.filter((venta) => selectedMonths.includes(getMesPorFecha(venta.date)))
    }

    if (selectedWeeks.length > 0) {
      ventasFiltradas = ventasFiltradas.filter((venta) => selectedWeeks.includes(getSemanaPorFecha(venta.date)))
    }

    if (selectedDays.length > 0) {
      ventasFiltradas = ventasFiltradas.filter((venta) => selectedDays.includes(getDiaSemanaPorFecha(venta.date)))
    }

    setVentasFiltradas(ventasFiltradas)
  }

  useEffect(() => {
    filterSales()
  }, [selectedYears, selectedMonths, selectedWeeks, selectedDays, ventas])

  // Evita el bucle infinito al usar el useEffect siguiente
  useEffect(() => {
    if (ventasFiltradas.length > 0) {
      // Asegúrate de que las ventasFiltradas sean diferentes de las ventas actuales
      // antes de llamar a setVentas para evitar el bucle infinito
      if (!isEqual(ventas, ventasFiltradas)) {
        setVentas(ventasFiltradas)
      }
    } else {
      // Si ventasFiltradas está vacío, obtén las ventas originales
      getSalesFetch()
    }
  }, [ventasFiltradas, ventas])

  const FiltersSales = () => (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginBottom: '8%',
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: '2%' }}>
  {getAnios(ventas).map((anio, index) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.container,
        {
          backgroundColor: selectedYears.includes(anio) ? colors.primary : colors.secondary,
        },
      ]}
      onPress={() => {
        if (selectedYears.includes(anio)) {
          setSelectedYears(selectedYears.filter((item) => item !== anio));
        } else {
          setSelectedYears([...selectedYears, anio]);
        }
      }}
    >
      <Text style={[styles.text, { fontSize: textSize * 0.8 }]}>{anio}</Text>
    </TouchableOpacity>
  ))}
</ScrollView>

<ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: '2%' }}>
  {meses.map((mes, index) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.container,
        {
          backgroundColor: selectedMonths.includes(mes) ? colors.primary : colors.secondary,
        },
      ]}
      onPress={() => {
        if (selectedMonths.includes(mes)) {
          setSelectedMonths(selectedMonths.filter((item) => item !== mes));
        } else {
          setSelectedMonths([...selectedMonths, mes]);
        }
      }}
    >
      <Text style={[styles.text, { fontSize: textSize * 0.8 }]}>{mes}</Text>
    </TouchableOpacity>
  ))}
</ScrollView>

<ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: '2%' }}>
  {semanas.map((semana, index) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.container,
        {
          backgroundColor: selectedWeeks.includes(semana) ? colors.primary : colors.secondary,
        },
      ]}
      onPress={() => {
        if (selectedWeeks.includes(semana)) {
          setSelectedWeeks(selectedWeeks.filter((item) => item !== semana));
        } else {
          setSelectedWeeks([...selectedWeeks, semana]);
        }
      }}
    >
      <Text style={[styles.text, { fontSize: textSize * 0.8 }]}>{semana}</Text>
    </TouchableOpacity>
  ))}
</ScrollView>

<ScrollView horizontal showsHorizontalScrollIndicator={false}>
  {dias.map((dia, index) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.container,
        {
          backgroundColor: selectedDays.includes(dia) ? colors.primary : colors.secondary,
        },
      ]}
      onPress={() => {
        if (selectedDays.includes(dia)) {
          setSelectedDays(selectedDays.filter((item) => item !== dia));
        } else {
          setSelectedDays([...selectedDays, dia]);
        }
      }}
    >
      <Text style={[styles.text, { fontSize: textSize * 0.8 }]}>{dia}</Text>
    </TouchableOpacity>
  ))}
</ScrollView>
    </View>
  )

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: '2%',
        backgroundColor: colors.surface,
      }}
    >
      <Goback title={userInfo.role.name === 'admin' ? 'Ventas' : 'Mis pedidos'} />
      <FiltersSales />
      <Title title={userInfo.role.name === 'admin' ? 'Todas las ventas' : 'Mis pedidos'} />
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} style={{ backgroundColor: colors.surface, height: 10 }} />} showsVerticalScrollIndicator={false} style={{ backgroundColor: colors.surface }}>
        <Sales sales={ventas} fetchDataOut={getSalesFetch} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 35,
    marginRight: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
})
