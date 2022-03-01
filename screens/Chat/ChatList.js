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
    Pressable,
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
import { ActivityIndicator, FAB } from "react-native-paper";
import { Header } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { ChatList_fetching_action } from "../../redux/reducers/chat/chat_action";
import io from 'socket.io-client';

// const SOCKET_URL = 'chat.shareslate.com:301';
const obj = {
    id: "227",
    sender_id: "1",
    receiver_id: "2",
    message: "test1245 ",
    status: "0",
    is_read: "0",
    type: "0",
    rc_msg_id: null,
    room_id: "1101",
    date_added: "2021-12-04 10:27:51",
    message_attachment_name: "",
    is_pin: "0",
    reply_id: "0",
    like_status: "0",
    is_active: "1",
    is_hidden: "0",
    life_span: "0",
    is_happy: "0",
    unread_count: {
        count: "4"
    },
    reply_message: [],
    receiver_user_data: {
        id: "2",
        fname: "Ankit",
        lname: "tiwari",
        email: "ankit.tiwari@shareslate.com",
        password: "25f9e794323b453885f5181f1b624d0b",
        status: "1",
        profile_img: "https://celebsupdate.com/wp-content/uploads/2020/02/Hrithik-Roshan-Most-Handsome-Bollywood-Actors.jpg",
        date_added: "2021-08-25 17:01:27",
        nick: "",
        address: "gulshan karachi",
        city: "",
        profile_status: ""
    },
    sender_user_data: {
        id: "1",
        fname: "Rahul",
        lname: "Tripathi",
        email: "rahul.tripathi@shareslate.com",
        password: "25f9e794323b453885f5181f1b624d0b",
        status: "1",
        profile_img: "https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png",
        date_added: "2021-11-21 09:18:33",
        nick: "",
        address: "Mumbai",
        city: "Mumbai",
        profile_status: ""
    }
}

const dummyData = [
    {
        id: 1,
        avatar: Images.ProfileChat,
        message: `Hey there! How are you today? Can we me et and talk? Thanks!`,
        contacts: "contact",
        groupNa: "Group",
        time: `10:31 PM`,
        title: "chat 1",
        count: 22,
        select: false,
    },
    {
        id: 21,
        avatar: Images.ProfileChat,
        message: `Hey there! How are you today? Can we me et and talk? Thanks!`,
        time: `10:31 PM`,
        title: "chat 1",
        contacts: "contact",
        groupNa: "Group",
        count: 22,
        select: false,
    },
    {
        id: 14,
        avatar: Images.ProfileChat,
        message: `Hey there! How are you today? Can we me et and talk? Thanks!`,
        time: `10:31 PM`,
        title: "chat 1",
        count: 22,
        select: false,
    },
    {
        id: 15,
        avatar: Images.ProfileChat,
        message: `Hey there! How are you today? Can we me et and talk? Thanks!`,
        time: `10:31 PM`,
        title: "chat 1",
        count: 22,
        select: false,
    },
    {
        id: 2,
        message: `Sure, just let me finish something and I’ll call you.`,
        time: `10:34 PM`,
        title: "chat 1",
        count: false,
        select: false,
    },
    {
        id: 3,
        avatar: Images.ProfileChat,
        message: `OK. Cool! See you!`,
        time: `10:35 PM`,
        title: "chat 1",
        count: 2,
        select: false,
    },
    {
        id: 4,
        message: `Bye bye`,
        time: `10:36 PM`,
        status: false,
        title: "chat 1",
        count: 9,
        select: false,
    },
    {
        id: 5,
        avatar: Images.ProfileChat,
        message: `That great message`,
        time: `10:36 PM`,
        status: false,
        title: "chat 1",
        // count: 9,
        select: false,
    },
    {
        id: 6,
        message: `Thanks`,
        time: `10:36 PM`,
        status: false,
        title: "chat 1",
        // count: 9,
        select: false,
    },
    {
        id: 7,
        message: `Okay`,
        time: `10:36 PM`,
        status: false,
        title: "chat 1",
        count: 2,
        select: false,
    },
    {
        id: 8,
        avatar: Images.ProfileChat,
        message: `??`,
        time: `10:36 PM`,
        status: false,
        title: "chat 1",
        // count: 9,
        select: false,
    },
];

const ChatList = ({ navigation }) => {
    const refRBSheet = useRef();
    const refCreateSheet = useRef();
    const dispatch = useDispatch();
    const { token_is, userId_is } = useSelector(
        (state) => state.Blog_For_Each_Item
    );
    const { chatLists, fetch_chatlist_loading } = useSelector((state) => state.chat);
    const fetchChatlist = () => {
        let data = {
            token: token_is,
            action: "list",
        };
        dispatch(ChatList_fetching_action(data));
    };

    useEffect(() => {
        fetchChatlist();
    }, []);
    useEffect(() => {
    }, []);
    useEffect(() => {
        if (chatLists && chatLists.length !== 0) {
            // alert(chatLists.length);
            setList(chatLists);
        }
    }, [chatLists]);

    const [Active, setActive] = useState("chat");
    const [search, setsearch] = useState("");
    const [Create, setCreate] = useState("chat");
    const [data, setData] = useState(dummyData);
    const [list, setList] = useState();
    const [handleExtraData, setHandleExtraDara] = useState(false);
    const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
    const CONTENT_OFFSET_THRESHOLD = 100;
    const flatListRef = React.useRef();

    const onPressTouch = () => {
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    };

    const renderChatList = (_data, index) => {
        return (
            <Block width={width * 0.95}>
                <ProfileCard
                    // socket={socket}
                    type="chat"
                    title="Talha Kayani"
                    message={{ ..._data, ...dummyData[index], mytoken: token_is }}
                    navigation={navigation}
                    status={true}
                />
            </Block>
        );
    };

    const renderGroupList = (data, index) => {
        return (
            <Block width={width * 0.95}>
                <ProfileCard
                    // socket={socket}
                    type="group"
                    title="Group"
                    message={data}
                    navigation={navigation}
                    status={true}
                />
            </Block>
        );
    };

    const renderContactList = (_data, index) => {
        return (
            <Block width={width * 0.95}>
                <ProfileCard
                    // socket={socket}
                    type="contact"
                    title="Contact"
                    message={{ ..._data, ...dummyData[index], index }}
                    navigation={navigation}
                    status={true}
                />
            </Block>
        );
    };
    const renderContactListSelection = (_data, index) => {
        return (
            <Block width={width * 0.95}>
                <ProfileCard
                    // socket={socket}
                    type="contactOption"
                    title="Contact"
                    message={{ ..._data, ...dummyData[index], index }}
                    MultipleSelection
                    onSelect={onSelect}
                    navigation={navigation}
                    status={true}
                />
            </Block>
        );
    };

    const onSelect = (index) => {
        // console.log(index, "dddddddddddddddddddddddddddddddddddddddddddddd")
        let arr = data;
        arr[index] = {
            ...data[index],
            select: !data[index].select,
        };
        setData(arr);
        setHandleExtraDara(!handleExtraData);
    };

    const renderHeader = (data, index) => {
        return <></>;
    };
    const iconSearch = (
        <Icon
            size={25}
            color={theme.COLORS.MUTED}
            name="magnifying-glass"
            family="entypo"
            style={{ paddingRight: 10 }}
        />
    );
    const renderSearch = () => {
        const [active, setactive] = useState(false);
        return (
            <Block
                row
                center
                style={
                    {
                        // backgroundColor: "red",
                        // width: width - 40,
                    }
                }
            >
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
                        setactive(true);
                    }}
                    onBlur={() => setactive(false)}
                // onChangeText={()=>{}}
                />
                {/* <Icon
                    onPress={() => refRBSheet.current.open()}
                    size={25}
                    color={theme.COLORS.MUTED}
                    name="dots-three-vertical"
                    family="Entypo"
                    style={{ marginLeft: -10 }}
                /> */}
            </Block>
        );
    };
    const BottomSheet = () => {
        return (
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
                    container: { backgroundColor: "white", height: 120 },
                }}
            >
                <Block style={styles.main}>
                    <TouchableOpacity
                        onPress={() => {
                            console.log("Press");
                            // this.setState({ showPhoto: true })
                        }}
                    >
                        <Block row style={styles.close}>
                            <IconExtra
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
                    <TouchableOpacity
                        onPress={() => {
                            console.log("Press");
                            // this.setState({ showPhoto: true })
                        }}
                    >
                        <Block row style={styles.close}>
                            <IconExtra
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
                </Block>
            </RBSheet>
        );
    };
    const CreateSheet = () => {
        return (
            <View>
                <RBSheet
                    ref={refCreateSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "transparent",
                        },
                        draggableIcon: {
                            backgroundColor: "#8898AA",
                        },
                        container: {
                            backgroundColor: "white",
                            height: height / 1.1,
                        },
                    }}
                >
                    <Block style={styles.main}>
                        {Create == "chat" ? CreateChat() : CreateGroup()}
                    </Block>
                </RBSheet>
            </View>
        );
    };
    const CreateGroup = () => {
        return (
            <>
                <Block row space="between" style={styles.close}>
                    <Text
                        onPress={() => {
                            setCreate("chat");
                            refCreateSheet.current.close();
                        }}
                        style={{
                            marginLeft: 15,
                            // paddingRight: -15,
                            fontSize: 16,
                            color: "#5e72e3",
                        }}
                    >
                        Cancel
                    </Text>
                    <Text
                        color="white"
                        style={{
                            marginLeft: -15,
                            fontSize: 16,
                            fontWeight: "bold",
                            color: argonTheme.COLORS.TEXT,
                        }}
                    >
                        New Group
                    </Text>
                    <Text>Create</Text>
                </Block>
                <Block>
                    <Input
                        left
                        color="black"
                        // bgColor={"#cccc"}
                        autoFocus={false}
                        rounded={false}
                        autoCorrect={false}
                        autoCapitalize="none"
                        // iconContent={iconSearch}
                        defaultValue={search}
                        style={[
                            styles.search,
                            {
                                width: width - 20,
                                marginBottom: 0,
                                borderWidth: 0,
                                height: 20,
                            },
                        ]}
                        placeholder="Group Name (Optional)"
                        placeholderTextColor={argonTheme.COLORS.MUTED}
                    />
                </Block>
                <Block>
                    <Input
                        left
                        color="black"
                        bgColor={"#cccc"}
                        autoFocus={false}
                        rounded={false}
                        autoCorrect={false}
                        autoCapitalize="none"
                        iconContent={iconSearch}
                        defaultValue={search}
                        style={[
                            styles.search,
                            {
                                width: width - 20,
                            },
                        ]}
                        placeholder="Search chat"
                        placeholderTextColor={argonTheme.COLORS.MUTED}
                    />
                </Block>
                <Text
                    // muted
                    size={15}
                    style={{
                        paddingLeft: 15,
                        paddingVertical: 15,
                        // padding: 10,
                        fontWeight: "bold",
                        fontFamily: "open-sans-regular",
                        // marginLeft: 10,
                        color: argonTheme.COLORS.MUTED,
                    }}
                >
                    SUGGESTED
                </Text>
                <>
                    <FlatList
                        // style={{ marginBottom: 30 }}
                        data={list}
                        ref={flatListRef}
                        renderItem={({ item, index }) =>
                            renderContactListSelection(item, index)
                        }
                        showsVerticalScrollIndicator={true}
                        extraData={handleExtraData}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => `${index}-${item.id}`}
                        onScroll={(event) => {
                            setContentVerticalOffset(
                                event.nativeEvent.contentOffset.y
                            );
                        }}
                    // ListEmptyComponent={this.renderEmpty()}
                    // ListFooterComponent={({ item }) => renderHeader(item)}
                    // ListFooterComponent={this.renderFooter()}
                    />
                </>
            </>
        );
    };
    const CreateChat = () => {
        return (
            <>
                <Block
                    row
                    space="between"
                    style={[
                        styles.close,
                        {
                            width: "93%",
                            marginleft: 0,
                            marginVertical: 10,
                            // backgroundColor: "cyan"
                        },
                    ]}
                >
                    <Text
                        onPress={() => {
                            setCreate("chat");
                            refCreateSheet.current.close();
                        }}
                        color="white"
                        style={{
                            // marginLeft: 15,
                            // paddingRight: -15,
                            // justifyContent: "",
                            fontSize: 16,
                            // backgroundColor: "red",

                            color: "#5e72e3",
                        }}
                    >
                        Cancel
                    </Text>
                    <Text
                        // color="white"
                        style={{
                            // backgroundColor: "red",
                            // marginLeft: -15,
                            fontSize: 16,
                            fontWeight: "bold",
                            color: argonTheme.COLORS.TEXT,
                        }}
                    >
                        New message
                    </Text>
                    <Text
                        style={{
                            // backgroundColor: "red",
                            // marginLeft: -15,
                            fontSize: 16,
                            // fontWeight: "bold",
                            color: argonTheme.COLORS.MUTED,
                        }}
                    >
                        create
                    </Text>
                </Block>
                <Block
                    row
                    style={[
                        styles.close,
                        {
                            backgroundColor: "#f5f5f5",
                            alignItems: "center",
                            width: "100%",
                            marginTop: 6,
                            height: 50,
                        },
                    ]}
                >
                    <Text
                        style={{
                            marginLeft: 15,
                            color: argonTheme.COLORS.MUTED,
                            fontSize: 16,
                        }}
                    >
                        To:
                    </Text>
                    <Input
                        left
                        color="black"
                        bgColor={"#f5f5f5"}
                        autoFocus={false}
                        rounded={false}
                        autoCorrect={false}
                        autoCapitalize="none"
                        // iconContent={iconSearch}
                        // defaultValue={search}
                        style={[styles.search, { height: 40, borderWidth: 0 }]}
                    // onFocus={() => {
                    //     navigation.navigate("ChatSearch");
                    //     // setActive(true);
                    // }}
                    // onBlur={() => setActive(false)}
                    // onChangeText={()=>{}}
                    />
                </Block>

                <TouchableOpacity
                    onPress={() => {
                        // alert("yububub")
                        setCreate("group");
                    }}
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",

                        padding: 10,
                        marginVertical: 10,
                    }}
                >
                    <Block
                        row
                        style={{
                            height: 45,
                            overflow: "hidden",
                            alignItems: "center",
                        }}
                    >
                        <Block
                            style={{
                                backgroundColor: "green",
                                flexDirection: "row",
                                width: 45,
                                height: 45,
                                overflow: "hidden",
                                padding: 5,
                                // marginVertical: 10,
                                backgroundColor: "#cccc",
                                borderRadius: 100,
                                justifyContent: "center",
                                alignContent: "center",
                                textAlign: "center",
                            }}
                        >
                            <Icon
                                onPress={() => refRBSheet.current.open()}
                                size={30}
                                color={"#000"}
                                name="groups"
                                family="MaterialCommunityIcons"
                            // style={{ marginLeft: -10 }}
                            />
                        </Block>

                        <Text
                            // muted
                            size={19}
                            style={{
                                paddingLeft: 15,
                                // padding: 10,
                                fontWeight: "bold",
                                fontFamily: "open-sans-regular",
                                // marginLeft: 10,

                                color: argonTheme.COLORS.TEXT,
                            }}
                        >
                            Create a New Group
                        </Text>
                    </Block>
                    <Icon
                        // onPress={() => refRBSheet.current.open()}
                        size={17}
                        color={theme.COLORS.INPUT}
                        name="chevron-thin-right"
                        family="entypo"
                        style={{ paddingRight: 15 }}
                    />
                </TouchableOpacity>
                <Text
                    // muted
                    size={15}
                    style={{
                        paddingLeft: 15,
                        paddingVertical: 15,
                        // padding: 10,
                        fontWeight: "bold",
                        fontFamily: "open-sans-regular",
                        // marginLeft: 10,
                        color: argonTheme.COLORS.MUTED,
                    }}
                >
                    SUGGESTED
                </Text>
                <>
                    <FlatList
                        // style={{ marginBottom: 30 }}
                        data={list}
                        ref={flatListRef}
                        renderItem={({ item, index }) => renderContactList(item, index)}
                        showsVerticalScrollIndicator={true}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => `${index}-${item.id}`}
                        onScroll={(event) => {
                            setContentVerticalOffset(
                                event.nativeEvent.contentOffset.y
                            );
                        }}
                    // ListEmptyComponent={this.renderEmpty()}
                    // ListFooterComponent={({ item }) => renderHeader(item)}
                    // ListFooterComponent={this.renderFooter()}
                    />
                </>
            </>
        );
    };


    return (
        <Block style={{ flex: 1 }}>
            {/* <Block width={width * .95}>
                 <ProfileCard
   socket={socket} title="M.Umar " text="FSD Pakistan" status={true} profile />
            </Block> */}
            <Header
                title="Connect"
                back
                onCreate={() => {
                    refCreateSheet.current.open();
                    // alert("Connect to your Internet")
                }}
                // tabs={tabs.fashion}
                navigation={navigation}
            // scene={scene}
            />
            <Block center width={width * 0.95}>
                {renderSearch()}
            </Block>
            <Block row style={styles.BtnContainer}>
                <Button
                    onPress={() => {
                        setActive("chat");
                        // navigation.navigate("ChatList")
                    }}
                    style={{
                        width: width / 4,
                        backgroundColor:
                            Active == "chat" ? "#5e72e3" : "transparent",
                        elevation: 0,
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "bold",
                            color:
                                Active == "chat"
                                    ? "#fff"
                                    : argonTheme.COLORS.MUTED,
                        }}
                    >
                        Chat
                    </Text>
                </Button>
                <Button
                    onPress={() => {
                        setActive("Contacts");
                        // navigation.navigate("ChatList")
                    }}
                    style={{
                        width: width / 4,

                        elevation: 0,
                        backgroundColor:
                            Active == "Contacts" ? "#5e72e3" : "transparent",

                        color: Active == "Contacts" ? "none" : "#000000",
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "bold",
                            color:
                                Active == "Contacts"
                                    ? "#fff"
                                    : argonTheme.COLORS.MUTED,
                        }}
                    >
                        Contacts
                    </Text>
                </Button>
                <Button
                    borderless
                    onPress={() => {
                        setActive("groups");
                        // navigation.navigate("ChatList")
                    }}
                    style={{
                        width: width / 4,
                        backgroundColor:
                            Active == "groups" ? "#5e72e3" : "transparent",

                        bordeColor: "#f5f5f5",
                        elevation: 0,
                        // borderWidth: 0,
                        color: Active !== "groups" ? "none" : "#000000",
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "bold",
                            color:
                                Active == "groups"
                                    ? "#fff"
                                    : argonTheme.COLORS.MUTED,
                        }}
                    >
                        Groups
                    </Text>
                </Button>
            </Block>
            {fetch_chatlist_loading ? <Block
                style={{ flex: 1, paddingTop: 40 }}
            >
                <ActivityIndicator color={argonTheme.COLORS.PRIMARY} />
            </Block> : <Block
                style={{
                    flex: 1,
                    // backgroundColor: "#5e72e3"
                }}
            >
                {Active == "groups" ? (
                    <>
                        <FlatList
                            // style={{ marginBottom: 30 }}
                            data={dummyData}
                            ref={flatListRef}
                            renderItem={({ item }) => renderGroupList(item)}
                            showsVerticalScrollIndicator={true}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) =>
                                `${index}-${item.id}`
                            }
                            onScroll={(event) => {
                                setContentVerticalOffset(
                                    event.nativeEvent.contentOffset.y
                                );
                            }}
                        // ListEmptyComponent={this.renderEmpty()}
                        // ListFooterComponent={({ item }) => renderHeader(item)}
                        // ListFooterComponent={this.renderFooter()}
                        />
                    </>
                ) : Active == "chat" ? (
                    <>
                        <FlatList
                            data={chatLists}
                            ref={flatListRef}
                            // style={{ backgroundColor: '#eee', flex: 1 }}
                            renderItem={({ item, index }) => renderChatList(item, index)}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) =>
                                `${index}-${item.id}`
                            }
                            onScroll={(event) => {
                                setContentVerticalOffset(
                                    event.nativeEvent.contentOffset.y
                                );
                            }}
                        // ListEmptyComponent={this.renderEmpty()}
                        // ListHeaderComponent={renderHeader}
                        // ListFooterComponent={this.renderFooter()}
                        />
                    </>
                ) : (
                    <>
                        <FlatList
                            data={list}
                            ref={flatListRef}
                            renderItem={({ item, ind }) => renderContactList(item, ind)}
                            // style={{ backgroundColor: '#eee', flex: 1 }}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) =>
                                `${index}-${item.id}`
                            }
                            onScroll={(event) => {
                                setContentVerticalOffset(
                                    event.nativeEvent.contentOffset.y
                                );
                            }}
                        // ListEmptyComponent={this.renderEmpty()}
                        // ListHeaderComponent={this.renderHeader()}
                        // ListFooterComponent={this.renderFooter()}
                        />
                    </>
                )}
            </Block>}
            {contentVerticalOffset > CONTENT_OFFSET_THRESHOLD && (
                <FAB
                    style={styles.fab}
                    small
                    icon="arrow-up"
                    color="white"
                    onPress={() => onPressTouch()}
                />
            )}
            {/* <Block style={styles.upwardICon}>
                <Icon
                    size={20}
                    color={theme.COLORS.WHITE}
                    name="arrow-up"
                    family="Feather"
                />
            </Block> */}
            {/* <Block style={styles.addICon}>
                <Icon
                    size={40}
                    color={theme.COLORS.WHITE}
                    name="add"
                    family="Ionicons"

                />
            </Block> */}
            {BottomSheet()}
            {CreateSheet()}
        </Block>
    );
};

const styles = StyleSheet.create({
    Container: {
        height: "100%",
        width: "100%",
        // flex: 1,
        backgroundColor: "white",
        alignItems: "flex-start",
        elevation: 0,
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
        width: width - 40,
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
        alignItems: "center",
        // height: 30,
        justifyContent: "space-between",
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
    close: {
        width: "90%",
        height: 30,
        marginTop: 7,
        marginLeft: 15,
        paddingTop: 10,
        // backgroundColor: "red"
    },
    fab: {
        position: "absolute",
        margin: 30,
        right: 0,
        bottom: 10,
        backgroundColor: "black",
    },
});
export default ChatList;
