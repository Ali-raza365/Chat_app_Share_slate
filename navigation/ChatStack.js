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
import Chat from '../screens/Chat/Chat';
import ChatReply from '../screens/Chat/ChatReply';
import { color } from 'react-native-reanimated';
import ChatSearch from '../screens/Chat/ChatSearch';
import ChatProfile from '../screens/Chat/UserChatProfile';
import LockedChat from '../screens/Chat/LockedChat';
import ReactedChat from '../screens/Chat/ReactedChat';
import SearchFiles from '../screens/Chat/SearchFiles';
import OTRChat from '../screens/Chat/OTRChat';
import GiftedChat from '../screens/Chat/GiftedChat';
import Audio from '../components/Audio'


export default function ChatStack(props) {
    const isFocused = useIsFocused()

    return (
        <Stack.Navigator initialRouteName="Connect" mode="card" headerMode="screen">
            <Stack.Screen
                name="Chatbox"
                // component={Audio}
                component={Chat}
                // component={GiftedChat}
                options={{
                    headerShown: false, header: ({ navigation, scene }) => (
                        <Header
                            title=" "
                            back
                            // tabs={tabs.fashion}
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />
            <Stack.Screen
                name="Connect"
                component={ChatList}
                options={{
                    headerShown: false,
                    cardStyle: {
                        backgroundColor:
                            "#F8F9FE",

                        color: "#000",
                    },
                }}
            />
            <Stack.Screen
                name="ChatReply"
                component={ChatReply}
                options={{
                    headerShown: true, header: ({ navigation, scene }) => (
                        <Header
                            title=" Replies"
                            back
                            // tabs={tabs.fashion}
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />
            <Stack.Screen
                name="ChatSearch"
                component={ChatSearch}
                options={{
                    headerShown: false, header: ({ navigation, scene }) => (
                        <Header
                            title=" "
                            back
                            // tabs={tabs.fashion}
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />
            <Stack.Screen
                name="ChatProfile"
                component={ChatProfile}
                options={{
                    headerShown: true, header: ({ navigation, scene }) => (
                        <Header
                            title=" Profile"
                            back
                            // tabs={tabs.fashion}
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />

            <Stack.Screen
                name="LockedChat"
                component={LockedChat}
                options={{
                    headerShown: true, header: ({ navigation, scene }) => (
                        <Header
                            title=" Locked Messages"
                            back
                            // tabs={tabs.fashion}
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />
            <Stack.Screen
                name="ReactedChat"
                component={ReactedChat}
                options={{
                    headerShown: true, header: ({ navigation, scene }) => (
                        <Header
                            title=" Reacted Messages"
                            back
                            // tabs={tabs.fashion}
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />
            <Stack.Screen
                name="SearchFiles"
                component={SearchFiles}
                options={{
                    headerShown: true, header: ({ navigation, scene }) => (
                        <Header
                            title=" Files"
                            back
                            // tabs={tabs.fashion}
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />
            <Stack.Screen
                name="ORTChat"
                component={OTRChat}
                options={{
                    headerShown: true, header: ({ navigation, scene }) => (
                        <Header
                            title=" OTR Off-The-Record"
                            back
                            // tabs={tabs.fashion}
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />


        </Stack.Navigator>
    );
}
