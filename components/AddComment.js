import React, { useEffect, useState, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TextInput,
  useWindowDimensions,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Button } from "../components";
import argonTheme from "../constants/Theme";
import { Add_Blog_Comment_action } from "../redux/reducers/blog/Blog_For_Each_Item_action";
import { useSelector, useDispatch } from "react-redux";
import { Rating as RatingStar } from "react-native-ratings";

const { width, height } = Dimensions.get("screen");
export default function AddComment({ navigation, bid, getComments }) {
  const [onRate, setonRate] = useState(null);
  const [coment, setcoment] = useState(null);

  //dispatch
  const dispatch = useDispatch();
  const { Guest_id } = useSelector((state) => state.ActiveId_Reducer);

  //token
  const token_redux = useSelector((state) => state.Blog_For_Each_Item.token_is);
  //add comment
  const add_comment = async () => {
    let id = bid;
    let type = "blog";
    let token = await token_redux;
    var bodyFormData = new FormData();

    if (onRate == null) {
      Alert.alert("Missing required fields!");
    } else {
      bodyFormData.append("type", type);
      bodyFormData.append("token", token);
      bodyFormData.append("blogId", id);
      bodyFormData.append("rate", onRate);
      bodyFormData.append("comment", coment);

      dispatch(Add_Blog_Comment_action(bodyFormData, navigation));
      getComments();
      setcoment(null);
      setonRate(null);
    }
  };

  return (
    <Block flex style={styles.leaveComent}>
      <Text
        style={{ fontFamily: "open-sans-regular" }}
        muted
        size={20}
        style={{ paddingVertical: 9 }}
        color={argonTheme.COLORS.TEXT}
      >
        Leave review
      </Text>
      <Block
        left
        style={{
          width: width * 0.9,
          paddingVertical: 5,
          justifyContent: "flex-start",
        }}
      >
        <Text
          style={{
            fontFamily: "open-sans-regular",
            fontWeight: "bold",
          }}
          center
          size={14}
          color={"#686868"}
        >
          Rate
        </Text>

        <TouchableOpacity
          onPress={() => {
            if (Guest_id == "-1") {
              Alert.alert(
                "Login Required",
                "",
                [
                  { text: "Cancel" },
                  {
                    text: "Login",
                    onPress: () => navigation.navigate("Login"),
                    style: "destructive",
                  },
                ],
                { cancelable: false }
              );
            } else {
              return null;
            }
          }}
          activeOpacity={0.9}
        >
          <RatingStar
            ratingTextColor="rgb(170,170,170)"
            startingValue={onRate}
            imageSize={25}
            fractions
            readonly={Guest_id == "-1" ? true : false}
            type="custom"
            onFinishRating={(e) => {
              setonRate(e);
            }}
            style={{ marginVertical: 20 }}
          />
        </TouchableOpacity>
      </Block>
      <Block
        style={{
          padding: 5,
          backgroundColor: "white",
          borderRadius: 5,
          shadowColor: "#171717",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 1,
          elevation: 1,
          zIndex: 10,
        }}
      >
        {Guest_id == "-1" ? (
          <TouchableOpacity
            onPress={() => {
              if (Guest_id == "-1") {
                Alert.alert(
                  "Login Required",
                  "",
                  [
                    { text: "Cancel" },
                    {
                      text: "Login",
                      onPress: () => navigation.navigate("Login"),
                      style: "destructive",
                    },
                  ],
                  { cancelable: false }
                );
              } else {
                return null;
              }
            }}
          >
            <TextInput
              editable={false}
              selectTextOnFocus={true}
              style={{
                height: 150,
                justifyContent: "flex-start",
                // backgroundColor:"red"
              }}
              disable
              value={coment}
              placeholder=""
            ></TextInput>
          </TouchableOpacity>
        ) : (
          <TextInput
            numberOfLines={10}
            multiline={true}
            style={{
              height: 150,
              justifyContent: "flex-start",
            }}
            value={coment}
            onChangeText={(e) => {
              setcoment(e);
            }}
            placeholder=" Type your comment here... "
          ></TextInput>
        )}
      </Block>

      <Block>
        <Button
          onPress={() => {
            if (Guest_id == "-1") {
              Alert.alert(
                "Login Required",
                "",
                [
                  { text: "Cancel" },
                  {
                    text: "Login",
                    onPress: () => navigation.navigate("Login"),
                    style: "destructive",
                  },
                ],
                { cancelable: false }
              );
            } else {
              add_comment();
            }
          }}
          color="primary"
          style={styles.createButton}
        >
          <Text
            style={{ fontFamily: "open-sans-bold" }}
            size={14}
            color={argonTheme.COLORS.WHITE}
          >
            {Guest_id == "-1" ? "Login Required" : "Post Comment"}
          </Text>
        </Button>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  leaveComent: {
    // height: 400,
    width: width * 0.9,
    marginBottom: 50,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginLeft: 0,
  },
});
