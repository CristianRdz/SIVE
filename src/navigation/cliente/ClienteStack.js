import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InicioCliente from "../../components/cliente/InicioCliente";

const Stack = createNativeStackNavigator();
export default function ClientStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="inicioClienteS"
        component={InicioCliente}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}