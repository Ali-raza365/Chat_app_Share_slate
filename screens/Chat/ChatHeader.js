import React, { useEffect, useState, useMemo, useRef } from "react";
import {
    StyleSheet,
    ImageBackground,
    View,
    Dimensions,
    ActivityIndicator,
    Modal,
    TouchableOpacity,
    Pressable,
} from "react-native";
import { Block, Text, theme, NavBar } from "galio-framework";
import argonTheme from "../../constants/Theme";
import { Icon } from "../../components/";
import { FAB } from "react-native-paper";
import IconExtra from "../../components/Icon";
import RBSheet from "react-native-raw-bottom-sheet";
import { faShareSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const { width, height } = Dimensions.get("window");

const ChatHeader = ({ navigation, data }) => {
    const refRBSheet = useRef();
    const [OTRmodal, setOTRmodal] = useState(false)
    const [user, setuser] = useState(null)


    const handleLeftPress = () => {
        // alert("sdaasd")
        // dispatch(ActiveId_Action(""));
        // return back
        //     ? navigation.dispatch(CommonActions.goBack())
        //     : navigation.openDrawer();
    };
    const navbarStyles = [styles.navbar, { backgroundColor: argonTheme.COLORS.WHITE }];
    const renderLeft = () => {
        if (!data) {
            return null;
        }
        return (
            <Block
                row
                style={{
                    // alignItems: "center",
                    // alignContent: "center",
                    paddingTop: 6,
                    justifyContent: "flex-start",
                    // backgroundColor: "green",
                    // marginBottom: 5,
                }}
            >
                <Icon
                    size={30}
                    onPress={() => {
                        navigation.goBack();
                    }}
                    color={"#000"}
                    name="arrow-back-ios"
                    family="MaterialIcons"
                    style={{
                        paddingRight: 0,
                        paddingTop: 8,
                        // backgroundColor: "red",
                        // alignContent: "center",
                        // textAlign: "center",

                    }}
                />
                <Block row style={{ alignContent: "center" }}>
                    <ImageBackground
                        source={{
                            uri:
                                data ? data.image ? data.image : data.avatar :
                                    //  message.avatar ? message.avatar  :
                                    "https://i.pinimg.com/474x/9f/23/b2/9f23b2cd56484cdbe6d6581e799290a5.jpg",
                        }}
                        style={[styles.coment_user_dp, styles.shadow]}
                        imageStyle={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 100,

                        }}
                    >
                        <Block
                            // center
                            style={{
                                width: 17,
                                height: 17,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#fff",
                                position: "absolute",
                                top: 22,
                                right: -6,
                                // left: 180,
                                borderRadius: 100,
                                zIndex: 10,
                            }}>
                            <Icon
                                name="check-circle"
                                family="MaterialIcons"
                                size={14}
                                color={"rgb(94,175,252)"}

                            />
                        </Block>
                        {/* <Block
                            style={[
                                styles.dot,
                                {
                                    backgroundColor:
                                        //  status ?
                                        "lightgreen",
                                    // :"red"
                                },
                            ]}
                        ></Block> */}

                    </ImageBackground>
                    <Block style={styles.coment_user_datee}>
                        <Text
                            // muted
                            numberOfLines={1}
                            size={20}
                            style={{
                                // paddingTop: -5,
                                // backgroundColor: "red",
                                fontWeight: "bold",
                                fontFamily: "open-sans-bold",
                                marginLeft: 0,
                                // width: width / 2.4,
                                color: argonTheme.COLORS.BLACK,
                            }}
                        >
                            {data ? data.name ? data.name : "Talha Kayani" : ""}
                            {/* {message.title && message.title} */}
                        </Text>
                        <Block row
                            style={{
                                alignItems: "center"
                            }}
                        >
                            <Text
                                numberOfLines={1}
                                size={19}
                                style={{
                                    // paddingTop: 9,
                                    fontWeight: "bold",
                                    fontFamily: "open-sans-regular",
                                    marginRight: 5,
                                    fontSize: 14,
                                    maxWidth: 140,
                                    color: argonTheme.COLORS.BLACK,
                                    // backgroundColor: "red",
                                }}
                            // color={argonTheme.COLORS}
                            >

                                {data ? data.name ? `@${data.name.toLowerCase().replace(/\s+/g, '')}321` : "@talha123" : ""}
                                {/* {message.message && message.message} */}
                            </Text>
                            {/* <Block style={{ backgroundColor: "white", borderRadius: 35 }}>
                                <Icon
                                    name="check-circle"
                                    family="MaterialIcons"
                                    size={14}
                                    color={"rgb(94,175,252)"}

                                />
                            </Block> */}
                        </Block>
                    </Block>
                </Block>
            </Block>
        );
    };
    const renderRight = () => {
        return (
            <Block
                center
                style={{
                    // padding: 20,
                    marginTop: Platform.OS == "ios" ? 0 : 5,
                    marginLeft: 15,
                    flexDirection: "row",
                    // width: 100,
                    justifyContent: "flex-end",
                    alignContent: "center",
                    // backgroundColor: "yellow",
                    // height: '100%',
                    // marginRight: 20,
                }}
            >
                <Icon
                    size={30}
                    color={theme.COLORS.Black}
                    name="video"
                    family="Feather"
                    style={{ paddingRight: 25 }}
                />
                {/* <Icon
                    size={19}
                    color={theme.COLORS.WHITE}
                    name="video"
                    family="Feather"
                    style={{ marginRight: 30 }}
                />
                <FontAwesomeIcon
                    icon={faShareSquare}
                    size={19}
                    color={theme.COLORS.WHITE}
                    // name="share-square"
                    // family="FontAwesome5"
                    style={{ marginRight: 17 }}
                /> */}
                <Icon
                    onPress={() => refRBSheet.current.open()}
                    size={20}
                    color={theme.COLORS.BLACK}
                    name="caretdown"
                    family="AntDesign"
                    style={{ marginRight: 0 }}
                />

                {/* <Icon
                    onPress={() => refRBSheet.current.open()}
                    size={35}
                    color={theme.COLORS.BLACK}
                    name="dots-three-vertical"
                    family="entypo"
                    style={{ marginRight: 10 }}
                /> */}
            </Block>
        );
    };
    const BottomSheet = () => {
        // const refRBSheet = useRef();
        return (
            <View>
                <RBSheet
                    ref={refRBSheet}
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
                                    name="user"
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
                                    Profile
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
                                    name="share"
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
                                    Share profile
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
                                setOTRmodal(true)
                                // navigation.navigate("ORTChat")
                            }}
                        >
                            <Block row style={styles.close}>
                                <IconExtra
                                    size={14}
                                    color={argonTheme.COLORS.MUTED}
                                    name="eraser"
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
                                    OTR
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
                                    name="attachment"
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
                                    Attachment
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
                                    Locked Messages
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
                                    name="emoji-happy"
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
                                    Reacted Messages
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
                    </Block>
                </RBSheet>
            </View>
        );
    };
    const ModalBox = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={OTRmodal}
                onRequestClose={() => {
                    setOTRmodal(!OTRmodal)
                    // this.setState({ OTRmodalVisible: !this.state.OTRmodalVisible });
                }}>
                <>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Rahul is inviting you for the OTR (Off The Record) chat</Text>
                            <Block row right style={{
                                width: width - 30,
                                justifyContent: 'flex-end',
                            }} >
                                <Pressable
                                    style={[styles.button, { elevation: 0 }]}
                                    onPress={() => setOTRmodal(false)}

                                >
                                    <Text style={{
                                        color: argonTheme.COLORS.MUTED,

                                    }}>Close</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}

                                    onPress={() => {
                                        setOTRmodal(false)
                                        navigation.navigate("ORTChat")
                                    }}

                                >
                                    <Text style={styles.textStyle, { color: argonTheme.COLORS.WHITE }}>Accept</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setOTRmodal(!OTRmodal)}
                                >
                                    <Text style={styles.textStyle}>Decline</Text>
                                </Pressable>
                            </Block>
                        </View>
                    </View>
                </>
            </Modal >
        )
    }
    return (
        <Block>
            <NavBar
                back={true}
                // title={title}
                style={navbarStyles}
                transparent={false}
                right={renderRight()}
                onLeftPress={handleLeftPress}
                left={renderLeft()}
                leftStyle={{ flex: 1, }}
                rightStyle={{ justifyContent: "flex-start", }}
            // titleStyle={[
            // styles.title,
            // { color: argonTheme.COLORS["HEADER"] },
            //  { color:  },
            // ]}
            />
            {BottomSheet()}
            {ModalBox()}
        </Block>
    );
};
const ios = "ios"
const styles = StyleSheet.create({
    Container: {
        // height: '100%',
        flexDirection: "row",
        height: 60,
        width: "100%",
        backgroundColor: "#fff",
        // backgroundColor: 'red',
        alignItems: "center",
        justifyContent: "center",

    },
    coment_user_dp: {
        width: 50,
        height: 50,
        elevation: 1,

        // marginTop: 10,
        // borderRadius: 100,
        // backgroundColor: "blue",
        // alignSelf: "center",
    },

    coment_user_datee: {
        width: width - 200,
        // height: 45, 
        height: 60,
        paddingLeft: 10,
        // paddingBottom: 10,
        marginBottom: 10,
        // justifyContent: "space-between",
        // padding: 5,
        // backgroundColor: "cyan",
        flexDirection: "column",
    },

    dot: {
        width: 17,
        height: 17,
        backgroundColor: "red",
        position: "absolute",
        // top: 12,
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
    navbar: {
        // backgroundColor: "red",
        height: Platform.OS == "ios" ? height * 0.12 : height * 0.09,
        paddingTop: Platform.OS == "ios" ? height * 0.09 : height * 0.03,
        paddingBottom: Platform.OS == "ios" ? height * 0.03 : 0,
        borderBottomColor: argonTheme.COLORS.PRIMARY,
        // alignItems: "center",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        zIndex: 5,
    },
    main: { height: "100%", backgroundColor: "white" },
    close: { width: "90%", height: 30, marginTop: 15, marginLeft: 15, },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 15,
        paddingHorizontal: 10,
        width: width - 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        marginLeft: 10,
    },
    buttonOpen: {
        backgroundColor: "#4BB543",
    },
    buttonClose: {
        backgroundColor: "#5e72e3",
    },

    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    shadow: {
        shadowColor: "rgba(0, 0,0, 0.1)",
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 10,
        shadowOpacity: 1,
    },
});
export default ChatHeader;
