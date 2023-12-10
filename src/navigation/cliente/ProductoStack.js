import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductosScreen from "../../screens/cliente/ProductosScreen";
import Product from "../../components/cliente/products/Product";

const Stack = createNativeStackNavigator();
export default function ProductoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="buscar-productos"
        component={ProductosScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="producto"
        component={Product}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}