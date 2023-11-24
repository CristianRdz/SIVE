import React, { useContext, useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AuthStack from "./AuthStack";
import { useTheme } from "react-native-paper";
import { AuthContext } from "../services/auth/context/AuthContext";
import ClientStack from "./cliente/ClienteStack";
import AdminStack from "./admin/AdminStack";
import PerfilStack from "./PerfilStack";
import SplashScreen from "../screens/SplashScreen";
import AjustesStack from "./AjustesStack";
import AdminProductosStack from "./admin/AdminProductosStack";
import { size } from "lodash";
import { color } from "react-native-elements/dist/helpers";
const Tab = createMaterialBottomTabNavigator();

function cerrarSesion() {
  const { logout } = useContext(AuthContext);
  logout();
}

export default function AppNavigation() {
  const { colors } = useTheme();
  const { userInfo, splashLoading } = useContext(AuthContext);
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName="inicioAdmin"
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTitleStyle: {
          color: colors.primary,
        },
        drawerIcon: ({ color, size }) => iconos(route, color, size),
        drawerStyle: {
          backgroundColor: colors.surface,
          width: "70%",
        },
        drawerActiveBackgroundColor: "#C080FF",
        drawerActiveTintColor: colors.surface,
        drawerInactiveTintColor: colors.primary,
      })}
    >
      {splashLoading ? (
        <Drawer.Screen
          name="cargando"
          options={{ title: "Cargando" }}
          component={SplashScreen}
        />
      ) : userInfo.token && userInfo.role.name === "admin" ? (
        <>
          <Drawer.Screen
            name="inicioAdmin"
            options={{ title: "Inicio" }}
            component={AdminStack}
          />
          <Drawer.Screen
            name="ajustes"
            options={{ title: "Ajustes" }}
            component={AjustesStack}
          />
          <Drawer.Screen
            name="perfilAdmin"
            options={{ title: "Perfil" }}
            component={PerfilStack}
          />
          <Drawer.Screen
            name="cerrarSesion"
            options={{
              title: "Cerrar Sesión",
            }}
            component={cerrarSesion}
          />
        </>
      ) : userInfo.token && userInfo.role.name === "cliente" ? (
        <>
          <Drawer.Screen
            name="inicioCliente"
            options={{ title: "Inicio" }}
            component={ClientStack}
          />
          <Drawer.Screen
            name="ajustes"
            options={{ title: "Ajustes" }}
            component={AjustesStack}
          />
          <Drawer.Screen
            name="perfilCliente"
            options={{ title: "Perfil" }}
            component={PerfilStack}
          />
        </>
      ) : (
        <>
          <Drawer.Screen
            name="login"
            options={{ title: "Iniciar Sesión" }}
            component={AuthStack}
          />
          <Drawer.Screen
            name="ajustes"
            options={{ title: "Ajustes" }}
            component={AjustesStack}
          />
        </>
      )}
    </Drawer.Navigator>
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
  if (route.name === "cerrarSesion") {
    name = "logout";
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
