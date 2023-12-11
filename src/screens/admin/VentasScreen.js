import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useTheme } from "react-native-paper";
import Goback from "../../components/common/GoBack";
import Title from "../../components/common/Title";
import { AuthContext } from "../../services/auth/context/AuthContext";
import { getSales, getSalesByUser } from "../../services/sale/saleService";
import Sales from "../../components/admin/sales/Sales";

export default function VentasScreen() {
  const { colors } = useTheme();
  const { textSize , userInfo } = useContext(AuthContext);
  const [ventas, setVentas] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getSalesFetch = async () => {
    try {
      if (userInfo.role.name === "admin") {

        const data = await getSales();
        setVentas(data);
      }else{
        const data = await getSalesByUser();
        setVentas(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getSalesFetch();
    setRefreshing(false);
  };

  useEffect(() => {
    getSalesFetch();
  }, []);

  const FiltersSales = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: "8%",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.container, { backgroundColor: colors.primary }]}
        >
          <Text
            style={[
              styles.text,
              { color: colors.surface, fontSize: textSize.Small },
            ]}
          >
            Día
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.container, { backgroundColor: colors.primary }]}
        >
          <Text
            style={[
              styles.text,
              { color: colors.surface, fontSize: textSize.Small },
            ]}
          >
            Semana
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.container, { backgroundColor: colors.primary }]}
        >
          <Text
            style={[
              styles.text,
              { color: colors.surface, fontSize: textSize.Small },
            ]}
          >
            Mes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.container, { backgroundColor: colors.primary }]}
        >
          <Text
            style={[
              styles.text,
              { color: colors.surface, fontSize: textSize.Small },
            ]}
          >
            Año
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: "2%",
        backgroundColor: colors.surface,
      }}
    >
      <Goback title={userInfo.role.name === "admin" ? "Ventas" : "Mis pedidos"} />
      <FiltersSales />
      <Title title={userInfo.role.name === "admin" ? "Todas las ventas" : "Mis pedidos"} />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            style={{ backgroundColor: colors.surface, height: 10 }}
          />
        }
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colors.surface }}
      >
        <Sales sales={ventas} fetchDataOut={getSalesFetch} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 35,
    marginRight: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "500",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
