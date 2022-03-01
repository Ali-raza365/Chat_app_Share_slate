import React, { useEffect, useState } from "react";
import {
    Easing,
    Animated,
    Dimensions,
    Text,
    TouchableOpacity,
    DevSettings,
} from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

// screens
import AppStack from "./AppStack";
import Register from "../screens/Register";
import TermAndCondition from "../components/TermAndCondition";
import ResetPassword from "../screens/ResetPassword";
import ProfileBuilder from "../screens/ProfileBuilder";
import GooglePlacesInput from "../constants/Location";
import LOGIN from "../screens/Login";
//AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";
//redux component
import { useDispatch, useSelector } from "react-redux";
import {
    Token_action,
    userId_action,
} from "../redux/reducers/blog/Blog_For_Each_Item_action";
import Loading from "../constants/loading";

import LoginSecure from "../screens/LoginSecure";
import ProfileB2 from "../screens/profileB2";
import ReferMe from "../constants/ReferMe";
import { GuestId_Action } from "../redux/reducers/App_Realated/AppActon";
import EmailVerify from "../screens/emailVerification";
import { Header, Icon } from "../components";
import RewardStack from "./RewardStack";
import { argonTheme } from "../constants";


const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();

export default function OnboardingStack({ navigation }) {
    const [user_token, setuser_token] = useState(null);
    const [user_type, setuser_type] = useState(null);

    const [isLoading, setisLoading] = useState(true);
    const dispatch = useDispatch();
    const { Guest_id } = useSelector((state) => state.ActiveId_Reducer);

    useEffect(() => {
        try {
            get_user_token();
            get_user_type();
            get_user_id();
        } catch (error) {
            console.log(error, "ertyui");
        }
    }, [Guest_id]);

    const get_user_type = async () => {
        try {
            const value = await AsyncStorage.getItem("@user_type");

            if (value !== null) {
                await setuser_type(value);

                await dispatch(GuestId_Action(value));

                setisLoading(false);
            } else {
                setisLoading(false);
            }
        } catch (e) {
            return null;
        }
    };
    const get_user_token = async () => {
        try {
            const value = await AsyncStorage.getItem("@user_token");
            if (value !== null) {
                // value previously stored
                await dispatch(Token_action(value));
                setuser_token(value);
                setisLoading(false);
            } else {
                setisLoading(false);
            }
        } catch (e) {
            // setisLoading(false);
            console.log(e, "error in getting token");
        }
    };
    const get_user_id = async () => {
        try {
            const value = await AsyncStorage.getItem("@user_id");
            if (value !== null) {
                // value previously stored
                await dispatch(userId_action(value));
                // console.log(value,"ppp")
                setisLoading(false);
            } else {
                setisLoading(false);
            }
        } catch (e) {
            // setisLoading(false);
            console.log(e, "error in getting token");
        }
    };
    // console.log("user_token:", user_token, "user_type:", user_type);

    // if (isLoading) {
    //   return <Loading />;
    // }

    const delet_token = async () => {
        try {
            await AsyncStorage.removeItem("@user_token");
            await AsyncStorage.removeItem("@user_type");
            await AsyncStorage.removeItem("@user_id")

                .then(() => {
                    // navigation.navigate("Login");
                    DevSettings.reload();
                    console.log("token removed and logout done");
                })
                .catch((e) => {
                    console.log(e, "error in removing token");
                });
        } catch (exception) {
            console.log(exception, "error in removing token=exception");
            return false;
        }
    };

    if (user_token == null) {
        // console.log("pppppppppppppppppppppppppp")
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={LOGIN}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="LoginSecure"
                    component={LoginSecure}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="TermAndCondition"
                    component={TermAndCondition}
                    options={{
                        header: ({ navigation, scene }) => (
                            <Header title=" " back navigation={navigation} />
                        ),
                    }}
                />
                <Stack.Screen
                    name="Account"
                    component={Register}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="App"
                    component={AppStack}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ResetPassword"
                    component={ResetPassword}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="EmailVerify"
                    component={EmailVerify}
                    options={{
                        header: ({ navigation, scene }) => (
                            <Header title=" " back navigation={navigation} scene={scene} />
                        ),
                        cardStyle: { backgroundColor: "#F8F9FE" },
                    }}
                />
                <Stack.Screen
                    name="ProfileBuilder"
                    component={ProfileBuilder}
                    options={{
                        headerShown: true,
                        headerTitle: "",
                        headerLeft: () => (
                            <TouchableOpacity
                                onPress={() => {
                                    delet_token();
                                }}
                            >
                                <Icon
                                    name={"chevron-left"}
                                    style={{ marginLeft: 15 }}

                                    style={{ marginLeft: 15 }}
                                    family="entypo"
                                    size={25}
                                    color={argonTheme.COLORS.ICON}
                                />
                            </TouchableOpacity>
                        ),
                    }}
                />
                <Stack.Screen
                    name="ProfileB2"
                    component={ProfileB2}
                    options={{
                        headerShown: true,
                        headerTitle: "",
                        headerLeft: () => (
                            <Icon
                                name={"chevron-left"}
                                style={{ marginLeft: 15 }}

                                family="entypo"
                                size={25}
                                color={argonTheme.COLORS.ICON}
                            // style={{ marginTop: 2 }}
                            />
                        ),
                        // header: ({ navigation, scene }) => (
                        //   <Header
                        //     title=" "
                        //     back
                        //     navigation={navigation}
                        //   />
                        // ),
                    }}
                />
                <Stack.Screen
                    name="ReferMe"
                    component={ReferMe}
                    options={{
                        header: ({ navigation, scene }) => (
                            <Header title=" " back navigation={navigation} />
                        ),
                    }}
                />
                <Stack.Screen
                    name="GooglePlacesInput"
                    component={GooglePlacesInput}
                    options={{
                        header: ({ navigation, scene }) => (
                            <Header title=" " back navigation={navigation} />
                        ),
                    }}
                />
                <Stack.Screen
                    name="RewardStack"
                    component={RewardStack}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        );
    } else {
        if (user_type == "-1") {
            // console.log("-1 is trigered ");
            return (
                <Stack.Navigator>
                    <Stack.Screen
                        name="App"
                        component={AppStack}
                        options={{ headerShown: false }}
                    />
                    {/* <Stack.Screen
                        name="CHAT"
                        component={ChatList}
                        options={{ headerShown: false }}
                    /> */}

                    <Stack.Screen
                        name="Login"
                        component={LOGIN}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="LoginSecure"
                        component={LoginSecure}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="ResetPassword"
                        component={ResetPassword}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Account"
                        component={Register}
                        options={{ headerShown: false }}
                    />

                    <Stack.Screen
                        name="ProfileBuilder"
                        component={ProfileBuilder}
                        options={{
                            headerShown: true,
                            headerTitle: "",
                            headerLeft: () => (
                                <TouchableOpacity
                                    onPress={() => {
                                        delet_token();
                                    }}
                                >
                                    <Icon
                                        name={"chevron-left"}
                                        style={{ marginLeft: 15 }}

                                        family="entypo"
                                        size={25}
                                        color={argonTheme.COLORS.ICON}
                                    />
                                </TouchableOpacity>
                            ),
                        }}
                    />
                    <Stack.Screen
                        name="ProfileB2"
                        component={ProfileB2}
                        options={{
                            headerShown: true,
                            headerTitle: "",
                            headerLeft: () => (
                                <Icon
                                    name={"chevron-left"}
                                    style={{ marginLeft: 15 }}

                                    family="entypo"
                                    size={25}
                                    color={argonTheme.COLORS.ICON}
                                />
                            ),
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
                        name="ReferMe"
                        component={ReferMe}
                        options={{
                            header: ({ navigation, scene }) => (
                                <Header title=" " back navigation={navigation} />
                            ),
                        }}
                    />
                    <Stack.Screen
                        name="TermAndCondition"
                        component={TermAndCondition}
                        options={{
                            header: ({ navigation, scene }) => (
                                <Header title=" " back navigation={navigation} />
                            ),
                        }}
                    />

                    <Stack.Screen
                        name="GooglePlacesInput"
                        component={GooglePlacesInput}
                        options={{
                            header: ({ navigation, scene }) => (
                                <Header title=" " back navigation={navigation} />
                            ),
                        }}
                    />
                </Stack.Navigator>
            );
        } else if (user_type == "1") {
            // console.log("1 is trigered ");
            return (
                <Stack.Navigator>
                    <Stack.Screen
                        name="App"
                        component={AppStack}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="ProfileBuilder"
                        component={ProfileBuilder}
                        options={{
                            headerShown: true,
                            headerTitle: "",
                            headerLeft: () => (
                                <TouchableOpacity
                                    onPress={() => {
                                        delet_token();
                                    }}
                                >
                                    <Icon
                                        name={"chevron-left"}
                                        style={{ marginLeft: 15 }}

                                        style={{ marginLeft: 15 }}
                                        family="entypo"
                                        size={25}
                                        color={argonTheme.COLORS.ICON}
                                    />
                                </TouchableOpacity>
                            ),
                        }}
                    />

                    <Stack.Screen
                        name="Login"
                        component={LOGIN}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="LoginSecure"
                        component={LoginSecure}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="ResetPassword"
                        component={ResetPassword}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Account"
                        component={Register}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="TermAndCondition"
                        component={TermAndCondition}
                        options={{
                            header: ({ navigation, scene }) => (
                                <Header title=" " back navigation={navigation} />
                            ),
                        }}
                    />

                    <Stack.Screen
                        name="ProfileB2"
                        component={ProfileB2}
                        options={{
                            headerShown: true,
                            headerTitle: "",
                            headerLeft: () => (
                                <Icon
                                    name={"chevron-left"}
                                    style={{ marginLeft: 15 }}

                                    family="entypo"
                                    size={25}
                                    color={argonTheme.COLORS.ICON}
                                />
                            ),
                        }}
                    />
                    <Stack.Screen
                        name="ReferMe"
                        component={ReferMe}
                        options={{
                            header: ({ navigation, scene }) => (
                                <Header title=" " back navigation={navigation} />
                            ),
                        }}
                    />

                    <Stack.Screen
                        name="GooglePlacesInput"
                        component={GooglePlacesInput}
                        options={{
                            header: ({ navigation, scene }) => (
                                <Header title=" " back navigation={navigation} />
                            ),
                        }}
                    />
                </Stack.Navigator>
            );
        } else if (user_type == "0") {
            // console.log("0 is trigered ");

            return (
                <Stack.Navigator>
                    <Stack.Screen
                        name="ProfileBuilder"
                        component={ProfileBuilder}
                        options={{
                            headerShown: true,
                            headerTitle: "",
                            headerLeft: () => (
                                <TouchableOpacity
                                    onPress={() => {
                                        delet_token();
                                    }}
                                >
                                    <Icon
                                        name={"chevron-left"}
                                        style={{ marginLeft: 15 }}

                                        style={{ marginLeft: 15 }}
                                        family="entypo"
                                        size={25}
                                        color={argonTheme.COLORS.ICON}
                                    />
                                </TouchableOpacity>
                            ),
                        }}
                    />
                    <Stack.Screen
                        name="ProfileB2"
                        component={ProfileB2}
                        options={{
                            headerShown: true,
                            headerTitle: "",
                            headerLeft: () => (
                                <Icon
                                    name={"chevron-left"}
                                    style={{ marginLeft: 15 }}

                                    family="entypo"
                                    size={25}
                                    color={argonTheme.COLORS.ICON}
                                />
                            ),
                        }}
                    />
                    <Stack.Screen
                        name="ReferMe"
                        component={ReferMe}
                        options={{
                            header: ({ navigation, scene }) => (
                                <Header title=" " back navigation={navigation} />
                            ),
                        }}
                    />
                    <Stack.Screen
                        name="EmailVerify"
                        component={EmailVerify}
                        options={{
                            header: ({ navigation, scene }) => (
                                <Header title=" " back navigation={navigation} />
                            ),
                            cardStyle: { backgroundColor: "#F8F9FE" },
                        }}
                    />

                    <Stack.Screen
                        name="GooglePlacesInput"
                        component={GooglePlacesInput}
                        options={{
                            header: ({ navigation, scene }) => (
                                <Header title=" " back navigation={navigation} />
                            ),
                        }}
                    />
                    <Stack.Screen
                        name="App"
                        component={AppStack}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Login"
                        component={LOGIN}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="LoginSecure"
                        component={LoginSecure}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="ResetPassword"
                        component={ResetPassword}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="TermAndCondition"
                        component={TermAndCondition}
                        options={{
                            header: ({ navigation, scene }) => (
                                <Header title=" " back navigation={navigation} />
                            ),
                            cardStyle: { backgroundColor: "#F8F9FE" },
                        }}
                    />
                    <Stack.Screen
                        name="Account"
                        component={Register}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            );
        } else {
            return null;
        }
    }
}
