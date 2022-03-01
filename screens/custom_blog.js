import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Alert,View,
  useWindowDimensions,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Button, Header, Icon, Input, Card } from "../components";
import argonTheme from "../constants/Theme";
import {
  Blog_Comment_action,
  ReportList_Action,
} from "../redux/reducers/blog/Blog_For_Each_Item_action";
import HTML5 from "react-native-render-html";
import RenderHtml from "react-native-render-html";

import { decode } from "html-entities";
import { useSelector, useDispatch } from "react-redux";
import {
  Blog_fetching_action,
  SuggestBlog_action,
} from "../redux/reducers/blog/Blog_action";
import AddComment from "../components/AddComment";
import ShowComment from "../components/ShowComment";
import Loading from "../constants/loading";
import Rating from "../components/RatingShow";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";

import AdsBanner from "../components/AdsBanner";
import { autherProfile_action } from "../redux/reducers/userBlockHide/myBlog_action";
import { FAB } from "react-native-paper";
const { width, height } = Dimensions.get("window");

export default function Custom_blog({ navigation, route }) {
  const contentWidth = useWindowDimensions().width;
  //params
  var item = route.params?.product;
  let id = route.params?.blog_id;
  //dispatch
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const scrollLeftRight = useRef();

  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const [leftScroll, setleftScroll] = useState(0);
  const [rightScroll, setrightScroll] = useState(0);

  const CONTENT_OFFSET_THRESHOLD = 100;
  const LEFT_CONTENT_OFFSET_THRESHOLD = 1;
  const RIGHT_CONTENT_OFFSET_THRESHOLD = 1;


  const toTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
  const toLeft = () => {
    scrollLeftRight.current?.scrollTo({
      x: 0,
      animated: true,
    });
  };
  const toRight = () => {
    scrollRef.current?.scrollTo({
      X: 0,
      animated: true,
    });
  };
  //suggestios posts.
  const { SuggestBlog_info } = useSelector((state) => state.Blog_info);
  const { Blog_For_Each_Item_info, blog_loading, reportList, token_is } =
    useSelector((state) => state.Blog_For_Each_Item);
  let cateId =
    Blog_For_Each_Item_info && Blog_For_Each_Item_info[0]?.category_id;
  const { Guest_id } = useSelector((state) => state.ActiveId_Reducer);
  // console.log(SuggestBlog_info)

  //get blog for suggestion
  const SugestBlog = async () => {
    let action = "suggestion";
    let bodyFormData = new FormData();
    bodyFormData.append("action", action);
    bodyFormData.append("token", token_is);
    bodyFormData.append("category_id", cateId);

    dispatch(SuggestBlog_action(bodyFormData, navigation));
  };
  //get comment
  const getComments = async () => {
    let type = "blog";
    let bodyFormData = new FormData();
    bodyFormData.append("type", type);
    bodyFormData.append("token", token_is);
    bodyFormData.append("id", id);
    dispatch(Blog_Comment_action(bodyFormData, navigation));
  };
  //ReportList fetching
  var reportData = new FormData();
  reportData.append("token", token_is);

  let Myblog = async (id) => {
    var bodyFormData1 = new FormData();
    bodyFormData1.append("userId", id);
    bodyFormData1.append("token", token_is);
    console.log(bodyFormData1);
    await dispatch(autherProfile_action(bodyFormData1, navigation));
  };
  //useEffect
  useEffect(() => {
    dispatch(ReportList_Action(reportData));
    SugestBlog();
    getComments();
  }, [cateId,id,ShowComment]);
 


  if (blog_loading == undefined) {
    return <Loading />;
  }

  return (
    <Block style={{ backgroundColor: "white", marginBottom: 40 }}>
      <Header title="Blogs" back navigation={navigation} />

      <ScrollView
        ref={scrollRef}
        onScroll={(event) => {
          setContentVerticalOffset(event.nativeEvent.contentOffset.y);
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.about}
        overScrollMode="always"
        scrollEventThrottle={1}
      >
        {Blog_For_Each_Item_info &&
          Blog_For_Each_Item_info.map((i, index) => {
            const desc = decode(i.description);

            return (
              <Block key={index} >
                <Block width={width}>
                  <ContentLoader
                    speed={1}
                    style={styles.pic}
                    // viewBox="0 0 400 160"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                  >
                    <ImageBackground
                      style={styles.pic}
                      source={{ uri: i.featured_image }}
                    >
                      <Text
                        style={{
                          fontFamily: "open-sans-regular",
                          alignSelf: "flex-start",
                          backgroundColor: "rgb(16,92,250)",
                          paddingHorizontal: 10,
                          paddingVertical: 1,
                          borderRadius: 19,
                          marginBottom: 10,
                          marginLeft: 10,
                        }}
                        center
                        size={12}
                        color={"white"}
                      >
                        {i.category}
                      </Text>
                    </ImageBackground>
                  </ContentLoader>
                </Block>

                <Block flex row style={styles.pic_down_text}>
                  <Text
                    style={{
                      fontFamily: "open-sans-regular",
                      paddingTop: 9,
                      paddingRight: 8,
                    }}
                    muted
                    size={16}
                    color={"#686868"}
                  >
                    By
                  </Text>
                  <TouchableOpacity
                    style={{ borderBottomWidth: 2, borderColor: "red" }}
                    onPress={() => {
                      if (Guest_id == "-1") {
                        Alert.alert(
                          "Login Required",
                          "",
                          [
                            { text: "Cancel" },
                            {
                              text: "Login",
                              onPress: () =>
                                navigation.navigate("Login", { value: "-1" }),
                              style: "destructive",
                            },
                          ],
                          { cancelable: false }
                        );
                      } else {
                        Myblog(i.author_id);
                        navigation.navigate("MY PROFILE", {
                          screen: "Profile",
                          params: { from: "DetailsBlog" },
                        });
                      }
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "open-sans-bold",

                        paddingTop: 9,
                      }}
                      muted
                      // bold={true}
                      size={16}
                      color={"#686868"}
                    >
                      {i.author}
                    </Text>
                  </TouchableOpacity>

                  <Text
                    style={{
                      fontFamily: "open-sans-regular",
                      textDecorationLine: "none",
                      paddingTop: 9,
                      paddingLeft: 20,
                    }}
                    muted
                    size={16}
                    color={"#686868"}
                  >
                    {moment(i.date).format("ll")}
                  </Text>
                </Block>
                <Block
                  style={{
                    width: width * 0.9,
                    minHeight: height * 0.1,
                    zIndex: 10,
                    justifyContent: "flex-start",
                  }}
                >
                  <Rating
                    rating={i && i.rate}
                    tag={i && i.tags}
                    review={i && i.reviews}
                    bid={id}
                    navigation={navigation}
                    reportList={reportList}
                  />
                </Block>
                <Block center style={styles.AdsBox1}>
          <AdsBanner />
        </Block>
                <Text
                  style={{
                    fontFamily: "open-sans-bold",
                  }}
                  // center
                  size={30}
                  color={argonTheme.COLORS.TEXT}
                >
                  {i.title}
                </Text>
           
                <Block style={styles.discription}>
                  <RenderHtml
                    source={{ html: desc }}
                    contentWidth={contentWidth}
                    enableExperimentalMarginCollapsing={true}
                    enableExperimentalBRCollapsing={true}
                    enableExperimentalGhostLinesPrevention={true}
                    baseStyle={styleses.p}
                  />
                </Block>
              </Block>
            );
          })}
           <Block center style={styles.AdsBox2}>
          <AdsBanner />
        </Block>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            alignSelf: "center",
            marginTop: 30,
            marginBottom: 10,
          }}
          center
          size={20}
          color={argonTheme.COLORS.TEXT}
        >
          Suggested Articles.
        </Text>

        <Block row style={{ paddingVertical: 5 }}>
          <Block center style={{ position: "absolute", zIndex: 10 }}>
            {leftScroll > LEFT_CONTENT_OFFSET_THRESHOLD && (
              <FAB
                style={styles.leftfab}
                small
                icon="arrow-left"
                color="white"
                onPress={() => toLeft()}
              />
            )}
          </Block>
          <ScrollView
            ref={scrollLeftRight}
            onScroll={(event) => {
              setleftScroll(event.nativeEvent.contentOffset.x);
            }}
            horizontal={true}
          >
            {SuggestBlog_info &&
              SuggestBlog_info?.map((i, index) => {
                return (
                  <Card
                    key={index}
                    style={{
                      marginRight: theme.SIZES.BASE,
                      width: width * 0.5,
                    }}
                    item={i}
                  />
                );
              })}
          </ScrollView>
          {/* <Block>
            {rightScroll > RIGHT_CONTENT_OFFSET_THRESHOLD && (
              <FAB
                style={styles.rightfab}
                small
                icon="arrow-right"
                color="white"
                onPress={() => toRight()}
              />
            )}
          </Block> */}
        </Block>
        <Block center style={styles.AdsBox3}>
          <AdsBanner />
        </Block>
       
        <Block style={styles.Coment}>
          
       
            <ShowComment Comments={Blog_For_Each_Item_info} navigation={navigation} bid={id} />
        </Block>




        <AddComment
          bid={id}
          getComments={getComments}
          navigation={navigation}
        />
      </ScrollView>
      {contentVerticalOffset > CONTENT_OFFSET_THRESHOLD && (
        <FAB
          style={styles.fab}
          small
          icon="arrow-up"
          color="white"
          onPress={() => toTop()}
        />
      )}
    </Block>
  );
}

const styleses = {
  p: {
    fontFamily: "open-sans-regular",
    color: argonTheme.COLORS.TEXT,
    fontSize: "16",
    lineHeight: 25,
    marginBottom: 0,
    marginTop: 0,

    textAlign: "justify",
  },
};
const styles = StyleSheet.create({
  about: {
    padding: theme.SIZES.BASE,
  },

  pic: {
    height: (height / 100) * 23,
    width: width * 0.93,
    marginBottom: 1,

    justifyContent: "flex-end",
  },
  pic_down_text: {
    height: 40,
    width: width * 0.9,

    alignItems: "center",
  },
  discription: {
    width: width * 0.9,
    paddingRight: 17,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  Butn: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.9,
  },

  inputIcons: {
    marginRight: 12,
  },

  FIVERR: {
    width: width * 0.3,
    marginTop: 25,
    marginBottom: 40,
  },
  FREELANCING_BUTTON: {
    width: width * 0.3,
    marginTop: 25,
    marginBottom: 40,
  },
 
  AdsBox1: {
    minHeight: 270,
    alignItems: "center",
paddingRight:20,
    marginBottom:10,
    width: width*.99,
    // backgroundColor:"red",
    // paddingRight: 10,
  },
  AdsBox2: {
    minHeight: 280,
    width: width*.8,
    // backgroundColor:"red",
    paddingRight: 10,
  },
  AdsBox3: {
    alignItems: "center",
    minHeight: 280,
    width: width*.8,
    // backgroundColor:"red",
    justifyContent: "space-evenly",
    paddingRight: 10,
    marginVertical: 10,
    marginTop: 20,
  },
  Coment: {
    // backgroundColor: "red",
    // maxHeight: 400,
    width: width * 0.9,
    marginBottom: 10,
    // justifyContent: "flex-start",
    // paddingHorizontal: 15,
    // paddingVertical: 10,
    // borderRadius: 5,
    // shadowColor: "#171717",
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.1,
    // shadowRadius: 1,
    // elevation: 1,
    // zIndex: 10,
  },

  coment_user: {
    width: width * 1,

    padding: 5,
    marginTop: 20,
    flexWrap: "wrap",
  },
  coment_user_dp: {
    width: 50,
    height: 50,

    alignSelf: "center",
  },
  coment_user_name: {
    width: 235,
    paddingLeft: 10,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  coment_user_datee: {
    width: width * 0.7,
    height: 45,

    flexDirection: "column",
  },
  coment_user_com: {
    width: width * 0.7,
    paddingVertical: 5,
    marginLeft: 60,
  },
  leftfab: {
    backgroundColor: "black",
    right: 10,
  },
  rightfab: {
    marginVertical: 100,
    position: "absolute",
    right: -8,
    zIndex: 10,
    backgroundColor: "black",
  },
  fab: {
    position: "absolute",
    margin: 30,
    right: 0,
    bottom: 100,
    backgroundColor: "black",
  },
});
