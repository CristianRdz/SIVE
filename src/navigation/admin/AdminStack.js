import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../../components/common/Header";
import InicioAdmin from "../../components/admin/InicioAdmin";
import ProductosScreen from "../../screens/admin/ProductosScreen";
import UsuariosScreen from "../../screens/admin/UsuariosScreen";
import VentasScreen from "../../screens/admin/VentasScreen";

const Stack = createNativeStackNavigator();

export default function ClientStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="inicioAdminS"
        component={InicioAdmin}
        options={Header("INICIO ADMINISTRADOR")}
      />
      <Stack.Screen
        name="admin-productos"
        component={ProductosScreen}
        options={Header("GESTIONAR PRODUCTOS")}
      />
      <Stack.Screen
        name="admin-usuarios"
        component={UsuariosScreen}
        options={Header("GESTIONAR USUARIOS")}
      />
      <Stack.Screen
        name="admin-ventas"
        component={VentasScreen}
        options={Header("VENTAS")}
      />
    </Stack.Navigator>
  );
}
