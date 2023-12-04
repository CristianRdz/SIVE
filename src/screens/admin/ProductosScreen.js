import { StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import Products from "../../components/admin/products/Products";
import { useTheme } from "react-native-paper";
import { View } from "react-native";
import { getProducts } from "../../services/products/productService";
import Searchbar from "../../components/common/Searchbar";
import Goback from "../../components/common/GoBack";
import ScrollCategories from "../../components/common/ScrollCategories";
import Title from "../../components/common/Title";
import { set } from 'lodash'

export default function ProductosScreen() {
  // const [productos, setProductos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [productos, setProductos] = useState([]);
  const { colors } = useTheme();

  const getProductsFetch = async () => {
    try {
      const data = await getProducts();
      setProductos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProductsFetch();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: "2%",
        backgroundColor: colors.surface,
      }}
    >
      <Goback title={"Productos"} />
      <Searchbar setInputValue={setInputValue} />
      <ScrollCategories />
      <Title title={"Lista de productos"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colors.surface }}
      >
        <Products productos={productos} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
