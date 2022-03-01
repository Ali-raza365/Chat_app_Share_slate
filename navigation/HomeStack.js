import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import BlogsCateScrn from "../screens/Beauty";
import Category from "../screens/Category";
import Fashion from "../screens/Fashion";
import Product from "../screens/Product";
import Gallery from "../screens/Gallery";
import ChatList from "../screens/Chat/ChatList";
import Search from "../screens/Search";
import TRENDING from "../screens/Home";
import MyWebComponent from "../components/webScrn";
import Example from "../components/Rich_editor/src/example";
import Preview from "../components/Rich_editor/src/preview";
import Custom_blog from "../screens/custom_blog";
import AddBlog from "../screens/AddBlog";
import Cart from "../screens/Cart";
import NotificationsStack from './NotificationStack';
// header for screens
import { Icon, Header } from "../components";
import { argonTheme, tabs } from "../constants";
import EmailVerify from '../screens/emailVerification';
import OtpScrn from '../screens/Otp';
import RewardStack from './RewardStack';
import SettingsStack from './SettingStack';
import { useIsFocused } from '@react-navigation/native';
import CommentsReply from '../screens/ReplyScrn';
import ShowAllComment from '../screens/ShowAllComment';

const Stack = createStackNavigator();


export default function HomeStack({ navigation }) {
    // const isFocused = useIsFocused();

    // useEffect(() => {

    // }, [isFocused])

    return (
        <Stack.Navigator mode="card" headerMode="screen">
            <Stack.Screen
                name="TRENDING"
                component={TRENDING}
                options={{ headerShown: false, }}
            />
            <Stack.Screen
                name="Custom_blog"
                component={Custom_blog}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CommentReply"
                component={CommentsReply}
                options={{
                    headerShown: true, header: ({ navigation, scene }) => (
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
                name="ShowAllComment"
                component={ShowAllComment}
                options={{
                    headerShown: true, header: ({ navigation, scene }) => (
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
                name="BlogsCateScrn"
                component={BlogsCateScrn}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="RewardStack"
                component={RewardStack}
                options={{
                    headerShown: false,
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />
            <Stack.Screen
                name="EmailVerify"
                component={EmailVerify}
                options={{
                    header: ({ navigation, scene }) => (
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
                name="OtpScrn"
                component={OtpScrn}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            title=" "
                            back
                            // white
                            // transparent
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="Gallery"
                component={Gallery}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            back
                            transparent
                            white
                            title=""
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    headerTransparent: true,
                }}
            />
            {/* <Stack.Screen
                name="Chat"
                component={ChatList}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            title="Messenger "
                            back
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            /> */}
            <Stack.Screen
                name="Search"
                component={Search}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header title="Search" back navigation={navigation} scene={scene} />
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
                            title="Notifications"
                            back
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />
            <Stack.Screen
                name="AddBlog"
                component={AddBlog}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header title="" back navigation={navigation} scene={scene} />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />

            <Stack.Screen
                name="Editor"
                component={Example}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            title=" "
                            back
                            navigation={navigation}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="Preview"
                component={Preview}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            title=" "
                            back
                            navigation={navigation}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="MyWebComponent"
                component={MyWebComponent}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            title=" "
                            back
                            navigation={navigation}
                        />
                    ),
                }}
            />
        </Stack.Navigator>
    );
}