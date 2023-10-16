import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LoginForm from '../../components/cuenta/LoginForm'
import { useTheme } from 'react-native-paper';

export default function LoginScreen() {
  const colors = useTheme().colors;
  
  return (
    <KeyboardAwareScrollView style={{backgroundColor: colors.background}}>
      <LoginForm />
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({})