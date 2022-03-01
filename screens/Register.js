import React, { useState, useEffect, useRef } from "react";

import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
  Alert,View,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Block, Text } from "galio-framework";
import PhoneInput from "react-native-phone-number-input";

// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import { useSelector, useDispatch } from "react-redux";
import {
  Register_User,
  UserLoaction,
  _onAPLogin,
} from "../redux/reducers/ap-user/ap_user_actions";
import SweetAlert from "../components/SweetAlert";
const { width, height } = Dimensions.get("screen");

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

function Register({ navigation, route }) {
  let param = route.params?.value;
  // console.log(param, ")))))))))register");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");

  const dispatch = useDispatch();

  const [phoneNumber, setphoneNumber] = useState("");
  const phoneInput = useRef(null);
  const buttonPress = () => {
    Alert.alert(phoneNumber);
  };
  const { aplogin_loading, ap_register } = useSelector(
    (state) => state.ap_user
  );

  const { Guest_id } = useSelector((state) => state.ActiveId_Reducer);
  // for Guest
  var GuestData = new FormData();
  GuestData.append("email", "guest@shareslate.com");
  GuestData.append("password", "123456");
  var bodyFormData = new FormData();
  let codeis = phoneInput.current && phoneInput.current.state.code;

  bodyFormData.append("email", email.toLowerCase());
  bodyFormData.append("password", password);
  bodyFormData.append("fname", fname);
  bodyFormData.append("lname", lname);
  bodyFormData.append("contact", phoneNumber);
  bodyFormData.append("country_code", codeis);

  const register_func = async () => {
    if (
      fname == "" ||
      lname == "" ||
      email == "" ||
      password == "" ||
      phoneNumber == "" ||
      phoneInput.current == null
    ) {
      Alert.alert("Please fill all required feild");
    } else {
      await dispatch(Register_User(bodyFormData, navigation, Guest_id, param));
      
    }
  };
  return (
    <KeyboardAvoidingView keyboardVerticalOffset={2} behavior="height">

      <ScrollView>
        <Block flex height={height}>
          <StatusBar hidden />
          <ImageBackground
            source={require("../assets/bg.jpeg")}
            style={{ width, height, zIndex: 1, paddingVertical: 50 }}
          >
            <Block
              center
              style={{
                height: "10%",
              }}
            >
              <Image
                source={require("../assets/home.png")}
                resizeMode={"contain"}
                style={{ width: width * 0.7, marginBottom: 0 }}
              />
             
            </Block>

            <Block center style={styles.registerContainer}>
              <Block flex={0.2} middle>
                <Text
                  style={{
                    fontFamily: "open-sans-regular",
                    textAlign: "center",
                  }}
                  color="#8898AA"
                  size={20}
                >
                  CREATE ACCOUNT
                </Text>
              </Block>

              <Block flex space="evenly">
                <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                  <Input
                    borderless
                    placeholder="First Name"
                    onChangeText={(e) => {
                      setfname(e);
                    }}
                    onChnageText
                    iconContent={
                      <Image
                        style={styles.imgmain}
                        source={{
                          uri: "https://assets.shareslate.com/media/login/firstname-icon.png",
                        }}
                      />
                    }
                  />
                </Block>
                <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                  <Input
                    borderless
                    placeholder="Last Name"
                    onChangeText={(e) => {
                      setlname(e);
                    }}
                    iconContent={
                      <Image
                        style={styles.imgmain}
                        source={{
                          uri: "https://assets.shareslate.com/media/login/lastname-icon.png",
                        }}
                      />
                    }
                  />
                </Block>
                <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                  <Input
                    borderless
                    placeholder="Email"
                    onChangeText={(e) => {
                      setemail(e);
                    }}
                    iconContent={
                      <Icon
                        size={16}
                        color="#ADB5BD"
                        name="ic_mail_24px"
                        family="ArgonExtra"
                        style={styles.inputIcons}
                      />
                    }
                  />
                </Block>
                <Block width={width * 0.8}>
                  <Input
                    password
                    borderless
                    placeholder="Password"
                    onChangeText={(e) => {
                      setpassword(e);
                    }}
                    iconContent={
                      <Icon
                        size={16}
                        color="#ADB5BD"
                        name="padlock-unlocked"
                        family="ArgonExtra"
                        style={styles.inputIcons}
                      />
                    }
                  />
                </Block>
                <Block>
                  <PhoneInput
                    ref={phoneInput}
                    defaultValue={phoneNumber}
                    defaultCode="US"
                    layout="first"
                    withShadow
                    // autoFocus
                    // buttonTextStyle	={styles.phoneContainer}
                    containerStyle={styles.phoneContainer}
                    textContainerStyle={styles.textInput}
                    onChangeText={(text) => {
                      setphoneNumber(text);
                    }}
                  />
                </Block>
                <Block
                  middle
                  center
                  width={width * 0.8}
                  style={{
                    marginVertical: 20,
                    paddingHorizontal: width * 0.068,
                  }}
                >
                  <Text
                    size={height < 812 ? 12 : 14}
                    style={{
                      fontFamily: "open-sans-regular",
                      color: "#8898AA",
                    }}
                  >
                    By clicking Register you agree to all
                    <Block middle center row>
                      <TouchableOpacity
                        style={{ alignItems: "center" }}
                        onPress={() => {
                          navigation.navigate("TermAndCondition");
                        }}
                      >
                        <Text
                          size={height < 812 ? 12 : 14}
                          style={{
                            color: "#3366BB",
                          }}
                        >
                          Terms & Conditions
                        </Text>
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontFamily: "open-sans-regular",
                          color: "#8898AA",
                          marginLeft: 5,
                        }}
                        size={height < 812 ? 12 : 14}
                      >
                        of Share Slate
                      </Text>
                    </Block>
                  </Text>
                </Block>

                <Block center>
                  <Button
                    color="primary"
                    onPress={() => {
                      register_func();
                    }}
                    style={styles.createButton}
                  >
                    {aplogin_loading == false ? (
                      <Text
                        style={{ fontFamily: "open-sans-bold" }}
                        size={14}
                        color={argonTheme.COLORS.WHITE}
                      >
                        Register
                      </Text>
                    ) : (
                      <ActivityIndicator color={"white"} />
                    )}
                  </Button>
                </Block>

                <Block row center style={{ margin: 20 }}>
                  <Text
                    style={{
                      fontFamily: "open-sans-regular",
                      alignSelf: "center",
                    }}
                    size={14}
                    color="#8898AA"
                  >
                    Already on Share Slate?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Login");
                    }}
                  >
                    <Text
                      size={15}
                      style={{
                        fontFamily: "open-sans-bold",
                        fontWeight: "bold",
                        color: "#3366BB",
                      }}
                      color="#8898AA"
                    >
                      Login
                    </Text>
                  </TouchableOpacity>
                </Block>
                <Block row center style={{ marginBottom: 20 }}>
                <TouchableOpacity style={{flexDirection: 'row',}}
                    onPress={() => {
                      dispatch(_onAPLogin(GuestData, navigation));

                    }}
                  >
                  <Text
                    style={{
                      fontFamily: "open-sans-bold",
                      alignSelf: "center",
                      

                    }}
                    size={13}
                    color="#3366BB"
                  >
                    Continue as{" "}
                  </Text>
        
                    <Text
                      size={14}
                      style={{
                        fontFamily: "open-sans-bold",
                        fontWeight: "bold",
                        color: "#3366BB",
                      }}
                    >
                      Guest
                    </Text>
                  </TouchableOpacity>
                 
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
   
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height < 812 ? height * 0.7 : height * 0.6,
    // height:height*.6,
    backgroundColor: "#F4F5F7",
    // marginTop: 40,
    marginTop: height < 812 ? height * 0.1 : height * 0.1,

    // backgroundColor:"red",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
  },

  inputIcons: {
    marginRight: 12,
  },
  phoneContainer: {
    height: height < 812 ? height * 0.06 : 44,
    marginTop: 10,
    borderRadius: 5,

    // height: 40,
  },
  textInput: {
    paddingVertical: 0,
    borderRadius: 5,
  },

  createButton: {
    width: width * 0.5,
    height: height < 812 ? height * 0.06 : 48,

    // marginTop: 25,
    // marginBottom: 40,
  },
  imgmain: {
    width: width * 0.042,
    height: height * 0.025,
    borderColor: 30,
    // marginHorizontal: 5,
    marginRight: 10,
  },
  
});

export default Register;
