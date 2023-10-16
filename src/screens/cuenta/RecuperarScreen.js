import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RecuperarForm from '../../components/cuenta/RecuperarForm'

export default function RecuperarScreen() {
  return (
    <KeyboardAwareScrollView>
      <RecuperarForm />
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({})