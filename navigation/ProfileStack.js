import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Profile from "../screens/Profile";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
// header for screens
import { Icon, Header } from "../components";
import { argonTheme, tabs } from "../constants";
import NotificationsStack from './NotificationStack';
import SettingsStack from './SettingStack';
import { useIsFocused } from '@react-navigation/native'
// import Chat from "../screens/Chat/Chat";
import ChatList from "../screens/Chat/ChatList";

export default function ProfileStack(props) {
    const isFocused = useIsFocused()

    return (
        <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            transparent
                            white
                            title="Profile"
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: { backgroundColor: "#FFFFFF" },
                    headerTransparent: true,
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
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: { backgroundColor: "#FFFFFF" },
                }}
            />
            <Stack.Screen
                name="Settings"
                component={SettingsStack}
                options={
                    {
                        headerShown: false
                    }

                }
            />
        </Stack.Navigator>
    );
}
