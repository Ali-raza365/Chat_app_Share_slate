import React, { useRef } from "react";
import {
    View,
    Image,
    StyleSheet,
    FlatList,
    KeyboardAvoidingView,
    Dimensions,
    TouchableOpacity,
} from "react-native";

import { Input, Block, Text, theme } from "galio-framework";
import { Icon } from "../components/";
import { Rating as RatingStar } from "react-native-ratings";

import Images from "../constants/Images";
import argonTheme from "../constants/Theme";
import IconExtra from "../components/Icon";
const { width, height } = Dimensions.get("window");

const messages = [
    {
        id: 1,
        avatar: Images.ProfileChat,
        message: `Hey there! How are you today? Can we me et and talk? Thanks!`,
        time: `10:31 PM`,
    },
    {
        id: 2,
        message: `Sure, just let me finish something and I’ll call you.`,
        time: `10:34 PM`,
    },
    //   {
    //     id: 3,
    //     avatar: Images.ProfileChat,
    //     message: `OK. Cool! See you!`,
    //     time: `10:35 PM`
    //   },
    //   {
    //     id: 4,
    //     message: `Bye bye`,
    //     time: `10:36 PM`
    //   }
];

export default class CommentsReply extends React.Component {
    state = {
        messages: messages,
        height: 0,
    };

    messagesScroll = React.createRef();
    refRBSheet = React.createRef();

    itemLayout = (data, index) => ({
        length: this.state.messages.length - 1,
        offset: 100 * index,
        index,
    });

    handleScroll = () => {
        // const totalIndex = this.state.messages.length - 1;
        // const insetBottom = this.state.messages.length * (theme.SIZES.BASE * 6.5) + 64; // total messages x message height
        setTimeout(() => {
            this.messagesScroll.current.scrollToOffset({ offset: this.state.height });
        }, 1);
    };

    onContentSizeChange = (width, height) => {
        this.setState({
            height,
        });
    };

    componentDidMount() {
        this.handleScroll();
    }

    BottomSheet = () => {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#000",
                }}
            >
                <RBSheet
                    ref={this.refRBSheet}
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
                        {/* <TouchableOpacity>
              <Block row center style={styles.close}>
                <IconExtra
                  size={16}
                  color="black"
                  name="repeat"
                  family="Feather"
                />
                <Text
                  size={20}
                  color="white"
                  style={{
                    marginLeft: 15,
                    fontSize: 16,
                    color: argonTheme.COLORS.TEXT,
                  }}
                >
                  Share
                </Text>
              </Block>
            </TouchableOpacity> */}
                    </Block>
                </RBSheet>
            </View>
        );
    };

    renderMessage = (msg) => {
        return (
            <Block key={msg.id} style={styles.messageCardWrapper}>
                <Block row height={42}>
                    <Image
                        source={{
                            uri: "https://assets.shareslate.com/files/user/2073641362.jpg",
                        }}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 30,
                            marginTop: 5,
                        }}
                    />
                    <Block row space="evenly" style={styles.coment_user_datee}>
                        <Text
                            muted
                            size={18}
                            style={{
                                fontFamily: "open-sans-bold",
                                marginLeft: 10,
                                textTransform: "capitalize",
                            }}
                            color={argonTheme.COLORS.TEXT}
                        >
                            Ch Umar
                        </Text>
                        <Text
                            style={{
                                fontFamily: "open-sans-regular",
                                marginLeft: 10,
                            }}
                            size={12}
                            color={argonTheme.COLORS.TEXT}
                        >
                            Nov 16, 2021
                        </Text>
                    </Block>
                </Block>
                <Block style={styles.coment_user_com}>
                    <Text
                        style={{
                            fontFamily: "open-sans-regular",
                        }}
                        muted
                        size={14}
                        color={argonTheme.COLORS.MUTED}
                    >
                        {msg.message}
                    </Text>
                </Block>
            </Block>
        );
    };

    renderMessages = () => {
        const insetBottom =
            this.state.messages.length * (theme.SIZES.BASE * 6.5) + 64; // total messages x message height
        return (
            <FlatList
                ref={this.messagesScroll}
                data={this.state.messages}
                keyExtractor={(item) => `${item.id}`}
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

    handleMessage = () => {
        const { messages, message } = this.state;
        const date = new Date();

        messages.push({
            id: messages.length + 1,
            message: message,
            time: date.toLocaleString("en-US", {
                hour: "2-digit",
                minute: "numeric",
            }),
        });

        this.setState({ messages, message: "" });
        this.handleScroll();
    };

    messageForm = () => {
        const { navigation } = this.props;

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
                        defaultValue={this.state.message}
                        onSubmitEditing={this.handleMessage}
                        onChangeText={(text) => this.handleMessageChange("message", text)}
                    />
                </Block>
            </View>
        );
    };

    render() {
        return (
            <Block flex space="between" style={styles.container}>
                <KeyboardAvoidingView
                    enabled
                    behavior="padding"
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={theme.SIZES.BASE * 4}
                >
                    <Block style={styles.coment_user}>
                        <Block row height={45}>
                            <Image
                                source={{
                                    uri: "https://assets.shareslate.com/files/user/2073641362.jpg",
                                }}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 30,
                                    marginTop: 5,
                                }}
                            />
                            <Block row space="evenly" style={
                                {
                                    width: width * 0.7,
                                    height: 70,
                                    paddingLeft: 10,
                                    // justifyContent: "space-between",
                                    // padding: 5,
                                    // backgroundColor: "green",
                                    flexDirection: "column",
                                }
                            }>
                                <Text
                                    muted
                                    size={18}
                                    style={{
                                        fontFamily: "open-sans-bold",
                                        // marginLeft: 10,
                                        textTransform: "capitalize",
                                    }}
                                    color={argonTheme.COLORS.TEXT}
                                >
                                    Ch Umar
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: "open-sans-regular",
                                        marginLeft: 1,
                                    }}
                                    size={12}
                                    color={argonTheme.COLORS.TEXT}
                                >
                                    Nov 16, 2021
                                </Text>
                                <RatingStar
                                    readonly
                                    ratingCount={5}
                                    startingValue={3}
                                    imageSize={18}
                                    type="custom"
                                    style={{
                                        marginRight: 10,
                                        alignSelf: "flex-start",
                                        //   marginBottom: 5,
                                        //   marginLeft: 10,
                                    }}
                                />
                            </Block>

                        </Block>
                        <Block style={{
                            width: width * 0.95,
                            // backgroundColor:"green",
                            marginTop: 30,
                        }}>
                            <Text
                                style={{
                                    fontFamily: "open-sans-regular",
                                }}
                                size={14}
                                color={argonTheme.COLORS.MUTED}
                            >
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum has been the industry's standard dummy
                                text ever since the 1500s, when an unknown printer took a galley
                                of type and scrambled it to make a type specimen book.
                            </Text>
                        </Block>
                    </Block>

                    <Block
                        center
                        middle
                        space="between"
                        row
                        style={{
                            // backgroundColor: "green",
                            marginTop: 4,
                            height: 35,
                            width: width * 0.96,
                            borderBottomWidth: 0.5,
                            borderTopWidth: 0.5,
                            marginTop: 15,

                            borderColor: "silver",
                            alignItems: "center",
                            //   marginBottom: 20,
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: "open-sans-regular",
                                marginLeft: 10,
                            }}
                            size={12}
                            color={"black"}
                        >
                            2 replies
                        </Text>
                        <TouchableOpacity
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 30,
                                paddingTop: 8,
                                alignItems: "center",
                            }}
                        // onPress={() => this.refRBSheet.current.open()}


                        >
                            <IconExtra
                                size={16}
                                color="black"
                                name="dots-three-horizontal"
                                family="Entypo"
                            />
                        </TouchableOpacity>
                    </Block>
                    {this.renderMessages()}

                    {this.messageForm()}
                </KeyboardAvoidingView>
                {/* {BottomSheet()} */}
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
    messageFormContainer: {
        height: 96,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 32,
    },
    coment_user: {
        width: width * 0.93,
        paddingTop: 10,

        alignSelf: "center",
        // backgroundColor: "red",
    },

    coment_user_datee: {
        width: width * 0.7,
        height: 50,
        // justifyContent: "space-between",
        // padding: 5,
        // backgroundColor: "green",
        flexDirection: "column",
    },
    coment_user_com: {
        width: width * 0.95,
        // marginLeft: 10,
        // backgroundColor:"green",
        marginTop: 10,
    },
    messageFormContainer: {
        height: 96,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 32,
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
        backgroundColor: "transparent",
    },
    main: { flex: 1, backgroundColor: "white" },
    close: { width: "90%", height: 40, marginTop: 20 },
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
        backgroundColor: "transparent",
    },
    messagesWrapper: {
        flexGrow: 1,
        top: 0,
        paddingLeft: 8,
        paddingRight: 8,
        paddingVertical: 16,
        paddingBottom: 56,
        // backgroundColor: "green",
    },
    messageCardWrapper: {
        maxWidth: "99%",
        marginLeft: 8,
        marginBottom: 22,
        // backgroundColor: "red"
    },
    messageCard: {
        paddingHorizontal: 8,
        paddingVertical: 16,
        borderRadius: 6,
        // backgroundColor: "red"
    },
    messageCardPersonal: {
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 6,
        marginRight: 8,
        // backgroundColor: argonTheme.COLORS.PRIMARY
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
        marginTop: 8,
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 30,
        marginBottom: theme.SIZES.BASE,
    },
});
