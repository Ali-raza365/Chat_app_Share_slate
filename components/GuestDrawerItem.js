import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    Linking,
    Alert,
    Modal,
    View,
    Dimensions,
    Platform,
    ActivityIndicator,
    Image,
} from "react-native";
import { Block, Text, theme, Accordion } from "galio-framework";
import Icon from "./Icon";
import argonTheme from "../constants/Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { ActiveId_Action } from "../redux/reducers/App_Realated/AppActon";
import { GenrateCodeAuth } from "../redux/reducers/ap-user/ap_user_actions";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
const { width, height } = Dimensions.get("window");
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShieldAlt, faClipboard, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import AdsCheck from "../components/AdsReward";
import { GetCoins_action } from "../redux/reducers/Ads/AdsAction";

function GuestDrawer({ title, focused, navigation }) {
    const renderIcon = () => {
        switch (title) {
            case "TRENDING":
                return (
                    <Icon
                        name="trending-up"
                        family="FontAwesome5"
                        size={14}
                        color={focused ? "white" : argonTheme.COLORS.PRIMARY}
                    />
                );
            case "BLOGS":
                return (
                    <Icon
                        name="blogger"
                        family="Zocial"
                        size={14}
                        color={focused ? "white" : "red"}
                    />
                );

            case "Login":
                return (
                    <Icon
                        name="user"
                        family="Entypo"
                        size={12}
                        color={focused ? "white" : "rgb(253,190,108)"}
                    />
                );

            case "Register":
                return (
                    <Icon
                        name="person"
                        family="Octicons"
                        size={14}
                        color={focused ? "white" : argonTheme.COLORS.INFO}
                    />
                );

            case "DESK":
                return (
                    <Icon
                        name="thumbnails"
                        family="Foundation"
                        size={14}
                        color={focused ? "white" : argonTheme.COLORS.ACTIVE}
                    />
                );
            case "Connect":
                return (
                    <Icon
                        name="wechat"
                        family="AntDesign"
                        size={14}
                        color={focused ? "white" : argonTheme.COLORS.DRIBBBLE}
                    />
                );
            case "Reward":
                return (
                    <Icon
                        name="bitcoin"
                        family="Zocial"
                        size={14}
                        color={focused ? "white" : "red"}
                    />
                );
            case "Payment":
                return (
                    <Icon
                        name="bitcoin"
                        family="Zocial"
                        size={14}
                        color={focused ? "white" : "red"}
                    />
                );
            case "Authenticate":
                return (
                    <Icon
                        name="lock"
                        family="Entypo"
                        size={14}
                        color={focused ? "white" : argonTheme.COLORS.INFO}
                    />
                );
            case "About":
                return (
                    <Icon
                        name="info"
                        family="FontAwesome5"
                        size={14}
                        color={focused ? "white" : argonTheme.COLORS.BUTTON_COLOR}
                    />
                );
            case "NEWS":
                return (
                    <Icon
                        name="rss"
                        family="Entypo"
                        size={14}
                        color={focused ? "white" : argonTheme.COLORS.ICON}
                    />
                );
            case "Privacy policy":
                return (
                    <FontAwesomeIcon
                        icon={faShieldAlt}
                        size={14}
                        color={focused ? "white" : argonTheme.COLORS.INFO}
                    />
                );
            case "Terms & conditions":
                return (
                    <FontAwesomeIcon
                        icon={faClipboard}
                        size={14}
                        color={focused ? "white" : argonTheme.COLORS.HYPER_LINK}
                    />
                );

            case "Logout":
                return (
                    <Icon
                        name="logout"
                        family="FontAwesome"
                        size={14}
                        color={focused ? "white" : "green"}
                    />
                );
            default:
                return null;
        }
    };

    const dispatch = useDispatch();
    const childRef = useRef();
    const [show, setshow] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const { token_is } = useSelector((state) => state.Blog_For_Each_Item);

    // console.log(getCoins,"ertyui")
    //style
    const containerStyles = [
        styles.defaultStyle,
        focused ? [styles.activeStyle, styles.shadow] : null,
    ];
    const containerStyles2 = [
        styles.defaultStyle2,
        focused ? [styles.activeStyle, styles.shadow] : null,
    ];
    const containerStyles3 = [
        styles.defaultStyle3,
        focused ? [styles.activeStyle, styles.shadow] : null,
    ];

    // token function for logout.

    const delet_Rtoken = async (title) => {
        try {
            await AsyncStorage.removeItem("@user_token");
            await AsyncStorage.removeItem("@user_type")

                .then(() => {
                    navigation.navigate("Account");
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
    const delet_Ltoken = async (title) => {
        try {
            await AsyncStorage.removeItem("@user_token");
            await AsyncStorage.removeItem("@user_type")

                .then(() => {
                    navigation.navigate("Login");
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

    const auth = async () => {
        var bodyFormData = new FormData();
        bodyFormData.append("action", "generate");
        bodyFormData.append("token", token_is);
        await dispatch(GenrateCodeAuth(bodyFormData));
    };
    const { GenratedCode, aplogin_loading } = useSelector(
        (state) => state.ap_user
    );
    let val = String(GenratedCode && GenratedCode.code);

    const UrgeWithPleasureComponent = () => (
        <CountdownCircleTimer
            onComplete={() => {
                auth();
            }}
            isPlaying
            strokeWidth={2}
            duration={30}
            colors={argonTheme.COLORS.INFO}
            size={width * 0.12}
        >
            {({ remainingTime, animatedColor }) => (
                <Text
                    style={{
                        fontFamily: "open-sans-regular",
                        textAlign: "center",
                    }}
                    color="black"
                    // color={"black"}
                    size={16}
                >
                    {remainingTime}
                </Text>
            )}
        </CountdownCircleTimer>
    );
    let value = "GuestReward";

    if (
        title == "BLOGS" ||
        title == "LifeStyle" ||
        title == "Health" ||
        title == "Entertainment" ||
        title == "Tech" ||
        title == "Educational" ||
        title == "Miscellaneous"
    ) {
        if (title == "BLOGS") {
            return (
                <Block>
                    <TouchableOpacity
                        style={{ height: 60 }}
                        onPress={() => {
                            if (title == "Logout") {
                                {
                                    delet_token();
                                }
                            } else if (title == "BLOGS") {
                                setshow(!show);
                            } else if (title == "About") {
                                navigation.navigate("About");
                            } else {
                                {
                                    navigation.navigate(title);
                                }
                            }
                        }}
                    >
                        <Block flex row style={containerStyles}>
                            <Block middle flex={0.1} style={{ marginRight: 5 }}>
                                {renderIcon()}
                            </Block>
                            <Block row center space="between" flex={0.9}>
                                <Text
                                    style={{ fontFamily: "open-sans-regular" }}
                                    size={15}
                                    bold={focused ? true : false}
                                    color={focused ? "white" : "rgba(0,0,0,0.5)"}
                                >
                                    {title}
                                </Text>
                                {show == true ? (
                                    <FontAwesomeIcon
                                        icon={faAngleUp}
                                        size={18}
                                        color={focused ? "white" : argonTheme.COLORS.BLACK}
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faAngleDown}
                                        size={18}
                                        color={focused ? "white" : argonTheme.COLORS.BLACK}
                                    />
                                )}
                            </Block>
                        </Block>
                    </TouchableOpacity>
                    {show ? (
                        <>
                            <TouchableOpacity
                                style={{ height: 50 }}
                                onPress={() => {
                                    let a = 1;
                                    dispatch(ActiveId_Action("Health"));
                                    navigation.navigate("BlogsCateScrn", {
                                        title: "Health",
                                        tabId: a,
                                    });
                                }}
                            >
                                <Block flex row style={containerStyles2}>
                                    <Block middle flex={0.1} style={{ marginRight: 5 }}>
                                        <Icon
                                            name="heart"
                                            family="AntDesign"
                                            size={14}
                                            color={focused ? "white" : argonTheme.COLORS.BUTTON_COLOR}
                                        />
                                    </Block>
                                    <Block row center flex={0.9}>
                                        <Text
                                            style={{ fontFamily: "open-sans-regular" }}
                                            size={13}
                                            bold={focused ? true : false}
                                            color={focused ? "white" : "rgba(0,0,0,0.5)"}
                                        >
                                            Health
                                        </Text>
                                    </Block>
                                </Block>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ height: 50 }}
                                onPress={() => {
                                    let a = 2;
                                    dispatch(ActiveId_Action("Sports"));
                                    navigation.navigate("BlogsCateScrn", {
                                        title: "Entertainment",
                                        tabId: a,
                                    });
                                }}
                            >
                                <Block flex row style={containerStyles2}>
                                    <Block middle flex={0.1} style={{ marginRight: 5 }}>
                                        <Icon
                                            name="connected-tv"
                                            family="MaterialIcons"
                                            size={14}
                                            color={
                                                focused ? "white" : argonTheme.COLORS.INPUT_SUCCESS
                                            }
                                        />
                                    </Block>
                                    <Block row center flex={0.9}>
                                        <Text
                                            style={{ fontFamily: "open-sans-regular" }}
                                            size={13}
                                            bold={focused ? true : false}
                                            color={focused ? "white" : "rgba(0,0,0,0.5)"}
                                        >
                                            Sports
                                        </Text>
                                    </Block>
                                </Block>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ height: 50 }}
                                onPress={() => {
                                    let a = 3;
                                    dispatch(ActiveId_Action("Tech"));
                                    navigation.navigate("BlogsCateScrn", {
                                        title: "Tech",
                                        tabId: a,
                                    });
                                }}
                            >
                                <Block flex row style={containerStyles2}>
                                    <Block middle flex={0.1} style={{ marginRight: 5 }}>
                                        <Icon
                                            name="spaceship"
                                            family="ArgonExtra"
                                            size={14}
                                            color={focused ? "white" : argonTheme.COLORS.DRIBBBLE}
                                        />
                                    </Block>
                                    <Block row center flex={0.9}>
                                        <Text
                                            style={{ fontFamily: "open-sans-regular" }}
                                            size={13}
                                            bold={focused ? true : false}
                                            color={focused ? "white" : "rgba(0,0,0,0.5)"}
                                        >
                                            Tech
                                        </Text>
                                    </Block>
                                </Block>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ height: 50 }}
                                onPress={() => {
                                    let a = 5;
                                    dispatch(ActiveId_Action("Lifestyle"));
                                    navigation.navigate("BlogsCateScrn", {
                                        title: "LifeStyle",
                                        tabId: a,
                                    });
                                }}
                            >
                                <Block flex row style={containerStyles2}>
                                    <Block middle flex={0.1} style={{ marginRight: 5 }}>
                                        <Icon
                                            name="breakfast-dining"
                                            family="MaterialIcons"
                                            size={14}
                                            color={focused ? "white" : argonTheme.COLORS.INFO}
                                        />
                                    </Block>
                                    <Block row center flex={0.9}>
                                        <Text
                                            style={{ fontFamily: "open-sans-regular" }}
                                            size={13}
                                            bold={focused ? true : false}
                                            color={focused ? "white" : "rgba(0,0,0,0.5)"}
                                        >
                                            LifeStyle
                                        </Text>
                                    </Block>
                                </Block>
                            </TouchableOpacity>
                            {/* <TouchableOpacity
                 style={{ height: 50 }}
                 onPress={() => {
                   let a = null;
                   dispatch(ActiveId_Action("Entertainment"));
                   navigation.navigate("BlogsCateScrn", {
                     title: "Entertainment",
                     tabId: a,
                   });
                 }}
               >
                 <Block flex row style={containerStyles2}>
                   <Block middle flex={0.1} style={{ marginRight: 5 }}>
                     <Icon
                       name="connected-tv"
                       family="MaterialIcons"
                       size={14}
                       color={
                         focused ? "white" : argonTheme.COLORS.INPUT_SUCCESS
                       }
                     />
                   </Block>
                   <Block row center flex={0.9}>
                     <Text
                       style={{ fontFamily: "open-sans-regular" }}
                       size={13}
                       bold={focused ? true : false}
                       color={focused ? "white" : "rgba(0,0,0,0.5)"}
                     >
                       Entertainment
                     </Text>
                   </Block>
                 </Block>
               </TouchableOpacity>
               */}

                            {/* <TouchableOpacity
                 style={{ height: 50 }}
                 onPress={() => {
                   let a = null;
                   dispatch(ActiveId_Action("Educational"));
                   navigation.navigate("BlogsCateScrn", {
                     title: "Educational",
                     tabId: a,
                   });
                 }}
               >
                 <Block flex row style={containerStyles2}>
                   <Block middle flex={0.1} style={{ marginRight: 5 }}>
                     <Icon
                       name="graduation-cap"
                       family="Entypo"
                       size={14}
                       color={focused ? "white" : argonTheme.COLORS.PRIMARY}
                     />
                   </Block>
                   <Block row center flex={0.9}>
                     <Text
                       style={{ fontFamily: "open-sans-regular" }}
                       size={13}
                       bold={focused ? true : false}
                       color={focused ? "white" : "rgba(0,0,0,0.5)"}
                     >
                       Educational
                     </Text>
                   </Block>
                 </Block>
               </TouchableOpacity>
                */}
                        </>
                    ) : null}
                </Block>
            );
        } else if (
            title == "LifeStyle" ||
            title == "Health" ||
            title == "Entertainment" ||
            title == "Tech" ||
            title == "Educational" ||
            title == "Miscellaneous"
        ) {
            return null;
        }
    } else if (title == "DESK" || title == "Connect" || title == "Payment") {
        return (
            <TouchableOpacity style={{ height: 60 }}>
                <Block flex row style={containerStyles3}>
                    <Block middle flex={0.1} style={{ marginRight: 5 }}>
                        {renderIcon()}
                    </Block>
                    <Block row center flex={0.9}>
                        <Text
                            style={{ fontFamily: "open-sans-regular" }}
                            size={15}
                            bold={focused ? true : false}
                            color={focused ? "white" : "rgba(0,0,0,0.5)"}
                        >
                            {title}
                        </Text>
                        <Block
                            style={{
                                backgroundColor: "rgb(94,175,252)",
                                paddingHorizontal: 5,
                                paddingBottom: 2,

                                paddingVertical: 0.5,
                                borderRadius: 10,
                                marginLeft: 10,
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "open-sans-regular",
                                }}
                                size={10}
                                bold={focused ? true : false}
                                color={"white"}
                            >
                                Coming soon
                            </Text>
                        </Block>
                    </Block>
                </Block>
            </TouchableOpacity>
        );
    } else if (title == "Reward")
        return (
            <TouchableOpacity
                onPress={() => {
                    Alert.alert(
                        "Login Required",
                        "",
                        [
                            { text: "Cancel" },
                            {
                                text: "Login",
                                onPress: () => navigation.navigate("Login", { value: value }),
                                style: "destructive",
                            },
                        ],
                        { cancelable: false }
                    );
                }}
            >
                <Block row style={{ height: 50 }}>
                    <Block flex center row style={containerStyles}>
                        <Block middle flex={0.1} style={{ marginRight: 15, marginLeft: 7 }}>
                            <Image
                                style={styles.imgmain}
                                source={{
                                    uri: "https://assets.shareslate.com/media/icon/webp/earn.webp",
                                }}
                            />
                        </Block>
                        <Text
                            style={{ fontFamily: "open-sans-regular", alignSelf: "center" }}
                            size={15}
                            bold={focused ? true : false}
                            color={focused ? "white" : "rgba(0,0,0,0.5)"}
                        >
                            {title}
                        </Text>
                        <Block
                            style={{
                                backgroundColor: "#fd9644",
                                paddingHorizontal: 5,
                                // paddingVertical: 0.5,
                                borderRadius: 10,
                                marginLeft: 10,
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "open-sans-regular",
                                    paddingBottom: 2,
                                }}
                                size={10}
                                bold={focused ? true : false}
                                color={"white"}
                            >
                                Login required
                            </Text>
                        </Block>
                    </Block>
                </Block>
            </TouchableOpacity>
        );
    else if (title == "MY PROFILE") return null;
    else {
        return (
            <TouchableOpacity
                style={{ height: 60 }}
                onPress={() => {
                    if (title == "Login") {
                        {
                            delet_Ltoken();
                        }
                    }
                    // else if (title == "Terms & conditions") {
                    // navigation.navigate("Privacy policy")
                    // }
                    else if (title == "Register") {
                        {
                            delet_Rtoken();
                        }
                    } else {
                        {
                            dispatch(ActiveId_Action(""));
                            navigation.navigate(title);
                        }
                    }
                }}
            >
                <Block flex row style={containerStyles}>
                    <Block middle flex={0.1} style={{ marginRight: 5 }}>
                        {renderIcon()}
                    </Block>
                    <Block row center flex={0.9}>
                        <Text
                            style={{ fontFamily: "open-sans-regular" }}
                            size={15}
                            bold={focused ? true : false}
                            color={focused ? "white" : "rgba(0,0,0,0.5)"}
                        >
                            {title}
                        </Text>
                    </Block>
                </Block>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    defaultStyle: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginBottom: 2,
        // backgroundColor:"yellow",
    },
    activeStyle: {
        backgroundColor: argonTheme.COLORS.ACTIVE,
        borderRadius: 4,
    },
    shadow: {
        shadowColor: theme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
    },
    defaultStyle2: {
        paddingVertical: 16,
        // paddingHorizontal: 16,
        paddingLeft: 40,
        marginBottom: 2,
        // backgroundColor:"yellow"
    },
    defaultStyle3: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        // paddingLeft:40,
        marginBottom: 2,
        // backgroundColor:"blue"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
        // backgroundColor: "red",
    },
    modalView: {
        width: width * 0.9,
        height: height * 0.3,
        // margin: 20,
        backgroundColor: "rgb(226,226,226)",
        borderRadius: 15,
        alignSelf: "center",
        padding: 10,
        alignItems: "center",
        justifyContent: "space-around",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    txt: {
        fontFamily: "open-sans-regular",
        fontWeight: "bold",
    },
    imgmain: {
        width: width * 0.032,
        height: height * 0.017,
        borderColor: 30,
        marginTop: 15,
    },
});

export default GuestDrawer;
