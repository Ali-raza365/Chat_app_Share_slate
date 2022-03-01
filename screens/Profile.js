import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  ImageBackground,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  View,
} from "react-native";
import { Block, Text, theme, Input } from "galio-framework";
import Icon from "../components/Icon";
import { useSelector, useDispatch } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import ImageView from "react-native-image-view";
import { useIsFocused } from '@react-navigation/native';
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";

import { Button, Card, Header } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import {
  cover_image_action,
  Profile_image_action,
  ShowProfile_action,
  updateProfile_action,
} from "../redux/reducers/blog/Blog_For_Each_Item_action";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import { Location_Action } from "../redux/reducers/App_Realated/AppActon";
import { ReferMe_action } from "../redux/reducers/ap-user/ap_user_actions";
import {
  blockUser_action,
  myBlog_fetching_action,
} from "../redux/reducers/userBlockHide/myBlog_action";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";

const { width, height } = Dimensions.get("screen");

var arr2 = [
  { label: "Student", value: "Student" },
  { label: "Professional", value: "Professional" },
  { label: "CEO-Founder", value: "CEO-Founder" },
  { label: "CEO-CO-Founder", value: "CEO-CO-Founder" },
  { label: "Founder", value: "Founder" },
  { label: "CEO", value: "CEO" },
  { label: "Others", value: "Others" },
];

function Profile({ navigation, route }) {
  const { LocationPicked } = useSelector((state) => state.ActiveId_Reducer);
  let from = route.params?.from;

  let city = LocationPicked && LocationPicked.name;
  let region = LocationPicked && LocationPicked.region;
  let country = LocationPicked && LocationPicked.country;
  const paramsValue = () => {
    if (LocationPicked == undefined) {
      setRerender(!rerender);
      setlocationIs(LocationPicked);
    } else {
      setRerender(!rerender);

      setlocationIs(`${city},${region},${country}`);
    }
  };
  const [Activeid, setActiveid] = useState("About");

  const [ActiveLoading, setActiveLoading] = useState(false);
  const [modalShow, setmodalShow] = useState(false);
  const [fname, setfname] = useState(null);
  const [lname, setlname] = useState(null);
  const [locationIs, setlocationIs] = useState(null);
  const [rerender, setRerender] = useState(false);
  const [Value2, setValue2] = useState(null);
  const [open2, setOpen2] = useState(false);
  const [Sattend, setSattend] = useState(null);
  const [CUattend, setCUattend] = useState(null);
  const [Bio, setBio] = useState(null);
  const [internetCheck, setInternetCheck] = useState(0);
  const [opassword, setopassword] = useState(null);
  const [npassword, setnpassword] = useState(null);
  const [Nname, setNname] = useState(null);
  const [openPro, setopenPro] = useState(false);
  const [openCover, setopenCover] = useState(false);
  const [coverload, setcoverload] = useState(false);
  const [blockLoading, setblockLoading] = useState(false);
  const dispatch = useDispatch();

  const { token_is, Showprofile, blog_loading, userId_is } = useSelector(
    (state) => state.Blog_For_Each_Item
  );

  const { myBlog_data, myblog_loading, autherProfile } = useSelector(
    (state) => state.myblog
  );
  console.log(Showprofile,"PPOOODDD")

  let profLocation = Showprofile && Showprofile[0].location;
  const { referMe } = useSelector((state) => state.ap_user);

  let Myblog = () => {
    var bodyFormData = new FormData();
    bodyFormData.append("action", "me");
    bodyFormData.append("token", token_is);
    bodyFormData.append("userId", userId_is);
    dispatch(myBlog_fetching_action(bodyFormData, navigation));
  };
  let Autherblog = (id) => {
    var bodyFormData = new FormData();
    bodyFormData.append("action", "me");
    bodyFormData.append("token", token_is);
    bodyFormData.append("userId", id);
    dispatch(myBlog_fetching_action(bodyFormData, navigation));
  };
  var profiledata = new FormData();
  profiledata.append("token", token_is);
  profiledata.append("userId", userId_is);


  const isFocused = useIsFocused();


  useEffect(() => {
    dispatch(ShowProfile_action(profiledata, navigation));

    paramsValue();
  }, [
    internetCheck,
    LocationPicked,
    locationIs,
    profLocation,
    referMe,
    ActiveLoading,
    from,isFocused
  ]);

  //updateProfile
  const updaProfile = async () => {
    let token = await token_is;
    var bodyFormData = new FormData();

    if ((opassword && npassword) == null) {
      bodyFormData.append("token", token);
      bodyFormData.append("fname", fname);
      bodyFormData.append("lname", lname);
      bodyFormData.append("nick_name", Nname);
      bodyFormData.append("refer", referMe);
      bodyFormData.append("user_location", locationIs);
      bodyFormData.append("designation", Value2);
      bodyFormData.append("school", Sattend);
      bodyFormData.append("college", CUattend);
      bodyFormData.append("bio", Bio);
      if ((fname && lname && Nname) == null) {
        Alert.alert("please fill all required feilds");
      } else {
        dispatch(Location_Action(""));
        dispatch(ReferMe_action(""));
        dispatch(updateProfile_action(bodyFormData, navigation));
      }
      onButtonClick();
    } else {
      bodyFormData.append("token", token);
      bodyFormData.append("fname", fname);
      bodyFormData.append("lname", lname);
      bodyFormData.append("nick_name", Nname);
      bodyFormData.append("refer", referMe);
      bodyFormData.append("user_location", locationIs);
      bodyFormData.append("designation", Value2);
      bodyFormData.append("school", Sattend);
      bodyFormData.append("college", CUattend);
      bodyFormData.append("bio", Bio);
      bodyFormData.append("newPassword", opassword);
      bodyFormData.append("oldPassword", npassword);
      if ((fname && lname && Nname) == null) {
        Alert.alert("please fill all required feilds");
      } else {
        dispatch(Location_Action(""));
        dispatch(ReferMe_action(""));
        dispatch(updateProfile_action(bodyFormData, navigation));
      }
      onButtonClick();
    }
  };

  //for empty input.
  const onButtonClick = () => {
    setInternetCheck(internetCheck + 1);
    setfname(null);
    setlname(null);
    setNname(null);
    setSattend(null);
    setCUattend(null);
    setBio(null);
    setlocationIs(null);
    setnpassword(null);
    setopassword(null);
  };

  //image picker

  //image picker for cover
  const picCover = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      cover_image(result.uri);
    }
  };
  // cover image post
  const cover_image = async (data) => {
    setcoverload(true);
    let image = await data;
    var coverImg = new FormData();
    coverImg.append("token", token_is);
    coverImg.append("cover_image", {
      uri: image,
      type: mime.getType(image),
      name: image && image.split("/").pop(),
    });
    // console.log(coverImg,"OOOOO")
    await dispatch(cover_image_action(coverImg, navigation));
    setcoverload(false);
    setInternetCheck(internetCheck + 1);
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      prof_image(result.uri);
    }
  };
  // console.log(Showprofile);
  const prof_image = async (data) => {
    let image = await data;
    var profileImage = new FormData();
    profileImage.append("token", token_is);
    profileImage.append("profile_image", {
      uri: image,
      type: mime.getType(image),
      name: image && image.split("/").pop(),
    });
    await dispatch(Profile_image_action(profileImage, navigation));
    setInternetCheck(internetCheck + 1);
  };

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={2} behavior="position">
      {from == "other" ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setopenCover(!openCover)}
          >
               {/* <ContentLoader
                    speed={2}
                    style={styles.profileBackground}
                    // viewBox="0 0 400 160"
                    backgroundColor="silver"
                    foregroundColor="#ecebeb"
                  > */}
            <ImageBackground
              source={{ uri: Showprofile && Showprofile[0].cover }}
              style={styles.profileContainer}
              imageStyle={styles.profileBackground}
            >
              <View
                style={{
                  borderRadius: 5,
                  alignSelf: "flex-end",
                }}
              >
                <Button
                  style={{
                    flexDirection: "row",
                    height: 20,
                    marginTop: 200,
                    width: 100,
                    backgroundColor: "black",
                  }}
                  onPress={picCover}
                >
                  {coverload == false ? (
                    <>
                      <Text size={13} color="white">
                        Add cover{" "}
                      </Text>
                      <Icon
                        size={15}
                        color="white"
                        name="camera"
                        family="Feather"
                      />
                    </>
                  ) : (
                    <ActivityIndicator color="white" />
                  )}
                </Button>
              </View>
            </ImageBackground>
{/* </ContentLoader> */}
          </TouchableOpacity>

          <Block flex style={styles.profileCard1}>
            {Showprofile &&
              Showprofile.map((i, index) => {
                return (
                  <Block key={index}>
                    <Block middle style={styles.avatarContainer}>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => setopenPro(!openPro)}
                      >
                        {openCover == true ? (
                          <ImageView
                            images={[
                              {
                                source: {
                                  uri: i.cover,
                                },
                                title: "Paris",
                                width: 806,
                                height: 720,
                              },
                            ]}
                            imageIndex={0}
                            isVisible={true}
                            onClose={() => setopenCover(false)}
                            renderFooter={(currentImage) => (
                              <View>
                                <Text>My footer</Text>
                              </View>
                            )}
                          />
                        ) : null}
                        <ImageBackground
                          source={{
                            uri: i.profile,
                          }}
                          imageStyle={styles.avatar}
                          style={styles.avatar}
                        >
                          {openPro == true ? (
                            <ImageView
                              images={[
                                {
                                  source: {
                                    uri: i.profile,
                                  },
                                  // title: "Paris",
                                  width: 806,
                                  height: 720,
                                },
                              ]}
                              imageIndex={0}
                              isVisible={true}
                              onClose={() => setopenPro(false)}
                            />
                          ) : null}
                          {blog_loading == false ? (
                            <TouchableOpacity
                              onPress={pickImage}
                              style={{
                                justifyContent: "flex-end",
                                alignSelf: "flex-end",
                              }}
                            >
                              <Icon
                                size={30}
                                color="skyblue"
                                name="camera"
                                family="Feather"
                              />
                            </TouchableOpacity>
                          ) : (
                            <ActivityIndicator color="white" />
                          )}
                        </ImageBackground>
                      </TouchableOpacity>
                    </Block>
                    {/* <Block style={styles.info}>
                      <Block
                        middle
                        row
                        space="evenly"
                        style={{ marginTop: 20, paddingBottom: 24 }}
                      >
                        <Button
                          small
                          style={{
                            backgroundColor: argonTheme.COLORS.INFO,
                          }}
                        >
                          CONNECT
                        </Button>
                        <Button
                          small
                          onPress={() => navigation.navigate("Chat")}
                          style={{
                            backgroundColor: argonTheme.COLORS.DEFAULT,
                          }}
                        >
                          MESSAGE
                        </Button>
                      </Block>
                      <Block width={width * 0.75} row space="between">
                        <Block middle>
                          <Text
                            size={18}
                            color="#525F7F"
                            style={{
                              marginBottom: 4,
                              fontFamily: "open-sans-bold",
                            }}
                          >
                            2K
                          </Text>
                          <Text
                            style={{ fontFamily: "open-sans-regular" }}
                            size={12}
                            color={argonTheme.COLORS.TEXT}
                          >
                            Blogs
                          </Text>
                        </Block>
                        <Block middle>
                          <Text
                            color="#525F7F"
                            size={18}
                            style={{
                              marginBottom: 4,
                              fontFamily: "open-sans-bold",
                            }}
                          >
                            4.5/5
                          </Text>
                          <Text
                            style={{ fontFamily: "open-sans-regular" }}
                            size={12}
                            color={argonTheme.COLORS.TEXT}
                          >
                            Ratings
                          </Text>
                        </Block>
                        <Block middle>
                          <Text
                            color="#525F7F"
                            size={18}
                            style={{
                              marginBottom: 4,
                              fontFamily: "open-sans-bold",
                            }}
                          >
                            89
                          </Text>
                          <Text
                            style={{ fontFamily: "open-sans-regular" }}
                            size={12}
                            color={argonTheme.COLORS.TEXT}
                          >
                            Comments
                          </Text>
                        </Block>
                      </Block>
                    </Block> */}

                    <Block middle style={styles.nameInfo}>
                      <Text
                        style={{ fontFamily: "open-sans-bold" }}
                        size={25}
                        color="#32325D"
                      >
                        {i.fname} {i.lname}
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
                        @{i.username.toLowerCase()}
                      </Text>
                      <Text
                        size={14}
                        color="#32325D"
                        style={{
                          marginTop: 3,
                          fontFamily: "open-sans-bold",
                        }}
                      >
                        {i.email.toLowerCase()}
                      </Text>
                    </Block>
                  </Block>
                );
              })}

            <Block
              row
              middle
              space={"between"}
              style={{ paddingRight: 20, marginTop: 10 }}
            >
              <Block row>
                <Button
                  onPress={(e) => {
                    setActiveid("About");
                  }}
                  style={{
                    width: 100,

                    backgroundColor:
                      Activeid == "About"
                        ? argonTheme.COLORS.PRIMARY
                        : argonTheme.COLORS.SECONDARY,
                  }}
                >
                  <Text
                    size={16}
                    color={
                      Activeid == "About"
                        ? argonTheme.COLORS.WHITE
                        : argonTheme.COLORS.BLACK
                    }
                    bold
                  >
                    About
                  </Text>
                </Button>
                <Button
                  onPress={() => {
                    setActiveid("Blogs");
                    Myblog();
                  }}
                  style={{
                    width: 100,
                    backgroundColor:
                      Activeid == "Blogs"
                        ? argonTheme.COLORS.PRIMARY
                        : argonTheme.COLORS.SECONDARY,
                  }}
                >
                  <Text
                    bold
                    size={16}
                    color={
                      Activeid == "Blogs"
                        ? argonTheme.COLORS.WHITE
                        : argonTheme.COLORS.BLACK
                    }
                  >
                    Blogs
                  </Text>
                </Button>
              </Block>
              <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                <Icon
                  size={30}
                  color={argonTheme.COLORS.PRIMARY}
                  name="settings"
                  family="Feather"
                />
              </TouchableOpacity>
            </Block>

            {Activeid == "About" ? (
              blog_loading == false ? (
                <>
                  {/* <Text
                bold
                size={20}
                color="#525F7F"
                style={{ marginTop: 30, alignSelf: "center" }}
              >
                About
              </Text> */}

                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>

                  <Text
                    bold
                    size={16}
                    color="#525F7F"
                    style={{
                      alignSelf: "flex-start",
                      marginTop: 10,
                    }}
                  >
                    Personal Information
                  </Text>
                  {Showprofile &&
                    Showprofile.map((i, index) => {
                      return (
                        <Block key={index}>
                          <Block width={width * 0.9}>
                            <Text
                              size={14}
                              color="#525F7F"
                              style={{
                                alignSelf: "flex-start",
                                marginTop: 10,
                              }}
                            >
                              First Name
                            </Text>
                            <Input
                              value={fname}
                              // borderless
                              color="#525F7F"
                              placeholder={i.fname}
                              onChangeText={(e) => {
                                setfname(e);
                              }}
                              style={{
                                shadowRadius: 100,
                                height:
                                  height < 812 ? height * 0.07 : height * 0.05,

                                shadowOpacity: 0.13,
                                backgroundColor: "white",
                                shadowColor: argonTheme.COLORS.BLACK,
                                shadowOffset: { height: 1, width: 0 },
                                elevation: 0.9,
                              }}
                              placeholderTextColor="#525F7F"
                            />
                          </Block>
                          <Block width={width * 0.9}>
                            <Text
                              size={14}
                              color="#525F7F"
                              style={{
                                alignSelf: "flex-start",
                                marginTop: 10,
                              }}
                            >
                              Last Name
                            </Text>
                            <Input
                              value={lname}
                              // borderless
                              color="#525F7F"
                              placeholder={i.lname}
                              onChangeText={(e) => {
                                setlname(e);
                              }}
                              style={{
                                shadowRadius: 100,
                                height:
                                  height < 812 ? height * 0.07 : height * 0.05,

                                shadowOpacity: 0.13,
                                backgroundColor: "white",
                                shadowColor: argonTheme.COLORS.BLACK,
                                shadowOffset: { height: 1, width: 0 },
                                elevation: 0.9,
                              }}
                              placeholderTextColor="#525F7F"
                            />
                          </Block>

                          <Block width={width * 0.9}>
                            <Text
                              size={14}
                              color="#525F7F"
                              style={{ alignSelf: "flex-start", marginTop: 10 }}
                            >
                              Nick Name
                            </Text>
                            <Input
                              // value={lname}
                              // borderless
                              color="#525F7F"
                              placeholder={i.nickname}
                              onChangeText={(e) => {
                                setNname(e);
                              }}
                              style={{
                                shadowRadius: 100,
                                height:
                                  height < 812 ? height * 0.07 : height * 0.05,

                                shadowOpacity: 0.13,
                                backgroundColor: "white",
                                shadowColor: argonTheme.COLORS.BLACK,
                                shadowOffset: { height: 1, width: 0 },
                                elevation: 0.9,
                              }}
                              placeholderTextColor="#525F7F"
                            />
                          </Block>

                          <Block>
                            <Text
                              size={14}
                              color="#525F7F"
                              style={{ alignSelf: "flex-start", marginTop: 10 }}
                            >
                              Refer me as
                            </Text>

                            <TouchableOpacity
                              onPress={() => navigation.navigate("ReferMe")}
                              activeOpacity={0.7}
                              style={{
                                width: width * 0.9,
                                height: 40,

                                justifyContent: "center",
                                paddingHorizontal: 5,
                                marginTop: 10,
                                paddingLeft: 16,
                                //  borderWidth:1,
                                borderRadius: 5,
                                backgroundColor: "white",
                                shadowOpacity: 100,
                                height:
                                  height < 812 ? height * 0.07 : height * 0.05,

                                shadowColor: "black",
                                shadowRadius: 0.2,
                                shadowOffset: { height: 0, width: 0 },
                                elevation: 0.9,
                              }}
                            >
                              {referMe == "" ? (
                                <Text
                                  size={14}
                                  color="#525F7F"
                                  style={{ alignSelf: "flex-start" }}
                                >
                                  {i.refer == "" ? "Choose" : i.refer}
                                </Text>
                              ) : (
                                <Text
                                  size={14}
                                  color="#525F7F"
                                  style={{ alignSelf: "flex-start" }}
                                >
                                  {referMe}
                                </Text>
                              )}
                            </TouchableOpacity>
                          </Block>

                          <Text
                            bold
                            size={14}
                            color="#525F7F"
                            style={{
                              marginTop: 25,
                              marginBottom: 5,
                              alignSelf: "flex-start",
                            }}
                          >
                            Change Password
                          </Text>
                          <Block width={width * 0.9}>
                            <Input
                              value={opassword}
                              // borderless
                              color="#525F7F"
                              placeholder="Old password"
                              onChangeText={(e) => {
                                setopassword(e);
                              }}
                              style={{
                                shadowRadius: 100,
                                height:
                                  height < 812 ? height * 0.07 : height * 0.05,

                                shadowOpacity: 0.13,
                                backgroundColor: "white",
                                shadowColor: argonTheme.COLORS.BLACK,
                                shadowOffset: { height: 1, width: 0 },
                                elevation: 0.9,
                              }}
                              placeholderTextColor="#525F7F"
                            />
                          </Block>
                          <Block width={width * 0.9}>
                            <Input
                              value={npassword}
                              // borderless
                              color="#525F7F"
                              onChangeText={(e) => {
                                setnpassword(e);
                              }}
                              placeholder="New password"
                              style={{
                                marginTop: 5,
                                shadowRadius: 100,
                                height:
                                  height < 812 ? height * 0.07 : height * 0.05,

                                shadowOpacity: 0.13,
                                backgroundColor: "white",
                                shadowColor: argonTheme.COLORS.BLACK,
                                shadowOffset: { height: 1, width: 0 },
                                elevation: 0.9,
                              }}
                              placeholderTextColor="#525F7F"
                            />
                          </Block>

                          <Block style={{ marginTop: 10 }}>
                            <Text
                              bold
                              size={15}
                              color="#525F7F"
                              style={{ alignSelf: "flex-start", marginTop: 10 }}
                            >
                              Location
                            </Text>
                            <Text
                              size={14}
                              color="#525F7F"
                              style={{ alignSelf: "flex-start", marginTop: 10 }}
                            >
                              Current Location
                            </Text>
                            <TouchableOpacity
                              activeOpacity={0.9}
                              style={{
                                width: width * 0.89,
                                minHeight: height * 0.045,
                                justifyContent: "center",
                                paddingHorizontal: 5,
                                marginTop: 10,
                                //  borderWidth:1,
                                borderRadius: 5,
                                paddingLeft: 16,
                                backgroundColor: "white",
                                shadowOpacity: 100,
                                height:
                                  height < 812 ? height * 0.07 : height * 0.05,

                                shadowColor: "black",
                                shadowRadius: 0.2,
                                shadowOffset: { height: 0, width: 0 },
                                elevation: 0.9,
                              }}
                            >
                              {LocationPicked == (undefined || "") ? (
                                <Text
                                  size={14}
                                  color="#525F7F"
                                  style={{ alignSelf: "flex-start" }}
                                >
                                  {i.location == undefined || ",,"
                                    ? "Current location not found"
                                    : i.location}
                                </Text>
                              ) : (
                                <Text
                                  size={14}
                                  color="#525F7F"
                                  style={{ alignSelf: "flex-start" }}
                                >
                                  {locationIs ==
                                    "undefined ,undefined ,undefined" ||
                                  "null ,null ,null"
                                    ? "Current location not found"
                                    : locationIs}
                                </Text>
                              )}
                            </TouchableOpacity>

                            <TouchableOpacity
                              style={{
                                width: width * 0.89,
                                height:
                                  height < 812 ? height * 0.07 : height * 0.05,

                                justifyContent: "center",
                                paddingHorizontal: 5,
                                marginTop: 20,
                                borderRadius: 5,
                                paddingLeft: 16,
                                backgroundColor: "white",
                                shadowOpacity: 100,
                                height:
                                  height < 812 ? height * 0.07 : height * 0.05,

                                shadowColor: "black",
                                shadowRadius: 0.2,
                                elevation: 0.9,
                                shadowOffset: { height: 0, width: 0 },
                              }}
                              onPress={() =>
                                navigation.navigate("GooglePlacesInput", {
                                  from: "profileHere",
                                })
                              }
                            >
                              <Text size={15} color="#525F7F">
                                Search Location (if not above)
                              </Text>
                            </TouchableOpacity>
                          </Block>

                          <Text
                            bold
                            size={15}
                            color="#525F7F"
                            style={{ marginTop: 25, alignSelf: "flex-start" }}
                          >
                            Education & Profession
                          </Text>
                          <Block>
                            <Text
                              size={14}
                              color="#525F7F"
                              style={{
                                marginVertical: 10,
                                alignSelf: "flex-start",
                              }}
                            >
                              Designation
                            </Text>
                            <DropDownPicker
                              listMode="MODAL"
                              textStyle={{ color: "#525F7F" }}
                              placeholder={
                                i.designation == ""||"null"
                                  ? "Choose"
                                  : i.designation
                              }
                              style={{
                                borderColor: "rgb(242,243,242)",
                                borderWidth: 0.5,
                                borderRadius: 5,
                                height: 45,
                                marginTop: 5,
                                width: width * 0.9,
                                shadowColor: argonTheme.COLORS.BLACK,
                                shadowOffset: { width: 0, height: 0.5 },
                                shadowRadius: 1,
                                shadowOpacity: 0.13,
                                elevation: 2,
                                // elevation: 10,
                              }}
                              open={open2}
                              value={Value2}
                              items={arr2}
                              setOpen={setOpen2}
                              setValue={setValue2}
                            />
                          </Block>

                          <Block width={width * 0.9}>
                            <Text
                              size={14}
                              color="#525F7F"
                              style={{ alignSelf: "flex-start", marginTop: 15 }}
                            >
                              School Attended
                            </Text>
                            <Block>
                              <Input
                                value={Sattend}
                                // borderless
                                color="#525F7F"
                                style={{
                                  shadowRadius: 100,
                                  height:
                                    height < 812
                                      ? height * 0.07
                                      : height * 0.05,

                                  shadowOpacity: 0.13,
                                  backgroundColor: "white",
                                  shadowColor: argonTheme.COLORS.BLACK,
                                  shadowOffset: { height: 1, width: 0 },
                                  elevation: 0.9,
                                }}
                                placeholderTextColor="#525F7F"
                                placeholder={
                                  i.school == "" ||"null"? "Enter here" : i.school
                                }
                                onChangeText={(e) => {
                                  setSattend(e);
                                }}
                              />
                            </Block>
                          </Block>
                          <Block width={width * 0.9}>
                            <Text
                              size={14}
                              color="#525F7F"
                              style={{ alignSelf: "flex-start", marginTop: 10 }}
                            >
                              College/University Attended
                            </Text>
                            <Input
                              value={CUattend}
                              // borderless
                              color="#525F7F"
                              placeholder={
                                i.college == "" ||"null"? "Enter here" : i.college
                              }
                              style={{
                                height:
                                  height < 812 ? height * 0.07 : height * 0.05,
                                shadowRadius: 100,
                                height:
                                  height < 812 ? height * 0.07 : height * 0.05,

                                shadowOpacity: 0.13,
                                backgroundColor: "white",
                                shadowColor: argonTheme.COLORS.BLACK,
                                shadowOffset: { height: 1, width: 0 },
                                elevation: 0.9,
                              }}
                              placeholderTextColor={"#525F7F"}
                              onChangeText={(e) => {
                                setCUattend(e);
                              }}
                            />
                          </Block>

                          <Text
                            size={14}
                            color="#525F7F"
                            style={{ alignSelf: "flex-start", marginTop: 10 }}
                          >
                            Bio
                          </Text>
                          <Block
                            style={{
                              height: height * 0.1,
                              width: width * 0.9,
                              borderColor: "rgb(242,243,242)",
                              borderWidth: 0.5,
                              padding: 5,
                              marginTop: 5,
                              borderRadius: 5,
                              shadowColor: argonTheme.COLORS.BLACK,
                              shadowOffset: { width: 0, height: 1 },
                              shadowRadius: 0.13,
                              shadowOpacity: 0.1,
                              backgroundColor: "white",
                              elevation: 1,
                              paddingLeft: 17,
                            }}
                          >
                            <TextInput
                              numberOfLines={5}
                              multiline={true}
                              style={{
                                justifyContent: "flex-start",
                                color: "#525F7F",
                              }}
                              value={Bio}
                              onChangeText={(e) => {
                                setBio(e);
                              }}
                              placeholder={
                                i.bio == "" ||"null"? "Enter here" : i.bio
                              }
                              placeholderTextColor="#525F7F"
                            ></TextInput>
                          </Block>
                        </Block>
                      );
                    })}
                  <Block width={width * 0.9}>
                    <Button
                      color="primary"
                      style={styles.createButton}
                      onPress={() => {
                        updaProfile();
                      }}
                    >
                      {blog_loading == false ? (
                        <Text
                          style={{ fontFamily: "open-sans-bold" }}
                          size={14}
                          color={argonTheme.COLORS.WHITE}
                        >
                          UPDATE
                        </Text>
                      ) : (
                        <ActivityIndicator color="white" />
                      )}
                    </Button>
                  </Block>
                </>
              ) : (
                <ActivityIndicator
                  color={argonTheme.COLORS.PRIMARY}
                  style={{ marginTop: 150 }}
                />
              )
            ) : myblog_loading == false ? (
              <Block>
                <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                  <Block style={styles.divider} />
                </Block>

                <Block>
                  {myBlog_data.length == [] ? (
                    <Text
                      size={14}
                      color="#525F7F"
                      style={{ alignSelf: "flex-start", margin: 20 }}
                    >
                      No blog yet
                    </Text>
                  ) : (
                    myBlog_data && myBlog_data.map((i,index)=>{return(

                      <Card item={i} key={index} />
                      )})
                  )}
                </Block>
              </Block>
            ) : (
              <ActivityIndicator
                color={argonTheme.COLORS.PRIMARY}
                style={{ marginTop: 150 }}
              />
            )}
          </Block>
        </ScrollView>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* for user if user view profile of other  */}
          {autherProfile &&
            autherProfile.map((i, index) => {
              return (
                <ImageBackground key={index}
                  source={{ uri: i.cover }}
                  style={styles.profileContainer}
                  imageStyle={styles.profileBackground}
                />
              );
            })}
          <Block flex style={styles.profileCard2}>
            {autherProfile &&
              autherProfile.map((i, index) => {
           
                return (
                  <Block key={index}>
                    <Block middle style={styles.avatarContainer}>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => setopenPro(!openPro)}
                      >
                        {openCover == true ? (
                          <ImageView
                            images={[
                              {
                                source: {
                                  uri: i.cover,
                                },
                                title: "Paris",
                                width: 806,
                                height: 720,
                              },
                            ]}
                            imageIndex={0}
                            isVisible={true}
                            onClose={() => setopenCover(false)}
                            renderFooter={(currentImage) => (
                              <View>
                                <Text>My footer</Text>
                              </View>
                            )}
                          />
                        ) : null}
                        <ImageBackground
                          source={{
                            uri: i.profile,
                          }}
                          imageStyle={styles.avatar}
                          style={styles.avatar}
                        >
                          {openPro == true ? (
                            <ImageView
                              images={[
                                {
                                  source: {
                                    uri: i.profile,
                                  },
                                  // title: "Paris",
                                  width: 806,
                                  height: 720,
                                },
                              ]}
                              imageIndex={0}
                              isVisible={true}
                              onClose={() => setopenPro(false)}
                            />
                          ) : null}
                        </ImageBackground>
                      </TouchableOpacity>
                    </Block>

                    <Block middle style={styles.nameInfo}>
                      <Text
                        style={{ fontFamily: "open-sans-bold" }}
                        size={25}
                        color="#32325D"
                      >
                        {i.fname} {i.lname}
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
                        @{i.username.toLowerCase()}
                      </Text>
                    </Block>
                  </Block>
                );
              })}

            <Block
              row
              middle
              space={"between"}
              style={{ paddingRight: 20, marginTop: 10 }}
            >
              <Block row>
                <Button
                  onPress={() => {
                    setActiveid("About");
                  }}
                  style={{
                    width: 100,

                    backgroundColor:
                      Activeid == "About"
                        ? argonTheme.COLORS.PRIMARY
                        : argonTheme.COLORS.SECONDARY,
                  }}
                >
                  <Text
                    size={16}
                    color={
                      Activeid == "About"
                        ? argonTheme.COLORS.WHITE
                        : argonTheme.COLORS.BLACK
                    }
                    bold
                  >
                    About
                  </Text>
                </Button>
                <Button
                  onPress={() => {
                    setActiveid("Blogs");
                    Autherblog(autherProfile&&autherProfile[0].id)
                    setActiveLoading(false);
                  }}
                  style={{
                    width: 100,
                    backgroundColor:
                      Activeid == "Blogs"
                        ? argonTheme.COLORS.PRIMARY
                        : argonTheme.COLORS.SECONDARY,
                  }}
                >
                  <Text
                    bold
                    size={16}
                    color={
                      Activeid == "Blogs"
                        ? argonTheme.COLORS.WHITE
                        : argonTheme.COLORS.BLACK
                    }
                  >
                    Blogs
                  </Text>
                </Button>
              </Block>
              <TouchableOpacity
                onPress={() => {
                  setmodalShow(!modalShow);
                }}
              >
                <Icon
                  size={20}
                  color={argonTheme.COLORS.PRIMARY}
                  name="dots-three-vertical"
                  family="Entypo"
                />
                <Block style={{ marginRight: 15 }}>
                  <Menu
                    style={{
                      width: 120,
                      height: 40,
                    }}
                    visible={modalShow}
                    onRequestClose={() => setmodalShow(false)}
                  >
                    {blockLoading == false ? (
                      <MenuItem
                        onPress={() => {
                          dispatch(
                            blockUser_action(
                              {
                                action: "block",
                                token: token_is,
                                id: autherProfile && autherProfile[0].id,
                              },
                              navigation
                            )
                          );
                          setmodalShow(false)
                        }}
                        pressColor="#f8f8f8"
                        activeOpacity={0.7}
                        style={{
                          alignItems: "flex-start",
                          width: 10,
                          padding: 0,
                          margin: 0,
                        }}
                      >
                        Block
                      </MenuItem>
                    ) : (
                      <ActivityIndicator color={argonTheme.COLORS.PRIMARY} />
                    )}
                  </Menu>
                </Block>
              </TouchableOpacity>
            </Block>

            {Activeid == "About" ? (
              myblog_loading == false ? (
                <>
                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>

                  <Text
                    bold
                    size={16}
                    color="#525F7F"
                    style={{
                      alignSelf: "flex-start",
                      marginTop: 10,
                      paddingLeft: 5,
                    }}
                  >
                    Personal Information
                  </Text>
                  {autherProfile &&
                    autherProfile.map((i, index) => {
                      return (
                        <Block key={index}>
                          <Block
                            row
                            center
                            width={width * 0.9}
                            style={{ marginTop: 10, paddingLeft: 10 }}
                          >
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.PRIMARY}
                              name="person"
                              family="enypto"
                            />
                            <Text
                              size={14}
                              color="#525F7F"
                              style={{ alignSelf: "center", paddingLeft: 5 }}
                            >
                              Nick Name
                            </Text>
                            <Text
                              size={14}
                              color="#525F7F"
                              style={{
                                alignSelf: "center",
                                fontFamily: "open-sans-bold",
                              }}
                            >
                              {" "}
                              {i.nickname}
                            </Text>
                          </Block>

                          <Block style={{ marginTop: 10 }}>
                            <Text
                              bold
                              size={15}
                              color="#525F7F"
                              style={{
                                alignSelf: "flex-start",
                                marginTop: 10,
                                paddingLeft: 5,
                              }}
                            >
                              Location
                            </Text>
                            <Block
                              row
                              center
                              width={width * 0.9}
                              style={{ marginTop: 10, paddingLeft: 10 }}
                            >
                              {i.location == "null" || ",," ? (
                                <Text
                                  size={14}
                                  color="#525F7F"
                                  style={{ alignSelf: "center" }}
                                >
                                  Nothing to display
                                </Text>
                              ) : (
                                <>
                                  <Icon
                                    size={16}
                                    color={argonTheme.COLORS.PRIMARY}
                                    name="location-pin"
                                    family="MaterialIcons"
                                  />
                                  <Text
                                    size={14}
                                    color="#525F7F"
                                    style={{ alignSelf: "center" }}
                                  >
                                    {" "}
                                    Lives in
                                  </Text>
                                  <Text
                                    size={14}
                                    color="#525F7F"
                                    style={{
                                      alignSelf: "center",
                                      fontFamily: "open-sans-bold",
                                    }}
                                  >
                                    {" "}
                                    {i.location}
                                  </Text>
                                </>
                              )}
                            </Block>
                          </Block>

                          <Text
                            bold
                            size={15}
                            color="#525F7F"
                            style={{
                              marginTop: 15,
                              alignSelf: "flex-start",
                              paddingLeft: 5,
                            }}
                          >
                            Education & Profession
                          </Text>

                          <Block
                            row
                            center
                            width={width * 0.9}
                            style={{ marginTop: 10, paddingLeft: 10 }}
                          >
                            {(i.college && i.school) == "null" ? (
                              <Text
                                size={14}
                                color="#525F7F"
                                style={{ alignSelf: "center" }}
                              >
                                Nothing to display
                              </Text>
                            ) : (
                              <>
                                <Icon
                                  size={16}
                                  color={argonTheme.COLORS.PRIMARY}
                                  name="graduation-cap"
                                  family="Entypo"
                                />
                                <Text
                                  size={14}
                                  color="#525F7F"
                                  style={{
                                    alignSelf: "center",
                                    paddingLeft: 5,
                                  }}
                                >
                                  Studies at
                                </Text>
                                <Text
                                  size={14}
                                  color="#525F7F"
                                  style={{
                                    alignSelf: "center",
                                    fontFamily: "open-sans-bold",
                                  }}
                                >
                                  {" "}
                                  {i.college}
                                </Text>
                              </>
                            )}
                          </Block>

                          <Block
                            row
                            center
                            width={width * 0.9}
                            style={{ marginTop: 10, paddingLeft: 10 }}
                          >
                            {i.school == "null" ? (
                              <Text
                                size={14}
                                color="#525F7F"
                                style={{ alignSelf: "flex-start" }}
                              >
                                Nothing to display
                              </Text>
                            ) : (
                              <Block
                                row
                                center
                                width={width * 0.9}
                                style={{ marginTop: 5, paddingLeft: 0 }}
                              >
                                <>
                                  <Icon
                                    size={16}
                                    color={argonTheme.COLORS.PRIMARY}
                                    name="graduation-cap"
                                    family="Entypo"
                                  />
                                  <Text
                                    size={14}
                                    color="#525F7F"
                                    style={{
                                      alignSelf: "center",
                                      paddingLeft: 5,
                                    }}
                                  >
                                    Went to
                                  </Text>
                                  <Text
                                    size={14}
                                    color="#525F7F"
                                    style={{
                                      alignSelf: "center",
                                      fontFamily: "open-sans-bold",
                                    }}
                                  >
                                    {" "}
                                    {i.school}
                                  </Text>
                                </>
                              </Block>
                            )}
                          </Block>

                          <Text
                            bold
                            size={15}
                            color="#525F7F"
                            style={{
                              alignSelf: "flex-start",
                              marginTop: 15,
                              paddingLeft: 5,
                            }}
                          >
                            Designation
                          </Text>
                          <Block style={{ marginTop: 10 }}>
                            <Block
                              row
                              center
                              width={width * 0.9}
                              style={{ paddingLeft: 10 }}
                            >
                              {i.designation == "null" ? (
                                <Text
                                  size={14}
                                  color="#525F7F"
                                  style={{ alignSelf: "flex-start" }}
                                >
                                  Nothing to display
                                </Text>
                              ) : (
                                <>
                                  <Icon
                                    size={16}
                                    color={argonTheme.COLORS.PRIMARY}
                                    name="directions-run"
                                    family="MaterialIcons"
                                  />
                                  <Text
                                    size={14}
                                    color="#525F7F"
                                    style={{ alignSelf: "center" }}
                                  >
                                    {" "}
                                    Working as
                                  </Text>
                                  <Text
                                    size={14}
                                    color="#525F7F"
                                    style={{
                                      alignSelf: "center",
                                      fontFamily: "open-sans-bold",
                                    }}
                                  >
                                    {" "}
                                    {i.designation}
                                  </Text>
                                </>
                              )}
                            </Block>
                          </Block>

                          <Text
                            size={14}
                            color="#525F7F"
                            style={{
                              alignSelf: "flex-start",
                              fontFamily: "open-sans-bold",
                              marginTop: 15,
                              paddingLeft: 5,
                            }}
                          >
                            Bio
                          </Text>
                          <Block width={width * 0.9}>
                            <Block
                              row
                              width={width * 0.9}
                              style={{ marginTop: 10, paddingLeft: 15 }}
                            >
                              {i.bio == "null" ? (
                                <Text
                                  size={14}
                                  color="#525F7F"
                                  style={{ alignSelf: "flex-start" }}
                                >
                                  Nothing to display
                                </Text>
                              ) : (
                                <>
                                  <Text
                                    size={14}
                                    color="#525F7F"
                                    style={{ alignSelf: "flex-start" }}
                                  >
                                    {" "}
                                  </Text>
                                  <Text
                                    size={14}
                                    color="#525F7F"
                                    style={{
                                      alignSelf: "flex-start",
                                      fontFamily: "open-sans-regular",
                                    }}
                                  >
                                    {i.bio}
                                    {/* Nothing to display */}
                                  </Text>
                                </>
                              )}
                            </Block>
                          </Block>
                        </Block>
                      );
                    })}
                </>
              ) : (
                <ActivityIndicator
                  color={argonTheme.COLORS.PRIMARY}
                  style={{ marginTop: 150 }}
                />
              )
            ) : myblog_loading == false ? (
              <Block>
                <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                  <Block style={styles.divider} />
                </Block>

                <Block>
                  {myBlog_data.length == [] ? (
                    <Text
                      size={14}
                      color="#525F7F"
                      style={{
                        alignSelf: "flex-start",
                        fontFamily: "open-sans-regular",margin: 20,
                      }}
                    >
                      No blog yet
                    </Text>
                  ) : (
                    myBlog_data && myBlog_data.map((i,index)=>{return(
                      
                      <Card item={i} key={index} />

                      )})
                  )}
                </Block>
              </Block>
            ) : (
              <ActivityIndicator
                color={argonTheme.COLORS.PRIMARY}
                style={{ marginTop: 150 }}
              />
            )}
          </Block>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
  },
  inputIcons: {
    marginRight: 12,
  },
  profileContainer: {
    width: width,
    // paddingTop: 50,
  },
  profileBackground: {
    width: width,
    height: height * 0.40,
  },
  createButton: { marginTop: 25 },

  profileCard1: {
    padding: width * 0.02,
    paddingVertical: width * 0.02,
    marginHorizontal: width * 0.02,
    marginTop: height*.08,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    // backgroundColor: 'green',
    elevation: 2,
  },
  profileCard2: {
    // backgroundColor: "red",
    padding: width * 0.02,
    paddingVertical: width * 0.02,
    marginHorizontal: width * 0.02,
    marginTop: 250,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  info: {
    paddingHorizontal: 40,
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80,
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0,
    justifyContent: "flex-end",
  },
  nameInfo: {
    marginTop: 15,
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
});

export default Profile;
