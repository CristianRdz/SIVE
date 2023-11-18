import React, { useContext, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AuthStack from "./AuthStack";
import { useTheme } from "react-native-paper";
import { AuthContext } from "../services/auth/context/AuthContext";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ajustes from "../screens/Ajustes";
const Tab = createMaterialBottomTabNavigator();

export default function AppNavigation() {
  const { colors } = useTheme();
  const { userInfo } = useContext(AuthContext);
  return (
    <Tab.Navigator
      activeColor={colors.primary}
      inactiveColor={colors.secondary}
      barStyle={{ backgroundColor: colors.onSecondary }}
      screenOptions={({ route }) => ({
        headerShown: false,
        animation: "spring",
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        tabBarIcon: ({ color, size }) => iconos(route, color, size),
      })}
    >
      <>
        <Tab.Screen
          name="login"
          component={AuthStack}
          options={{ title: "Perfil" }}
        />

        <Tab.Screen
          name="ajustes"
          component={Ajustes}
          options={{ title: "Ajustes" }}
        />
      </>
    </Tab.Navigator>
  );
}

function iconos(route, color, size) {
  let name;
  if (route.name === "inicioCliente" || route.name === "inicioAdmin") {
    name = "home";
  }
  if (route.name === "perfilAdmin" || route.name === "perfilCliente") {
    name = "user";
  }
  if (route.name === "lineasAdmin") {
    name = "list";
  }
  if (route.name === "inventarioAdmin") {
    name = "archive";
  }
  if (route.name === "promocionesAdmin") {
    name = "percent";
  }
  if (route.name === "usuariosAdmin") {
    name = "users";
  }
  if (route.name === "buscadorCliente") {
    name = "search";
  }
  if (route.name === "carritoCliente") {
    name = "shopping-cart";
  }
  if (route.name === "login") {
    name = "account";
  }
  if (route.name === "pedidosAdmin") {
    name = "clipboard-list";
  }
  if (route.name === "cargando") {
    name = "spinner";
  }
  if (route.name === "ajustes") {
    name = "cog";
  }

  return (
    <Icon type="material-community" name={name} size={size} color={color} />
  );
}
