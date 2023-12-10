import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CarritoScreen from "../../screens/cliente/CarritoScreen";

const Stack = createNativeStackNavigator();
export default function CarritoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="carritoS"
        component={CarritoScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}