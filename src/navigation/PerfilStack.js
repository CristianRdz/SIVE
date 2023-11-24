import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PerfilScreen from "../screens/cuenta/PerfilScreen.js";
import Header from "../components/common/Header.js";
const Stack = createNativeStackNavigator();
export default function PerfilStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="perfilS"
        component={PerfilScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}