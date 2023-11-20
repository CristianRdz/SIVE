import React, { useContext, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../components/common/Header.js";
import Ajustes from "../screens/Ajustes.js";
const Stack = createNativeStackNavigator();
export default function AjustesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ajustesS"
        component={Ajustes}
        options={Header("Ajustes")}
      />
    </Stack.Navigator>
  );
}