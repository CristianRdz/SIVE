import React, { useContext, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../components/common/Header.js";
import LoginScreen from "../screens/cuenta/LoginScreen.js";
import RecuperarScreen from "../screens/cuenta/RecuperarScreen.js";
const Stack = createNativeStackNavigator();
export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="loginS"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="recoverS"
        component={RecuperarScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}