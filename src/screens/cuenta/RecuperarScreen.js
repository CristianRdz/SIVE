import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RecuperarForm from '../../components/cuenta/RecuperarForm'
import { useTheme } from 'react-native-paper';

export default function RecuperarScreen() {
  const colors = useTheme().colors;
  return (
    <KeyboardAwareScrollView style={{backgroundColor: colors.background}}>
      <RecuperarForm />
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({})