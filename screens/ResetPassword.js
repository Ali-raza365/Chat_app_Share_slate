import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Block, Text } from "galio-framework";
import { useSelector, useDispatch } from "react-redux";
import { Reset_Password } from "../redux/reducers/ap-user/ap_user_actions";
import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import Loading from "../constants/loading";
const { width, height } = Dimensions.get("screen");

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
function ResetPassword({ navigation }) {
  const [email, setemail] = useState("");
  const dispatch = useDispatch();
  var bodyFormData = new FormData();
  bodyFormData.append("email", email);

  const { aplogin_loading, ap_resetpassword } = useSelector(
    (state) => state.ap_user
  );
  const resetpass = () => {
    if (email == "") {
      Alert.alert("please enter  email");
    } else {
      return dispatch(Reset_Password(bodyFormData, navigation));
    }
  };

  return (
    <DismissKeyboard>
      <Block flex center>
        <ImageBackground
          source={require("../assets/bg.jpeg")}
          style={{ width, height, zIndex: 1, paddingVertical: 100 }}
        >
          <Block
            center
            style={{
              width: "100%",
              height: "10%",
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            <Image
              source={require("../assets/home.png")}
              resizeMode={"contain"}
              style={{ width: width * 0.7, marginBottom: -4 }}
            />
            
          </Block>
        
          {/* <Block flex middle> */}
            <Block middle center style={styles.registerContainer}>
              <Block flex={0.7} middle>
                <Text
                  style={{
                    fontFamily: "open-sans-regular",
                    textAlign: "center",
                  }}
                  color="#8898AA"
                  size={20}
                >
                  Forgot Password
                </Text>
              </Block>

              <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                <Input
                  onChangeText={(e) => {
                    setemail(e);
                  }}
                  borderless
                  placeholder="Email"
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

              <Block center>
                <Button
                  onPress={() => {
                    resetpass();
                  }}
                  color="primary"
                  style={styles.createButton}
                >
                  {aplogin_loading == false ? (
                    <Text
                      style={{ fontFamily: "open-sans-bold" }}
                      size={14}
                      color={argonTheme.COLORS.WHITE}
                    >
                      Forgot Password
                    </Text>
                  ) : (
                    <ActivityIndicator color={"white"} />
                  )}
                </Button>
              </Block>
            </Block>
          {/* </Block> */}
       
        </ImageBackground>
      </Block>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height < 812 ? height * 0.5 : height * 0.3,
    backgroundColor: "#F4F5F7",
    // backgroundColor: "red",
    borderRadius: 4,
marginTop:height*.15,

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
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40,
  },
});

export default ResetPassword;
