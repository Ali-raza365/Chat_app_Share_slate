import React, { useRef } from "react";
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
import { _SendMessage, _ShowMessage } from "../../api/ap-apis";
import Loading from "../../constants/loading";
import { LoadingIndicator } from "react-native-expo-fancy-alerts";
import { ActivityIndicator } from "react-native-paper";
import socket from "../../constants/SocketConfig";
import moment from "moment";
import { GiftedChat } from 'react-native-gifted-chat'

// const SOCKET_URL = 'https://www.shareslate.com/apis/chat/sendMessage.php';


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

const obj = {
    // id: "227",
    sender_id: "488",
    receiver_id: "459",
    message: "test1245 ",
    status: "0",
    is_read: "0",
    type: "0",
    // rc_msg_id: null,
    room_id: "61ae6bd9610b8",
    // date_added: "2021-12-04 10:27:51",
    // message_attachment_name: "",
    // is_pin: "0",
    // reply_id: "0",
    // like_status: "0",
    // is_active: "1",
    // is_hidden: "0",
    // life_span: "0",
    // is_happy: "0",
    // unread_count: {
    //     count: "4"
    // },
    // reply_message: [],
    // receiver_user_data: {
    //     id: "2",
    //     fname: "Ankit",
    //     lname: "tiwari",
    //     email: "ankit.tiwari@shareslate.com",
    //     password: "25f9e794323b453885f5181f1b624d0b",
    //     status: "1",
    //     profile_img: "https://celebsupdate.com/wp-content/uploads/2020/02/Hrithik-Roshan-Most-Handsome-Bollywood-Actors.jpg",
    //     date_added: "2021-08-25 17:01:27",
    //     nick: "",
    //     address: "gulshan karachi",
    //     city: "",
    //     profile_status: ""
    // },
    // sender_user_data: {
    //     id: "1",
    //     fname: "Rahul",
    //     lname: "Tripathi",
    //     email: "rahul.tripathi@shareslate.com",
    //     password: "25f9e794323b453885f5181f1b624d0b",
    //     status: "1",
    //     profile_img: "https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png",
    //     date_added: "2021-11-21 09:18:33",
    //     nick: "",
    //     address: "Mumbai",
    //     city: "Mumbai",
    //     profile_status: ""
    // }
}

class Chat extends React.Component {

    state = {
        messages: messages,
        message: "",
        height: 0,
        photo: null,
        video: null,
        file: null,
        modalVisible: false,
        OTRmodalVisible: false,
        modalUri: null,
        modalType: null,
        showPhoto: false,
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        cameraRef: null,
        recording: false,
        userSheet: "sender",
        conncted: false,
        data: null,
        user: null,
        profile: null,
        loading: false,
        sender_img: null,
        receiver_img: null,
        room_id: 0,
    };
    room_id = "0"
    onConnectSocket = () => {
        console.log(this.room_id, "room id onConnectSocket")
        // socket.connect();
        socket.on('connect', () => {
            console.log("socket connected");
        })
        socket.io.on("error", (error) => {
            console.log(error)
        });
        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err}`);
        });
        socket.on(`message_${this.room_id}`, (data) => {
            const { messages, user } = this.state;
            console.log(data, "message response", this.room_id)
            console.log(user, data.receiver_id)
            if (user.userId !== data.receiver_id) {
                messages.push({
                    message: data.message,
                    time: moment(data.date_added).format('LT'),
                    image: null,
                    video: null,
                    file: null,
                    sender_loggedIn: false,
                });
                this.setState({
                    messages,
                })
                this.handleScroll();
            }
        })
    }
    showMessage = (user) => {
        this.setState({
            loading: true
        });
        let userDeials = {
            token: this.props.token,
            receiver_id: user.userId,
            action: 'show',
            limit: 5,
        };
        _ShowMessage(userDeials).then((response) => {
            console.log(response.data)
            if (response.data.status == "error") {
                this.setState({
                    messages: []
                });
            } else {
                let sender_img = null
                let receiver_img = null
                let sender_loggedIn = response.data.data[0].sender_loggedIn;
                this.room_id = response.data.data[0].room_id
                if (sender_loggedIn) {
                    sender_img = response.data.data[0].receiver_img;
                    receiver_img = response.data.data[0].sender_img;
                } else {
                    sender_img = response.data.data[0].sender_img;
                    receiver_img = response.data.data[0].receiver_img;
                }
                this.setState({
                    messages: response.data.data.reverse(),
                    sender_img,
                    receiver_img,
                });
                // if (this.room_id == "0") {
                this.onConnectSocket()
                // }
            }
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            this.setState({
                loading: false
            });
        });
    }
    SendMessage = (msg) => {
        console.log(this.state.room_id)
        let chat_details = {
            token: this.props.token,
            receiver_id: this.state.user.userId,
            message: msg,
            type: 0,
            room_id: this.room_id,
        };
        _SendMessage(chat_details).then((response) => {
            // console.log(response.data)
            if (response.data.status == "error") {
            } else {
                console.log(socket.connected, "is connected")
                socket.emit('chat_message', response.data)
            }
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            this.setState({
                loading: false
            });
        });
        // this.onConnectSocket()
    }

    async componentDidMount() {
        const { user } = this.props.route.params;
        // this.onConnectSocket()
        this.showMessage(user)
        this.setState({
            hasCameraPermission: "granted",
            user: user,
            myToken: this.props.token ? this.props.token : null,
            // profile: this.props.profile ? this.props.profile[0].profile : null
        });
    }

    messagesScroll = React.createRef();
    // video = React.useRef(null);
    refRBSheet = React.createRef();
    cameraRef = React.createRef(Camera);

    handlerLongClick = (type) => {
        this.RBSheet.close();
        this.EDSheet.open();
        this.setState({ userSheet: type })
        // alert('Button Long Pressed');
    };

    itemLayout = (data, index) => ({
        length: this.state.messages.length - 1,
        offset: 15 * index,
        index,
    });

    handleScroll = () => {
        // const totalIndex = this.state.messages.length - 1;
        // const insetBottom = this.state.messages.length * (theme.SIZES.BASE * 6.5) + 64; // total messages x message height
        setTimeout(() => {
            this.messagesScroll.current.scrollToOffset({
                offset: this.state.height,
            });
        }, 1);
    };

    onContentSizeChange = (width, height) => {
        this.setState({
            height,
        });
    };

    onModalClick = (msg) => {
        this.props.navigation.navigate("ChatReply", {
            data: {
                // type, uri,
                ...msg,
            },
        });
        // this.setState({
        //     modalUri: uri,
        //     modalType: type,
        //     modalVisible: true,
        // })
    };
    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
        });
        // console.log(result);
        if (!result.cancelled) {
            // generateThumbnail(result)
            //   prof_image(result.uri);
            console.log(this.state);
            console.log(result);
            this.setState({
                photo: result.uri,
            });
            this.handleMessage();
        }
        this.RBSheet.close();
    };
    TakePicture = (result) => {
        // const { status } = await .Camera.requestPermissionsAsync();
        // console.log(status)
        // let photo = await Camera.takePictureAsync();
        console.log(result, "sdasdassssssssss");
        if (result.type == "video") {
            // console.log(this.state)
            this.setState({
                video: result.uri,
                showPhoto: false,
            });
            // this.handleMessage()
            console.log(result.uri, "videooooooooo");
        } else {
            this.setState({
                photo: result.uri,
                showPhoto: false,
            });
            console.log(result.uri, "imagesssssss");
        }
        setTimeout(() => {
            this.handleMessage();
        }, 1000);
        this.RBSheet.close();
    };
    Allpicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
        });
        // console.log(result);

        console.log(result, "response");

        if (!result.cancelled) {
            if (result.type === "video") {
                // console.log(this.state)
                this.setState({
                    video: result.uri,
                });
            } else {
                this.setState({
                    photo: result.uri,
                });
            }
            this.handleMessage();
        }
        this.RBSheet.close();
    };

    DocPicker = async () => {
        console.log("doc");
        let result = await DocumentPicker.getDocumentAsync({
            copyToCacheDirectory: true,
        });
        console.log(result);
        const typesarr = ["xlsx", "docx", "pdf"];
        let type = result.name.split(".").pop();
        if (typesarr.includes(type)) {
            this.setState({
                file: result,
            });
            this.handleMessage();
        } else {
        }
        this.RBSheet.close();
    };

    EditDeleteSheet = () => {
        // const refRBSheet = useRef();
        return (
            <View>
                <RBSheet
                    ref={(ref) => {
                        this.EDSheet = ref;
                    }}
                    height={this.state.userSheet == "receiver" ? 310 : 350}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "transparent",
                        },
                        draggableIcon: {
                            backgroundColor: "#8898AA",
                        },
                        container: { backgroundColor: "white", minHeight: 310, },
                    }}
                >
                    <Block style={styles.main}>


                        {this.state.userSheet == "receiver" &&
                            <>
                                <TouchableOpacity>
                                    <Block row style={styles.close}>
                                        <IconExtra
                                            style={{
                                                marginTop: 5,
                                            }}
                                            size={14}
                                            color={argonTheme.COLORS.MUTED}
                                            name="edit"
                                            family="Entypo"
                                        />
                                        <Text
                                            style={{
                                                marginLeft: 15,
                                                color: argonTheme.COLORS.TEXT,
                                                fontSize: 16,
                                            }}
                                        >
                                            Edit
                                        </Text>
                                    </Block>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Block row style={styles.close}>
                                        <IconExtra
                                            style={{
                                                marginTop: 5,
                                            }}
                                            size={14}
                                            color={argonTheme.COLORS.MUTED}
                                            name="delete"
                                            family="MaterialCommunityIcons"
                                        />
                                        <Text
                                            style={{
                                                marginLeft: 15,
                                                color: argonTheme.COLORS.TEXT,
                                                fontSize: 16,
                                            }}
                                        >
                                            Delete
                                        </Text>
                                    </Block>
                                </TouchableOpacity>
                            </>}
                        <>
                            <TouchableOpacity
                                onPress={() => {
                                    refRBSheet.current.close()
                                    navigation.navigate("ChatProfile")
                                }}
                            >
                                <Block row style={styles.close}>
                                    <IconExtra
                                        size={14}
                                        color={argonTheme.COLORS.MUTED}
                                        name="lock"
                                        family="Feather"
                                        style={{
                                            marginTop: 5,
                                        }}
                                    />
                                    <Text
                                        style={{
                                            marginLeft: 15,
                                            fontSize: 16,
                                            color: argonTheme.COLORS.TEXT,
                                        }}
                                    >
                                        Lock
                                    </Text>
                                    {/* <Text
                                    style={{
                                        marginLeft: 15,
                                        fontSize: 16,
                                        marginTop: 10,
                                        color: argonTheme.COLORS.MUTED,
                                    }}
                                >
                                    see user profile
                                </Text> */}
                                </Block>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    refRBSheet.current.close()
                                    // navigation.navigate("ChatProfile")
                                }}
                            >
                                <Block row style={styles.close}>
                                    <IconExtra
                                        size={14}
                                        color={argonTheme.COLORS.MUTED}
                                        name="forward"
                                        family="Entypo"
                                        style={{
                                            marginTop: 5,
                                        }}
                                    />

                                    <Text
                                        style={{

                                            marginLeft: 15,
                                            fontSize: 16,
                                            color: argonTheme.COLORS.TEXT,
                                        }}
                                    >
                                        Forward
                                    </Text>
                                    {/* <Text
                                    style={{

                                        marginLeft: 15,
                                        fontSize: 16,
                                        marginTop: 10,
                                        color: argonTheme.COLORS.MUTED,
                                    }}
                                >
                                    Share user profile
                                </Text> */}
                                </Block>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    refRBSheet.current.close()

                                    // navigation.navigate("ORTChat")
                                }}
                            >
                                <Block row style={styles.close}>
                                    <IconExtra
                                        size={14}
                                        color={argonTheme.COLORS.MUTED}
                                        name="message-square"
                                        family="Feather"
                                        style={{
                                            marginTop: 5,
                                        }}
                                    />

                                    <Text
                                        style={{
                                            marginLeft: 15,

                                            fontSize: 16,
                                            color: argonTheme.COLORS.TEXT,
                                        }}
                                    >
                                        Reply
                                    </Text>
                                    {/* <Text
                                    style={{

                                        marginLeft: 15,
                                        fontSize: 16,
                                        marginTop: 10,
                                        color: argonTheme.COLORS.MUTED,
                                    }}
                                >
                                    Off The Record Chat
                                </Text> */}
                                </Block>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    refRBSheet.current.close()
                                    navigation.navigate("SearchFiles")
                                }}
                            >
                                <Block row style={styles.close}>
                                    <IconExtra
                                        size={14}
                                        color={argonTheme.COLORS.MUTED}
                                        name="copy"
                                        family="Feather"
                                        style={{
                                            marginTop: 5,
                                        }}
                                    />

                                    <Text
                                        style={{

                                            marginLeft: 15,
                                            fontSize: 16,
                                            color: argonTheme.COLORS.TEXT,
                                        }}
                                    >
                                        Copy
                                    </Text>
                                    {/* <Text
                                    style={{
                                        marginLeft: 15,
                                        fontSize: 16,
                                        marginTop: 10,
                                        color: argonTheme.COLORS.MUTED,
                                    }}
                                >
                                    See all files
                                </Text> */}
                                </Block>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    refRBSheet.current.close()
                                    navigation.navigate("LockedChat")
                                }}
                            >
                                <Block row style={styles.close}>
                                    <IconExtra
                                        size={14}
                                        color={argonTheme.COLORS.MUTED}
                                        name="info"
                                        family="Feather"
                                        style={{
                                            marginTop: 5,
                                        }}
                                    />

                                    <Text
                                        style={{

                                            marginLeft: 15,
                                            fontSize: 16,
                                            color: argonTheme.COLORS.TEXT,
                                        }}
                                    >
                                        Info
                                    </Text>
                                    {/* <Text
                                    style={{
                                        marginLeft: 15,
                                        fontSize: 16,
                                        marginTop: 10,
                                        color: argonTheme.COLORS.MUTED,
                                    }}
                                >
                                    See all locked messages
                                </Text> */}
                                </Block>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    refRBSheet.current.close()
                                    navigation.navigate("ReactedChat")
                                }}
                            >
                                <Block row style={styles.close}>
                                    <IconExtra
                                        size={14}
                                        color={argonTheme.COLORS.MUTED}
                                        name="file"
                                        family="Feather"
                                        style={{
                                            marginTop: 5,
                                        }}
                                    />

                                    <Text
                                        style={{

                                            marginLeft: 15,
                                            fontSize: 16,
                                            color: argonTheme.COLORS.TEXT,
                                        }}
                                    >
                                        Report
                                    </Text>
                                    {/* <Text
                                    style={{
                                        marginLeft: 15,
                                        fontSize: 16,
                                        marginTop: 10,
                                        color: argonTheme.COLORS.MUTED,
                                    }}
                                >
                                    See all reacted messages
                                </Text> */}
                                </Block>
                            </TouchableOpacity>
                        </>

                    </Block>
                </RBSheet>
            </View>
        );
    };

    renderMessage = (msg) => {
        if (!msg.sender_loggedIn) {
            return (
                <Pressable
                    onPress={() => { this.handlerLongClick("sender") }}
                >
                    <Block key={msg.id}>
                        <Block row space={null}>
                            <Image
                                source={{ uri: this.state.sender_img ? this.state.sender_img : msg.avatar }}
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
                                        {msg.message}
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
                                    onPress={() => this.onModalClick(msg)}
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
                onPress={() => { this.handlerLongClick("receiver") }}
            >
                <Block key={msg.id} right>
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
                                            {msg.message}
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
                                            {msg.message}
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
                            {msg.message !== "" && !msg.image && !msg.video && (
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
                                        {msg.message}
                                    </Text>
                                </Block>
                            )}
                        </Block>
                        <Image
                            source={{ uri: this.state.receiver_img ? this.state.receiver_img : msg.avatar }}
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
                                onPress={() => this.onModalClick(msg)}
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
    bottomSheet = () => {
        return (
            <RBSheet
                ref={(ref) => {
                    this.RBSheet = ref;
                }}
                height={220}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent",
                    },
                    draggableIcon: {
                        backgroundColor: "#8898AA",
                    },
                    container: { backgroundColor: "white", minHeight: 220 },
                }}
            >
                <Block style={styles.main}>

                    <TouchableOpacity
                        onPress={() => {
                            console.log("Press");
                            this.setState({ showPhoto: true });
                        }}
                    >
                        <Block row style={styles.close}>
                            <IconExtra
                                size={14}
                                style={{
                                    marginTop: 5,
                                }}
                                color={argonTheme.COLORS.MUTED}
                                name="video"
                                family="Feather"
                            />
                            <Block
                                row

                            >
                                <Text
                                    style={{
                                        marginLeft: 15,
                                        fontSize: 16,
                                        color: argonTheme.COLORS.BLACK,
                                    }}
                                >
                                    Record Video
                                </Text>
                            </Block>
                        </Block>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.Allpicker()}>
                        <Block row style={styles.close}>
                            <IconExtra
                                size={14}
                                style={{
                                    marginTop: 5,
                                }}
                                color={argonTheme.COLORS.MUTED}
                                name="photo-library"
                                family="MaterialIcons"
                            />
                            <Block
                                row

                            >
                                <Text
                                    style={{
                                        marginLeft: 15,
                                        fontSize: 16,
                                        color: argonTheme.COLORS.BLACK,
                                    }}
                                >
                                    Attach from Gallery
                                </Text>
                            </Block>
                        </Block>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.DocPicker()}>
                        <Block row style={styles.close}>
                            <Icon
                                size={14}
                                color={argonTheme.COLORS.MUTED}
                                name="upload-file"
                                family="MaterialIcons"
                                style={{
                                    marginTop: 5,
                                }}
                            />
                            <Block
                                row

                            >
                                <Text
                                    style={{
                                        marginLeft: 15,
                                        fontSize: 16,
                                        color: argonTheme.COLORS.BLACK,
                                    }}
                                >
                                    Add files
                                </Text>
                            </Block>
                        </Block>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Block row style={styles.close}>
                            <Icon
                                name="location-pin"
                                family="Entypo"
                                size={14}
                                color={argonTheme.COLORS.MUTED}
                                style={{
                                    marginTop: 5,
                                }}
                            />
                            <Block
                                row
                            >
                                <Text
                                    style={{
                                        marginLeft: 15,
                                        fontSize: 16,
                                        color: argonTheme.COLORS.BLACK,
                                    }}
                                >
                                    Send Location
                                </Text>
                            </Block>
                        </Block>
                    </TouchableOpacity>
                </Block>
            </RBSheet>
        );
    };
    renderMessages = () => {
        const insetBottom =
            this.state.messages.length * (theme.SIZES.BASE * 6.5) + 64; // total messages x message height
        return (
            <FlatList
                ref={this.messagesScroll}
                data={this.state.messages}
                keyExtractor={(item, index) => {
                    return index
                }}
                showsVerticalScrollIndicator={false}
                getItemLayout={this.itemLayout}
                contentContainerStyle={[styles.messagesWrapper]}
                renderItem={({ item }) => this.renderMessage(item)}
                onContentSizeChange={this.onContentSizeChange}
            />
        );
    };
    handleMessageChange = (type, text) => {
        this.setState({ message: text });
    };
    formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? "0" + minutes : minutes;
        var strTime = hours + ":" + minutes + " " + ampm;
        return strTime;
    }

    handleMessage = async () => {
        const { messages, message, photo, video, file, } = this.state;
        const date = await this.formatAMPM(new Date());
        messages.push({
            id: messages.length + 1,
            message: message,
            time: date,
            image: photo,
            video: video,
            file: file,
            sender_loggedIn: true,
        });
        this.setState({
            messages,
            message: "",
            photo: null,
            video: null,
            file: null,
        });
        this.SendMessage(message)
        this.handleScroll();
    };

    messageForm = () => {
        const { navigation } = this.props;
        return (
            <Block style={styles.messageFormContainer}>
                <Block row center>

                    <Icon
                        // onPress={() => this.RBSheet.open()}
                        size={20}
                        family="Entypo"
                        name="emoji-happy"
                        color={argonTheme.COLORS.MUTED}
                        style={{ marginLeft: 10, marginTop: 5 }}
                    />
                    <Icon
                        onPress={() => this.RBSheet.open()}
                        size={20}
                        name="add-circle-outline"
                        family="Ionicons"
                        color={argonTheme.COLORS.MUTED}
                        style={{ marginHorizontal: 10, marginTop: 5 }}
                    />
                    <Input
                        center
                        rounded
                        color="#9fa5aa"
                        // multiline
                        // blurOnSubmit
                        // viewPass
                        style={styles.input}
                        placeholder="Type here.."
                        autoCapitalize="none"
                        returnKeyType="send"
                        textContentType="none"
                        placeholderTextColor="#9fa5aa"
                        defaultValue={this.state.message}
                        onSubmitEditing={this.handleMessage}
                        onChangeText={(text) =>
                            this.handleMessageChange("message", text)
                        }
                    // iconContent={
                    // 	<Icon
                    // 		onPress={() => this.RBSheet.open()}
                    // 		size={20}
                    // 		name="add-circle-outline"
                    // 		family="Ionicons"
                    // 		color={argonTheme.COLORS.ICON}
                    // 		style={{ marginRight: 0, marginTop: 5 }}
                    // 	/>
                    // }
                    />
                    <Icon
                        // onPress={() => this.handleMessage()}
                        size={20}
                        name="thumb-up"
                        family="MaterialCommunityIcons"
                        color={argonTheme.COLORS.PRIMARY}
                        style={{ marginLeft: 7, marginRight: 8, marginTop: 5 }}
                    />
                </Block>


            </Block>
        );
    };
    render() {

        const {
            modalUri,
            user
        } = this.state;
        // const { user } = this.props.route.params;
        return (
            <>
                <Block flex space="between" style={styles.container}>
                    <ChatHeader navigation={this.props.navigation} data={user} />
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.setState({
                                modalVisible: !this.state.modalVisible,
                            });
                        }}
                    >
                        <View style={styles.centeredView}>
                            {this.state.modalType == "photo" ? (
                                <Image
                                    source={{ uri: modalUri }}
                                    style={{ width: width, minHeight: "100%" }}
                                    resizeMode="contain"
                                />
                            ) : null}
                            {this.state.modalType == "video" ? (
                                <Video
                                    // ref={this.video}
                                    style={{ width: width, minHeight: "100%" }}
                                    source={{
                                        uri: modalUri,
                                    }}
                                    useNativeControls
                                    resizeMode="contain"
                                    isLooping={true}
                                />
                            ) : null}
                        </View>
                    </Modal>
                    <Modal
                        animationType="none"
                        transparent={false}
                        visible={this.state.showPhoto}
                        onRequestClose={() => {
                            console.log("asdasdd");
                            this.setState({ showPhoto: !this.state.showPhoto });
                        }}
                    >
                        {/* {hasCameraPermission === null ? <View /> : hasCameraPermission === false ? <Text>No access to camera</Text> : ( */}
                        <Record onchange={this.TakePicture} />
                    </Modal>
                    <KeyboardAvoidingView keyboardVerticalOffset={2} behavior={Platform.OS === 'ios' ? 'padding' : "height"}
                        style={{ flex: 1 }}>
                        <Block center>
                            <Text>
                                {this.room_id}
                                {" "}
                                receiver_id: {this.props.route.params.user.userId}
                            </Text>
                        </Block>
                        {/* {this.state.room_id} */}


                        {this.state.loading ? <Block
                            style={{ flex: 1, paddingTop: 40 }}
                        >
                            <ActivityIndicator color={argonTheme.COLORS.PRIMARY} />
                        </Block> : this.renderMessages()}
                        {this.messageForm()}
                        {this.bottomSheet()}
                        {this.EditDeleteSheet()}
                    </KeyboardAvoidingView>
                </Block>
            </>
        );
    }
}
const mapDispatchToProps = {
    // actionOne,
    // actionTwo,
}
const mapStateToProps = state => ({
    profile: state.Blog_For_Each_Item.Showprofile,
    token: state.Blog_For_Each_Item.token_is

})

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

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
