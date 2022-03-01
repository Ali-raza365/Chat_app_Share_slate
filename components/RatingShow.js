import React, { useState,useRef  } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";

import {
  Block,
  Radio,
  Text,
  Input,
  Button,
  theme,
  Icon,
} from "galio-framework";
import argonTheme from "../constants/Theme";
import { Rating as RatingStar } from "react-native-ratings";
const { width, height } = Dimensions.get("window");
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import Modal from "react-native-modal";
import RadioGroup from "react-native-radio-buttons-group";
import {
  addReport_Action,
  hideBlog_Action,
} from "../redux/reducers/blog/Blog_For_Each_Item_action";
import { useDispatch, useSelector } from "react-redux";
import IconExtra from "./Icon";
import RBSheet from "react-native-raw-bottom-sheet";


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

export default function Rating({ rating, tag, review, navigation, bid, list }) {
  const [modalShow, setmodalShow] = useState(false);
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [visible, setModalVisible] = useState(false);
  const [txt, settxt] = useState(null);
  const [val, setval] = useState(null);
  const dispatch = useDispatch();
  const { token_is, blog_loading } = useSelector(
    (state) => state.Blog_For_Each_Item
  );
  const { Guest_id } = useSelector((state) => state.ActiveId_Reducer);

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
    let selectedButton = radioButtons.find((e) => e.selected == true);
    selectedButton = selectedButton ? selectedButton.id : radioButtons[0].label;
    setval(selectedButton);
  }

  const repo = async () => {
    if (val == 10) {
      var repoData = new FormData();
      repoData.append("token", token_is);
      repoData.append("activity", "blog");
      repoData.append("activityId", bid);
      repoData.append("reportId", val);
      console.log(repoData, "aaaaa");

      await dispatch(addReport_Action(repoData));
      setModalVisible(false);
    } else {
      var repoData = new FormData();
      repoData.append("token", token_is);
      repoData.append("activity", "blog");
      repoData.append("activityId", bid);
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
    repoData.append("activityId", bid);
    await dispatch(hideBlog_Action(repoData, navigation));
    setmodalShow(false);
  };

  const refRBSheet = useRef();

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
            container: { backgroundColor: "white",height:300 },
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
            <TouchableOpacity onPress={()=>{refRBSheet.current.close() }}>
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
            <TouchableOpacity>
              <Block row center style={styles.close}>
                <IconExtra
                  size={16}
                  color="black"
                  name="edit"
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
                  Edit
                </Text>
              </Block>
            </TouchableOpacity>
          </Block>
        </RBSheet>
      </View>
    );
  };

  // console.log(width);
  return (
    <Block style={styles.container}>
      <Block row space={"between"} 
      style={{paddingVertical:3}}
      >
        <Block row center middle>
          {rating==0?null
          :
          <RatingStar
            readonly
            startingValue={rating}
            imageSize={18}
            startingValue={review}
            fractions
            type="custom"
            style={{ marginBottom: 8 ,marginRight:10 }}
          />
        }

{review==0?
 <Text 
 style={{
   fontFamily: "open-sans-bold",
   alignSelf: "flex-start",
   marginTop: 2,

 }}
 center
 size={14}
 
 color={"#686868"}
 
>
 No reviews
</Text>


:
<Text 
style={{
  fontFamily: "open-sans-bold",
  alignSelf: "flex-start",
  marginTop: 2,

}}
center
size={12}

color={"#686868"}

>
{review} {review==1?"review":"reviews"} 
</Text>

}

          
         
        </Block>
        <Block
          row
          space="between"
          style={{
            height: 20,
            zIndex: 10,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              alignItems: "flex-end",
            }}
          >
            <Menu
              style={{
                width: 155,
                height: 95,
                marginTop:15,
               
              }}
              visible={modalShow}
              onRequestClose={() => setmodalShow(false)}
            >
              <Block center style={{ height: 45 }}>
                {blog_loading == false ? (
                  <MenuItem
                    onPress={() => {
                      if (Guest_id == "-1") {
                        Alert.alert(
                          "Login Required",
                          "",
                          [
                            { text: "Cancel" },
                            {
                              text: "Login",

                              onPress: () => {
                                setmodalShow(false),
                                  navigation.navigate("Login");
                              },
                              style: "destructive",
                            },
                          ],
                          { cancelable: false }
                        );
                        // setmodalShow(false);
                      } else {
                        Hideblog();
                      }
                      // console.log("object")
                    }}
                    pressColor="#f8f8f8"
                    activeOpacity={0.7}
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <IconExtra
                      size={16}
                      color="black"
                      name="emoji-sad"
                      family="Entypo"
                      style={{ marginTop: 10 }}
                    />
                    {"   "}
                    Not Interested
                  </MenuItem>
                ) : (
                  <ActivityIndicator color={argonTheme.COLORS.PRIMARY} />
                )}
              </Block>
              <Block row>
                <MenuItem
                  onPress={() => {
                    if (Guest_id == "-1") {
                      Alert.alert(
                        "Login Required",
                        "",
                        [
                          { text: "Cancel" },
                          {
                            text: "Login",
                            onPress: () => {
                              setmodalShow(false), navigation.navigate("Login");
                            },

                            style: "destructive",
                          },
                        ],
                        { cancelable: false }
                      );
                    } else {
                      setmodalShow(false);
                      setModalVisible(true);
                    }
                  }}
                  pressColor="#f8f8f8"
                  style={{ justifyContent: "center" }}
                >
                  <IconExtra
                    size={16}
                    color="black"
                    name="flag"
                    family="Entypo"
                    style={{ marginTop: 10 }}
                  />
                  {"   "}
                  Report
                </MenuItem>
              </Block>
            </Menu>
          </View>
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FFFAFA",
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
      <Block row style={{ flexWrap: "wrap" }}>
        {tag &&
          tag.map((i, index) => {
            return (
              <Block row style={{ flexWrap: "nowrap" }} key={index}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.navigate("Search", {
                      from: "blogDescription",
                      val: i.name,
                    });
                  }}
                  style={styles.btn1}
                >
                  <Text
                    style={{ fontFamily: "open-sans-bold" }}
                    size={14}
                    color={"#10d876"}
                  >
                    {i.name.length < 10
                      ? `${i.name}`
                      : `${i.name.substring(0, 10)}...`}
                  </Text>
                </TouchableOpacity>
              </Block>
            );
          })}
      </Block>
      <Block>
        <Modal
          animationIn={"fadeIn"}
          animationOut={"fadeOut"}
          coverScreen={Platform.OS == "ios" ? false : true}
          isVisible={visible}
          hasBackdrop={false}
          onBackButtonPress={() => setModalVisible(false)}
          b
          onBackdropPress={() => setModalVisible(false)}
        >
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
        </Modal>
      </Block>
      {BottomSheet()}

    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.93,
    // paddingVertical:5,
    paddingTop: 5,
    justifyContent: "center",
    zIndex: 10,
    // backgroundColor: "red",
    // marginBottom:-10
  },
  starcont: {
    // backgroundColor: "red",
    width: 100,
  },
  btn1: {
    height: (height * 0.2) / 5,
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
    elevation: 0,
    shadowColor: "white",
    backgroundColor: "#cff7e4",
    marginVertical: 5,
    marginRight: 10,
  },
  btn2: {
    height: (height * 0.2) / 5,
    backgroundColor: "#ffead6",
    justifyContent: "center",
    marginRight: 10,

    paddingHorizontal: 10,
    marginVertical: 5,

    borderRadius: 5,
    elevation: 0,
    shadowColor: "white",
  },
  btn3: {
    height: (height * 0.2) / 5,
    justifyContent: "center",
    borderRadius: 5,
    paddingHorizontal: 10,

    backgroundColor: "#cff7e4",
    elevation: 0,
    marginRight: 10,

    marginVertical: 5,

    shadowColor: "white",
  },
  main: { flex: 1, backgroundColor: "white" },
  close: { width: "90%", height: 40, marginTop: 20 },
});
