import React, { useEffect, useState } from "react";
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
  View,
  TouchableOpacity,
} from "react-native";
import { Block, Text } from "galio-framework";
import { useSelector, useDispatch } from "react-redux";
import {
  EmailCodeVerify_action,
  EmailVerify_action,
  SmsCodeVerify_action,
  SmsVerify_action,
  UserLoaction,
} from "../redux/reducers/ap-user/ap_user_actions";
import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
const { width, height } = Dimensions.get("screen");
import * as Location from "expo-location";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMediaLibraryPermissionsAsync } from "expo-image-picker";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
function EmailVerify({ navigation }) {
  const [sms, setsms] = useState(false);
  const [mail, setmail] = useState(false);

  const [emailCode, setemailCode] = useState(null);
  const [mobileCode, setmobileCode] = useState(null);

  const dispatch = useDispatch();
  var emailFormData = new FormData();
  var codeFormData = new FormData();
  const { token_is, Showprofile } = useSelector(
    (state) => state.Blog_For_Each_Item
  );
  const { Guest_id } = useSelector((state) => state.ActiveId_Reducer);
  const { aplogin_loading } = useSelector((state) => state.ap_user);
  // console.log(Showprofile)
  let mailis = Showprofile && Showprofile[0].email;
  let contct = Showprofile && Showprofile[0].contact;
  let countrycode = Showprofile && Showprofile[0].country_code;
  let userid = Showprofile && Showprofile[0].id;

  let location;
  let obj2;
  const loc = async () => {
    let locationSuccess = false;

    while (!locationSuccess) {
      try {
        let gpsServiceStatus = await Location.hasServicesEnabledAsync();
        if (gpsServiceStatus) {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            Alert.alert("Permission to access location was denied");
            return;
          }
          location = await Location.getLastKnownPositionAsync({
            accuracy: Location.Accuracy.High,
            enableHighAccuracy: true,
          });
          locationSuccess = true;
          // console.log(location);
          let latitude = location && location.coords.latitude;
          let longitude = location && location.coords.longitude;

          let obj = {};
          obj = { ...obj, latitude, longitude };
          // console.log(obj,"{{{{{{")
          let LocationIs = await Location.reverseGeocodeAsync(obj);
          obj2 = await LocationIs[0];
          if (obj2 == undefined) {
            console.log("object loc is undefined");
          } else {
            console.log("object loc is not  undefined");

            postLocation(obj2);
          }
        } else {
          // Alert.alert('Permission to access location was gpsServiceStatus denied');
        }
      } catch (ex) {
        console.log(ex, "retring....");
      }
    }
  };

  useEffect(() => {
    loc();
    
  }, []);
  const postLocation = async (data) => {
    let user_id = await userid;
    let fcity = (await data) && data.city;
    let fcountry = (await data) && data.country;
    let fregion = (await data) && data.region;
    let fsubregion = (await data) && data.subregion;
    let fstreet = (await data) && data.street;

    var bodyFormData = new FormData();
    bodyFormData.append("user_id", user_id);
    bodyFormData.append("city", fcity);
    bodyFormData.append("country", fcountry);
    bodyFormData.append("region", fregion);
    bodyFormData.append("subregion", fsubregion);
    bodyFormData.append("street", fstreet);
    console.log(bodyFormData);
    if (userid == undefined) {
      return null;
    } else {
      dispatch(UserLoaction(bodyFormData));
    }
  };

  const smsGetFun = async () => {
    emailFormData.append("action", "generate");
    emailFormData.append("token", token_is);
    return dispatch(SmsVerify_action(emailFormData, navigation));
  };

  const emailGetFun = async () => {
    codeFormData.append("action", "generate");
    codeFormData.append("token", token_is);
    return dispatch(EmailVerify_action(codeFormData, navigation));
  };

  const emailSmsCodeSendFun = async () => {
    var emailFormData = new FormData();
    var codeFormData = new FormData();
    emailFormData.append("action", "verify");
    emailFormData.append("token", token_is);
    emailFormData.append("code", emailCode);
    codeFormData.append("action", "verify");
    codeFormData.append("token", token_is);
    codeFormData.append("code", mobileCode);
    console.log(codeFormData);
    // dispatch(SmsCodeVerify_action(codeFormData, navigation));
    dispatch(EmailCodeVerify_action(emailFormData, navigation, Guest_id));
  };

  return (
    <DismissKeyboard>
      <Block flex center>
        <Block
          style={{
            width: "100%",
            height: "20%",
          }}
        >
          <View style={{ flex: 1, marginBottom: 50 }}>
            <ProgressSteps
              activeStep={2}
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
        </Block>
        <Block style={{ width: width * 0.8 }}>
          <Text
            style={{
              fontFamily: "open-sans-bold",
              alignSelf: "flex-start",
            }}
            color="#8898AA"
            size={20}
          >
            Verification
          </Text>
        </Block>
        <Block middle center style={styles.registerContainer}>
          <Block style={{ width: width * 0.8 }} middle>
            <Text
              style={{
                fontFamily: "open-sans-regular",
                alignSelf: "flex-start",
              }}
              color="#8898AA"
              size={14}
            >
              Code will be send to{" "}
              {mailis.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, "$1***@$2")} Please
              check your inbox or spam folder.
            </Text>
          </Block>
          <Block
            row
            middle
            space={"between"}
            width={width * 0.85}
            height={50}
            style={{
              marginVertical: 10,
              marginBottom: 20,
              backgroundColor: "white",
              paddingRight: 10,
              borderRadius: 5,
            }}
          >
            <Input
              onChangeText={(e) => {
                setemailCode(e);
              }}
              style={{ width: width * 0.55 }}
              borderless
              placeholder="Email Verification Code"
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
            <TouchableOpacity
            style={{backgroundColor: "#eee",borderRadius:25,paddingHorizontal:10,paddingBottom:3}}
              onPress={() => {
                setsms(true);
                emailGetFun();
              }}
            >
              {sms == false ? (
                <Text
                  style={{
                    fontFamily: "open-sans-regular",
                  }}
                  color="#8898AA"
                  size={14}
                >
                  Send code
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: "open-sans-regular",
                  }}
                  color="#8898AA"
                  size={16}
                >
                  Resend code
                </Text>
              )}
            </TouchableOpacity>
          </Block>
          {/* <Block style={{ width: width * 0.8 }} middle>
            <Text
              style={{
                fontFamily: "open-sans-regular",
                alignSelf: "flex-start",
              }}
              color="#8898AA"
              size={14}
            >
              Code will be send to {countrycode}
              {contct?.replace(/\d(?=\d{2})/g, "*")}
            </Text>
          </Block> */}

          {/* <Block
            row
            middle
            space={"between"}
            width={width * 0.85}
            height={50}
            style={{
              marginVertical: 10,
              backgroundColor: "white",
              paddingRight: 10,
              borderRadius: 5,
            }}
          >
            <Input
              onChangeText={(e) => {
                setmobileCode(e);
              }}
              style={{ width: width * 0.55 }}
              borderless
              placeholder="Mobile Verification Code"
              iconContent={
                <Icon
                  size={16}
                  color="#ADB5BD"
                  name="mobile-screen-share"
                  family="MaterialIcons"
                  style={styles.inputIcons}
                />
              }
            />
            <TouchableOpacity
              onPress={() => {
                setmail(true);

                smsGetFun();
              }}
            >
              {mail == false ? (
                <Text
                  style={{
                    fontFamily: "open-sans-regular",
                  }}
                  color="#8898AA"
                  size={16}
                >
                  Send code
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: "open-sans-regular",
                  }}
                  color="#8898AA"
                  size={16}
                >
                  Resend code
                </Text>
              )}
            </TouchableOpacity>
          </Block> */}

          <Block center>
            <Button
              onPress={() => {
                emailSmsCodeSendFun();
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
                  Submit
                </Text>
              ) : (
                <ActivityIndicator color={"white"} />
              )}
            </Button>
          </Block>
        </Block>
      </Block>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height < 812 ? height * 0.6 : height * 0.4,

    borderRadius: 4,
    marginTop: height * 0.05,
  },
  inputIcons: {
    marginRight: 12,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 50,
    marginBottom: 40,
  },
});

export default EmailVerify;
