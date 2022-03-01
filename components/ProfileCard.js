import React, { useEffect, useState, useMemo } from "react";
import {
    StyleSheet,
    ImageBackground,
    View,
    Dimensions,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import argonTheme from "../constants/Theme";
import Icon from "./Icon";
import { ISO_8601 } from "moment";

const { width, height } = Dimensions.get("window");



export default function ProfileCard({
    navigation,
    status,
    message,
    profile,
    title,
    text,
    route,
    bid,
    type,
    Comments,
    MultipleSelection,
    onSelect,
    socket
}) {
    const ChatListItem = (chat) => {
        return (
            <TouchableOpacity
                onPress={() =>
                    profile ? null : navigation.navigate("Chatbox", { user: chat, socket: socket })
                }
            >
                <Block row left style={[styles.profilwrap, {
                }]}>
                    {/* {profile ? <Block style={styles.profileStatusDot} ></Block> : null} */}
                    <Block row fluid>
                        <ImageBackground
                            source={{
                                uri: chat.image
                                    ? chat.image
                                    : "https://i.pinimg.com/474x/9f/23/b2/9f23b2cd56484cdbe6d6581e799290a5.jpg",
                            }}
                            style={styles.coment_user_dp}
                            imageStyle={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 100,
                            }}
                        >
                            {profile ? null : (
                                <Block
                                    style={[
                                        styles.dot,
                                        {
                                            backgroundColor: status
                                                ? "lightgreen"
                                                : "red",
                                        },
                                    ]}
                                ></Block>
                            )}
                        </ImageBackground>
                        <Block
                            row
                            style={[
                                styles.coment_user_datee,
                                {
                                    width: width - 150,
                                },
                            ]}
                        >
                            <Text
                                // muted
                                size={19}
                                style={{
                                    paddingTop: 9,
                                    fontWeight: "bold",
                                    fontFamily: "open-sans-regular",
                                    marginLeft: 10,
                                    color: argonTheme.COLORS.TEXT,
                                }}
                            >
                                {chat.name}
                                {/* {chat.title && chat.title} */}
                            </Text>
                            <Text
                                numberOfLines={1}
                                muted
                                size={19}
                                style={{
                                    // paddingTop: 9,
                                    fontWeight: "bold",
                                    fontFamily: "open-sans-regular",
                                    marginLeft: 10,
                                    marginRight: 10,

                                    fontSize: 14,
                                }}
                            // color={argonTheme.COLORS}
                            >
                                {chat.message && chat.message}
                            </Text>
                        </Block>
                    </Block>
                    <Block
                        style={{
                            paddingLeft: 20,
                            flexDirection: "column",
                            justifyContent: "center",
                            // alignContent: "center",
                            // alignContent: "center",
                            // backgroundColor: "yellow",
                            // marginRight: 20,
                        }}
                    >
                        {/* ============== right side time and message status ============== */}
                        <Text
                            muted
                            size={19}
                            style={{
                                paddingTop: 7,
                                fontWeight: "bold",
                                fontFamily: "open-sans-regular",
                                // marginLeft: 10,
                                fontSize: 14,
                            }}
                        // color={argonTheme.COLORS}
                        >
                            {chat.time && chat.time}
                        </Text>
                        {chat.count && (
                            <Block
                                center
                                style={{
                                    // padding: 10
                                    textAlign: "center",
                                    height: 26,
                                    width: 26,
                                    justifyContent: "center",
                                    alignContent: "center",
                                    backgroundColor: "#5e72e3",
                                    borderRadius: 100,
                                    marginTop: 4,
                                }}
                            >
                                <Text
                                    muted
                                    size={10}
                                    style={{
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        fontFamily: "open-sans-regular",
                                    }}
                                    color="#fff"
                                >
                                    {chat.count}
                                </Text>
                            </Block>
                        )}
                    </Block>
                </Block>
            </TouchableOpacity>
        );
    };
    const GroupListItem = (chat) => {
        return (
            <TouchableOpacity
                onPress={() =>
                    profile ? null : navigation.navigate("Chatbox", { user: chat, socket: socket })
                }
            >
                {/* <Block
                    row
                    left
                    style={[
                        styles.profilwrap,
                        {
                            // padding: 10,
                            // backgroundColor: "red"
                            // marginHorizontal: 10,
                            // paddingVertical: 10,
                            // borderBottomColor: "gray",
                            // borderBottomWidth: 0.3,
                        },
                    ]}
                > */}
                {/* {profile ? <Block style={styles.profileStatusDot} ></Block> : null} */}
                <Block row style={{
                    // alignContent: "center",
                    width: "100%",
                    alignItems: "center",
                    // backgroundColor: "cyan",
                    marginHorizontal: 10,
                    // paddingVertical: 10,
                }}>
                    <Block
                        style={[
                            styles.coment_user_dp,
                            {
                                backgroundColor: "#5e72e3",
                                borderRadius: 100,
                                justifyContent: "center",
                                alignContent: "center",
                                textAlign: "center",
                                marginTop: 0,
                            },
                        ]}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                fontWeight: "bold",
                                fontSize: 15,
                                color: "#fff",
                            }}
                        >
                            G
                        </Text>

                        {/* {title.charAt(0).toUpercase()} */}
                    </Block>
                    <Block
                        row
                        style={
                            (styles.coment_user_datee,
                            {
                                width: width - 80,
                                flexDirection: "row",
                                // marginHorizontal: 10,
                                paddingLeft: 10,
                                // paddingVertical: 20,


                                flexGrow: 1,
                                // backgroundColor: "yellow",

                                borderBottomColor: "#CCC",
                                borderBottomWidth: 0.3,
                                alignItems: "center",
                                justifyContent: "space-between",
                                alignContent: "center",
                                height: 65,
                            })
                        }
                    >
                        <Block
                            style={{
                                // flexGrow: 1,

                            }}
                        >
                            <Text
                                // muted
                                size={19}
                                style={{
                                    // paddingTop: 15,
                                    // padding: 10,

                                    fontWeight: "bold",
                                    fontFamily: "open-sans-regular",
                                    // marginLeft: 10,


                                    color: argonTheme.COLORS.TEXT,
                                }}
                            >
                                {title}
                                {/* {message.title && message.title} */}
                            </Text>
                            <Text
                                numberOfLines={1}
                                muted
                                size={19}
                                style={{
                                    fontWeight: "bold",
                                    fontFamily: "open-sans-regular",
                                    marginRight: 10,
                                    fontSize: 14,
                                }}

                            >
                                {"Saad Irfan, Umar, Rahul +..."}
                            </Text>
                        </Block>

                        <Block
                            style={{
                                // flexGrow: ,

                                // justifyContent: "center",
                                // alignContent: "center",
                                alignItems: "flex-start",
                                // paddingTop: 20,
                                // backgroundColor: "red",

                            }}
                        >
                            <Text style={{
                                paddingTop: 10,
                                fontWeight: "bold",
                                flexGrow: 1,
                                marginRight: 8,
                                color: argonTheme.COLORS.MUTED,
                                // backgroundColor: "red"
                            }}>
                                Created 10 days ago
                            </Text>
                        </Block>
                    </Block>
                </Block>

                {/* </Block> */}
            </TouchableOpacity>
        );
    };
    const ContactOptionListItem = (chat) => {
        // console.log(chat, "slection")
        return (
            <TouchableOpacity
                onPress={() =>
                    MultipleSelection ? onSelect(message.index) : navigation.navigate("Chatbox", { user: chat, socket: socket })
                }
            >
                {/* <Block
                    row
                    left
                    style={
                        [styles.profilwrap,
                        {
                            // padding: 0,
                        }]
                    }
                > */}
                {/* {profile ? <Block style={styles.profileStatusDot} ></Block> : null} */}
                <Block row
                    style={{
                        marginHorizontal: 10,
                        alignItems: "center",
                    }}
                >
                    <ImageBackground
                        source={{
                            uri: chat.image
                                ? chat.image
                                : "https://i.pinimg.com/474x/9f/23/b2/9f23b2cd56484cdbe6d6581e799290a5.jpg",
                        }}
                        style={[styles.coment_user_dp, {
                            marginVertical: 10,
                            backgroundColor: "#5e72e3",
                            borderRadius: 100,
                            justifyContent: "center",
                            alignContent: "center",
                            textAlign: "center",
                        }]}
                        imageStyle={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 100,
                        }}
                    >
                        <Block
                            style={[
                                styles.dot,
                                {
                                    backgroundColor: status
                                        ? "lightgreen"
                                        : "red",
                                },
                            ]}
                        ></Block>
                    </ImageBackground>
                    <Block
                        row
                        style={
                            (styles.coment_user_datee,
                            {
                                width: width - 80,
                                // marginHorizontal: 10,
                                // paddingVertical: 10,
                                // backgroundColor: "yellow",
                                marginHorizontal: 10,
                                borderBottomColor: "#ccc",
                                borderBottomWidth: 0.3,
                                alignItems: "center",
                                // alignContent: "center",
                                height: 55,
                            })
                        }
                    >
                        <Text
                            // muted
                            size={18}
                            style={{
                                // paddingTop: 15,
                                fontWeight: "bold",
                                fontFamily: "open-sans-regular",
                                // marginLeft: 10,
                                color: argonTheme.COLORS.TEXT,
                            }}
                        >
                            {chat.name ? chat.name : title}
                            {/* {message.title && message.title} */}
                        </Text>

                        {/* <Text
                                numberOfLines={1}
                                muted
                                size={19}
                                style={{
                                    // paddingTop: 9,
                                    fontWeight: "bold",
                                    fontFamily: "open-sans-regular",
                                    marginLeft: 10,
                                    marginRight: 10,
                                    fontSize: 14,
                                    // backgroundColor: "red"
                                }}
                            // color={argonTheme.COLORS}
                            >
                                @contact123
                                {message.message && message.message}
                            </Text> */}
                    </Block>
                </Block>

                {MultipleSelection && <>
                    <Block
                        style={[
                            styles.coment_user_dp,
                            {
                                width: 20,
                                height: 20,
                                // marginVertical: 10,
                                marginTop: 15,
                                position: "absolute",
                                right: 10,
                                borderWidth: 1.5,
                                borderColor: argonTheme.COLORS.MUTED,
                                backgroundColor: message.select ? "#5e72e3" : "transparent",
                                borderRadius: 100,
                                alignItems: "center",
                                justifyContent: "center",
                                alignContent: "center",
                                textAlign: "center",
                            },
                        ]}
                    >
                        {/* <Text
                            style={{
                                textAlign: "center",
                                fontWeight: "bold",
                                fontSize: 15,
                                color: "#fff",
                            }}
                        >
                            G
                        </Text> */}
                    </Block>
                </>}

                {/* <Block
                    style={{
                        // padding: 20,
                        // flexDirection: "column",
                        justifyContent: "center",
                        alignContent: "center",
                        paddingTop: 20,
                        // backgroundColor: "yellow",
                        // marginRight: 20,
                    }}
                >
                    <Icon
                            // onPress={() => refRBSheet.current.open()}
                            size={17}
                            color={theme.COLORS.INPUT}
                            name="chevron-thin-right"
                            family="entypo"
                            style={{ paddingRight: 15 }}
                        />
                </Block> */}
                {/* </Block> */}
            </TouchableOpacity>
        );
    };
    const ContactsListItem = (chat) => {
        return (
            <TouchableOpacity
                onPress={() =>
                    profile ? null : navigation.navigate("Chatbox", { user: chat, socket: socket })
                }
            >
                <Block row style={{
                    width: "100%",
                    alignItems: "center",
                    // backgroundColor: "cyan",
                    marginHorizontal: 10,
                    // marginVertical: 10,
                    // paddingVertical: 10,
                }}>
                    <ImageBackground
                        source={{
                            uri: chat.image
                                ? chat.image
                                : chat.avatar,
                        }}
                        style={[styles.coment_user_dp, {
                            // marginVertical: 10,
                            marginTop: -13,
                            // backgroundColor: "#5e72e3",
                            borderRadius: 100,
                            justifyContent: "center",
                            alignContent: "center",
                            textAlign: "center",
                        }]}
                        imageStyle={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 100,
                        }}
                    >
                        <Block
                            style={[
                                styles.dot,
                                {
                                    backgroundColor: status
                                        ? "lightgreen"
                                        : "red",
                                },
                            ]}
                        ></Block>
                    </ImageBackground>
                    <Block
                        row
                        style={
                            (styles.coment_user_datee,
                            {
                                width: width - 55,
                                flexDirection: "column",

                                // marginHorizontal: 10,
                                paddingLeft: 10,
                                paddingVertical: 10,
                                // marginVertical: 10,


                                // flexGrow: 1,
                                // backgroundColor: "yellow",

                                borderBottomColor: "#CCC",
                                borderBottomWidth: 0.3,
                                // alignItems: "center",
                                // justifyContent: "center",
                                // alignContent: "center",
                                // height: 65,
                            })
                        }
                    >
                        <Block
                            row
                            style={{
                                // flexGrow: 1,
                                justifyContent: "space-between"

                            }}
                        >
                            <Text
                                // muted
                                size={19}
                                style={{
                                    // paddingTop: 15,
                                    // padding: 10,

                                    fontWeight: "bold",
                                    fontFamily: "open-sans-regular",
                                    // marginLeft: 10,


                                    color: argonTheme.COLORS.TEXT,
                                }}
                            >
                                { }
                                {message.name && message.name}
                            </Text>
                            <Text
                                numberOfLines={1}
                                muted
                                size={19}
                                style={{
                                    fontWeight: "bold",
                                    fontFamily: "open-sans-regular",
                                    marginRight: 12,
                                    marginTop: 5,
                                    fontSize: 14,
                                }}

                            >
                                Say Hi!
                                {/* {"Saad Irfan, Umar, Rahul +..."} */}
                            </Text>
                        </Block>

                        <Block
                            style={{
                                // flexGrow: ,

                                // justifyContent: "center",
                                // alignContent: "center",
                                // alignItems: "flex-start",
                                // paddingTop: 20,
                                // backgroundColor: "red",

                            }}
                        >
                            <Text style={{
                                // paddingTop: 10,
                                flexGrow: 1,
                                color: argonTheme.COLORS.MUTED,
                                // backgroundColor: "red"
                            }}>
                                Project Manager | IT Consultant : SaaS Product, Mobile App Development
                            </Text>
                        </Block>
                    </Block>
                </Block>

                {/* </Block> */}
            </TouchableOpacity>
        );
    };
    if (!message) {
        return <Text></Text>;
    }
    return (
        <>
            {type === "chat" && ChatListItem(message)}
            {type === "contact" && ContactsListItem(message)}
            {type === "group" && GroupListItem(message)}
            {type === "contactOption" && ContactOptionListItem(message)}
        </>
    );
}

const styles = StyleSheet.create({
    profilwrap: {
        // width: width - 100,
        // position: 'relative',
        padding: 10,
        // marginTop: 20,
        // flexWrap: "wrap",
        // paddingRight: 20,
        // justifyContent: 'space-evenly',
        // alignContent: "center",
        // alignItems: "center"
        // backgroundColor: "red"
    },
    coment_user_dp: {
        width: 35,
        height: 35,
        marginTop: 10,
        // borderRadius: 100,
        // backgroundColor: "blue",
        alignContent: "center",
    },

    coment_user_datee: {
        width: width - 100,
        height: 45,
        flexDirection: "column",
        // paddingLeft: 10,
        // justifyContent: "space-between",
        // alignContent: "center",
        // padding: 5,
        // backgroundColor: "red",
    },

    dot: {
        width: 15,
        height: 15,
        backgroundColor: "red",
        position: "absolute",
        // top: 10,
        borderWidth: 3,
        borderColor: "#fff",
        bottom: 2,
        right: -3,
        borderRadius: 100,
        zIndex: 10,
    },
    profileStatusDot: {
        width: 10,
        height: 10,
        backgroundColor: "lightgreen",
        position: "absolute",
        // top: 10,
        top: 22,
        left: 180,
        borderRadius: 100,
        zIndex: 10,
    },
});
