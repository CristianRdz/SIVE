import { StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { productos } from "../../data/products";
import Products from "../../components/admin/products/Products";
import { useTheme } from "react-native-paper";
import { View } from "react-native";
import { getProducts } from "../../services/products/productService";

export default function ProductosScreen() {
  const [productos, setProductos] = useState([]);
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
          marginTop: 10,
          marginHorizontal: "5%",
          backgroundColor: colors.surface,
        }}
      >
        <Products productos={productos} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
