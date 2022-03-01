import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { argonTheme } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { Activity_action } from "../redux/reducers/NEWS/NewsAction";
import AdInterstial from './AdsInterstial'
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";

function NewsSearchCard({
  navigation,
  item,
  horizontal,
  full,
  style,
  ctaColor,
  imageStyle,
}) {
const adsInter=useRef()

  const { token_is } = useSelector((state) => state.Blog_For_Each_Item);
  const dispatch = useDispatch();
  const activityNews = async (id) => {
    let token = await token_is;

    var activedata = new FormData();
    activedata.append("action", "add");
    activedata.append("activity", "5");
    activedata.append("activity_id", id);
    activedata.append("token", token);
   await dispatch(await Activity_action(activedata, navigation));
   await adsInter.current?.ads()  

    navigation.navigate("MyWebComponent", item.source_url);
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
  return (
    <Block row={horizontal} card flex style={cardContainer}>
      <AdInterstial ref={adsInter}/>

      <TouchableWithoutFeedback
  onPress={() => {
    activityNews(item.news_id)
    // console.log(item)
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
          activityNews(item.news_id)
          // console.log(item)
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
            {item && item.category_name ? (
              <Block flex left>
                <Text
                  style={{ fontFamily: "open-sans-regular" }}
                  size={12}
                  color={argonTheme.COLORS.TEXT}
                >
                  {item && item.category_name}
                </Text>
              </Block>
             ) : (
              <Block />
             )} 
          </Block>
          <Block row style={{ justifyContent: "space-between" }}>
            {/* <Text
              style={{ fontFamily: "open-sans-bold" }}
              size={12}
              muted={!ctaColor}
              color={ctaColor || argonTheme.COLORS.ACTIVE}
              bold
            >
       View Article 
            </Text> */}
            <Block
              style={{
                // backgroundColor: "rgb(94,174,254)",
                backgroundColor: argonTheme.COLORS.PRIMARY,

                paddingHorizontal: 5,marginTop: 10,marginBottom: 5,
                borderRadius: 10,
                paddingBottom:2
              }}
            >
              <Text
                style={{
                  fontFamily: "open-sans-regular",
                }}
                size={10}
                color={"white"}
              >
               {item.source_name.length <15
                ? `${item.source_name}`
                : `${item.source_name.substring(0, 15)}...`}
              </Text>
            </Block>
          </Block>
        </Block>
      </TouchableWithoutFeedback>
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
    borderRadius: 0,
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
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    // borderRadius: 3,
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

export default NewsSearchCard;
