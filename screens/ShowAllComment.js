import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import argonTheme from "../constants/Theme";
import { useSelector, useDispatch } from "react-redux";
import {
  Blog_Comment_action,
  LikeComment_Action,
} from "../redux/reducers/blog/Blog_For_Each_Item_action";
const { width, height } = Dimensions.get("screen");
import { Rating as RatingStar } from "react-native-ratings";
import IconExtra from "../components/Icon";
import RBSheet from "react-native-raw-bottom-sheet";
import { LikeCommentApi } from "../api/ap-apis";

export default function ShowAllComment({ navigation, route, bid, Comments }) {
  const [Action, setAction] = useState(false);
  const dispatch = useDispatch();
  const { token_is, userId_is } = useSelector(
    (state) => state.Blog_For_Each_Item
  );
  const { Guest_id } = useSelector((state) => state.ActiveId_Reducer);
  const CommentsHere = useSelector(
    (state) => state.Blog_For_Each_Item.Blog_Comment
  );

  const { blog_loading } = useSelector((state) => state.Blog_For_Each_Item);
  const refRBSheet = useRef();

  useMemo(() => {
    show_comment;
  }, [CommentsHere]);
  console.log(CommentsHere, "jjjjj");
  const show_comment = async () => {
    let id = bid;
    let type = "blog";
    var bodyFormData = new FormData();
    bodyFormData.append("type", type);
    bodyFormData.append("token", token_is);
    bodyFormData.append("id", id);
    dispatch(Blog_Comment_action(bodyFormData, navigation));
  };

  const BottomSheet = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: "#8898AA",
            },
            container: { backgroundColor: "white", height: 200 },
          }}
        >
          <Block style={styles.main}>
            <TouchableOpacity>
              <Block row center style={styles.close}>
                <IconExtra
                  size={16}
                  color="black"
                  name="edit"
                  family="Feather"
                />
                <Text
                  color="white"
                  style={{
                    marginLeft: 15,
                    fontSize: 16,
                    color: argonTheme.COLORS.TEXT,
                  }}
                >
                  Edit
                </Text>
              </Block>
            </TouchableOpacity>
            <TouchableOpacity>
              <Block row center style={styles.close}>
                <IconExtra
                  size={16}
                  color="black"
                  name="trash"
                  family="Feather"
                />

                <Text
                  color="white"
                  style={{
                    marginLeft: 15,
                    color: argonTheme.COLORS.TEXT,
                    fontSize: 16,
                  }}
                >
                  Delete
                </Text>
              </Block>
            </TouchableOpacity>
            {/* <TouchableOpacity>
              <Block row center style={styles.close}>
                <IconExtra
                  size={16}
                  color="black"
                  name="repeat"
                  family="Feather"
                />
                <Text
                  size={20}
                  color="white"
                  style={{
                    marginLeft: 15,
                    fontSize: 16,
                    color: argonTheme.COLORS.TEXT,
                  }}
                >
                  Share
                </Text>
              </Block>
            </TouchableOpacity> */}
          </Block>
        </RBSheet>
      </View>
    );
  };

  const likeFunc = (obj) => {
    if (obj.Like_status == true) {
      const data = {
        bid: obj.blog_id,
        token: token_is,
        uid: userId_is,
        cid: obj.comment_id,
        action: "like",
      };
      //  console.log(data,"llllllll")
      dispatch(LikeComment_Action(data));
    } else {
      const data = {
        bid: obj.blog_id,
        token: token_is,
        uid: userId_is,
        cid: obj.comment_id,
        action: "unlike",
      };
      //  console.log(data,"dddddddddd")
      dispatch(LikeComment_Action(data));
    }
  };

  if (blog_loading) {
    return (
      <Block center middle flex>
        <ActivityIndicator color={argonTheme.COLORS.PRIMARY} />
      </Block>
    );
  } else {
    return (
      <View style={{ padding: 20,backgroundColor:"white"  }}>
        <Block space="between" row>
          <Block row space="between" width={110}>
            <Text
              style={{
                fontFamily: "open-sans-regular",
              }}
              size={20}
              color={argonTheme.COLORS.TEXT}
            >
              Reviews
            </Text>
            <Block
              center
              style={{
                width: 6,
                height: 6,
                backgroundColor: argonTheme.COLORS.MUTED,
                marginTop: 3,
                borderRadius: 10,
              }}
            />
            <Text
              style={{
                fontFamily: "open-sans-regular",
                alignSelf: "center",
                marginTop: 5,
              }}
              size={14}
              color={argonTheme.COLORS.TEXT}
            >
              20
            </Text>
          </Block>
        </Block>

        {CommentsHere?.length == (0 || undefined) ? (
            <Block middle style={{marginTop: 30,}}>

          <Text style={{ marginBottom: 100 }}>No comments yet</Text>
            </Block>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "flex-start",
              backgroundColor: "white",
                
            }}
            nestedScrollEnabled={true}
          >
            {CommentsHere &&
              CommentsHere.map((i, index) => {
                return (
                  <Block style={styles.coment_user} key={index}>
                    <Block row height={80}>
                      <ImageBackground
                        source={{
                          uri: i.profile_image,
                        }}
                        style={styles.coment_user_dp}
                        imageStyle={{
                          width: 50,
                          height: 50,
                          borderRadius: 100,
                        }}
                      ></ImageBackground>
                      <Block
                        row
                        space="evenly"
                        style={styles.coment_user_datee}
                      >
                        <Text
                          muted
                          size={18}
                          style={{
                            fontFamily: "open-sans-bold",
                            marginLeft: 10,
                            textTransform: "capitalize",
                          }}
                          color={argonTheme.COLORS.TEXT}
                        >
                          {i.name}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "open-sans-regular",
                            marginLeft: 10,
                          }}
                          size={12}
                          color={argonTheme.COLORS.TEXT}
                        >
                          {i.date}
                        </Text>
                        <RatingStar
                          readonly
                          ratingCount={5}
                          startingValue={i.rate}
                          imageSize={18}
                          type="custom"
                          style={{
                            marginRight: 10,
                            alignSelf: "flex-start",
                            marginBottom: 5,
                            marginLeft: 10,
                          }}
                        />
                      </Block>

                      <Block>
                        {Guest_id == "-1" ? null : i.action == true ? (
                          <TouchableOpacity
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 30,
                              paddingTop: 3,
                              alignItems: "center",
                            }}
                            onPress={() => refRBSheet.current.open()}
                          >
                            <IconExtra
                              size={16}
                              color="black"
                              name="dots-three-horizontal"
                              family="Entypo"
                            />
                          </TouchableOpacity>
                        ) : null}
                      </Block>
                    </Block>
                    {i.comment == "null" ? null : (
                      <Block style={styles.coment_user_com}>
                        <Text
                          style={{
                            fontFamily: "open-sans-regular",
                            //  ,textAlign:"justify",
                          }}
                          muted
                          size={14}
                          color={argonTheme.COLORS.TEXT}
                        >
                          {i.comment}
                        </Text>
                      </Block>
                    )}

                    <Block
                      row
                      space="between"
                      style={{
                        width: width * 0.73,
                        marginLeft: 60,
                        marginTop: 5,
                        // backgroundColor: "red",
                      }}
                    >
                      <Block
                        row
                        style={{
                          width: width * 0.64,
                          // backgroundColor: "green",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            likeFunc(i);
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "open-sans-bold",
                              marginRight: 30,
                            }}
                            muted
                            size={14}
                            color={argonTheme.COLORS.TEXT}
                          >
                            {i.Like_status == true ? "Like" : "Liked"}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => navigation.navigate("CommentReply")}
                        >
                          <Text
                            style={{ fontFamily: "open-sans-bold" }}
                            muted
                            size={14}
                            color={argonTheme.COLORS.TEXT}
                          >
                            Reply
                          </Text>
                        </TouchableOpacity>
                      </Block>
                      <Text
                        style={{ fontFamily: "open-sans-regular" }}
                        muted
                        size={14}
                        color={argonTheme.COLORS.TEXT}
                      >
                        4
                      </Text>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "rgb(93,113,227)",
                          width: 20,
                          height: 20,
                          borderRadius: 20,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <IconExtra
                          size={12}
                          color="white"
                          name="like1"
                          family="Antdesign"
                          style={{ paddingBottom: 1 }}
                        />
                      </TouchableOpacity>
                    </Block>
                  </Block>
                );
              })}
          </ScrollView>
        )}
        {BottomSheet()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  coment_user: {
    width: width * 0.9,
    padding: 5,
    flex:1,
  },
  coment_user_dp: {
    width: 50,
    height: 50,
    // borderRadius: 100,
    // backgroundColor:"blue",
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
    // height: 45,
    // justifyContent: "space-between",
    // padding: 5,
    backgroundColor: "white",
    flexDirection: "column",
  },
  coment_user_com: {
    width: width * 0.73,
    // paddingVertical: 10,
    marginLeft: 60,
    // backgroundColor:"green",
    // marginBottom:10
  },

  main: { flex: 1, backgroundColor: "white" },
  close: { width: "90%", height: 40, marginTop: 20 },
});
