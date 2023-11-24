import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../../components/common/Header";
import InicioAdmin from "../../components/admin/InicioAdmin";
const Stack = createNativeStackNavigator();
export default function ClientStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="inicioAdminS"
        component={InicioAdmin}
        options={Header("INICIO ADMINISTRADOR")}
      />
    </Stack.Navigator>
  );
}