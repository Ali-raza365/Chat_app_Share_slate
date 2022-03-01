import React, { useEffect, useRef, useState } from "react";
import { withNavigation } from "@react-navigation/compat";
import {
    TouchableOpacity,
    StyleSheet,
    Platform,
    Dimensions,
    Keyboard,
    Image,
    Alert,
    Modal,
} from "react-native";
import { Button, Block, NavBar, Text, theme } from "galio-framework";
import { CommonActions } from "@react-navigation/native";

import Icon from "./Icon";
import IconExtra from "./Icon";
import Input from "./Input";
import Tabs from "./Tabs";
import argonTheme from "../constants/Theme";
import { useSelector, useDispatch } from "react-redux";
import { ActiveId_Action } from "../redux/reducers/App_Realated/AppActon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
const { height, width } = Dimensions.get("window");
const iPhoneX = () =>
    Platform.OS === "ios" &&
    (height === 812 || width === 812 || height === 896 || width === 896);

const BellButton = ({ isWhite, style, navigation, title }) => {
    if (title == "Profile") {
        return (
            <TouchableOpacity
                style={[styles.button, style]}
                onPress={() => navigation.navigate("Notifications")}
            >
                <Icon
                    family="ArgonExtra"
                    size={16}
                    name="bell"
                    color={argonTheme.COLORS[isWhite ? "WHITE" : "ICON"]}
                />
                {/* <Block middle style={styles.notify} /> */}
            </TouchableOpacity>
        );
    } else {
        return (
            <TouchableOpacity
                style={[styles.button, style]}
                onPress={() => navigation.navigate("Notifications")}
            >
                <Icon
                    family="ArgonExtra"
                    size={16}
                    name="bell"
                    color={argonTheme.COLORS[isWhite ? "WHITE" : "ICON"]}
                />
                <Block middle style={styles.notify} />
            </TouchableOpacity>
        );
    }
};


function Header({
    back,
    navigation,
    title,
    white,
    transparent,
    bgColor,
    iconColor,
    titleColor,
    search,
    optionLeft,
    optionRight,
    options,
    tabs,
    navActiveid,
    onCreate,
}) {
    const dispatch = useDispatch();
    let pic = useSelector((state) => state.Blog_For_Each_Item.Showprofile);
    let picture = pic && pic[0].profile;
    const { Guest_id } = useSelector((state) => state.ActiveId_Reducer);

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

    const ProfileImage = ({ style, navigation }) => {
        return (
            <TouchableOpacity
                style={[styles.button, style]}
                onPress={() =>
                    navigation.navigate("MY PROFILE", {
                        screen: "Profile",
                        params: { from: "other" },
                    })
                }
            >

                <Image
                    style={{ width: 25, height: 25, borderRadius: 20, marginRight: 50 }}
                    source={{ uri: picture }}
                />
            </TouchableOpacity>
        );
    };
    const AddBlog = ({ isWhite, style, navigation }) => (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={() => navigation.navigate("AddBlog")}
        >
            <Icon
                family="Feather"
                size={22}
                name="plus-circle"
                color={argonTheme.COLORS[isWhite ? "WHITE" : "ICON"]}
            />
        </TouchableOpacity>
    );
    const CreateChat = ({ isWhite, style, navigation }) => (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={() =>
                onCreate()
                // alert("coming soon")
                //  navigation.navigate("CreateChat")
            }
        >
            <Icon
                family={"Feather"}
                size={22}
                name="edit"
                color={argonTheme.COLORS[isWhite ? "WHITE" : "ICON"]}
            />
        </TouchableOpacity>
    );


    handleLeftPress = () => {
        dispatch(ActiveId_Action(""));
        return back
            ? navigation.dispatch(CommonActions.goBack())
            : navigation.openDrawer();
    };
    const renderLeft = () => {
        return (
            <Block middle row>
                <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center", }}
                    onPress={handleLeftPress}
                >
                    <Icon
                        name={back ? "chevron-left" : "menu"}
                        family="entypo"
                        size={back ? 25 : 25}
                        color={
                            iconColor ||
                            (white ? argonTheme.COLORS.WHITE : argonTheme.COLORS.ICON)
                        }
                        style={{ marginTop: 2 }}
                    />
                    <Text
                        style={{ fontFamily: "open-sans-bold" }}
                        size={16}
                        bold
                        style={{ marginLeft: 5, }}
                        color={
                            white ? argonTheme.COLORS.WHITE : argonTheme.COLORS.ICON
                        }
                    >
                        {title}
                    </Text>
                </TouchableOpacity>

            </Block>
        )
    };

    renderRight = () => {
        if (Guest_id == "-1") {
            if (title === "Home") {
                return [
                    <Block center row>
                        <TouchableOpacity
                            style={[styles.button]}
                            onPress={() => {
                                Alert.alert(
                                    "Login Required",
                                    "",
                                    [
                                        { text: "Cancel" },
                                        {
                                            text: "Login",
                                            onPress: () => navigation.navigate("Login"),
                                            style: "destructive",
                                        },
                                    ],
                                    { cancelable: false }
                                );
                            }}
                        >
                            <Image
                                style={{ width: 20, height: 20 }}
                                source={{
                                    uri: "https://cdn3.iconfinder.com/data/icons/eightyshades/512/14_Add-1024.png",
                                }}
                            />
                        </TouchableOpacity>
                        <Button
                            onPress={() => delet_Rtoken()}
                            style={{ width: 70, marginRight: 70, height: 30 }}
                        >
                            <Text
                                style={{ fontFamily: "open-sans-regular" }}
                                size={12}
                                color="white"
                            >
                                Register
                            </Text>
                        </Button>
                    </Block>,
                ];
            }
            if (title === " ") {
                return null;
            }

            //if u include here title header means u add bell&bucket in header right side.
            switch (title) {
                case "Deals":
                case "Categories":
                // case "Category":
                case "Profile":
                // case "Product":
                case "Search":
                case "Settings":
                case "Blogs":
                case "":
                case "News":
                case "NewsCategories":
                case " ":
                    return null;
                default:
                    break;
            }
        } else {
            if (title === "Title") {
                return [
                    <BellButton
                        key="chat-title"
                        navigation={navigation}
                        isWhite={white}
                    />,
                    <ProfileImage
                        key="add-profile"
                        navigation={navigation}
                        isWhite={white}
                        pic={picture}
                    />,
                ];
            }
            if (title === "Home") {
                return [
                    <BellButton
                        key="chat-title"
                        navigation={navigation}
                        isWhite={white}
                    />,
                    <AddBlog key="add-button" navigation={navigation} isWhite={white} />,
                    <ProfileImage
                        key="add-profile"
                        navigation={navigation}
                        isWhite={white}
                        pic={picture}
                    />,
                ];
            }
            if (title === "Connect") {
                return [
                    // <BellButton
                    //     key="chat-title"
                    //     navigation={navigation}
                    //     isWhite={white}
                    // />,
                    // <AddBlog key="add-button" navigation={navigation} isWhite={white} />,
                    <CreateChat key="Creta-chat" navigation={navigation} isWhite={white} />,
                    // <ProfileImage
                    //     key="add-profile"
                    //     navigation={navigation}
                    //     isWhite={white}
                    //     pic={picture}
                    // />,
                ];
            }
            if (title === " ") {
                return null;
            }

            //if u include here title header means u add bell&bucket in header right side.
            switch (title) {
                case "Deals":
                case "Categories":
                // case "Category":
                case "Profile":
                // case "Product":
                case "Search":
                case "Settings":
                case "Blogs":
                case "":
                case "News":
                case "NewsCategories":
                case " ":
                    return [
                        <BellButton
                            title={title}
                            key="chat-categories"
                            navigation={navigation}
                            isWhite={white}
                        />,
                        <AddBlog
                            key="add-button"
                            navigation={navigation}
                            isWhite={white}
                        />,

                        <ProfileImage
                            key="add-profile"
                            navigation={navigation}
                            isWhite={white}
                            pic={picture}
                        />,
                    ];
                default:
                    break;
            }
        }
    };
    renderSearch = () => {
        return (
            <Input
                right
                color="black"
                style={styles.search}
                placeholder="What are you looking for?"
                placeholderTextColor={"#8898AA"}
                onFocus={() => {
                    Keyboard.dismiss();
                    navigation.navigate("Search", {
                        from: tabs && tabs.slice(-1)[0].name,
                    });
                }}
                iconContent={
                    <Icon
                        size={16}
                        color={theme.COLORS.MUTED}
                        name="search-zoom-in"
                        family="ArgonExtra"
                    />
                }
            />
        );
    };
    renderOptions = () => {
        return (
            <Block row style={styles.options}>
                <Button
                    shadowless
                    style={[styles.tab, styles.divider]}
                    onPress={() => navigation.navigate("BlogsCateScrn")}
                >
                    <Block row middle>
                        <Icon
                            name="diamond"
                            family="ArgonExtra"
                            style={{ paddingRight: 8 }}
                            color={argonTheme.COLORS.ICON}
                        />
                        <Text
                            style={{ fontFamily: "open-sans-regular" }}
                            size={16}
                            style={styles.tabTitle}
                        >
                            {optionLeft || "BlogsCateScrn"}
                        </Text>
                    </Block>
                </Button>
                <Button
                    shadowless
                    style={styles.tab}
                    onPress={() => navigation.navigate("Fashion")}
                >
                    <Block row middle>
                        <Icon
                            size={16}
                            name="bag-17"
                            family="ArgonExtra"
                            style={{ paddingRight: 8 }}
                            color={argonTheme.COLORS.ICON}
                        />
                        <Text
                            style={{ fontFamily: "open-sans-regular" }}
                            size={16}
                            style={styles.tabTitle}
                        >
                            {optionRight || "Fashion"}
                        </Text>
                    </Block>
                </Button>
            </Block>
        );
    };
    renderTabs = () => {
        if (!tabs) {
            return null;
        }
        return (
            <Tabs
                data={tabs || []}
                initialIndex={navActiveid}
                onPress={(nav, id, data) => {
                    navigation.navigate(nav, { tabId: id, data });
                }}
                onChange={(id) => navigation.setParams({ tabId: id })}
            />
        );
    };

    renderHeader = () => {
        if (search || tabs || options) {
            return (
                <Block center>
                    {search ? renderSearch() : null}
                    {options ? renderOptions() : null}
                    {tabs ? renderTabs() : null}
                </Block>
            );
        }
    };

    const noShadow = ["Search", "Categories", "Deals", "Pro", "Profile"].includes(
        title
    );
    const headerStyles = [
        !noShadow ? styles.shadow : null,
        transparent ? { backgroundColor: "rgba(0,0,0,0)" } : null,
    ];

    const navbarStyles = [styles.navbar, bgColor && { backgroundColor: bgColor }];

    return (
        <Block
        >
            <NavBar
                back={false}
                // title={title}
                style={navbarStyles}
                transparent={transparent}
                right={renderRight()}
                onLeftPress={handleLeftPress}
                left={
                    renderLeft()
                }
                leftStyle={{ flex: 1, alignItems: 'flex-start', }}
                rightStyle={{ flex: .2, alignItems: 'center', }}
                titleStyle={[
                    styles.title,
                    { color: argonTheme.COLORS[white ? "WHITE" : "HEADER"] },
                    titleColor && { color: titleColor },
                ]}
            />
            {renderHeader()}
        </Block>
    );
}

const styles = StyleSheet.create({
    // headerstyle:{top:0,left:0,right:0,backgroundColor:"green",},
    button: {
        padding: 8,
        marginRight: 10,
        position: "relative",

        // backgroundColor:"red"
    },
    title: {
        width: "100%",
        // fontSize: 16,
        // fontWeight: "bold",
        // backgroundColor: "black",
    },
    navbar: {
        // backgroundColor: "red",
        height: Platform.OS == "ios" ? height * 0.1 : height * 0.11,
        paddingTop: Platform.OS == "ios" ? height * 0.05 : height * 0.07,
        borderBottomColor: "rgb(243,242,239)",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        zIndex: 5,
    },
    shadow: {
        backgroundColor: theme.COLORS.WHITE,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.2,
        elevation: 3,
    },
    notify: {
        backgroundColor: argonTheme.COLORS.LABEL,
        // backgroundColor: "red",
        borderRadius: 4,
        height: theme.SIZES.BASE / 2,
        width: theme.SIZES.BASE / 2,
        position: "absolute",
        top: 3,
        right: 15,
    },
    header: {
        backgroundColor: theme.COLORS.WHITE,
    },
    divider: {
        borderRightWidth: 0.3,
        borderRightColor: theme.COLORS.ICON,
    },
    search: {
        height: 48,
        width: width - 32,
        marginHorizontal: 16,
        borderWidth: 1,
        // backgroundColor:"green",

        borderRadius: 3,
        borderColor: argonTheme.COLORS.BORDER,
    },
    options: {
        marginBottom: 24,
        // marginTop: 10,
        elevation: 4,
    },
    tab: {
        // backgroundColor: theme.COLORS.TRANSPARENT,
        backgroundColor: "green",
        width: width * 0.35,
        borderRadius: 0,
        borderWidth: 0,
        height: 24,
        elevation: 0,
    },
    tabTitle: {
        lineHeight: 19,
        fontWeight: "400",
        color: argonTheme.COLORS.HEADER,
    },
});

export default withNavigation(Header);
