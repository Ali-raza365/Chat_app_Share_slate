import React, { useRef, useCallback } from "react";
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
    ScrollView,
    SafeAreaView,
    Keyboard,
    TouchableWithoutFeedback,
    Linking, Alert
} from "react-native";

import { Input, Block, Text, theme } from "galio-framework";
import { Icon } from "../../components";
import { Audio } from "expo-av";

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
// import { Record } from "../../components/Record";
import ChatHeader from "./ChatHeader";
import IconExtra from "../../components/Icon";
import { connect } from "react-redux";
import io from "socket.io-client";
// import { _Fetch_roommId, _SendMessage, _ShowMessage } from "../../api/ap-apis";
import Loading from "../../constants/loading";
import { LoadingIndicator } from "react-native-expo-fancy-alerts";
import { ActivityIndicator } from "react-native-paper";
import socket from "../../constants/SocketConfig";
import moment from "moment";
import {
    faPaperPlane,
    faMicrophone,
    faLevelUpAlt,
    faImage,
    faFileVideo,
    faBackward,
    faMusic,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import AudioSlider from "../../components/audioPlayer/AudioSlider";
import * as FileSystem from "expo-file-system";
import EmojiBoard from "react-native-emoji-board";
import Emoji from "react-native-emoji";

const messages = [
    {
        messageId: 1,
        avatar: Images.ProfileChat,
        message: `Hey there! How are you today? Can we me et and talk? Thanks!`,
        time: `10:31 PM`,
        reply: "2",
        reaction: [],
        // audio: require("../../assets/pal.mp3")
    },
    {
        messageId: 123,
        reaction: [],
        avatar: Images.ProfileChat,
        message: `Hey there! How are you today? Can we me et and talk? Thanks!`,
        time: `10:31 PM`,
        reply: "2",
        sender_loggedIn: true,
    },
    {
        messageId: 2,
        reaction: [],
        message: `Sure, just let me finish something and I’ll call you.`,
        time: `10:34 PM`,
        reply: "2",
        // audio: require("../../assets/pal.mp3")
    },
    {
        messageId: 3,
        avatar: Images.ProfileChat,
        message: `OK. Cool! See you!`,
        time: `10:35 PM`,
        reaction: [],
        reply: "2",
        // audio: require("../../assets/pal.mp3")
    },
    {
        messageId: 4,
        message: `Bye bye`,
        time: `10:36 PM`,
        reaction: [],
        // image: Images.Viewed[4]
        // audio: require("../../assets/pal.mp3")
    },
    {
        messageId: 5,
        avatar: Images.ProfileChat,
        message: `Bye`,
        time: `10:35 PM`,
        reply: "2",
        reaction: [],
        // audio: require("../../assets/pal.mp3")
    },
    {
        messageId: 6,
        message: `with image `,
        time: `10:36 PM`,
        reaction: [],
        //  image: Images.Viewed[4],
        reply: "2",
        // audio: require("../../assets/pal.mp3")
    },
    {
        messageId: 66,
        message: `with image `,
        time: `10:36 PM`,
        reaction: [],
        // image: Images.Viewed[4],
        reply: "2",
        sender_loggedIn: true,
    },
    {
        messageId: 77,
        message: `with image `,
        time: `10:36 PM`,
        reaction: [],
        // image: Images.Viewed[4],
        // audio: require("../../assets/pal.mp3"),
        reply: "2",
        sender_loggedIn: true,
    },
];

class Chat extends React.Component {
    state = {
        messages: messages,
        message: "",
        height: 0,
        photo: null,
        video: null,
        file: null,
        audio: null,
        modalVisible: false,
        OTRmodalVisible: false,
        modalUri: null,
        modalType: null,
        showPhoto: false,
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        // cameraRef: null,
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
        emoji: true,
        focus: false,
        currentMsgId: "",
    };
    room_id = "0";
    messagesScroll = React.createRef();
    refRBSheet = React.createRef();
    // cameraRef = React.createRef(Camera);
    componentDidMount() {
        // const { user } = this.props.route.params;
        // console.log(user);
        // this.onConnectSocket()
        // this.showMessage(user);
        // this.FetchRomm(user);
        this.setState({
            hasCameraPermission: "granted",
            user: {
                "image": "https://assets.shareslate.com/files/user/user4.png",
                "name": "abg abg",
                "roomId": "61ae5bed83167",
                "userId": "488",
            },
            // myToken: this.props.token ? this.props.token : null,
            profile: this.props.profile ? this.props.profile[0].profile : null,
        });
        // this.askForPermissions();
        this.getPermissions()
    }
    askForPermissions = async () => {
        const response = await Permissions.askAsync(
            Permissions.AUDIO_RECORDING
        );
        this.setState({
            haveRecordingPermissions: response.status === "granted",
        });
    };
    getPermissions = async () => {
        const { status } = await Camera.requestPermissionsAsync();
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
        });
        // setHasPermission(status === 'granted');
    }
    handlerLongClick = (type, id) => {
        this.RBSheet.close();
        // if (this.state.currentMsgId == id) {
        //     this.EDSheet.close();
        // } else {
        this.EDSheet.open();
        // }
        console.log(type);
        this.setState({ userSheet: type, showEmoji: false });
    };

    itemLayout = (data, index) => ({
        length: this.state.messages.length - 1,
        offset: 15 * index,
        index,
    });

    handleScroll = () => {
        //console.log("run");
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
        // //console.log(result);
        if (!result.cancelled) {
            // generateThumbnail(result)
            //   prof_image(result.uri);
            //console.log(this.state);
            //console.log(result);
            this.setState({
                photo: result.uri,
            });
            this.handleMessage();
        }
        this.RBSheet.close();
    };
    TakePicture = (result) => {
        // const { status } = await .Camera.requestPermissionsAsync();
        // //console.log(status)
        // let photo = await Camera.takePictureAsync();
        //console.log(result, "sdasdassssssssss");
        if (result.type == "video") {
            // //console.log(this.state)
            this.setState({
                video: result.uri,
                showPhoto: false,
            });
            // this.handleMessage()
            //console.log(result.uri, "videooooooooo");
        } else {
            this.setState({
                photo: result.uri,
                showPhoto: false,
            });
            //console.log(result.uri, "imagesssssss");
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
        // //console.log(result);

        //console.log(result, "response");

        if (!result.cancelled) {
            if (result.type === "video") {
                // //console.log(this.state)
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
        //console.log("doc");
        let result = await DocumentPicker.getDocumentAsync({
            copyToCacheDirectory: true,
        });
        //console.log(result);
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
        const { navigation } = this.props
        // const refRBSheet = useRef();
        return (
            <View>
                <RBSheet
                    ref={(ref) => {
                        this.EDSheet = ref;
                    }}
                    height={this.state.userSheet == "receiver" ? 380 : 475}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    onClose={() => { this.setState({ currentMsgId: "" }) }}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "transparent",
                        },
                        draggableIcon: {
                            backgroundColor: "#8898AA",
                        },
                        container: { backgroundColor: "white" },
                    }}
                >
                    <Block style={styles.main}>
                        <Block center>
                            {/* <IconExtra
                                onPress={() => {
                                    this.EDSheet.close();
                                }}
                                style={{
                                    marginTop: 5,
                                    position: "absolute",
                                    right: 10,
                                    top: 0,
                                }}
                                size={20}
                                color={argonTheme.COLORS.BLACK}
                                name="closecircle"
                                family="AntDesign"
                            /> */}
                            <Block
                                row
                                // horizontal
                                // center
                                style={[
                                    styles.close,
                                    {
                                        flexDirection: "row",
                                        height: 50,
                                        flexGrow: 0,
                                        width: "95%",
                                        marginTop: 30,
                                        paddingVertical: 0,
                                        paddingHorizontal: 20,
                                        alignItems: "center",
                                        justifyContent: "space-around",
                                        borderWidth: 0.3,
                                        borderRadius: 100,
                                        borderColor: "#ccc",
                                    },
                                ]}
                            >
                                <Icon
                                    onPress={() =>
                                        this.onReactionChange("like")
                                    }
                                    size={28}
                                    name="thumb-up"
                                    family="MaterialCommunityIcons"
                                    color={"rgb(94,143,244)"}
                                    style={{
                                        fontSize: 28,
                                        marginHorizontal: 10,
                                        marginRight: 20,
                                    }}
                                />
                                <Icon
                                    onPress={() =>
                                        this.onReactionChange("Dislike")
                                    }
                                    size={28}
                                    name="dislike1"
                                    family="AntDesign"
                                    color={"rgb(212,212,212)"}
                                    style={{
                                        fontSize: 28,
                                        marginHorizontal: 15,
                                    }}
                                />
                                {/* <Emoji name="raised_hands" style={{ fontSize: 28, }} /> */}
                                {/* <Emoji
                                    name="fire"
                                    style={{ fontSize: 28, }}
                                /> */}
                                <Emoji
                                    onPress={() => this.onReactionChange("joy")}
                                    name="joy"
                                    style={{
                                        fontSize: 28,
                                        marginHorizontal: 15,
                                    }}
                                />
                                <Emoji
                                    onPress={() =>
                                        this.onReactionChange(
                                            "slightly_frowning_face"
                                        )
                                    }
                                    name="slightly_frowning_face"
                                    style={{
                                        fontSize: 28,
                                        marginHorizontal: 15,
                                    }}
                                />
                                <Emoji
                                    onPress={() =>
                                        this.onReactionChange(
                                            "stuck_out_tongue_closed_eyes"
                                        )
                                    }
                                    name="stuck_out_tongue_closed_eyes"
                                    style={{
                                        fontSize: 28,
                                        marginHorizontal: 15,
                                    }}
                                />
                                <Emoji
                                    onPress={() =>
                                        this.onReactionChange("heart")
                                    }
                                    name="heart"
                                    style={{
                                        fontSize: 28,
                                        marginHorizontal: 10,
                                        marginLeft: 20,
                                    }}
                                />
                                {/* <Emoji name="black_heart" style={{ fontSize: 20, }} /> */}
                            </Block>
                        </Block>
                        {/* </ScrollView> */}
                        {/* </SafeAreaView> */}
                        {this.state.userSheet == "receiver" && (
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
                            </>
                        )}
                        <>

                            <TouchableOpacity
                                onPress={() => {
                                    //efRBSheet.current.close();
                                    // navigation.navigate("ChatProfile")
                                }}
                            >
                                <Block row style={styles.close}>
                                    <IconExtra
                                        size={18}
                                        color={argonTheme.COLORS.BLACK}
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
                                        color: argonTheme.COLORS.BLACK,
                                    }}
                                >
                                    Share user profile
                                </Text> */}
                                </Block>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    //efRBSheet.current.close();

                                    // navigation.navigate("ORTChat")
                                }}
                            >
                                <Block row style={styles.close}>
                                    <IconExtra
                                        size={18}
                                        color={argonTheme.COLORS.BLACK}
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
                                        color: argonTheme.COLORS.BLACK,
                                    }}
                                >
                                    Off The Record Chat
                                </Text> */}
                                </Block>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    //efRBSheet.current.close();
                                    // navigation.navigate("SearchFiles");
                                }}
                            >
                                <Block row style={styles.close}>
                                    <IconExtra
                                        size={18}
                                        color={argonTheme.COLORS.BLACK}
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
                                        color: argonTheme.COLORS.BLACK,
                                    }}
                                >
                                    See all files
                                </Text> */}
                                </Block>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    //efRBSheet.current.close();
                                    // navigation.navigate("ChatProfile");
                                }}
                            >
                                <Block row style={styles.close}>
                                    <IconExtra
                                        size={18}
                                        color={argonTheme.COLORS.BLACK}
                                        name="done"
                                        family="MaterialIcons"
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
                                        Select
                                    </Text>
                                    {/* <Text
                                    style={{
                                        marginLeft: 15,
                                        fontSize: 16,
                                        marginTop: 10,
                                        color: argonTheme.COLORS.BLACK,
                                    }}
                                >
                                    see user profile
                                </Text> */}
                                </Block>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    //efRBSheet.current.close();
                                    // navigation.navigate("LockedChat");
                                }}
                            >
                                <Block row style={styles.close}>
                                    <IconExtra
                                        size={18}
                                        color={argonTheme.COLORS.BLACK}
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
                                        color: argonTheme.COLORS.BLACK,
                                    }}
                                >
                                    See all locked messages
                                </Text> */}
                                </Block>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    //efRBSheet.current.close();
                                    // navigation.navigate("ReactedChat");
                                }}
                            >
                                <Block row style={styles.close}>
                                    <IconExtra
                                        size={18}
                                        color={argonTheme.COLORS.BLACK}
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
                                        color: argonTheme.COLORS.BLACK,
                                    }}
                                >
                                    See all reacted messages
                                </Text> */}
                                </Block>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    //efRBSheet.current.close();
                                    // navigation.navigate("ReactedChat");
                                }}
                            >
                                <Block row style={styles.close}>
                                    <IconExtra
                                        size={18}
                                        color={argonTheme.COLORS.ERROR}
                                        name="delete"
                                        family="AntDesign"
                                        style={{
                                            marginTop: 5,
                                        }}
                                    />

                                    <Text
                                        style={{
                                            marginLeft: 15,
                                            fontSize: 16,
                                            color: argonTheme.COLORS.ERROR,
                                        }}
                                    >
                                        Delete
                                    </Text>
                                    {/* <Text
                                    style={{
                                        marginLeft: 15,
                                        fontSize: 16,
                                        marginTop: 10,
                                        color: argonTheme.COLORS.BLACK,
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
    async startRecording() {
        try {
            console.log('Requesting permissions..');

            const AudioPerm = await Audio.getPermissionsAsync();
            console.log(AudioPerm)
            if (AudioPerm.status === 'granted') {
                console.log('Audio Permission Granted');
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                    playsInSilentModeIOS: true,
                    playsOnSilentLockedModeIOS: true,
                    shouldDuckAndroid: true,
                    interruptionModpeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                    playThroughEarieceAndroid: true,
                    staysActiveInBackground: true,
                });
                console.log("Starting recording..");
                const { recording } = await Audio.Recording.createAsync(
                    Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
                );
                this.setState({ audio: recording });
                console.log("Recording started");
            } else {
                Alert.alert(
                    "No Audio Permission",
                    "please goto setting and on permissions allow Microphone manual",
                    [
                        { text: "cancel", onPress: () => console.log("cancel") },
                        {
                            text: "Allow", onPress: () => {
                                if (Platform.OS == 'ios') {
                                    Linking.openURL('app-settings:')
                                }
                            }
                        },
                    ],
                    { cancelable: false }
                );
            }

        } catch (err) {
            alert("Cannot record voice message because  mic use by another app")
            console.error("Failed to start recording", err);
        }
    }

    async stopRecording() {
        if (this.state.audio) {
            await this.state.audio.stopAndUnloadAsync();
            const uri = this.state.audio.getURI();
            this.setState(
                {
                    audio: uri,
                },
                () => {
                    this.handleMessage();
                }
            );
            console.log("Recording stopped and stored at", uri);
        }

    }
    onReactionChange = (name = "", _id,) => {
        console.log(this.state.currentMsgId, name, "gggg");
        let id = _id ? _id : this.state.currentMsgId;
        let randomId = Math.random().toString(36).slice(2);
        let data = this.state.messages;
        let filterdata = data.map((msg) => {
            if (msg.messageId == id) {
                if (msg.reaction.length < 2) {
                    return { ...msg, reaction: [...msg.reaction, { name, emjiId: randomId }] };
                } else {
                    return msg;
                }
            } else {
                return msg;
            }
        });
        this.setState({
            messages: filterdata,
        });
        this.EDSheet.close();
    };
    onReactionRemove = (item, _id,) => {
        let id = _id ? _id : this.state.currentMsgId;
        let data = this.state.messages;
        let filterdata = data.map((msg) => {
            if (msg.messageId == id) {
                let newArr = msg.reaction.filter((emj) => {
                    return emj.emjiId !== item.emjiId
                })
                return { ...msg, reaction: [...newArr] };
            } else {
                return msg;
            }
        });
        this.setState({
            messages: filterdata,
        });
        this.EDSheet.close();
    };
    renderReaction = (style, reaction, id) => {
        // console.log(reaction)
        return (
            <>
                {reaction && (
                    reaction.name == "Dislike" ? (
                        <Icon
                            onPress={() => this.onReactionRemove(reaction, id)}
                            size={28}
                            name="dislike1"
                            family="AntDesign"
                            color={"rgb(212,212,212)"}
                            style={[style, {}]}
                        />
                    ) : reaction.name == "like" ? (
                        <Icon
                            onPress={() => this.onReactionRemove(reaction, id)}
                            size={30}
                            name="thumb-up"
                            family="MaterialCommunityIcons"
                            color={"rgb(94,143,244)"}
                            style={[style]}
                        />
                    ) : (
                        <Emoji
                            onPress={() => this.onReactionRemove(reaction, id)}
                            name={reaction.name}
                            style={style}
                        />
                    )
                )}
            </>
        );
    };
    renderReactionRow = () => {
        return (
            <Block center style={{}}>
                <Block
                    row
                    // horizontal
                    // center
                    style={[
                        styles.close,
                        {
                            position: "absolute",
                            zIndex: 10,
                            // elevation: 1,
                            top: -70,
                            height: 50,
                            width: "90%",
                            // marginTop: 30,
                            paddingVertical: 0,
                            paddingHorizontal: 20,
                            alignItems: "center",
                            justifyContent: "space-around",
                            borderWidth: 0.3,
                            borderRadius: 15,
                            borderColor: "#ccc",
                            backgroundColor: "#fff",
                        },
                    ]}
                >
                    <Icon
                        onPress={() => this.onReactionChange("like")}
                        size={28}
                        name="thumb-up"
                        family="MaterialCommunityIcons"
                        color={"rgb(94,143,244)"}
                        style={{
                            fontSize: 28,
                            marginHorizontal: 10,
                            marginRight: 20,
                            // zIndex: 1000,
                        }}
                    />
                    <Icon
                        onPress={() => this.onReactionChange("Dislike")}
                        size={28}
                        name="dislike1"
                        family="AntDesign"
                        color={"rgb(212,212,212)"}
                        style={{
                            fontSize: 28,
                            marginHorizontal: 15,
                            // zIndex: 1000,
                        }}
                    />
                    {/* <Emoji name="raised_hands" style={{ fontSize: 28, }} /> */}
                    {/* <Emoji
                    name="fire"
                    style={{ fontSize: 28, }}
                /> */}
                    <Emoji
                        onPress={() => this.onReactionChange("joy")}
                        name="joy"
                        style={{
                            fontSize: 28,
                            marginHorizontal: 15,
                            // zIndex: 1000,
                        }}
                    />
                    <Emoji
                        onPress={() =>
                            this.onReactionChange("slightly_frowning_face")
                        }
                        name="slightly_frowning_face"
                        style={{
                            fontSize: 28,
                            marginHorizontal: 15,
                            zIndex: 1000,
                        }}
                    />
                    <Emoji
                        onPress={() =>
                            this.onReactionChange(
                                "stuck_out_tongue_closed_eyes"
                            )
                        }
                        name="stuck_out_tongue_closed_eyes"
                        style={{
                            fontSize: 28,
                            marginHorizontal: 15,
                            // zIndex: 1000,
                        }}
                    />
                    <Emoji
                        onPress={() => this.onReactionChange("heart")}
                        name="heart"
                        style={{
                            fontSize: 28,
                            marginHorizontal: 10,
                            marginLeft: 20,
                            // zIndex: 1000,
                        }}
                    />
                    {/* <Emoji name="black_heart" style={{ fontSize: 20, }} /> */}
                </Block>
            </Block>
        );
    };
    renderMessage = (msg, index) => {
        // console.log(msg.messageId !== this.state.currentMsgId, msg.messageId, this.state.currentMsgId)
        // console.log(msg.messageId)
        if (!msg.sender_loggedIn) {
            return (
                <>
                    {/* {msg.messageId == this.state.currentMsgId &&
                        this.renderReactionRow()} */}
                    <Pressable
                        style={{
                            paddingTop: 7,
                            backgroundColor:
                                this.state.currentMsgId == "" ? "transparent" :
                                    msg.messageId == this.state.currentMsgId
                                        ? "rgba(255,255,255,0.6)"

                                        : "transparent",
                            opacity: this.state.currentMsgId == "" ? 1 :
                                msg.messageId == this.state.currentMsgId
                                    ? 1
                                    : 0.3,
                        }}
                        onPress={() => {
                            this.handlerLongClick("sender", msg.messageId);
                            this.setState({
                                currentMsgId:
                                    this.state.currentMsgId == msg.messageId
                                        ? ""
                                        : msg.messageId,
                            });
                        }}
                    // onLongPress={() => {
                    //     this.handlerLongClick("sender", msg.messageId);
                    // }}
                    >
                        <Block key={msg.messageId}>
                            <Block row>
                                <Image
                                    source={{
                                        uri: this.state.user
                                            ? this.state.user.image
                                            : null,
                                    }}
                                    style={[styles.avatar, styles.shadow]}
                                />
                                <Block style={styles.messageCardWrapper}>
                                    <Block
                                        style={[
                                            styles.messageCard,
                                            styles.shadow,
                                        ]}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: "open-sans-regular",
                                                marginRight: 55,
                                            }}
                                            color={argonTheme.COLORS.TEXT}
                                        >
                                            {msg.message}
                                        </Text>
                                        {msg.reaction && msg.reaction.length > 0 && <Block
                                            center row
                                            style={[{
                                                backgroundColor: "#fff",
                                                padding: 5,
                                                // elevation: 1,
                                                position: "absolute",
                                                borderRadius: 10,
                                                right: -15,
                                                top: -20,
                                                Zindex: 20
                                            }, styles.shadow]}
                                        >
                                            {msg.reaction.map((reaction, ind) => {
                                                return this.renderReaction(
                                                    {
                                                        fontSize: 25,
                                                        /* position: "absolute", */
                                                        /* right: ind == 0 ? -15 : -48,
                                                        top: -15,
                                                        Zindex: 20 */
                                                    },
                                                    reaction,
                                                    msg.messageId
                                                )
                                            })}
                                        </Block>}
                                        <Text
                                            style={[
                                                styles.time,
                                                {
                                                    position: "absolute",
                                                    bottom: 5,
                                                    right: 5,
                                                },
                                            ]}
                                        >
                                            {moment(msg.date).format("LT")}
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
                                {/* <Icon
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
                                /> */}

                                {msg.reply && (
                                    <Text
                                        onPress={() => this.onModalClick(msg)}
                                        style={styles.reply}
                                    >
                                        {msg.reply} replies
                                    </Text>
                                )}
                                {msg.reaction.length !== 0 && (
                                    <Text
                                        // onPress={() => this.onModalClick(msg)}
                                        style={[styles.reply, { marginLeft: 0, }]}
                                    >
                                        {msg.reaction && msg.reaction.length} Reactions
                                    </Text>
                                )}
                                {/* <Icon
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
                            /> */}
                            </Block>
                        </Block>
                    </Pressable>
                </>
            );
        }
        return (
            <>
                {/* {msg.messageId == this.state.currentMsgId &&
                    this.renderReactionRow()} */}
                <Pressable
                    style={{
                        paddingTop: 7,
                        backgroundColor:
                            this.state.currentMsgId == "" ? "transparent" :
                                msg.messageId == this.state.currentMsgId
                                    ? "rgba(255,255,255,0.6)"
                                    : "transparent",
                        opacity: this.state.currentMsgId == "" ? 1 :
                            msg.messageId == this.state.currentMsgId
                                ? 1
                                : 0.3,

                    }}
                    onPress={() => {
                        let VerticalScroll = this.state.VerticalScroll;
                        // this.messagesScroll.scrollTo({ y: 40, animated: true });
                        // this.messagesScroll.current.scrollToIndex
                        //     ({
                        //         animated: true,
                        //         index: index,
                        //         viewPosition: 0.5
                        //     });
                        this.handlerLongClick("sender", msg.messageId);
                        this.setState({
                            currentMsgId:
                                this.state.currentMsgId == msg.messageId
                                    ? ""
                                    : msg.messageId,
                        });
                    }}
                // onLongPress={() => {
                //     this.handlerLongClick("sender", msg.messageId);
                // }}
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
                                            style={[
                                                styles.photo,
                                                styles.shadow,
                                            ]}
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

                                <Block
                                    style={[
                                        styles.messageCardPersonal,
                                        styles.shadow,
                                    ]}
                                >
                                    {/* {msg.audio !== null && msg.audio && (
                                        <Block style={{ width: width / 1.4 }}>
                                            <AudioSlider audio={msg.audio} />

                                        </Block>
                                    )} */}

                                    <Text
                                        style={{
                                            fontFamily:
                                                "open-sans-regular",
                                            marginLeft: 57,
                                        }}
                                        color={argonTheme.COLORS.WHITE}
                                    >
                                        {msg.message}
                                    </Text>
                                    {msg.reaction && msg.reaction.length > 0 && <Block
                                        row center
                                        style={[{
                                            backgroundColor: "#fff",
                                            padding: 5,
                                            // elevation: 1,
                                            position: "absolute",
                                            borderWidth: 0.1,
                                            borderRadius: 10,
                                            left: -15,
                                            top: -20,
                                            Zindex: 20
                                        }, styles.shadow]}
                                    >
                                        {msg.reaction.map((reaction, ind) => {
                                            return this.renderReaction(
                                                {
                                                    fontSize: 25,
                                                    /* position: "absolute",
                                                    left: ind == 0 ? -15 : -48,
                                                    top: -15,
                                                    Zindex: 20 */
                                                },
                                                reaction,
                                                msg.messageId
                                            )
                                        })}
                                    </Block>}
                                    <Text
                                        style={[
                                            styles.time,
                                            {
                                                position: "absolute",
                                                bottom: 5,
                                                left: -2,
                                                color: "#fff",
                                                zIndex: 10,
                                                opacity: 1,
                                            },
                                        ]}
                                    >
                                        {moment(msg.date).format("LT")}
                                    </Text>
                                </Block>

                            </Block>
                            <Image
                                source={{
                                    uri:
                                        this.state.receiver_img
                                            ? this.state.receiver_img
                                            : this.state.profile,
                                }}
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
                            {/* <Icon
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
                        /> */}
                            {msg.reaction.length !== 0 && (
                                <Text
                                    // onPress={() => this.onModalClick(msg)}
                                    style={[styles.reply, { marginTop: 0, }]}
                                >
                                    {msg.reaction && msg.reaction.length} Reactions
                                </Text>
                            )}
                            {msg.reply && (
                                <Text
                                    onPress={() => this.onModalClick(msg)}
                                    style={[styles.reply, { marginTop: 0, }]}
                                >
                                    {msg.reply} Replies
                                </Text>
                            )}
                            {/* <Text style={[styles.time, { marginRight: 8 }]}>
                            {msg.time}
                        </Text> */}
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
            </>
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
                            //console.log("Press");
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
                            <Block row>
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
                            <Block row>
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
                            <Block row>
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
                            <Block row>
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
                    return index;
                }}
                onScroll={event =>
                    this.setState({ VerticalScroll: event.nativeEvent.contentOffset.y })
                }
                showsVerticalScrollIndicator={false}
                getItemLayout={this.itemLayout}
                contentContainerStyle={[styles.messagesWrapper]}
                renderItem={({ item, index }) =>
                    this.renderMessage({ ...item, ...messages[index] }, index)
                }
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
        const { messages, message, photo, video, file, audio } = this.state;
        // console.log(audio, "ereeeeeeeeeeeeeeeeeeeeeeee");
        const date = await this.formatAMPM(new Date());
        messages.push({
            messageId: messages.length + 1,
            message: message,
            time: date,
            image: photo,
            video: video,
            audio: audio,
            file: file,
            sender_loggedIn: true,
            reaction: []
        });
        this.setState({
            messages,
            message: "",
            photo: null,
            video: null,
            file: null,
            audio: null,
            showEmoji: false,
        });
        this.handleScroll();
        // this.SendMessage(message);
    };

    messageForm = () => {

        const { navigation } = this.props;
        const iconSearch = (
            <>
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                        this.setState({
                            showEmoji: true,
                        });
                    }}
                >
                    <Icon
                        onPress={() => {
                            this.setState({
                                showEmoji: true,
                            });
                        }}
                        style={{ marginRight: 5 }}
                        size={20}
                        family="Feather"
                        name="smile"
                        color={"#9fa5aa"}
                    />
                </TouchableWithoutFeedback>
                <Pressable
                    onPress={() => {
                        if (this.state.message !== "") {
                            this.handleMessage();
                        }
                    }}
                    style={{
                        marginRight: 13,
                        position: "absolute",
                        right: 0,
                        zIndex: 10,
                    }}
                >
                    <FontAwesomeIcon
                        size={20}
                        style={{
                            transform: [
                                // { rotateY: "190deg" },
                                // { rotateX: "4               5deg" },
                            ]
                        }}
                        icon={faLevelUpAlt}
                        color={this.state.message == "" ? "#9fa5aa" : "#6566ff"}
                    />
                </Pressable>
            </>
        );
        return (
            <Block
                style={[
                    styles.messageFormContainer,
                    { marginBottom: this.state.showEmoji ? 350 : 0 },
                ]}
            >
                <Block row center>
                    <Input
                        // ref={(input) => { this.secondTextInput = input; }}
                        center
                        color="#9fa5aa"
                        // multiline
                        // blurOnSubmit
                        // viewPass
                        iconContent={iconSearch}
                        style={styles.input}
                        placeholder="Type here.."
                        autoCapitalize="none"
                        returnKeyType="send"
                        textContentType="none"
                        onFocus={() => {
                            this.setState({
                                showEmoji: false,
                            });
                        }}
                        blurOnSubmit={false}
                        placeholderTextColor="#9fa5aa"
                        defaultValue={this.state.message}
                        onSubmitEditing={this.handleMessage}
                        onChangeText={(text) =>
                            this.handleMessageChange("message", text)
                        }
                    />
                    <Pressable
                        onPressIn={() => {
                            this.startRecording();
                        }}
                        onPressOut={() => {
                            this.stopRecording();
                        }}
                        // onPress={() => {
                        //     if (this.state.audio) {
                        //         // alert("Recording Stop")
                        //         this.stopRecording();
                        //     } else {
                        //         this.startRecording();
                        //         // alert("Recording Start")
                        //     }
                        // }}
                        style={{
                            marginLeft: 10,
                            // backgroundColor: "#fff",
                        }}
                    >
                        <FontAwesomeIcon
                            size={30}
                            icon={faMicrophone}
                            color="#67cbff"
                        />
                    </Pressable>
                </Block>
                {this.state.audio && (
                    <Pressable
                        onPress={() => {
                            if (this.state.audio) {
                                this.stopRecording();
                            } else {
                                this.startRecording();
                            }
                        }}
                        style={{
                            marginHorizontal: 10,
                            // backgroundColor: "#fff",
                            position: "absolute",
                            right: 8,
                            top: -8,
                        }}
                    >
                        <Icon
                            size={20}
                            name={"record-voice-over"}
                            family="MaterialIcons"
                            color="#6566ff"
                        />
                    </Pressable>
                )}

                <Block
                    row
                    style={{
                        // paddingLeft: 15,
                        width: width - 60,
                        justifyContent: "flex-start",
                        alignItems: "center",
                        // backgroundColor: "red",
                        marginLeft: 6,
                        paddingBottom: Platform.OS === "ios" ? 20 : 5,
                    }}
                >
                    <Pressable
                        style={[styles.iconCard, { paddingLeft: 0 }]}
                        onPress={() => {
                            alert("Pressed");
                        }}
                    >
                        <Icon
                            size={18}
                            family="MaterialIcons"
                            name="contact-mail"
                            color={argonTheme.COLORS.PRIMARY}
                        />
                    </Pressable>
                    <Pressable style={styles.iconCard} onPress={() => { }}>
                        <FontAwesomeIcon
                            size={18}
                            icon={faFileVideo}
                            color={"#589c6b"}
                        />
                    </Pressable>
                    <Pressable style={styles.iconCard} onPress={() => { }}>
                        <FontAwesomeIcon
                            size={18}
                            icon={faImage}
                            color={"#fc494f"}
                        />
                    </Pressable>
                    <Pressable style={styles.iconCard} onPress={() => { }}>
                        <Icon
                            size={18}
                            name="attachment"
                            family="Entypo"
                            color={"#6e6e6e"}
                        />
                    </Pressable>
                    <Pressable style={styles.iconCard} onPress={() => { }}>
                        <Icon
                            size={20}
                            name="location-on"
                            family="MaterialIcons"
                            color={"#f4cb19"}
                        />
                    </Pressable>
                    <Pressable style={styles.iconCard} onPress={() => { }}>
                        <FontAwesomeIcon
                            size={18}
                            icon={faMusic}
                            color={"#f96d22"}
                        />
                    </Pressable>
                    {/* <Pressable style={styles.iconCard} onPress={() => { }}>
                        <Icon
                            size={18}
                            name="music"
                            family="Feather"
                            color={"#064635"}
                        />
                    </Pressable> */}
                </Block>
            </Block>
        );
    };
    render() {
        // console.log(this.messagesScroll)

        const { modalUri, user, message } = this.state;
        // const { user } = this.props.route.params;
        return (
            <>
                <Block flex space="between" style={styles.container}>
                    <ChatHeader
                        navigation={this.props.navigation}
                        data={user}
                    />
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
                    <KeyboardAvoidingView
                        keyboardVerticalOffset={Platform.OS === "ios" ? 2 : 20}
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={{ flex: 1 }}
                    >
                        {/* <Block center>
                            <Text>
                                {this.room_id}
                                receiver_id: {this.props.route.params.user.userId}
                            </Text>
                        </Block> */}
                        <>
                            {this.state.loading ? (
                                <Block style={{ flex: 1, paddingTop: 40 }}>
                                    <ActivityIndicator
                                        color={argonTheme.COLORS.PRIMARY}
                                    />
                                </Block>
                            ) : (
                                this.renderMessages()
                            )}
                            {this.messageForm()}
                            {this.bottomSheet()}
                            {this.EditDeleteSheet()}
                        </>
                    </KeyboardAvoidingView>
                    <EmojiBoard
                        showBoard={this.state.showEmoji}
                        containerStyle={{
                            elevation: 5,
                            backgroundColor: "#fff",
                            position: "absolute",
                        }}
                        tabBarStyle={{
                            // backgroundColor: "red",
                            marginBottom: 0,
                            alignItems: "center",
                            margin: 0,
                        }}
                        onRemove={() => this.setState({ showEmoji: false })}
                        numCols={7}
                        // hideBackSpace
                        tabBarPosition="top"
                        onClick={(emoji) => {
                            this.setState({
                                message: message + emoji.code,
                            });
                        }}
                    />
                </Block>
            </>
        );
    }
}
const mapDispatchToProps = {
    // actionOne,
    // actionTwo,
};
const mapStateToProps = (state) => ({
    profile: state.Blog_For_Each_Item.Showprofile,
    token: state.Blog_For_Each_Item.token_is,
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
const styles = StyleSheet.create({
    container: {},
    centeredView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.9)",
    },
    main: { height: "100%", backgroundColor: "white", },
    close: {
        alignItems: "center",
        width: "99%", height: 30,
        flexDirection: "row-reverse",
        // backgroundColor: "red",
        justifyContent: "space-between",
        marginTop: 15, paddingHorizontal: 10
    },
    row: {
        marginVertical: 7,
    },
    messageFormContainer: {
        // height: 96,
        backgroundColor: "#fff",
        paddingHorizontal: 8,
        paddingTop: 5,
        paddingBottom: 10,
        borderTopColor: "#ccc",
        borderTopWidth: 0.2,
        // BorderTop: 0.3,
    },
    input: {
        width: width - 60,
        height: theme.SIZES.BASE * 2.5,
        backgroundColor: theme.COLORS.WHITE,
        borderWidth: 0.2,
        borderColor: "#ccc",
        shadowColor: theme.COLORS.BLACK,
        borderRadius: 5,
        shadowOffset: { width: 0, height: 0.7 },
        shadowRadius: 3,
        shadowOpacity: 0.07,
        // borderWidth: 0.5,

        // width: width / 1.4,
        // elevation: 2,
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
        minWidth: 90,
        borderColor: argonTheme.COLORS.INPUT,
        borderWidth: 0.5,

        flexDirection: "row",
    },
    messageCardPersonal: {
        // borderTopLeftRadius: 0,
        // borderTopRightRadius: 0,
        // marginTop: -4,
        // zIndex: -3444,
        paddingHorizontal: 8,
        paddingVertical: 13,
        borderRadius: 6,
        minWidth: 90,
        flexDirection: "row",
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
        fontSize: 9,
        opacity: 0.5,
        // marginTop: 8,
        marginLeft: 8,
    },
    reply: {
        // fontFamily: "open-sans-regular",
        fontWeight: "600",
        fontSize: 11,
        opacity: 1,
        marginTop: 6,
        // marginLeft: 10,
        marginRight: 10,
        color: argonTheme.COLORS.PRIMARY,
    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 20,
        marginBottom: theme.SIZES.BASE,
        elevation: 1,
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
    iconCard: {
        // borderRadius: 50,
        // elevation: 4,
        // backgroundColor: theme.COLORS.WHITE,
        padding: 5,
        marginRight: 12,
        alignItems: "center",
        justifyContent: "center",
    },
});
