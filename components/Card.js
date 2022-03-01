import React, { useEffect, useState, useRef } from "react";
import { withNavigation } from "@react-navigation/compat";
import {
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    ActivityIndicator,
    Linking,
    Dimensions,
    TouchableOpacity,
    View,
    Alert,
    Modal,
    Share,
} from "react-native";

const { width, height } = Dimensions.get("window");
import { Block, Text, theme, Button, Input } from "galio-framework";
import { argonTheme } from "../constants";
import { useSelector, useDispatch } from "react-redux";
import { Blog_fetching_For_Each_Item_action } from "../redux/reducers/blog/Blog_For_Each_Item_action";
import { Activity_action } from "../redux/reducers/NEWS/NewsAction";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";
import { Rating as RatingStar } from "react-native-ratings";
import IconExtra from "./Icon";
import RadioGroup from "react-native-radio-buttons-group";
import RBSheet from "react-native-raw-bottom-sheet";

import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import {
    addReport_Action,
    hideBlog_Action,
} from "../redux/reducers/blog/Blog_For_Each_Item_action";
const radioButtonsData = [
    {
        id: "1", // acts as primary key, should be unique and non-empty string
        label: "Violent content",
        value: "Violent content",
        color: argonTheme.COLORS.PRIMARY,
        size: 15,
        labelStyle: { color: "#686868" },
    },
    {
        id: "2",
        label: "Hateful content",
        color: argonTheme.COLORS.PRIMARY,
        size: 15,
        labelStyle: { color: "#686868" },
        value: "Hateful content",
    },
    {
        id: "3",
        label: "Harmful acts",
        color: argonTheme.COLORS.PRIMARY,
        size: 15,
        labelStyle: { color: "#686868" },
        value: "Harmful acts",
    },
    {
        id: "4",
        label: "Child abuse",
        color: argonTheme.COLORS.PRIMARY,
        size: 15,
        labelStyle: { color: "#686868" },
        value: "Child abuse",
    },
    {
        id: "5",
        label: "Sexual content",
        color: argonTheme.COLORS.PRIMARY,
        size: 15,
        labelStyle: { color: "#686868" },
        value: "Sexual content",
    },
    {
        id: "6",
        label: "Promotes terrorism",
        color: argonTheme.COLORS.PRIMARY,
        size: 15,
        labelStyle: { color: "#686868" },
        value: "Promotes terrorism",
    },
    {
        id: "7",
        label: "Spam",
        color: argonTheme.COLORS.PRIMARY,
        size: 15,
        labelStyle: { color: "#686868" },
        value: "Spam",
    },
    {
        id: "8",
        label: "Incorrect or misleading",
        color: argonTheme.COLORS.PRIMARY,
        size: 15,
        labelStyle: { color: "#686868" },
        value: "Incorrect or misleading",
    },
    {
        id: "9",
        label: "Violates my right",
        color: argonTheme.COLORS.PRIMARY,
        size: 15,
        labelStyle: { color: "#686868" },
        value: "Violates my right",
    },
    {
        id: "10",
        label: "Other issues",
        color: argonTheme.COLORS.PRIMARY,
        size: 15,
        labelStyle: { color: "#686868" },
        value: "Other issues",
    },
];

function Card({
    navigation,
    route,
    item,
    horizontal,
    full,
    style,
    ctaColor,
    imageStyle,
    ctaRight,
}) {
    // console.log(item);
    const { Guest_id } = useSelector((state) => state.ActiveId_Reducer);
    const { token_is, blog_loading } = useSelector(
        (state) => state.Blog_For_Each_Item
    );

    const [modalShow, setmodalShow] = useState(false);
    const [radioButtons, setRadioButtons] = useState(radioButtonsData);
    const [visible, setModalVisible] = useState(false);
    const [txt, settxt] = useState(null);
    const [val, setval] = useState(null);
    const refRBSheet = useRef();
    // styles
    const imageStyles = [
        full ? styles.fullImage : styles.horizontalImage,
        imageStyle,
    ];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [
        styles.imageContainer,
        horizontal ? styles.horizontalStyles : styles.verticalStyles,
        styles.shadow,
    ];

    // dispatch state
    const dispatch = useDispatch();
    //token
    //fetch_item_data
    const fetch_item_data = async (id) => {
        let blogID = id;
        let token = await token_is;
        var activedata = new FormData();
        activedata.append("action", "add");
        activedata.append("activity", "4");
        activedata.append("activity_id", blogID);
        activedata.append("token", token);
        dispatch(await Activity_action(activedata, navigation));

        var bodyFormData = new FormData();
        bodyFormData.append("blogID", blogID);
        bodyFormData.append("token", token);
        dispatch(
            await Blog_fetching_For_Each_Item_action(bodyFormData, navigation, blogID)
        );
        navigation.navigate("Custom_blog");
    };

    function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);
        let selectedButton = radioButtons.find((e) => e.selected == true);
        selectedButton = selectedButton ? selectedButton.id : radioButtons[0].label;
        setval(selectedButton);
    }
    const onShare = async (a) => {
        try {
            const result = await Share.share({
                message: a,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                } else {
                    console.log("share data error in news");
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    const repo = async () => {
        if (val == 10) {
            var repoData = new FormData();
            repoData.append("token", token_is);
            repoData.append("activity", "blog");
            // repoData.append("activityId", bid);
            repoData.append("reportId", val);
            console.log(repoData, "aaaaa");

            await dispatch(addReport_Action(repoData));
            setModalVisible(false);
        } else {
            var repoData = new FormData();
            repoData.append("token", token_is);
            repoData.append("activity", "blog");
            // repoData.append("activityId", bid);
            repoData.append("reportId", val);
            repoData.append("comment", txt);
            // console.log(repoData, "nnnnn");

            await dispatch(addReport_Action(repoData));
            setModalVisible(false);
        }
    };
    const Hideblog = async () => {
        var repoData = new FormData();
        repoData.append("token", token_is);
        repoData.append("activity", "blog");
        // repoData.append("activityId", bid);
        await dispatch(hideBlog_Action(repoData, navigation));
        setmodalShow(false);
    };

    const Mod = () => {
        return (
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    // transparent={true}
                    visible={visible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!visible);
                    }}
                >
                    <View style={styles.modalView}>
                        <Block
                            style={{
                                backgroundColor: "white",
                                marginTop: 0,
                                // padding: 10,
                                paddingHorizontal: 10,
                                paddingVertical: 20,
                                borderRadius: 5,
                                minHeight: Platform.OS == "ios" ? 450 : height * 0.3,
                                // backgroundColor:"red",
                                width: width * 0.8,
                            }}
                        >
                            <Block row space={"between"}>
                                <Text
                                    style={{
                                        fontFamily: "open-sans-bold",
                                        alignSelf: "center",
                                        marginLeft: 90,
                                    }}
                                    center
                                    size={18}
                                    color={"#686868"}
                                >
                                    Report Content
                                </Text>
                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <IconExtra
                                        size={30}
                                        color="#ADB5BD"
                                        name="close"
                                        family="SimpleLineIcons"
                                    // style={{marginLeft: 70,marginTop: 0,}}
                                    />
                                </TouchableOpacity>
                            </Block>
                            <Block style={{ marginTop: 10 }}>
                                <RadioGroup
                                    containerStyle={{
                                        justifyContent: "flex-start",
                                        alignItems: "flex-start",
                                    }}
                                    radioButtons={radioButtons}
                                    onPress={onPressRadioButton}
                                />
                            </Block>
                            <Block style={{ height: 60 }}>
                                {val == "10" ? (
                                    <Block flex-end width={width * 0.64}>
                                        <Input
                                            value={txt}
                                            // borderless
                                            color="#525F7F"
                                            placeholder={"Write Here..."}
                                            onChangeText={(e) => {
                                                settxt(e);
                                            }}
                                            style={{
                                                height: height < 700 ? height * 0.06 : height * 0.04,
                                                shadowOpacity: 0.13,
                                                backgroundColor: "white",
                                                shadowColor: argonTheme.COLORS.BLACK,
                                                shadowOffset: { height: 1, width: 0 },
                                                elevation: 0.9,
                                                marginLeft: 30,
                                            }}
                                            placeholderTextColor="#525F7F"
                                        />
                                    </Block>
                                ) : null}
                            </Block>
                            <Block style={{ alignSelf: "flex-end", height: 100, width: 80 }}>
                                <Button
                                    style={{
                                        width: 70,
                                        height: 30,
                                        alignSelf: "flex-end",
                                        marginTop: 3,
                                        marginRight: 20,
                                    }}
                                    onPress={() => repo()}
                                >
                                    <Text color="white">
                                        {blog_loading == false ? (
                                            "Report"
                                        ) : (
                                            <ActivityIndicator color="white" />
                                        )}
                                    </Text>
                                </Button>
                            </Block>
                        </Block>
                    </View>
                </Modal>
            </View>
        );
    };
    const BottomSheet = () => {
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
                        container: { backgroundColor: "white" },
                    }}
                >
                    <Block style={styles.main}>
                        <TouchableOpacity>
                            <Block row center style={styles.close}>
                                <IconExtra
                                    size={16}
                                    color="black"
                                    name="emoji-sad"
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
                                    Not Interested
                                </Text>
                            </Block>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { refRBSheet.current.close(), setModalVisible(true) }}>
                            <Block row center style={styles.close}>
                                <IconExtra
                                    size={16}
                                    color="black"
                                    name="flag"
                                    family="Entypo"
                                />

                                <Text
                                    color="white"
                                    style={{
                                        marginLeft: 15,
                                        color: argonTheme.COLORS.TEXT,
                                        fontSize: 16,
                                    }}
                                >
                                    Report
                                </Text>
                            </Block>
                        </TouchableOpacity>
                        <TouchableOpacity>
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
                        </TouchableOpacity>
                    </Block>
                </RBSheet>
            </View>
        );
    };

    return (

        <Block row={horizontal} card flex style={cardContainer}>
            <TouchableWithoutFeedback
                onPress={() => {
                    fetch_item_data(item.id);
                }}
            >
                <Block flex style={imgContainer}>
                    <ContentLoader
                        speed={1}
                        style={imgContainer}
                        // viewBox="0 0 400 160"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <Image
                            source={{
                                uri: item && item.featured_image,
                            }}
                            style={imageStyles}
                        />
                    </ContentLoader>
                </Block>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onPress={() => {
                    fetch_item_data(item.id);
                }}
            >
                <Block flex space="between" style={styles.cardDescription}>
                    <Block flex>
                        <Text
                            style={{ fontFamily: "open-sans-regular" }}
                            size={14}
                            numberOfLines={2}
                            style={styles.cardTitle}
                            color={argonTheme.COLORS.TEXT}
                        >
                            {item && item.title}
                        </Text>
                        {item && item.category ? (
                            <Block flex left>
                                <Text
                                    style={{ fontFamily: "open-sans-regular" }}
                                    size={12}
                                    color={argonTheme.COLORS.TEXT}
                                >
                                    {item && item.category}
                                </Text>
                            </Block>
                        ) : (
                            <Block />
                        )}
                    </Block>
                    {/* <Block right={ctaRight ? true : false}>
            <Text
              style={{ fontFamily: "open-sans-bold" }}
              size={12}
              muted={!ctaColor}
              color={ctaColor || argonTheme.COLORS.ACTIVE}
              bold
            >
              View Article
            </Text>

          </Block> */}
                </Block>
            </TouchableWithoutFeedback>
            <Block
                row
                middle
                space="between"
                style={{
                    paddingRight: theme.SIZES.BASE / 2,
                    // marginTop: -5,
                    // paddingBottom: theme.SIZES.BASE / 2,
                }}
            >
                <Block
                    right={ctaRight ? true : false}
                    style={{
                        paddingHorizontal: theme.SIZES.BASE / 2,
                        paddingBottom: theme.SIZES.BASE / 2,
                    }}
                >
                    <Text
                        style={{ fontFamily: "open-sans-bold" }}
                        size={12}
                        muted={!ctaColor}
                        color={ctaColor || argonTheme.COLORS.ACTIVE}
                        bold
                    >
                        View Article
                    </Text>
                </Block>
                <Block row space="between">
                    {item.rate == 0 ? (
                        <Block row>
                            <Text
                                style={{
                                    fontFamily: "open-sans-regular",
                                    alignSelf: "flex-start",
                                    // marginLeft: 5,
                                    marginTop: 2,
                                }}
                                center
                                size={12}
                                color={"#686868"}
                            >
                                No -
                            </Text>
                            <RatingStar
                                readonly
                                ratingCount={1}
                                startingValue={1}
                                imageSize={18}
                                type="custom"
                                style={{ marginRight: 10 }}
                            />
                        </Block>
                    ) : (
                        <Block row>
                            <RatingStar
                                readonly
                                ratingCount={1}
                                startingValue={1}
                                imageSize={18}
                                type="custom"
                                style={{ marginBottom: 8 }}
                            />

                            <Text
                                style={{
                                    fontFamily: "open-sans-regular",
                                    alignSelf: "flex-start",
                                    marginLeft: 5,
                                    marginRight: 10,
                                    marginTop: 2,
                                }}
                                center
                                size={12}
                                color={"#686868"}
                            >
                                {Math.round((item.rate) * 10) / 10}

                            </Text>
                        </Block>
                    )}

                    <TouchableOpacity
                        style={{
                            width: 30,
                            height: 30,

                            borderRadius: 30,
                            // justifyContent: "center",
                            paddingTop: 3,
                            alignItems: "center",
                            // backgroundColor: "#FFFAFA",
                        }}
                        onPress={() => refRBSheet.current.open()}
                    >
                        <IconExtra
                            size={16}
                            color="black"
                            name="dots-three-horizontal"
                            family="Entypo"
                        />
                    </TouchableOpacity>
                </Block>
            </Block>
            {BottomSheet()}
        </Block>
    );
}
const styles = StyleSheet.create({
    card: {
        // width:,
        backgroundColor: theme.COLORS.WHITE,
        marginVertical: theme.SIZES.BASE,
        borderWidth: 0,
        minHeight: 114,
        marginBottom: 0,
        borderRadius: 0,
        marginHorizontal: 5,
        // position: "absolute",
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 10,
        zIndex: 100,
        borderWidth: 0.2,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
        position: "absolute",
        flex: 1,
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    cardTitle: {
        // flex: 1,
        // flexWrap: "wrap",
        paddingBottom: 6,
    },
    cardDescription: {
        padding: theme.SIZES.BASE / 2,
    },
    imageContainer: {
        // borderRadius: 3,
        elevation: 0,
        overflow: "hidden",
    },
    image: {
        // borderRadius: 3,
    },
    horizontalImage: {
        height: 122,
        width: "auto",
    },
    horizontalStyles: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    verticalStyles: {
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    },
    fullImage: {
        height: 215,
    },
    shadow: {
        shadowColor: "#f3f4f6",
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 6,
        shadowOpacity: 0.1,
        elevation: 0.5,
        // borderWidth:1
    },
    main: { flex: 1, backgroundColor: "white" },
    close: { width: "90%", height: 40, marginTop: 20 },
});

export default withNavigation(Card);





// <Block
// row
// space="between"
// style={{
//   height: 0,
//   left: 10,
//   bottom: 10,
//   zIndex: 10,
//   // backgroundColor:"red",
// }}
// >
// <View
//   style={{
//     // alignItems: "flex-end",
//     backgroundColor: "green",
//   }}
// >
//   <Menu
//     style={{
//       width: 155,
//       height: 140,
//     }}
//     visible={modalShow}
//     onRequestClose={() => setmodalShow(false)}
//   >
//     <Block center style={{ height: 45 }}>
//       {blog_loading == false ? (
//         <MenuItem
//           onPress={() => {
//             if (Guest_id == "-1") {
//               Alert.alert(
//                 "Login Required",
//                 "",
//                 [
//                   { text: "Cancel" },
//                   {
//                     text: "Login",

//                     onPress: () => {
//                       setmodalShow(false),
//                         navigation.navigate("Login");
//                     },
//                     style: "destructive",
//                   },
//                 ],
//                 { cancelable: false }
//               );
//               // setmodalShow(false);
//             } else {
//               Hideblog();
//             }
//             // console.log("object")
//           }}
//           pressColor="#f8f8f8"
//           activeOpacity={0.7}
//           style={{ alignItems: "center", justifyContent: "center" }}
//         >
//           <IconExtra
//             size={16}
//             color="black"
//             name="emoji-sad"
//             family="Entypo"
//             style={{ marginTop: 10 }}
//           />
//           {"   "}
//           Not Interested
//         </MenuItem>
//       ) : (
//         <ActivityIndicator color={argonTheme.COLORS.PRIMARY} />
//       )}
//     </Block>
//     <Block row>
//       <MenuItem
//         onPress={() => {
//           if (Guest_id == "-1") {
//             Alert.alert(
//               "Login Required",
//               "",
//               [
//                 { text: "Cancel" },
//                 {
//                   text: "Login",
//                   onPress: () => {
//                     setmodalShow(false), navigation.navigate("Login");
//                   },

//                   style: "destructive",
//                 },
//               ],
//               { cancelable: false }
//             );
//           } else {
//             // setmodalShow(false);
//             // setModalVisible(true);
//           }
//         }}
//         pressColor="#f8f8f8"
//         style={{ justifyContent: "center" }}
//       >
//         <IconExtra
//           size={16}
//           color="black"
//           name="flag"
//           family="Entypo"
//           style={{ marginTop: 10 }}
//         />
//         {"   "}
//         Report
//       </MenuItem>
//     </Block>
//     <Block row>
//       <MenuItem
//         onPress={() => {
//           if (Guest_id == "-1") {
//             Alert.alert(
//               "Login Required",
//               "",
//               [
//                 { text: "Cancel" },
//                 {
//                   text: "Login",
//                   onPress: () => {
//                     setmodalShow(false), navigation.navigate("Login");
//                   },

//                   style: "destructive",
//                 },
//               ],
//               { cancelable: false }
//             );
//           } else {
//             onShare(item.featured_image);
//           }
//         }}
//         pressColor="#f8f8f8"
//         style={{ justifyContent: "center" }}
//       >
//         <IconExtra
//           size={16}
//           color="black"
//           name="repeat"
//           family="Feather"
//           style={{ marginTop: 10 }}
//         />
//         {"   "}
//         Share
//       </MenuItem>
//     </Block>
//   </Menu>
// </View>
// </Block>