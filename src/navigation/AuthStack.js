import React, { useContext, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../components/common/Header.js";
import LoginScreen from "../screens/cuenta/LoginScreen.js";
import RecuperarScreen from "../screens/cuenta/RecuperarScreen.js";
import RegistroScreen from "../screens/cuenta/RegistroScreen.js";
const Stack = createNativeStackNavigator();
export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="loginS"
        component={LoginScreen}
        options={Header("Inicio de Sesión")}
      />
      <Stack.Screen
        name="registerS"
        component={RegistroScreen}
        options={Header("Registro de Usuario")}
      />
      <Stack.Screen
        name="recoverS"
        component={RecuperarScreen}
        options={Header("Recuperar Contraseña")}
      />
    </Stack.Navigator>
  );
}