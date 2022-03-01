import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import { argonTheme } from '.';
export default function Loading() {
    return (
        <View style={{
          position: "absolute",
          zIndex: 1,
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F5FCFF88",}}>
        <BallIndicator color={argonTheme.COLORS.PRIMARY}   />
       </View>
    )
}

