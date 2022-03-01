import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Block, Text } from "galio-framework";
import { argonTheme } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { blockList_action, unblockUser_action } from "../redux/reducers/userBlockHide/myBlog_action";
const { height, width } = Dimensions.get("window");
import { useIsFocused } from '@react-navigation/native';

export default function UnblockUser({
  data,
  style,
  system,
  navigation,
  transparent,
}) {



  const blockListFunc=()=>{
  dispatch(blockList_action(token_is,navigation))
  
  }
  const isFocused = useIsFocused();

  useEffect(() => {
  }, [isFocused])

  const { token_is } = useSelector((state) => state.Blog_For_Each_Item);
  const { myblog_loading,blockList } = useSelector((state) => state.myblog);

  const iconContainer = [
    styles.iconContainer,
    system && { width: 34, height: 34 },
    !system && styles.iconShadow,
  ];
  const dispatch = useDispatch();
  const container = [
    styles.card,
    !transparent && { backgroundColor: argonTheme.COLORS.WHITE },
    !transparent && styles.cardShadow,
    system && { height: 78 },
    style,
  ];

const unbFunc=useCallback(
 async (id) => {
  await  dispatch(
      unblockUser_action(
        {
          action: "unblock",
          token: token_is,
          id: id,
        },
        navigation
      )
    );
    blockListFunc()
  },
  [blockList]
);
console.log(blockList,"KKK")


if (blockList == undefined) {
  return (
    <Text
      color={argonTheme.COLORS.TEXT}
      size={system ? 13 : 14}
      style={{
        fontFamily: system ? "open-sans-bold" : "open-sans-regular",
        marginRight: 110,
      }}
    >
      No block user found
    </Text>
  );
} else {
  return (

    <Block style={container}>
      

      <TouchableWithoutFeedback >
        <Block row style={{ width: "100%" }}>
          <Block middle style={iconContainer}>
            <Image
              style={{ width: 45, height: 45, borderRadius: 30 }}
              source={{ uri: data.image }}
            />
          </Block>
          <Block flex  style={{ paddingRight: 3, paddingLeft: 12 }}>
            <Text
              color={argonTheme.COLORS.PRIMARY}
              size={system ? 13 : 14}
              style={{
                fontFamily: system ? "open-sans-bold" : "open-sans-regular",
              }}
            >
             { data.name}
            </Text>
            <Text
              color={argonTheme.COLORS.TEXT}
              size={system ? 13 : 14}
              style={{
                fontFamily: system ? "open-sans-bold" : "open-sans-regular",
              }}
            >
              {data.date}
            </Text>
          </Block>
          <Block row flex={0.25} style={{ alignSelf: "center" }}>
            <TouchableOpacity
              onPress={() => {
                unbFunc(data.user_id)
                // );
              }}
            >
              <Text
                color={argonTheme.COLORS.MUTED}
                style={{
                  fontFamily: "open-sans-regular",
                  marginLeft: -7,
                  marginTop: -2,
                }}
                size={12}
              >
                Unblock
              </Text>
            </TouchableOpacity>
          </Block>
        </Block>
      </TouchableWithoutFeedback>

    </Block>
  );
}
  
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 46,
    height: 46,
    marginLeft: 5,
    // borderRadius: 23,

    marginTop: 5,
  },
  iconShadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  card: {
    zIndex: 2,
    maxHeight: 120,
    width: width * 0.88,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 6,
    marginVertical: 10,
  },
  cardShadow: {
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});
