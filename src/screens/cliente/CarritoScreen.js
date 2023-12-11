import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useTheme } from "react-native-paper";
import { View } from "react-native";
import Searchbar from "../../components/common/Searchbar";
import Goback from "../../components/common/GoBack";
import Title from "../../components/common/Title";
import Cart from "../../components/cliente/cart/Cart";
import { getProductsByUserCart } from "../../services/cart/cartService";
import { get } from "lodash";

export default function CarritoScreen(props) {
  const { route } = props;
  const [inputValue, setInputValue] = useState("");
  const [elements, setElements] = useState([]);
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const getElementsFetch = async () => {
    try {
      const data = await getProductsByUserCart();
      setElements(data);
    } catch (error) {
      console.error(error);
    }
  };

  
  

  useEffect(() => {
    getElementsFetch();
  }, []);

  // hacemos que se actualice cada que se cambia a la pantalla
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      getElementsFetch();
    });
    return unsubscribe;
  }, [props.navigation]);

  const onRefresh = () => {
    setRefreshing(true);
    getElementsFetch();
    setRefreshing(false);
  };


  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: "2%",
        backgroundColor: colors.surface,
      }}
    >
      <Goback title={"Carrito"} />
      <ScrollView
        //make reload when scroll
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
        <Cart elementCarts={elements} fetchDataOut={getElementsFetch} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
