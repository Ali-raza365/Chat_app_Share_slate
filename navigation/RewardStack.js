import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
// Notifications

import { argonTheme, tabs } from "../constants";

// header for screens
import RewardHistory from '../screens/reward/RewardHistory';
import { createStackNavigator } from "@react-navigation/stack";
import RewardStatement from '../screens/reward/RewardStatement';
import { Header } from '../components';
import { useIsFocused } from '@react-navigation/native'

const Stack = createStackNavigator();
export default function RewardStack(props) {
  const isFocused = useIsFocused()

  useEffect(() => {
  }, [isFocused])
  
    return (
      <Stack.Navigator>
        <Stack.Screen name="RewardHistory" component={RewardHistory}
         options={{
          headerShown: true,
          headerTitle: "",
          header: () => <Header back title=""  />,
        }}
        
        />
        <Stack.Screen name="RewardStatement" component={RewardStatement}
          options={{ headerShown: true ,title:"" }}
        
        />
      </Stack.Navigator>
    );
  }
  