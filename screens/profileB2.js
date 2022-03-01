import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  View,
} from "react-native";
import { Block, Text, theme, Input } from "galio-framework";
import Icon from "../components/Icon";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { Button, Header } from "../components";
import { Images, argonTheme } from "../constants";
import { ProfileBuild_action } from "../redux/reducers/blog/Blog_For_Each_Item_action";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

import DropDownPicker from "react-native-dropdown-picker";
import { Location_Action } from "../redux/reducers/App_Realated/AppActon";
import { ReferMe_action } from "../redux/reducers/ap-user/ap_user_actions";

const { width, height } = Dimensions.get("screen");

function ProfileB2({ navigation, route }) {
  // console.log(route, "gggggggggg");
  let param = route.params?.param;

  // let firstn = route.params?.fname;
  // let lastn = route.params?.lname;
  let nickN = route.params?.Nname;
  let pick1 = route.params?.referMe;
  let Locis = route.params?.locationIs;
  // console.log(pick1, "jjj");
  //designation
  const [Value2, setValue2] = useState(null);
  const [open2, setOpen2] = useState(false);
  const [Sattend, setSattend] = useState(null);
  const [CUattend, setCUattend] = useState(null);
  const [Bio, setBio] = useState(null);
  //

  const dispatch = useDispatch();

  // designation array

  var arr2 = [
    { label: "Student", value: "Student" },
    { label: "Professional", value: "Professional" },
    { label: "CEO-Founder", value: "CEO-Founder" },
    { label: "CEO-CO-Founder", value: "CEO-CO-Founder" },
    { label: "Founder", value: "Founder" },
    { label: "CEO", value: "CEO" },
    { label: "Others", value: "Others" },
  ];
  const {Guest_id} = useSelector(state => state.ActiveId_Reducer)
// console.log(Guest_id,"bbbbbbbbbbbb")
  const { token_is } = useSelector((state) => state.Blog_For_Each_Item);

  const updaProfile = async () => {
    let token = await token_is;
    var bodyFormData = new FormData();
    bodyFormData.append("token", token);
    bodyFormData.append("nick_name", nickN);
    bodyFormData.append("refer", pick1);
    bodyFormData.append("user_location", Locis);
    bodyFormData.append("designation", Value2);
    bodyFormData.append("school", Sattend);
    bodyFormData.append("college", CUattend);
    bodyFormData.append("bio", Bio);
    // console.log(bodyFormData, "+++++++++++++++++++++");
    if ((pick1 && nickN) == null) {
      Alert.alert("please fill all required feilds");
    } else {
      setBio(null)
      setCUattend(null)
      setSattend(null)
      dispatch(Location_Action('null'))
      dispatch(ReferMe_action(''))


      dispatch(ProfileBuild_action(bodyFormData, navigation,Guest_id,param));
    }
  };

  //loading
  const { blog_loading } = useSelector((state) => state.Blog_For_Each_Item);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
      <View style={{flex: 1,marginBottom:height*.04}}>
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
            </ProgressSteps></View>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <Block flex style={styles.profileCard}>
          <Text
            bold
            size={15}
            color="#525F7F"
            style={{  alignSelf: "flex-start", marginTop: 10 }}
          >
            Education & Profession
          </Text>
          <Block>
            <Text
              size={14}
              color="#525F7F"
              style={{  alignSelf: "flex-start", marginTop: 10 }}
            >
              Designation
            </Text>
            <DropDownPicker
              listMode="MODAL"
              textStyle={{ color: "#525F7F" }}
              placeholder=" Choose"
              style={{
                borderColor: "rgb(242,243,242)",
                borderWidth: 0.5,
                borderRadius: 5,
                height: height < 700 ? height * 0.07 : height * 0.05,

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
              style={{  alignSelf: "flex-start", marginTop: 20 }}
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
                  height: height < 700 ? height * 0.07 : height * 0.05,

                  shadowOpacity: 0.13,
                  backgroundColor: "white",
                  shadowColor: argonTheme.COLORS.BLACK,
                  shadowOffset: { height: 1, width: 0 },
                  elevation: 0.9,
                }}
                placeholderTextColor="#525F7F"
                placeholder={"Enter here"}
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
              style={{  alignSelf: "flex-start", marginTop: 10 }}
            >
              College/University Attended
            </Text>
            <Input
              value={CUattend}
              // borderless
              color="#525F7F"
              placeholder={"Enter here"}
              style={{
                shadowRadius: 100,
                height: height < 700 ? height * 0.07 : height * 0.05,

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
            style={{  alignSelf: "flex-start", marginTop: 10 }}
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
              }}
              value={Bio}
              onChangeText={(e) => {
                setBio(e);
              }}
              placeholder="A few words about you..."
              placeholderTextColor="#525F7F"
            ></TextInput>
          </Block>

          <Block width={width * 0.9}>
            <Button
              color="primary"
              style={styles.createButton}
              onPress={() => {
                updaProfile();
              }}
            >
              {/* {blog_loading == false ? ( */}
                <Text
                  style={{ fontFamily: "open-sans-bold" }}
                  size={14}
                  color={argonTheme.COLORS.WHITE}
                >
                  UPDATE
                </Text>
              {/* ) : (
                <ActivityIndicator color={"white"} />
              )} */}
            </Button>
          </Block>
        </Block>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputIcons: {
    marginRight: 12,
  },
  createButton: { marginTop: 20 },

  profileCard: {
    padding: (width * 0.1) / 3,
    paddingVertical: theme.SIZES.BASE,
    marginLeft: 8,
    marginRight: 6,
    marginTop: 10,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    // backgroundColor: theme.COLORS.WHITE,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
  },
});

export default ProfileB2;
