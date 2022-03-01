import React, { useState, useCallback, useEffect } from 'react'
import {
    View,
    Image,
    StyleSheet,
    FlatList,
    KeyboardAvoidingView,
    TouchableOpacity,
    Dimensions,
    Modal,
    Pressable,
    Platform,
} from "react-native";

import { Input, Block, Text, theme } from "galio-framework";
import { Icon } from "../../components";

import Images from "../../constants/Images";
import argonTheme from "../../constants/Theme";
import RBSheet from "react-native-raw-bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");
import { Video, AVPlaybackStatus } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import * as Permissions from "expo-permissions";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { Record } from "../../components/Record";
import ChatHeader from "./ChatHeader";
import IconExtra from "../../components/Icon";
import { connect } from "react-redux";
import io from 'socket.io-client';
import { _Fetch_roommId, _SendMessage, _ShowMessage } from "../../api/ap-apis";
import Loading from "../../constants/loading";
import { LoadingIndicator } from "react-native-expo-fancy-alerts";
import { ActivityIndicator } from "react-native-paper";
import socket from "../../constants/SocketConfig";
import moment from "moment";

import { GiftedChat } from 'react-native-gifted-chat'
// import * as MediaLibrary from 'MediaLibrary';
const messages = [
    {
        id: 1,
        avatar: Images.ProfileChat,
        message: `Hey there! How are you today? Can we me et and talk? Thanks!`,
        time: `10:31 PM`,
        reply: "2",
    },
    {
        id: 2,
        message: `Sure, just let me finish something and I’ll call you.`,
        time: `10:34 PM`,
        reply: "2",
    },
    {
        id: 3,
        avatar: Images.ProfileChat,
        message: `OK. Cool! See you!`,
        time: `10:35 PM`,
        reply: "2",
    },
    {
        id: 4,
        message: `Bye bye`,
        time: `10:36 PM`,
        // image: Images.Viewed[4]
    },
    {
        id: 5,
        avatar: Images.ProfileChat,
        message: `Bye`,
        time: `10:35 PM`,
        reply: "2",
    },
    {
        id: 6,
        message: `with image `,
        time: `10:36 PM`,
        image: Images.Viewed[4],
        reply: "2",
    },
];

export default function Example() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                sender_loggedIn: false,
                avatar: 'https://placeimg.com/140/140/any',
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const renderMessage = (res) => {
        let msg = res.currentMessage;
        console.log(msg.text, "sdasdasd")
        if (!msg.sender_loggedIn) {
            return (
                <Pressable
                // onPress={() => { this.handlerLongClick("sender") }}
                >
                    <Block key={msg._id}>
                        <Block row space={null}>
                            <Image
                                source={{ uri: Images.Viewed[4] }}
                                style={[styles.avatar, styles.shadow]}
                            />
                            <Block style={styles.messageCardWrapper}>
                                <Block
                                    style={[styles.messageCard, styles.shadow]}
                                >
                                    <Text
                                        style={{
                                            fontFamily: "open-sans-regular",
                                        }}
                                        color={argonTheme.COLORS.TEXT}
                                    >
                                        {msg.text}
                                    </Text>
                                </Block>
                            </Block>
                        </Block>
                        <Block
                            right
                            row
                            style={{
                                alignItems: "center",
                                marginHorizontal: 45,
                                marginBottom: 15,
                            }}
                        >
                            <Icon
                                onPress={() => {
                                    //alert("message lock")
                                }}
                                style={{ marginTop: -2, marginLeft: 8 }}
                                name={msg.id == 3 ? "done-all" : "done"}
                                // name="done"
                                size={15}
                                family="MaterialIcons"
                                color={
                                    msg.id % 2 == 0
                                        ? argonTheme.COLORS.MUTED
                                        : argonTheme.COLORS.PRIMARY
                                }
                            />
                            <Text style={styles.time}>{moment(msg.date).format('LT')}</Text>
                            {msg.reply && (
                                <Text
                                    // onPress={() => this.onModalClick(msg)}
                                    style={styles.reply}>
                                    {msg.reply} replies
                                </Text>
                            )}
                            <Icon
                                onPress={() => {
                                    //alert("message lock")
                                }}
                                style={{ marginTop: 4, marginLeft: 8 }}
                                name="emoji-happy"
                                size={20}
                                family="Entypo"
                                color={
                                    msg.id % 2 == 0
                                        ? argonTheme.COLORS.MUTED
                                        : "#ffcb4c"
                                }
                            // color={argonTheme.COLORS.MUTED}
                            />
                        </Block>
                    </Block>
                </Pressable>
            );
        }

        return (
            <Pressable
            // onPress={() => { this.handlerLongClick("receiver") }}
            >
                <Block key={msg._id} right>
                    <Block row>
                        <Block
                            style={[
                                styles.messageCardWrapper,
                                { marginLeft: 0 },
                            ]}
                        >
                            {msg.image !== null && msg.image !== undefined && (
                                <Block right style={styles.mediaCard}>
                                    <Image
                                        source={{ uri: msg.image }}
                                        style={[styles.photo, styles.shadow]}
                                        resizeMode="contain"
                                    />
                                    <Block
                                        row
                                        right
                                        style={{ marginRight: 15 }}
                                    >
                                        <Text color={"#fff"}>
                                            {msg.text}
                                        </Text>
                                    </Block>
                                </Block>
                            )}
                            {msg.video !== null && msg.video !== undefined && (
                                <Block right style={styles.mediaCard}>
                                    <Video
                                        // ref={this.video}
                                        style={styles.video}
                                        source={{
                                            uri: msg.video,
                                        }}
                                        // useNativeControls
                                        resizeMode="contain"
                                        isLooping={false}
                                    // onPlaybackStatusUpdate={status => setStatus(() => status)}
                                    />
                                    <Block
                                        row
                                        right
                                        style={{ marginRight: 15 }}
                                    >
                                        <Text color={"#fff"}>
                                            {msg.text}
                                        </Text>
                                    </Block>
                                </Block>
                            )}
                            {msg.file !== null && msg.file !== undefined && (
                                <Block right style={styles.docBox}>
                                    <Icon
                                        style={{}}
                                        name="upload-file"
                                        size={width / 10}
                                        family="MaterialIcons"
                                        color={argonTheme.COLORS.ICON}
                                    />
                                    <Text
                                        style={{
                                            fontFamily: "open-sans-regular",
                                            width: width / 4,
                                        }}
                                        color={argonTheme.COLORS.DEFAULT}
                                    >
                                        {msg.file.name}
                                    </Text>
                                </Block>
                            )}
                            {msg.text !== "" && !msg.image && !msg.video && (
                                <Block
                                    style={[
                                        styles.messageCardPersonal,
                                        styles.shadow,
                                    ]}
                                >
                                    <Text
                                        style={{
                                            fontFamily: "open-sans-regular",
                                        }}
                                        color={argonTheme.COLORS.WHITE}
                                    >
                                        {msg.text}dfsdfsdf
                                    </Text>
                                </Block>
                            )}
                        </Block>
                        <Image
                            source={{ uri: Images.ProfileChat }}
                            style={[styles.avatar, styles.shadow]}
                        />
                    </Block>
                    <Block
                        right
                        row
                        style={{
                            justifyContent: "flex-end",
                            alignItems: "center",
                            marginHorizontal: 45,
                            marginBottom: 15,
                        }}
                    >
                        <Icon
                            onPress={() => {
                                //alert("message lock")
                            }}
                            style={{ marginTop: 4 }}
                            name="emoji-happy"
                            size={20}
                            family="Entypo"
                            color={
                                msg.id % 2 == 0
                                    ? argonTheme.COLORS.MUTED
                                    : "#ffcb4c"
                            }
                        // color={argonTheme.COLORS.MUTED}
                        />
                        {msg.reply && (
                            <Text
                                // onPress={() => this.onModalClick(msg)}
                                style={styles.reply}>
                                {msg.reply} replies
                            </Text>
                        )}
                        <Text style={[styles.time, { marginRight: 8 }]}>
                            {msg.time}
                        </Text>
                        <Icon
                            onPress={() => {
                                //alert("message lock")
                            }}
                            style={{ marginTop: -2, marginRight: 8 }}
                            name="done-all"
                            // name="done"
                            size={15}
                            family="MaterialIcons"
                            // color={msg.id % 2 == 0 ? argonTheme.COLORS.MUTED : "orange"}
                            color={
                                msg.id % 2 == 0
                                    ? argonTheme.COLORS.MUTED
                                    : argonTheme.COLORS.PRIMARY
                            }
                        />
                    </Block>
                </Block>
            </Pressable>
        );
    };

    const onSend = useCallback((messages = []) => {
        console.log(messages, "onsend")
        setMessages(previousMessages => GiftedChat.append(previousMessages,
            {
                ...messages,
                sender_loggedIn: true,
            }
        ))
    }, [])
    return (
        <GiftedChat
            messages={messages}
            renderMessage={msg => renderMessage(msg)}
            // renderMessage={msg => renderMessage(msg)}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            }}
        />
    )
}

const styles = StyleSheet.create({
    container: {},
    centeredView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.9)",
    },
    main: { height: "100%", backgroundColor: "white" },
    close: { width: "90%", height: 30, marginTop: 15, paddingHorizontal: 15, },
    row: {
        marginVertical: 7,
    },
    messageFormContainer: {
        // height: 96,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 10,
    },
    input: {
        // width: width * 0.93,
        height: theme.SIZES.BASE * 2.2,
        backgroundColor: theme.COLORS.WHITE,
        shadowColor: theme.COLORS.BLACK,
        shadowOffset: { width: 0, height: 0.7 },
        shadowRadius: 3,
        shadowOpacity: 0.07,
        width: width / 1.4,
        elevation: 2,
    },
    iconButton: {
        width: 40,
        height: 40,
        backgroundColor: "transparent",
    },
    messagesWrapper: {
        flexGrow: 1,
        top: 0,
        paddingLeft: 8,
        paddingRight: 8,
        paddingVertical: 16,
        paddingBottom: 36,
        // paddingBottom: 56
    },
    messageCardWrapper: {
        maxWidth: width / 1.4,
        marginLeft: 8,
        marginRight: 8,
        // marginBottom: 15,
        // backgroundColor: "yellow"
    },
    mediaCard: {
        borderRadius: 10,
        width: width / 1.4,
        justifyContent: "center",
        // marginRight: 8,
        // marginHorizontal: 8,
        paddingVertical: 5,
        backgroundColor: "#000",
    },
    messageCard: {
        paddingHorizontal: 8,
        paddingVertical: 16,
        borderRadius: 6,
        backgroundColor: theme.COLORS.WHITE,
    },
    messageCardPersonal: {
        // borderTopLeftRadius: 0,
        // borderTopRightRadius: 0,
        // marginTop: -4,
        // zIndex: -3444,
        paddingHorizontal: 8,
        paddingVertical: 16,
        borderRadius: 6,
        // marginHorizontal: 8,
        backgroundColor: argonTheme.COLORS.PRIMARY,
    },
    shadow: {
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        shadowOpacity: 1,
    },
    time: {
        fontFamily: "open-sans-regular",
        fontSize: 11,
        opacity: 0.5,
        // marginTop: 8,
        marginLeft: 8,
    },
    reply: {
        fontFamily: "open-sans-regular",
        fontSize: 11,
        opacity: 1,
        // marginTop: 8,
        marginLeft: 10,
        color: argonTheme.COLORS.PRIMARY,
    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 20,
        marginBottom: theme.SIZES.BASE,
    },
    photo: {
        width: "95%",
        marginHorizontal: 8,
        // aspectRatio: 1,
        // marginBottom: 32,
        height: 100,
        borderRadius: 6,
        // borderBottomLeftRadius: 0,
        // borderBottomRightRadius: 0,
        // backgroundColor: 'cyan'
    },
    video: {
        width: "95%",
        marginHorizontal: 8,
        // aspectRatio: 1,
        // marginBottom: 32,
        height: 100,
        borderRadius: 6,
        marginHorizontal: 8,
        minHeight: 100,
        maxHeight: 300,
        // borderRadius: 6,
        // borderBottomLeftRadius: 0,
        // borderBottomRightRadius: 0,
        // backgroundColor: 'rgba(255,255,255,0.8)'
    },
    docBox: {
        width: width / 2.5,
        minHeight: 100,
        maxHeight: 300,
        borderRadius: 6,
        alignItems: "center",
        flexDirection: "row",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: "#f5f5f5",
        overflow: "hidden",
        // paddingRight: 5,
    },
});
