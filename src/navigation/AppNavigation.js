import React, { useContext, useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AuthStack from "./AuthStack";
import { useTheme } from "react-native-paper";
import { AuthContext } from "../services/auth/context/AuthContext";
import ClientStack from "./cliente/ClienteStack";
import AdminStack from "./admin/AdminStack";
import PerfilStack from "./PerfilStack";
import SplashScreen from "../screens/SplashScreen";
import AjustesStack from "./AjustesStack";
const Tab = createMaterialBottomTabNavigator();

export default function AppNavigation() {
  const { colors } = useTheme();
  const { userInfo, splashLoading } = useContext(AuthContext);
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
      {splashLoading ? (
        <Tab.Screen
          name="cargando"
          options={{ title: "Cargando" }}
          component={SplashScreen}
        />
      ) : userInfo.token && userInfo.role.name === "admin" ? (
        <>
          <Tab.Screen
            name="inicioAdmin"
            options={{ title: "Inicio" }}
            component={AdminStack}
          />
          <Tab.Screen
            name="ajustes"
            options={{ title: "Ajustes" }}
            component={AjustesStack}
          />
          <Tab.Screen
            name="perfilAdmin"
            options={{ title: "Perfil" }}
            component={PerfilStack}
          />
        </>
      ) : userInfo.token && userInfo.role.name === "cliente" ? (
        <>
          <Tab.Screen
            name="inicioCliente"
            options={{ title: "Inicio" }}
            component={ClientStack}
          />
          <Tab.Screen
            name="ajustes"
            options={{ title: "Ajustes" }}
            component={AjustesStack}
          />
          <Tab.Screen
            name="perfilCliente"
            options={{ title: "Perfil" }}
            component={PerfilStack}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="login"
            options={{ title: "Iniciar Sesión" }}
            component={AuthStack}
          />
          <Tab.Screen
            name="ajustes"
            options={{ title: "Ajustes" }}
            component={AjustesStack}
          />
        </>
      )}
    </Tab.Navigator>
  );
}

function iconos(route, color, size) {
  let name;
  if (route.name === "inicioCliente" || route.name === "inicioAdmin") {
    name = "home";
  }
  if (route.name === "perfilAdmin" || route.name === "perfilCliente") {
    name = "account";
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
    name = "loading";
  }
  if (route.name === "ajustes") {
    name = "cog";
  }

  return (
    <Icon type="material-community" name={name} size={size} color={color} />
  );
}
