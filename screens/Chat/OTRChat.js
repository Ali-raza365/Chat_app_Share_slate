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
        id: 2,
        avatar: Images.ProfileChat,
        message: `Hey there! How are you today? Can we me et and talk? Thanks!`,
        time: `10:31 PM`,
        title: "chat 1",
        count: 22,
    },
    {
        id: 3,
        avatar: Images.ProfileChat,
        message: `Hey there! How are you today? Can we me et and talk? Thanks!`,
        time: `10:31 PM`,
        title: "chat 1",
        count: 22,
    },
    {
        id: 4,
        avatar: Images.ProfileChat,
        message: `Hey there! How are you today? Can we me et and talk? Thanks!`,
        time: `10:31 PM`,
        title: "chat 1",
        count: 22,
    },
    {
        id: 5,
        message: `Sure, just let me finish something and I’ll call you.`,
        time: `10:34 PM`,
        title: "chat 1",
        count: false,
    },
    {
        id: 6,
        avatar: Images.ProfileChat,
        message: `OK. Cool! See you!`,
        time: `10:35 PM`,
        title: "chat 1",
        count: 2,
    },
    {
        id: 7,
        message: `Bye bye`,
        time: `10:36 PM`,
        status: false,
        title: "chat 1",
        count: 9,
    },
    {
        id: 8,
        avatar: Images.ProfileChat,
        message: `That great message`,
        time: `10:36 PM`,
        status: false,
        title: "chat 1",
        // count: 9,
    },
    {
        id: 9,
        message: `Thanks`,
        time: `10:36 PM`,
        status: false,
        title: "chat 1",
        // count: 9,
    },
    {
        id: 10,
        message: `Okay`,
        time: `10:36 PM`,
        status: false,
        title: "chat 1",
        count: 2,
    },
    {
        id: 11,
        avatar: Images.ProfileChat,
        message: `??`,
        time: `10:36 PM`,
        status: false,
        title: "chat 1",


        // count: 9,
    },
];

const OTRChat = ({ navigation }) => {
    const refRBSheet = useRef();
    const [messages, setmessages] = useState(dummyData)
    const [message, setmessage] = useState("")
    const [Active, setActive] = useState("chat");
    const [height, setheight] = useState(0)
    const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
    const CONTENT_OFFSET_THRESHOLD = 100;
    const [handleExtraData, setHandleExtraDara] = useState(false)
    const flatListRef = React.useRef();
    const onPressTouch = () => {

        flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
    const onContentSizeChange = (width, height) => {
        setheight(height);
    };
    const handleScroll = () => {
        setTimeout(() => {
            flatListRef.current.scrollToOffset({ offset: height });
        }, 1);
    };

    const formatAMPM = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    const handleMessage = async () => {

        // alert('Message')
        const date = await formatAMPM(new Date())
        messages.push({
            id: messages.length + 1,
            message: message,
            time: date
        });
        setmessage("")
        setmessages([...messages])
        setHandleExtraDara(!handleExtraData)
        // this.setState({ messages, message: "" });
        handleScroll();
    };
    const messageForm = () => {
        // const { navigation } = this.props;

        return (
            <View style={styles.messageFormContainer}>
                <Block>
                    <Input
                        borderless
                        color="#9fa5aa"
                        multiline
                        blurOnSubmit
                        style={styles.input}
                        placeholder="Message"
                        autoCapitalize="none"
                        returnKeyType="send"
                        textContentType="none"
                        placeholderTextColor="#9fa5aa"
                        defaultValue={message}
                        onSubmitEditing={() => { handleMessage() }}
                        onChangeText={(text) => { setmessage(text) }}
                    />
                </Block>
            </View>
        );
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
                extraData={handleExtraData}
                contentContainerStyle={[styles.messagesWrapper]}
                renderItem={({ item }) => renderMessage(item)}
                onContentSizeChange={onContentSizeChange}
            />
        );
    };
    return (
        <Block style={{ flex: 1 }}>
            {renderMessages()}
            {messageForm()}
        </Block>
    );
};

export default OTRChat




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
        marginBottom: 10
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