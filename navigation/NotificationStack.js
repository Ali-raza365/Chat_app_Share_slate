import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
// Notifications
import PersonalNotifications from "../screens/PersonalNotifications";
import SystemNotifications from "../screens/SystemNotifications";
import { argonTheme, tabs } from "../constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// header for screens
import { Icon, Header } from "../components";
const Tab=createBottomTabNavigator();
export default function NotificationsStack(props) {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            // let iconName;
            // if (route.name === "Notifications") {
            //   iconName = "person";
            // } else if (route.name === "Connect") {
            //   iconName = "user";
            // }else if (route.name === "Cloudlap") {
            //   iconName = "laptop";
            // }
            // You can return any component that you like here!
            return (
              <Icon
                name={"person"}
                family="Octicons"
                size={20}
                color={color}
                style={{ marginTop: 10 }}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: argonTheme.COLORS.PRIMARY,
          inactiveTintColor:  argonTheme.COLORS.INFO,
          labelStyle: {
            fontFamily: "open-sans-regular",
            // fontWeight:"bold",fontSize:12
          },
        }}
      >
        <Tab.Screen name="Personal" component={PersonalNotifications} />
        {/* <Tab.Screen name="Connect" component={PersonalNotifications} /> */}
        {/* <Tab.Screen name="Cloudlap" component={PersonalNotifications} /> */}
  
        {/* <Tab.Screen name="System" component={SystemNotifications} /> */}
  
  
      </Tab.Navigator>
    );
  }
  