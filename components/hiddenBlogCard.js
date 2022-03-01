import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Block, Text } from "galio-framework";
import { argonTheme } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { hideBlogList_action, unhideBlog_action } from "../redux/reducers/blog/Blog_For_Each_Item_action";
const { height, width } = Dimensions.get("window");
export default function HiddenBlogCard({
  style,
  system,
  data,
  transparent,navigation
}) {
  // console.log(data);
  const iconContainer = [
    styles.iconContainer,
    system && { width: 34, height: 34 },
    !system && styles.iconShadow,
  ];

  const container = [
    styles.card,
    !transparent && { backgroundColor: argonTheme.COLORS.WHITE },
    !transparent && styles.cardShadow,
    system && { height: 78 },
    style,
  ];



  const { token_is ,hideBlogList} = useSelector((state) => state.Blog_For_Each_Item);

const dispatch = useDispatch();

const blockListFunc=()=>{
  dispatch(hideBlogList_action(token_is,navigation))
  
  }
const unhideFunc=useCallback(
 async () => {
   await dispatch(
      unhideBlog_action(
        {
          activity: "blog",
          token: token_is,
          ActivityId: data.blog_id,
        },
        navigation
      )
    );
   await blockListFunc()
  },
  [hideBlogList],
)
 
  if (data == undefined) {
    return (
      <Text
        color={argonTheme.COLORS.TEXT}
        size={system ? 13 : 14}
        style={{
          fontFamily: system ? "open-sans-bold" : "open-sans-regular",
          marginRight: 110,
        }}
      >
        No hidden blog found
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
            <Block flex style={{ paddingRight: 3, paddingLeft: 12 }}>
              <Text
                color={argonTheme.COLORS.PRIMARY}
                size={system ? 13 : 14}
                style={{
                  fontFamily: system ? "open-sans-bold" : "open-sans-regular",
                }}
              >
               { data.title}
              </Text>
              <Text
                color={argonTheme.COLORS.TEXT}
                size={system ? 13 : 14}
                style={{
                  fontFamily: system ? "open-sans-bold" : "open-sans-regular",
                }}
              >
                {data.hide_date}
              </Text>
            </Block>
            <Block row flex={0.25} style={{ alignSelf: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  unhideFunc()
                }}
              >
                <Text
                  color={argonTheme.COLORS.MUTED}
                  style={{
                    fontFamily: "open-sans-regular",
                    // marginLeft: 3,
                    marginTop: -2,
                  }}
                  size={12}
                >
                  Unhide
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
    width: width * 0.89,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 5,
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
