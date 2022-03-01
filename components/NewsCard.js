import React, { useEffect, useState, createRef, useRef } from "react";
import { withNavigation } from "@react-navigation/compat";
import {
  StyleSheet,
  Image,Share,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { Block, Icon, Text, theme } from "galio-framework";
import { argonTheme } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { Activity_action } from "../redux/reducers/NEWS/NewsAction";
const { width, height } = Dimensions.get("screen");
import AdInterstial from "./AdsInterstial";
import * as Sharing from 'expo-sharing'; 
import * as FileSystem from 'expo-file-system';
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
function NewsCard({
  navigation,
  item,
  horizontal,
  full,
  style,
  ctaColor,
  imageStyle,
}) {
 
  const { token_is } = useSelector((state) => state.Blog_For_Each_Item);
  const dispatch = useDispatch();
  const adsInter = useRef();

  const activityNews = async (id) => {
    let token = await token_is;

    var activedata = new FormData();
    activedata.append("action", "add");
    activedata.append("activity", "5");
    activedata.append("activity_id", id);
    activedata.append("token", token);
    await dispatch(Activity_action(activedata, navigation));
    await adsInter.current.ads();

    navigation.navigate("MyWebComponent", a);
  };

  const imageStyles = [
    full ? styles.fullImage : styles.horizontalImage,
    imageStyle,
  ];
  const cardContainer = [styles.card, styles.shadow, style];
  const imgContainer = [
    styles.imageContainer,
    horizontal ? styles.horizontalStyles : styles.verticalStyles,
    styles.shadow,
  ];



  
  const onShare = async (a) => {
    try {
      const result = await Share.share({
        message:
          a
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
          console.log("share data error in news")
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed

      }
    } catch (error) {
      alert(error.message);
    }
  };
 




 

  return (
    <Block row={horizontal} card flex style={cardContainer}>
      <AdInterstial ref={adsInter} />
      <TouchableWithoutFeedback
        onPress={() => {
          activityNews(item.id);
        }}
      >
        <Block flex style={imgContainer}>
          <ContentLoader
            speed={1}
            style={imgContainer}
            // viewBox="0 0 400 160"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <Image
              source={{
                uri: item && item.image,
              }}
              style={imageStyles}
            />
          </ContentLoader>
        </Block>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          activityNews(item.id);
        }}
      >
        <Block flex space="between" style={styles.cardDescription}>
          <Block flex>
            <Text
              style={{ fontFamily: "open-sans-regular" }}
              size={14}
              numberOfLines={2}
              style={styles.cardTitle}
              color={argonTheme.COLORS.TEXT}
            >
              {item && item.title}
            </Text>
            {item && item.category ? (
              <Block flex left>
                <Text
                  style={{ fontFamily: "open-sans-regular" }}
                  size={12}
                  color={argonTheme.COLORS.TEXT}
                >
                  {item && item.category}
                </Text>
              </Block>
            ) : (
              <Block />
            )}
          </Block>
        </Block>
      </TouchableWithoutFeedback>

      <Block
        row
        middle
        style={{
          justifyContent: "space-between",
          // backgroundColor:"red",
          paddingRight: theme.SIZES.BASE / 2,
          paddingLeft: theme.SIZES.BASE / 4,
          marginTop: -5,
        }}
      >
        <Block
          style={{
            // backgroundColor: argonTheme.COLORS.PRIMARY,
            paddingHorizontal: 5,
            marginTop: 10,
            marginBottom: 5,
            borderRadius: 10,
            paddingBottom: 2,
          }}
        >
          <Text
            style={{
              fontFamily: "open-sans-bold",
            }}
            size={12}
            numberOfLines={1 / 2}
            color={argonTheme.COLORS.PRIMARY}
          >
            {item.source_name}
            {/* {item.source_name.length <15
                ? `${item.source_name}`
                : `${item.source_name.substring(0, 15)}...`} */}
          </Text>
        </Block>

        <Block>
          <TouchableOpacity   onPress={() =>onShare(item.source_url)}>
            <Icon
              name="repeat"
              family="Feather"
              size={14}
              color={argonTheme.COLORS.TEXT}
            />
          </TouchableOpacity>
        </Block>
      </Block>
    </Block>
  );

  // }
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    // backgroundColor:"red",
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 0,
    borderRadius: 5,
    marginHorizontal: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 10,
    zIndex: 100,
    borderWidth: 0.2,
  },
  cardTitle: {
    // flex: 1,
    // flexWrap: "wrap",
    paddingBottom: 6,
  },
  cardDescription: {
    // backgroundColor:"green",
    padding: theme.SIZES.BASE / 2,
    paddingBottom:0
  },
  imageContainer: {
    borderRadius: 3,

    elevation: 0,
    overflow: "hidden",
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: "auto",
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fullImage: {
    height: 215,
  },
  shadow: {
    shadowColor: "#f3f4f6",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 0.5,
    // borderWidth:1
  },
});

export default withNavigation(NewsCard);
