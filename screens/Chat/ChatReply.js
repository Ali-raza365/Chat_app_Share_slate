import React, { useRef } from "react";
import {
    View,
    Image,
    StyleSheet,
    FlatList,
    KeyboardAvoidingView,
    Dimensions,
    TouchableOpacity,
    Pressable,
} from "react-native";

import { Input, Block, Text, theme } from "galio-framework";
import { Icon } from "../../components/";
import { Rating as RatingStar } from "react-native-ratings";
import RBSheet from "react-native-raw-bottom-sheet";

import Images from "../../constants/Images";
import argonTheme from "../../constants/Theme";
import IconExtra from "../../components/Icon";
import { Video } from "expo-av";
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

export default class ChatReply extends React.Component {
    state = {
        messages: messages,
        height: 0,
    };

    messagesScroll = React.createRef();
    // refRBSheet = React.createRef();

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
            <RBSheet
                ref={ref => {
                    this.RBSheet = ref
                }}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent",
                    },
                    draggableIcon: {
                        backgroundColor: "#8898AA",
                    },
                    container: { backgroundColor: "white", height: 150 },
                }}
            >
                <Block style={styles.main}>
                    <TouchableOpacity>
                        <Block row center style={styles.close}>
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
                    <TouchableOpacity>
                        <Block row center style={styles.close}>
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

        );
    };

    formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    renderMessage = (msg) => {
        if (msg.avatar) {
            return (
                <Pressable
                // onPress={this.handlerLongClick}
                >
                    <Block key={msg.id}>
                        <Block row space={null}>
                            <Image
                                source={{ uri: msg.avatar }}
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
                            <Text style={styles.time}>{msg.time}</Text>
                            {msg.reply && (
                                <Text
                                    // onPress={() => this.onModalClick(msg)}
                                    style={styles.reply}>
                                    {msg.reply} replies
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
            );
        }

        return (
            <Pressable
            // onPress={this.handlerLongClick}
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
                                        onPress={() => {
                                            this.onModalClick(msg);
                                        }}
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

    handleMessage = async () => {
        const { messages, message } = this.state;
        const date = await this.formatAMPM(new Date())
        messages.push({
            id: messages.length + 1,
            message: message,
            time: date
        });

        this.setState({ messages, message: "" });
        this.handleScroll();
    };

    messageForm = () => {
        const { navigation } = this.props;

        return (
            <Block style={styles.messageFormContainer}>
                <Block row center>

                    <Icon
                        onPress={() => this.RBSheet.open()}
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
                    {/* <Icon
                        onPress={() => {
                            //alert("message lock")
                        }}
                        style={{ marginTop: 4, marginLeft: 8 }}
                        name="photo-library"
                        family="MaterialIcons"
                        size={20}
                        color={

                            argonTheme.COLORS.MUTED

                        }
                    // color={argonTheme.COLORS.MUTED}
                    />
                    <Icon
                        onPress={() => {
                            //alert("message lock")
                        }}
                        style={{ marginTop: 4, marginLeft: 10, marginRight: 10 }}
                        name="mic"
                        family="Ionicons"
                        size={20}
                        color={

                            argonTheme.COLORS.MUTED

                        }
                    // color={argonTheme.COLORS.MUTED}
                    /> */}

                    <Input
                        center
                        rounded
                        color="#9fa5aa"
                        // multiline
                        // blurOnSubmit
                        // viewPass
                        style={styles.input}
                        placeholder="Reply here.."
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
        const { route } = this.props
        const { data } = route.params;
        console.log(data)
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
                                    {data.time}
                                </Text>
                                <Text></Text>
                                {/* <RatingStar
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
                                /> */}
                            </Block>
                            <Icon
                                onPress={() => {
                                    //alert("message lock")
                                }}
                                style={{ marginTop: 13, marginLeft: 8 }}
                                name="emoji-happy"
                                size={20}
                                family="Entypo"
                                color={"#ffcb4c"}
                            // color={argonTheme.COLORS.MUTED}
                            />
                        </Block>
                        <Block style={{
                            width: width * 0.95,
                            // backgroundColor:"green",
                            marginTop: 10,
                        }}>
                            {data.image ? (
                                <Image
                                    source={{ uri: data.image }}
                                    style={{ width: width - 30, height: 200 }}
                                // resizeMode='contain'
                                />
                            ) : null}
                            {data.video ? (
                                <Video
                                    // ref={this.video}
                                    resizeMode='contain'

                                    style={{ width: width - 30, height: 200 }}
                                    source={{
                                        uri: data.video,
                                    }}
                                    useNativeControls
                                // resizeMode="contain"
                                // isLooping={true}
                                />
                            ) : null}
                            {data.file !== null && data.file !== undefined &&
                                <Block right style={styles.docBox}>
                                    <Icon
                                        style={{}}
                                        name="upload-file"
                                        size={width / 10}
                                        family="MaterialIcons"
                                        color={argonTheme.COLORS.ICON}
                                    />
                                    <Text style={{ fontFamily: 'open-sans-regular', width: width - 32 }} color={argonTheme.COLORS.DEFAULT}>{data.file.name}</Text>
                                </Block>

                            }
                            <Text
                                style={{
                                    fontFamily: "open-sans-regular",
                                }}
                                size={14}
                                color={argonTheme.COLORS.MUTED}
                            >
                                {data.message}
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
                            {this.state.messages.length} replies
                        </Text>
                        <TouchableOpacity
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 30,
                                paddingTop: 8,
                                alignItems: "center",
                            }}
                            onPress={() => this.RBSheet.open()}
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
                {this.BottomSheet()}
            </Block>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    main: { height: "100%", backgroundColor: "white" },
    close: { width: "90%", height: 30, marginTop: 20 },
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
});
