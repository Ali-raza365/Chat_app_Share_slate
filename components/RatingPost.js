import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { Block, Text, theme } from "galio-framework";
import { Button, Header, Icon, Input, Card } from ".";
import argonTheme from "../constants/Theme";
import { Rating as RatingStar } from "react-native-ratings";
import { AddRating_action } from "../redux/reducers/blog/Blog_For_Each_Item_action";
const { width, height } = Dimensions.get("screen");

export default function RatingPost({ bid, token,navigation,onRateChage }) {
  console.log(onRateChage,"************************")
  const [read, setread] = useState(false);
  // console.log(navigation,"+++++++++++++")
  let addrate = new FormData();
  const { Guest_id } = useSelector((state) => state.ActiveId_Reducer);

  const dispatch = useDispatch();
  const add = (val) => {
    onRateChage(val)
  };

  return (
    <Block left style={styles.container}>
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
          startingValue={0}
          imageSize={25}
          fractions
          readonly={Guest_id == "-1" ? true : false}
          type="custom"
          onFinishRating={(e) => {
            onRateChage
          
          }}
          style={{ marginVertical: 20 }}
        />
      </TouchableOpacity>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    // backgroundColor: "red",
    paddingVertical: 5,
    justifyContent: "flex-start",
  },
});
