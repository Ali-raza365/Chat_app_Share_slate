import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Block, Text, theme, Input } from "galio-framework";
import Icon from "../components/Icon";
import { useSelector, useDispatch } from "react-redux";

import { Button, Header } from "../components";
import { Images, argonTheme } from "../constants";
import {
  cover_image_action,
  Profile_image_action,
} from "../redux/reducers/blog/Blog_For_Each_Item_action";
import { ShowProfile_action } from "../redux/reducers/blog/Blog_For_Each_Item_action";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import ImageView from "react-native-image-view";
import Loading from "../constants/loading";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

function ProfileBuilder({ navigation, route }) {
  let param = route.params?.value;
  const { LocationPicked } = useSelector((state) => state.ActiveId_Reducer);
  let city = LocationPicked && LocationPicked.name;
  let region = LocationPicked && LocationPicked.region;
  let country = LocationPicked && LocationPicked.country;
 
  const paramsValue = () => {
    if (LocationPicked == {} || "" || undefined) {
      setRerender(!rerender);
      setlocationIs(profLocation);
    } else {
      setlocationIs(`${city} ,${region} ,${country}`);
    }
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [proload, setproload] = useState(false);
  const [coverload, setcoverload] = useState(false);
   const [openPro, setopenPro] = useState(false);
  const [openCover, setopenCover] = useState(false);
  const [Nname, setNname] = useState(null);
  const [rerender, setRerender] = useState(false);
  const [internetCheck, setInternetCheck] = useState(false);
  const [locationIs, setlocationIs] = useState(null);
  const [userpro, setuserpro] = useState([])
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { token_is, blog_loading, userId_is } = useSelector(
    (state) => state.Blog_For_Each_Item
  );
    //profile fetch
    let { Showprofile } = useSelector((state) => state.Blog_For_Each_Item);
    const { referMe } = useSelector((state) => state.ap_user);
    let profLocation = Showprofile && Showprofile[0].location;
  const get_user_id = async () => {
    try {
      const value = await AsyncStorage.getItem("@user_id");
      if (value !== null) {
      //  alert(value)
        profData(value);
      } else {
        setInternetCheck(!internetCheck);
        console.log("object")
      }
    } catch (e) {
      console.log(e, "error in getting token");
    }
  };
  //profiledata
  const profData =  (value) => {
    var profiledata = new FormData();
    profiledata.append("token", token_is);
    profiledata.append("userId", value);
    console.log(profiledata)
     dispatch(ShowProfile_action(profiledata, navigation));
  };


  const delet_token = async () => {
    try {
      await AsyncStorage.removeItem("@user_token");
      await AsyncStorage.removeItem("@user_type");
      await AsyncStorage.removeItem("@user_id")

        .then(() => {
          // navigation.navigate("Login");
          DevSettings.reload();
          console.log("token removed and logout done");
        })
        .catch((e) => {
          console.log(e, "error in removing token");
        });
    } catch (exception) {
      console.log(exception, "error in removing token=exception");
      return false;
    }
  };

  // useEffect(() => {

  //   // paramsValue();
    
  // }, [
  //   rerender,
  //   LocationPicked,
  //   locationIs,
  //   profLocation,
  // ]);
  useEffect(() => {
    get_user_id();
    paramsValue();
    // onRefresh()
  }, [rerender,profLocation,isFocused,internetCheck])
  
//   useEffect(() => {

//     if(Showprofile){
// setuserpro(Showprofile)
// }
// else{
//   setInternetCheck(internetCheck+1)
// }
// }, [internetCheck,Showprofile])

// console.log(Showprofile,"ddd")

  //image picker for profile
  const pickImage_profile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      prof_image(result.uri);
    }
  };
  //image picker for cover
  const picCover = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

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
    await dispatch(cover_image_action(coverImg, navigation));
    setcoverload(false);
    setInternetCheck(internetCheck + 1);
  };

  const prof_image = async (data) => {
    setproload(true);
    let image = await data;
    var profileImage = new FormData();
    profileImage.append("token", token_is);
    profileImage.append("profile_image", {
      uri: image,
      type: mime.getType(image),
      name: image && image.split("/").pop(),
    });
    await dispatch(Profile_image_action(profileImage, navigation));
    setproload(false);
    setInternetCheck(internetCheck + 1);
  };

  // if (userpro.length==0) {
  //   return <Loading />;
  
  // } else {
    return (
      <KeyboardAvoidingView>
        <ScrollView showsVerticalScrollIndicator={false}>

          {Showprofile &&Showprofile.length!=0&&
            Showprofile.map((i, index) => {
              return (
                <Block key={index}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setopenCover(!openCover)}
                  >
                    <ImageBackground
                      source={{ uri: Showprofile && Showprofile[0].cover }}
                      style={styles.profileContainer}
                      imageStyle={styles.profileBackground}
                    >
                      <View style={{ paddingTop: 20 }}>
                        <ProgressSteps
                          activeStep={1}
                          labelColor="#ebebe4"
                          activeStepNumColor="white"
                          completedLabelColor="#686868"
                          activeStepIconColor="rgb(95,117,225)"
                          activeStepIconBorderColor="rgb(95,117,225)"
                          completedStepIconColor="rgb(95,117,225)"
                          completedProgressBarColor="rgb(95,117,225)"
                          activeLabelColor="rgb(95,117,225)"
                        >
                          <ProgressStep label="Register" removeBtnRow />
                          <ProgressStep label="Profile" removeBtnRow />
                          <ProgressStep label="Verification" removeBtnRow />
                          <ProgressStep label="Complete" removeBtnRow />
                        </ProgressSteps>
                      </View>
                      <View
                        style={{
                          // alignSelf: "flex-end",
                          // alignItems: "center",
                          marginTop: 80,
                          // marginHorizontal: 10,
                          // marginBottom: 10,
                          borderRadius: 5,
                          // paddingRight: 20,
                          // height: 40,
                          // width: width*.9,
                          // backgroundColor: "black",
                        }}
                      >
                        <Button
                          style={{
                            flexDirection: "row",
                            height: 20,
                            alignSelf: "flex-end",
                            marginBottom: 50,
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
                  </TouchableOpacity>
                  <Block flex style={styles.profileCard}>
                    <Block middle style={styles.avatarContainer}>
                      {openCover == true ? (
                        <ImageView
                          useNativeDriver={true}
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
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => setopenPro(!openPro)}
                      >
                        <ImageBackground
                          source={{ uri: i.profile }}
                          imageStyle={styles.avatar}
                          style={styles.avatar}
                        >
                          <TouchableOpacity
                            onPress={pickImage_profile}
                            style={{
                              justifyContent: "flex-end",
                              alignSelf: "flex-end",
                              backgroundColor: "black",
                              padding: 5,
                              borderRadius: 15,
                              left: -10,
                            }}
                          >
                            {openPro == true ? (
                              <ImageView
                                animationType="none"
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
                            {proload == false ? (
                              <Icon
                                size={15}
                                color="white"
                                name="camera"
                                family="Feather"
                              />
                            ) : (
                              <ActivityIndicator color="white" />
                            )}
                          </TouchableOpacity>
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
                    <Text
                      bold
                      size={16}
                      color="#525F7F"
                      style={{ marginTop: 30, alignSelf: "center" }}
                    >
                      Build Your Profile.
                    </Text>
                    <Text
                      size={14}
                      color="#525F7F"
                      style={{ marginTop: 3, alignSelf: "center" }}
                    >
                      Tell something about your self.
                    </Text>
                    <Text
                      bold
                      size={16}
                      color="#525F7F"
                      style={{
                        marginTop: 3,
                        alignSelf: "flex-start",
                        marginTop: 20,
                      }}
                    >
                      Personal Information
                    </Text>


                    <Block width={width * 0.9}>
                      <Text
                        size={14}
                        color="#525F7F"
                        style={{
                          marginTop: 3,
                          alignSelf: "flex-start",
                          marginTop: 10,
                        }}
                      >
                        Nick Name
                      </Text>
                      <Input
                        value={Nname}
                        // borderless
                        color="#525F7F"
                        placeholder={"Nick name"}
                        onChangeText={(e) => {
                          setNname(e);
                        }}
                        style={{
                          height: height < 700 ? height * 0.07 : height * 0.05,
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
                        style={{
                          marginTop: 3,
                          alignSelf: "flex-start",
                          marginTop: 10,
                        }}
                      >
                        Refer me as
                      </Text>

                      <TouchableOpacity
                        onPress={() => navigation.navigate("ReferMe")}
                        activeOpacity={0.7}
                        style={{
                          width: width * 0.89,
                          // height: 40,

                          justifyContent: "center",
                          paddingHorizontal: 5,
                          marginTop: 10,
                          paddingLeft: 16,
                          //  borderWidth:1,
                          borderRadius: 5,
                          backgroundColor: "white",
                          shadowOpacity: 100,
                          height: height < 700 ? height * 0.07 : height * 0.045,

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
                            Choose
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

                    <Block style={{ marginTop: 10 }}>
                     
                      <Text
                        size={14}
                        color="#525F7F"
                        style={{ alignSelf: "flex-start", marginTop: 10 }}
                      >
                        Current location
                      </Text>

                      <TouchableOpacity
                        activeOpacity={0.9}
                        style={{
                          width: width * 0.88,
                          minHeight: height * 0.04,
                          justifyContent: "center",
                          paddingHorizontal: 5,
                          marginTop: 10,
                          //  borderWidth:1,
                          borderRadius: 5,
                          paddingLeft: 16,
                          backgroundColor: "white",
                          shadowOpacity: 100,
                          height: height < 700 ? height * 0.07 : height * 0.05,

                          shadowColor: "black",
                          shadowRadius: 0.2,
                          shadowOffset: { height: 0, width: 0 },
                          elevation: 0.9,
                        }}
                      >
                        {LocationPicked == undefined ? (
                          <Text
                            size={14}
                            color="#525F7F"
                            style={{ alignSelf: "flex-start" }}
                          >
                            {profLocation == undefined ||
                            `${" ,"}${String}${" ,"}` ||
                            `${" ,"}${" ,"}${" ,"}${String}` ||
                            `${" ,"}${String}${" ,"}${""}`
                              ? "Current location not found"
                              : profLocation}
                          </Text>
                        ) : (
                          <Text
                            size={14}
                            color="#525F7F"
                            style={{ alignSelf: "flex-start" }}
                          >
                            {locationIs == "undefined ,undefined ,undefined" ||
                            ""
                              ? "Current location not found"
                              : locationIs}
                          </Text>
                        )}
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{
                          width: width * 0.88,
                          height: 45,
                          justifyContent: "center",
                          paddingHorizontal: 5,
                          marginTop: 20,
                          borderRadius: 5,
                          paddingLeft: 16,
                          backgroundColor: "white",
                          shadowOpacity: 100,
                          shadowColor: "black",
                          shadowRadius: 0.2,
                          elevation: 0.9,
                          shadowOffset: { height: 0, width: 0 },
                        }}
                        onPress={() => navigation.navigate("GooglePlacesInput")}
                      >
                        <Text size={15} color="#525F7F">
                          Search Location (if not above)
                        </Text>
                      </TouchableOpacity>
                    </Block>

                    <Block width={width * 0.9}>
                      <Button
                        color="primary"
                        style={styles.createButton}
                        onPress={() => {
                          if (referMe == null || Nname == null) {
                            Alert.alert("Please fill all required fild");
                          } else {
                            setNname(null);
                            navigation.navigate("ProfileB2", {
                              Nname,
                              referMe,
                              locationIs,
                              param,
                            });
                          }
                        }}
                      >
                        <Text
                          style={{ fontFamily: "open-sans-bold" }}
                          size={14}
                          color={argonTheme.COLORS.WHITE}
                        >
                          UPDATE
                        </Text>
                      </Button>
                    </Block>
                  </Block>
                </Block>
              );
            })}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
// }

const styles = StyleSheet.create({
  inputIcons: {
    marginRight: 12,
  },
  createButton: { marginTop: 30 },
  profileContainer: {
    width: width,
  },
  profileBackground: {
    width: width,
    // height: height * 0.33,
    // backgroundColor: "blue",
  },

  profileCard: {
    padding: (width * 0.1) / 3,
    paddingVertical: width * 0.02,
    marginHorizontal: width * 0.02,
    marginTop: 20,
    // marginRight: 6,

    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
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
    marginTop: 12.5,
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
});

export default ProfileBuilder;
