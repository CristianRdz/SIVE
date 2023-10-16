import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useTheme } from 'react-native-paper';

export default function Ajustes() {
    const { colors } = useTheme();
  return (
    <KeyboardAwareScrollView style={{backgroundColor: colors.background}}>

    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({})