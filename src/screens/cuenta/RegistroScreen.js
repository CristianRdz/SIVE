import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RegistroForm from '../../components/cuenta/RegistroForm'

export default function RegistroScreen() {
  return (
    <KeyboardAwareScrollView>
      <RegistroForm />
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({})