import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View, } from 'react-native'
import { createDrawerNavigator } from "@react-navigation/drawer";
// header for screens
import { Icon, Header } from "../components";
const Drawer = createDrawerNavigator();
import HomeStack from './HomeStack'
import ProfileStack from './ProfileStack';
import PrivacyPolicy from "../screens/PrivacyPolicy";
import About from "../screens/About";
import News from "../screens/News/NewsHome";
import CustomDrawerContent from "./Menu";
import TermAndCondition from "../components/TermAndCondition";
import RewardStack from './RewardStack';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GuestId_Action } from '../redux/reducers/App_Realated/AppActon';
const { width } = Dimensions.get("screen");
import { useIsFocused } from '@react-navigation/native'
import ChatList from '../screens/Chat/ChatList';
import Chat from '../screens/Chat/Chat';
import ChatStack from './ChatStack';

var value;

export default function AppStack({ navigation, route }) {
    const [refresh, setrefresh] = useState(false);
    const dispatch = useDispatch()
    const { Guest_id } = useSelector(state => state.ActiveId_Reducer)

    const get_user_type = async () => {
        try {
            value = await AsyncStorage.getItem("@user_type");

            if (value !== null) {
                await dispatch(GuestId_Action(value));
            } else {
            }
        } catch (e) {
            console.log(e, "error in getting user type");
        }
    };
    const isFocused = useIsFocused()

    useEffect(() => {
        get_user_type()
    }, [value, refresh, Guest_id, isFocused])

    if (Guest_id != "-1") {
        () => setrefresh(!refresh)
        return (

            <Drawer.Navigator
                style={{ flex: 1 }}
                drawerContent={props => <CustomDrawerContent {...props} />}
                drawerStyle={{
                    backgroundColor: "white",
                    width: width * 0.8
                }}
                // drawerType="back"
                drawerContentOptions={{
                    activeTintcolor: "white",
                    inactiveTintColor: "#000",
                    activeBackgroundColor: "transparent",

                    itemStyle: {
                        width: width * 0.75,
                        backgroundColor: "transparent",
                        paddingVertical: 16,
                        paddingHorizonal: 12,
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        overflow: "hidden"
                    },
                    labelStyle: {
                        fontSize: 18,
                        marginLeft: 12,
                        fontWeight: "normal"
                    }
                }}
                initialRouteName="TRENDING"
            >

                <Drawer.Screen name="TRENDING" component={HomeStack} options={{
                    headerShown: false,
                }} />
                <Drawer.Screen name="NEWS" component={News} options={{ headerShown: false }} />

                <Drawer.Screen
                    name="Terms & conditions"
                    component={TermAndCondition}
                    options={{
                        headerShown: true,
                        header: ({ navigation, scene }) => <Header title=" " back />,
                    }}
                />
                <Drawer.Screen
                    name="Connect"
                    component={ChatStack}
                    options={{ headerShown: false }}
                />

                <Drawer.Screen name="MY PROFILE" component={ProfileStack} />
                <Drawer.Screen
                    name="About"
                    component={About}
                    options={{
                        headerShown: true,
                        // headerTitle: "About",
                        header: () => <Header title=" " back />,
                    }}
                />
                <Drawer.Screen
                    name="Privacy policy"
                    component={PrivacyPolicy}
                    options={{
                        headerShown: true,
                        headerTitle: "",
                        header: () => <Header title=" " back />,
                    }}
                />
                <Drawer.Screen
                    name="RewardStack"
                    component={RewardStack}

                />
            </Drawer.Navigator>
        )


    } else {
        () => setrefresh(!refresh)

        return (
            <Drawer.Navigator
                style={{ flex: 1 }}
                drawerContent={props => <CustomDrawerContent {...props} />}
                drawerStyle={{
                    backgroundColor: "white",
                    width: width * 0.8
                }}
                drawerContentOptions={{
                    activeTintcolor: "white",
                    inactiveTintColor: "#000",
                    activeBackgroundColor: "transparent",
                    itemStyle: {
                        width: width * 0.75,
                        backgroundColor: "transparent",
                        paddingVertical: 16,
                        paddingHorizonal: 12,
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        overflow: "hidden"
                    },
                    labelStyle: {
                        fontSize: 18,
                        marginLeft: 12,
                        fontWeight: "normal"
                    }
                }}
                initialRouteName="TRENDING"
            >

                <Drawer.Screen name="TRENDING" component={HomeStack} options={{
                    headerShown: false,
                }} />
                <Drawer.Screen name="NEWS" component={News} />

                <Drawer.Screen
                    name="Terms & conditions"
                    component={TermAndCondition}
                    options={{
                        headerShown: true,
                        headerTitle: "",
                        header: ({ navigation, scene }) => <Header title=" " back />,
                    }}
                />

                {/* <Drawer.Screen name="MY PROFILE" component={ProfileStack} /> */}
                <Drawer.Screen
                    name="About"
                    component={About}
                    options={{
                        headerShown: true,
                        // headerTitle: "About",
                        header: () => <Header title=" " back />,
                    }}
                />
                <Drawer.Screen
                    name="Privacy policy"
                    component={PrivacyPolicy}
                    options={{
                        headerShown: true,
                        headerTitle: "",
                        header: () => <Header title=" " back />,
                    }}
                />
                <Drawer.Screen
                    name="RewardStack"
                    component={RewardStack}

                />
            </Drawer.Navigator>
        )
    }

}
