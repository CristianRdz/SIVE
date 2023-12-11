import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VentasScreen from "../../screens/admin/VentasScreen";

const Stack = createNativeStackNavigator();
export default function PedidosStack() {    
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="peidosS"
        component={VentasScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}