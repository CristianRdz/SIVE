import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import { useTheme } from "react-native-paper";
import { View } from "react-native";
import { getProducts } from "../../services/products/productService";
import Searchbar from "../../components/common/Searchbar";
import Goback from "../../components/common/GoBack";
import ScrollCategories from "../../components/common/ScrollCategories";
import Title from "../../components/common/Title";
import { set } from "lodash";
import Products from "../../components/cliente/products/Products";

export default function ProductosScreen() {
  // const [productos, setProductos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [productos, setProductos] = useState([]);
  const [productosf, setProductosf] = useState([]);
  const { colors } = useTheme();

  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const getProductsFetch = async () => {
    try {
      const data = await getProducts();
      setProductos(data);
      setProductosf(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProductsFetch();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getProductsFetch();
    setRefreshing(false);
  };

  useEffect(() => {
    const filterProducts = () => {
      return productos.filter(
        (producto) =>
          (selectedCategories.length === 0 ||
            selectedCategories.some(
              (item) => item.uid_category === producto.category.uid_category
            )) &&
          (inputValue === "" ||
            producto.name.toLowerCase().includes(inputValue.toLowerCase()))
      );
    };
    if (selectedCategories.length > 0 || inputValue !== "") {
      const filteredProducts = filterProducts();
      setProductosf(filteredProducts);
    } else {
      getProductsFetch();
    }
  }, [selectedCategories, inputValue]);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: "2%",
        backgroundColor: colors.surface,
      }}
    >
      <Goback title={"Buscar productos"} />
      <Searchbar setInputValue={setInputValue} />
      <ScrollCategories setCategoriesOut={setSelectedCategories} />

      <Title title={"Lista de productos"} />
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
        <Products productos={productosf} fetchDataOut={getProductsFetch} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
