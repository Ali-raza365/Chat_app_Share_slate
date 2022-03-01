import React, { useEffect, useState } from "react";
import { withNavigation } from "@react-navigation/compat";
import {
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { argonTheme } from "../constants";
import { useSelector, useDispatch } from "react-redux";
import { Blog_fetching_For_Each_Item_action } from "../redux/reducers/blog/Blog_For_Each_Item_action";
import Loading from "../constants/loading";
import { ActiveId_Action } from "../redux/reducers/App_Realated/AppActon";
import { Activity_action } from "../redux/reducers/NEWS/NewsAction";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";

function Card({
  navigation,
  route,
  S_data,
  //   item,
  horizontal,
  full,
  style,
  ctaColor,
  imageStyle,
  ctaRight,
}) {
  const [id, setid] = useState(null);

  //   console.log(S_data,"!!!!!!!!!!!!!!!!!!!!!!!!!")
  // styles
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

  // dispatch state
  const dispatch = useDispatch();
  //token
  const token_redux = useSelector((state) => state.Blog_For_Each_Item.token_is);
  // console.log(token_redux,"token from Search_card")
  //fetch_item_data
  const fetch_item_data = async (id) => {
    let blogID = id;
    let token = await token_redux;
    var activedata = new FormData();
    activedata.append("action", "add");
    activedata.append("activity", "4");
    activedata.append("activity_id", blogID);
    activedata.append("token", token);
    
    dispatch(
      await Activity_action(activedata, navigation)
     );

    var bodyFormData = new FormData();
    bodyFormData.append("blogID", blogID);
    bodyFormData.append("token", token);
    //dispatch
    dispatch(
      Blog_fetching_For_Each_Item_action(bodyFormData, navigation, blogID)
    );
    dispatch(ActiveId_Action(""));

  };

  if (!S_data) {
    return <Loading />;
  }
  else {
    return (
      <Block row={horizontal} card flex style={cardContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            fetch_item_data(S_data.blog_id);
            // setid(data.id)
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
              source={{ uri: S_data && S_data.image }}
              style={imageStyles}
            />
            </ContentLoader>
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            fetch_item_data(S_data.blog_id);
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
                {S_data.title}
              </Text>
              {S_data && S_data.category_name ? (
                <Block flex left>
                  <Text
                    style={{ fontFamily: "open-sans-regular" }}
                    size={12}
                    color={argonTheme.COLORS.TEXT}
                  >
                    {S_data.category_name}
                  </Text>
                </Block>
              ) : (
                <Block />
              )}
            </Block>
            <Block right={ctaRight ? true : false}>
              {/* {!blog_loading?  */}
              <Text
                style={{ fontFamily: "open-sans-bold" }}
                size={12}
                muted={!ctaColor}
                color={ctaColor || argonTheme.COLORS.ACTIVE}
                bold
              >
                View Article
              </Text>
              {/* :<ActivityIndicator color="red"/>} */}
            </Block>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 4,
    borderRadius: 0,
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

export default withNavigation(Card);
