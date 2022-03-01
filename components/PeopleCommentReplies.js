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
import { Blog_Comment_action } from "../redux/reducers/blog/Blog_For_Each_Item_action";
const { width, height } = Dimensions.get("screen");
import { Rating as RatingStar } from "react-native-ratings";
import IconExtra from "../components/Icon";
import RBSheet from "react-native-raw-bottom-sheet";

export default function PeopleCommentsReply({ navigation, route, bid, Comments }) {
  const dispatch = useDispatch();
  const token_redux = useSelector((state) => state.Blog_For_Each_Item.token_is);
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
    let token = await token_redux;
    var bodyFormData = new FormData();
    bodyFormData.append("type", type);
    bodyFormData.append("token", token);
    bodyFormData.append("id", id);
    dispatch(Blog_Comment_action(bodyFormData, navigation));
  };



  if (blog_loading) {
    return (
      <Block center middle>
        <ActivityIndicator color={argonTheme.COLORS.PRIMARY} />
      </Block>
    );
  } else if (CommentsHere?.length == (0 || undefined)) {
    return <Text style={{ marginBottom: 100 }}>No comments yet</Text>;
  }
  return (
    <View  >
        <ScrollView>
      {CommentsHere &&
        CommentsHere.map((i, index) => {
          return (
            <Block style={styles.coment_user} key={index}>
              <Block row height={60}>
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
                <Block row space="evenly" style={styles.coment_user_datee}>
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
            
                </Block>

              </Block>
              {i.comment == "null" ? null : (
                <Block style={styles.coment_user_com}>
                  <Text
                    style={{
                      fontFamily: "open-sans-regular",
                    }}
                    muted
                    size={14}
                    color={argonTheme.COLORS.TEXT}
                  >
                    {i.comment}
                  </Text>
                </Block>
              )}

          
            </Block>
          );
        })}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  coment_user: {
    width: width,
    padding: 5,
    // marginTop: 20,
    // backgroundColor: "red",
    // flexWrap: "wrap",
  },
  coment_user_dp: {
    width: 50,
    height: 50,
    // borderRadius: 100,
    // backgroundColor:"blue",
    // alignSelf: "center",
  },

  coment_user_datee: {
    width: width * 0.7,
    height: 50,
    // justifyContent: "space-between",
    // padding: 5,
    // backgroundColor: "green",
    flexDirection: "column",
  },
  coment_user_com: {
    width: width * 0.7,
    marginLeft: 60,
    // backgroundColor:"green",
    // marginTop:10
  },

  main: { flex: 1, backgroundColor: "white" },
  close: { width: "90%", height: 40, marginTop: 20 },
});
