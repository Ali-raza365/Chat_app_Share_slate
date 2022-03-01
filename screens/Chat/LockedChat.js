import React, { useRef, useState, useEffect } from "react";
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
    Platform
} from "react-native";

import { Input, Block, Text, theme } from "galio-framework";
import { Icon } from "../../components";

import Images from "../../constants/Images";
import argonTheme from "../../constants/Theme";
import RBSheet from "react-native-raw-bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");
import { Video, AVPlaybackStatus } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import { Record } from "../../components/Record";
import ChatHeader from "./ChatHeader";
import IconExtra from "../../components/Icon";

const dummyData = [
    {
        id: 1,
        avatar: Images.ProfileChat,
        message: `Hey there! How are you today? Can we me et and talk? Thanks!`,
        time: `10:31 PM`,
        title: "chat 1",
        count: 22,
    },
    {
        id: 21,
        avatar: Images.ProfileChat,
        message: `Hey there! How are you today? Can we me et and talk? Thanks!`,
        time: `10:31 PM`,
        title: "chat 1",
        count: 22,
    },
    {
        id: 14,
        avatar: Images.ProfileChat,
        message: `Hey there! How are you today? Can we me et and talk? Thanks!`,
        time: `10:31 PM`,
        title: "chat 1",
        count: 22,
    },
    {
        id: 15,
        avatar: Images.ProfileChat,
        message: `Hey there! How are you today? Can we me et and talk? Thanks!`,
        time: `10:31 PM`,
        title: "chat 1",
        count: 22,
    },
    {
        id: 2,
        message: `Sure, just let me finish something and I’ll call you.`,
        time: `10:34 PM`,
        title: "chat 1",
        count: false,
    },
    {
        id: 3,
        avatar: Images.ProfileChat,
        message: `OK. Cool! See you!`,
        time: `10:35 PM`,
        title: "chat 1",
        count: 2,
    },
    {
        id: 4,
        message: `Bye bye`,
        time: `10:36 PM`,
        status: false,
        title: "chat 1",
        count: 9,
    },
    {
        id: 5,
        avatar: Images.ProfileChat,
        message: `That great message`,
        time: `10:36 PM`,
        status: false,
        title: "chat 1",
        // count: 9,
    },
    {
        id: 6,
        message: `Thanks`,
        time: `10:36 PM`,
        status: false,
        title: "chat 1",
        // count: 9,
    },
    {
        id: 7,
        message: `Okay`,
        time: `10:36 PM`,
        status: false,
        title: "chat 1",
        count: 2,
    },
    {
        id: 8,
        avatar: Images.ProfileChat,
        message: `??`,
        time: `10:36 PM`,
        status: false,
        title: "chat 1",


        // count: 9,
    },
];

const LockChat = ({ navigation }) => {
    const refRBSheet = useRef();
    const [messages, setmessages] = useState(dummyData)
    const [Active, setActive] = useState("chat");
    const [height, setheight] = useState(0)
    const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
    const CONTENT_OFFSET_THRESHOLD = 100;
    const flatListRef = React.useRef();
    const onPressTouch = () => {

        flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
    const onContentSizeChange = (width, height) => {
        setheight(height);
    };
    const handleScroll = () => {
        // const totalIndex = this.state.messages.length - 1;
        // const insetBottom = this.state.messages.length * (theme.SIZES.BASE * 6.5) + 64; // total messages x message height
        setTimeout(() => {
            flatListRef.current.scrollToOffset({ offset: height });
        }, 1);
    };

    const itemLayout = (data, index) => ({
        length: messages.length - 1,
        offset: 32 * index,
        index
    });
    const renderMessage = msg => {
        if (msg.avatar) {
            return (
                <Pressable
                // onPress={() => this.onModalClick(msg)}
                >
                    <Block key={msg.id}>
                        <Block row space={null}>
                            <Image
                                source={{ uri: msg.avatar }}
                                style={[styles.avatar, styles.shadow]}
                            />
                            <Block style={styles.messageCardWrapper}>
                                <Block style={[styles.messageCard, styles.shadow]}>
                                    <Text style={{ fontFamily: 'open-sans-regular' }} color={argonTheme.COLORS.TEXT}>{msg.message}</Text>
                                </Block>
                                <Block right>
                                    <Text style={styles.time}>{msg.time}</Text>
                                </Block>
                            </Block>
                            <Icon
                                onPress={() => {
                                    alert("message lock")
                                }}
                                style={{ marginTop: 20 }}
                                name="lock"
                                size={25}
                                family="MaterialIcons"
                                // color={msg.id % 2 == 0 ? argonTheme.COLORS.MUTED : argonTheme.COLORS.BLOCK}
                                color={argonTheme.COLORS.MUTED}

                            />
                        </Block>

                    </Block>
                </Pressable>

            );
        }
        // console.log({ sdasdsa: msg.image })
        return (
            <Pressable
            // onPress={() => this.onModalClick(msg)}
            >
                <Block key={msg.id} right>

                    <Block row>
                        <Icon
                            onPress={() => {
                                alert("message lock")
                            }}
                            style={{ marginTop: 20, marginRight: -15 }}
                            name="lock"
                            size={25}
                            family="MaterialIcons"
                            // color={msg.id % 2 == 0 ? argonTheme.COLORS.MUTED : argonTheme.COLORS.BLOCK}
                            color={argonTheme.COLORS.MUTED}

                        />
                        <Block style={styles.messageCardWrapper}>
                            {msg.image !== null && msg.image !== undefined && <Block right
                                style={styles.mediaCard}
                            >
                                <Image
                                    source={{ uri: msg.image }}
                                    style={[styles.photo, styles.shadow]}
                                    resizeMode="contain"
                                />
                                <Block row right style={{ marginRight: 15 }}>
                                    <Text color={"#fff"}>{msg.message}</Text>
                                </Block>
                            </Block>}
                            {msg.video !== null && msg.video !== undefined && <Block right
                                style={styles.mediaCard}
                            >
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
                                <Block row right style={{ marginRight: 15 }}>
                                    <Text color={"#fff"}>{msg.message}</Text>
                                </Block>

                            </Block>}
                            {msg.file !== null && msg.file !== undefined &&
                                <Block right style={styles.docBox}
                                >
                                    <Icon
                                        style={{}}
                                        name="upload-file"
                                        size={width / 10}
                                        family="MaterialIcons"
                                        color={argonTheme.COLORS.ICON}
                                    />
                                    <Text style={{ fontFamily: 'open-sans-regular', width: width / 4 }} color={argonTheme.COLORS.DEFAULT}>{msg.file.name}</Text>
                                </Block>

                            }
                            {msg.message !== "" && !msg.image && !msg.video && <Block style={[styles.messageCardPersonal, styles.shadow]}>
                                <Text onPress={
                                    () => {
                                        //  this.onModalClick(msg) 
                                    }
                                } style={{ fontFamily: 'open-sans-regular' }} color={argonTheme.COLORS.WHITE}>{msg.message}</Text>
                            </Block>}
                            <Block right>
                                <Text style={[styles.time, { marginRight: 8 }]}>{msg.time}</Text>
                            </Block>
                        </Block>
                        <Image
                            source={{ uri: Images.ProfileChat }}
                            style={[styles.avatar, styles.shadow]}
                        />

                    </Block>

                </Block>
            </Pressable>
        );
    };

    const renderMessages = () => {
        const insetBottom =
            dummyData.length * (theme.SIZES.BASE * 6.5) + 64; // total messages x message height
        return (
            <FlatList
                ref={flatListRef}
                data={dummyData}
                keyExtractor={item => `${item.id}`}
                showsVerticalScrollIndicator={false}
                getItemLayout={itemLayout}
                contentContainerStyle={[styles.messagesWrapper]}
                renderItem={({ item }) => renderMessage(item)}
                onContentSizeChange={onContentSizeChange}
            />
        );
    };
    return (
        <Block style={{ flex: 1 }}>
            {renderMessages()}
        </Block>
    );
};
export default LockChat

const styles = StyleSheet.create({
    container: {},
    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.9)',

    },
    main: { flex: 1, backgroundColor: "white" },
    close: {
        width: "90%",
        height: 70,
        marginTop: 7,
        marginLeft: 15,
        paddingTop: 10,
        // backgroundColor: "red"
    },
    row: {
        marginVertical: 7
    },
    messageFormContainer: {
        height: 96,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 32
    },
    input: {
        // width: width * 0.93,
        height: theme.SIZES.BASE * 3,
        backgroundColor: theme.COLORS.WHITE,
        shadowColor: theme.COLORS.BLACK,
        shadowOffset: { width: 0, height: 0.7 },
        shadowRadius: 3,
        shadowOpacity: 0.07,
        elevation: 2,
    },
    iconButton: {
        width: 40,
        height: 40,
        backgroundColor: "transparent"
    },
    messagesWrapper: {
        flexGrow: 1,
        top: 0,
        paddingLeft: 8,
        paddingRight: 8,
        paddingVertical: 16,
        paddingBottom: 56
    },
    messageCardWrapper: {
        maxWidth: "77%",
        marginLeft: 8,
        marginBottom: 32
    },
    mediaCard: {
        borderRadius: 10,
        width: width / 1.4,
        justifyContent: "center",
        marginHorizontal: 8,
        paddingVertical: 5,
        backgroundColor: "#000"
    },
    messageCard: {
        paddingHorizontal: 8,
        paddingVertical: 16,
        borderRadius: 6,
        backgroundColor: theme.COLORS.WHITE
    },
    messageCardPersonal: {
        // borderTopLeftRadius: 0,
        // borderTopRightRadius: 0,
        marginTop: -4,
        zIndex: -3444,
        paddingHorizontal: 8,
        paddingVertical: 16,
        borderRadius: 6,
        marginHorizontal: 8,
        backgroundColor: argonTheme.COLORS.PRIMARY,
    },
    shadow: {
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        shadowOpacity: 1
    },
    time: {
        fontFamily: 'open-sans-regular',
        fontSize: 11,
        opacity: 0.5,
        marginTop: 8
    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 20,
        marginBottom: theme.SIZES.BASE
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
        alignItems: 'center',
        flexDirection: "row",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
        // paddingRight: 5,
    }
});