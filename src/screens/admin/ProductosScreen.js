import { StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { productos } from "../../data/products";
import Products from "../../components/admin/products/Products";
import { useTheme } from "react-native-paper";
import { View } from "react-native";
import { getProducts } from "../../services/products/productService";
import Searchbar from "../../components/common/Searchbar";
import Goback from "../../components/common/GoBack";

export default function ProductosScreen() {
  // const [productos, setProductos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { colors } = useTheme();

  const getProductsFetch = async () => {
    try {
      const data = await getProducts();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProductsFetch();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: colors.surface }}
    >
      <View
        style={{
          flex: 1,
          marginHorizontal: "2%",
          backgroundColor: colors.surface,
        }}
      >
        <Goback title={"Productos"}/>
        <Searchbar setInputValue={setInputValue} />
        <Products productos={productos} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
