import React, { useEffect, useState, useRef } from "react";
import {
    View,
    Image,
    StyleSheet,
    FlatList,
    KeyboardAvoidingView,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView,
    ImageBackground,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

import { Input, Block, Text, theme } from "galio-framework";
import { Icon } from "../../components/";
const { width, height } = Dimensions.get("window");

import Images from "../../constants/Images";
import argonTheme from "../../constants/Theme";
import ProfileCard from "../../components/ProfileCard";
import IconExtra from "../../components/Icon";
import Button from "../../components/Button";
import { FAB } from "react-native-paper";
import ImageView from "react-native-image-view";

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

const ChatList = ({ navigation }) => {
    const refRBSheet = useRef();
    const [Active, setActive] = useState("View");
    const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
    const CONTENT_OFFSET_THRESHOLD = 100;
    const flatListRef = React.useRef();
    const onPressTouch = () => {
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    };

    const renderSearch = () => {
        const [search, setsearch] = useState("");
        const [active, setActive] = useState(false);
        const iconSearch = (
            <Icon
                size={25}
                color={theme.COLORS.MUTED}
                name="magnifying-glass"
                family="entypo"
                style={{ paddingRight: 10 }}
            />
        );

        return (
            <Block row center>
                <Input
                    left
                    color="black"
                    bgColor={argonTheme.COLORS.white}
                    autoFocus={false}
                    rounded={false}
                    autoCorrect={false}
                    autoCapitalize="none"
                    iconContent={iconSearch}
                    defaultValue={search}
                    style={[styles.search]}
                    placeholder="Search chat"
                    placeholderTextColor={argonTheme.COLORS.MUTED}
                    onFocus={() => {
                        navigation.navigate("ChatSearch");
                        setActive(true);
                    }}
                    onBlur={() => setActive(false)}
                // onChangeText={()=>{}}
                />
                <Icon
                    onPress={() => refRBSheet.current.open()}
                    size={25}
                    color={theme.COLORS.MUTED}
                    name="dots-three-vertical"
                    family="Entypo"
                    style={{ marginLeft: -10 }}
                />
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
                        container: { backgroundColor: "white", height: 200 },
                    }}
                >
                    <Block style={styles.main}>
                        <TouchableOpacity>
                            <Block row center style={styles.close}>
                                <IconExtra
                                    size={16}
                                    color="black"
                                    name="edit"
                                    family="Entypo"
                                />
                                <Text
                                    color="white"
                                    style={{
                                        marginLeft: 15,
                                        fontSize: 16,
                                        color: argonTheme.COLORS.TEXT,
                                    }}
                                >
                                    Edit
                                </Text>
                            </Block>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Block row center style={styles.close}>
                                <IconExtra
                                    size={16}
                                    color="black"
                                    name="delete"
                                    family="MaterialCommunityIcons"
                                />

                                <Text
                                    color="white"
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
                    </Block>
                </RBSheet>
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Block row
                style={{
                    marginVertical: 10,
                    // backgroundColor: "yellow",
                    width: 300,
                    // width: width * 0.95,
                    height: 100,
                    justifyContent: "center",
                    // alignItems: "center",
                }}
            >
                <ImageBackground
                    source={{
                        uri:
                            //  message.avatar ? message.avatar  :
                            "https://i.pinimg.com/474x/9f/23/b2/9f23b2cd56484cdbe6d6581e799290a5.jpg",
                    }}
                    style={{}}
                    imageStyle={{
                        width: 100,
                        height: 100,
                        borderRadius: 100,
                        backgroundColor: "red",
                    }}
                ></ImageBackground>
            </Block>
            <Block middle style={styles.nameInfo}>
                <Text
                    style={{ fontFamily: "open-sans-bold" }}
                    size={25}
                    color="#32325D"
                >
                    Talha Kayani
                    {/* {i.fname} {i.lname} */}
                </Text>

                <Text
                    size={14}
                    color="#32325D"
                    italic={true}
                    style={{
                        marginTop: 10,
                        // fontFamily: "open-sans-light",
                        // fontStyle: 'italic'
                    }}
                >
                    @talha123
                    {/* @{i.username.toLowerCase()} */}
                </Text>
                <Text
                    size={14}
                    color="#32325D"
                    style={{
                        marginTop: 3,
                        fontFamily: "open-sans-bold",
                    }}
                >
                    talha123@gmail.com
                    {/* {i.email.toLowerCase()} */}
                </Text>
            </Block>
            <Block>
                <Text
                    size={16}
                    color="#32325D"
                    style={{
                        marginTop: 3,
                        padding: 10,
                        textAlign: "left",
                        lineHeight: 20,
                        // fontFamily: "open-sans",
                    }}
                >
                    Lorem ipsum dolor , consectetur adipiscing abore et dolore magna aliqua. Adipiscing bibendum  ultricies integer quis. Sit amet purus gravida quis blandit turpis. Quisque sagittis purus sit amet. Nunc scelerisque viverra mauris in aliquam sem fringilla. Habitant morbi tristique senectus et netus et malesuada fames. Velit dignissim sodales ut eu sem integer vitae justo eget. Tellus id interdum velit laoreet id donec. At elementum eu facilisis sed odio morbi quis commodo odio. Praesent elementum facilisis leo vel fringilla est. Quis auctor elit sed vulputate.
                </Text>
            </Block>
            <Block row style={styles.BtnContainer}>
                <Button
                    onPress={() => {
                        setActive("View");
                        // navigation.navigate("ChatList")
                    }}
                    style={{
                        width: width / 4,
                        marginRight: 12,
                        backgroundColor:
                            Active == "View" ? "#5e72e3" : "transparent",
                        elevation: 0,
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "bold",
                            color:
                                Active == "View"
                                    ? "#fff"
                                    : argonTheme.COLORS.MUTED,
                        }}
                    >
                        View Profile
                    </Text>
                </Button>
                <Button
                    onPress={() => {
                        setActive("share");
                        // navigation.navigate("ChatList")
                    }}
                    style={{
                        width: width / 4,

                        elevation: 0,
                        backgroundColor:
                            Active == "share" ? "#5e72e3" : "transparent",

                        color: Active == "share" ? "none" : "#000000",
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "bold",
                            color:
                                Active == "share"
                                    ? "#fff"
                                    : argonTheme.COLORS.MUTED,
                        }}
                    >
                        Share Profile
                    </Text>
                </Button>
            </Block>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    Container: {
        height: "100%",
        width: "100%",
        flex: 1,
        marginTop: 60,
        backgroundColor: "cyan",
        // alignItems: "flex-start",
        // elevation: 0,
        // justifyContent: 'center',
    },
    header: {
        backgroundColor: theme.COLORS.WHITE,
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
    },
    searchContainer: {
        width: width,
        // paddingHorizontal: theme.SIZES.BASE
    },
    search: {
        height: 50,
        width: width - 60,
        // marginHorizontal: theme.SIZES.BASE,
        // marginBottom: theme.SIZES.BASE,
        // alignSelf: 'center',
        borderWidth: 1,
        margin: 10,
        // marginTop: 10,
        // borderRadius: 30
    },
    shadow: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 3 },
    },
    BtnContainer: {
        marginTop: 30,
        alignItems: "center",
        // height: 30,
        justifyContent: "center",
        // backgroundColor: '#ffff',
    },
    addICon: {
        position: "absolute",
        backgroundColor: "gray",
        borderRadius: 100,
        right: 20,
        zIndex: 10,
        bottom: height / 4,
    },
    upwardICon: {
        position: "absolute",
        backgroundColor: "#000",
        borderRadius: 100,
        right: 20,
        padding: 5,
        zIndex: 10,
        bottom: 20,
    },
    dot: {
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
    main: { flex: 1, backgroundColor: "white" },
    close: { width: "90%", height: 40, marginTop: 20 },
    fab: {
        position: "absolute",
        margin: 30,
        right: 0,
        bottom: 10,
        backgroundColor: "black",
    },
});
export default ChatList;
