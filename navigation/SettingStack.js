import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

// settings
import SettingsScreen from "../screens/Settings";
import NotificationsScreen from "../screens/Notifications";
import AgreementScreen from "../screens/Agreement";
import PrivacyScreen from "../screens/Privacy";
import AboutScreen from "../screens/About";
import Cart from "../screens/Cart";
import NotificationsStack from './NotificationStack';
import { Icon, Header } from "../components";



export default function SettingsStack(props) {
    return (
      <Stack.Navigator mode="card" headerMode="screen">
        <Stack.Screen
          name="Settings"
          
          component={SettingsScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Settings" back scene={scene} navigation={navigation} />
            ),
            cardStyle: { backgroundColor: "#F8F9FE" },
          }}
        />
        <Stack.Screen
          name="Agreement"
          component={AgreementScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header
                back
                title="Agreement"
                scene={scene}
                navigation={navigation}
              />
            ),
            cardStyle: { backgroundColor: "#F8F9FE" },
          }}
        />
        <Stack.Screen
          name="Privacy"
          component={PrivacyScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header
                back
                title="Privacy"
                scene={scene}
                navigation={navigation}
              />
            ),
            cardStyle: { backgroundColor: "#F8F9FE" },
          }}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header back title="About" scene={scene} navigation={navigation} />
            ),
            cardStyle: { backgroundColor: "#F8F9FE" },
          }}
        />
        <Stack.Screen
          name="NotificationsSettings"
          component={NotificationsScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header
                back
                title="Notifications"
                scene={scene}
                navigation={navigation}
              />
            ),
            cardStyle: { backgroundColor: "#F8F9FE" },
          }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            header: ({ navigation, scene }) => (
              <Header
                back
                title="Shopping Cart"
                scene={scene}
                navigation={navigation}
              />
            ),
            cardStyle: { backgroundColor: "#F8F9FE" },
          }}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationsStack}
          options={{
            header: ({ navigation, scene }) => (
              <Header
                back
                title="Notifications"
                scene={scene}
                navigation={navigation}
              />
            ),
            cardStyle: { backgroundColor: "#F8F9FE" },
          }}
        />
      </Stack.Navigator>
    );
  }