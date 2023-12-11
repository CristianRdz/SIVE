import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import { useTheme } from "react-native-paper";
import { View } from "react-native";
import Searchbar from "../../components/common/Searchbar";
import Goback from "../../components/common/GoBack";
import Title from "../../components/common/Title";
import Cart from "../../components/cliente/cart/Cart";
import { getProductsByUserCart } from "../../services/cart/cartService";

export default function CarritoScreen() { 
  const [inputValue, setInputValue] = useState("");
  const [elements, setElements] = useState([]);
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const getElementsFetch = async () => {
    try {
      const data = await getProductsByUserCart();
      setElements(data);
      console.log(data)
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    getElementsFetch();
  }, []);

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
        <Cart elementCarts={elements} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
