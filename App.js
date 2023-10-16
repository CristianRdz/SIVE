import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Card, DefaultTheme, PaperProvider, useTheme } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Main from './Main';
import { AuthContext, AuthProvider } from './src/services/auth/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}
const styles = StyleSheet.create({
  toastBase: {
    height: 60, width: '95%', justifyContent: 'center', alignItems: 'center', 
    borderWidth: 2, borderRadius: 10, marginVertical: 5, padding: 5
  }
})