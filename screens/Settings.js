import React, { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Block, Text, theme, Icon, Radio } from "galio-framework";
const { width, height } = Dimensions.get("window");
import argonTheme from "../constants/Theme";
import HiddenBlogCard from "../components/hiddenBlogCard";
import UnblockUser from "../components/unblockUser";
import { useDispatch,useSelector } from "react-redux";
import {blockList_action} from "../redux/reducers/userBlockHide/myBlog_action";
import {hideBlogList_action} from "../redux/reducers/blog/Blog_For_Each_Item_action"
import Loading from "../constants/loading";
import { useIsFocused } from '@react-navigation/native';

export default function Settings({navigation}) {
  const [hideblog, sethideblog] = useState(false);
  const [userblock, setuserblock] = useState(false);
  const isFocused = useIsFocused();


const dispatch = useDispatch();
const { token_is,hideBlogList,blog_loading } = useSelector(
  (state) => state.Blog_For_Each_Item
);
// console.log(hideBlogList)
const blockListFunc=()=>{
dispatch(blockList_action(token_is,navigation))
dispatch(hideBlogList_action(token_is,navigation))

}
const {blockList,myblog_loading} = useSelector(state => state.myblog)
useEffect(() => {
blockListFunc()
}, [isFocused])



  const BlogsFunc = () => {
    return (
      <Block style={styles.titl}>
        <TouchableOpacity
          style={styles.TitlePress}
          onPress={() => {
            sethideblog(!hideblog);
          }}
        >
          <Block center row>
            <Text size={16} style={{ fontFamily: 'open-sans-regular' }} color="#525F7F">
              See hidden blogs
            </Text>
          </Block>
          {hideblog == false ? (
            <Icon name="plus" family="AntDesign" size={16} color={"#525F7F"} />
          ) : (
            <Icon name="minus" family="AntDesign" size={16} color={"#525F7F"} />
          )} 
        </TouchableOpacity>
        {hideblog == false ? null : (
          <Block
            space={"between"}
            style={{ marginVertical: 15, paddingHorizontal: 0, }}
          >
            <ScrollView>

            {hideBlogList&&hideBlogList.map((i,index)=>{return(
              
              <HiddenBlogCard key={index} data={i} navigation={navigation}/>
              )})}
              </ScrollView>

          </Block>
        )}
      </Block>
    );
  };
  const ProfileFunc = () => {
    return (
      <Block style={styles.titl}>
        <TouchableOpacity
          style={styles.TitlePress}
          onPress={() => {
            setuserblock(!userblock);
          }}
        >
          <Block center row>
            <Text size={16} style={{ fontFamily: 'open-sans-regular' }} color="#525F7F">
              Blocked users
            </Text>
          </Block>
          {userblock == false ? (
            <Icon name="plus" family="AntDesign" size={16} color={"#525F7F"} />
          ) : (
            <Icon name="minus" family="AntDesign" size={16} color={"#525F7F"} />
          )}
        </TouchableOpacity>
        {userblock == false ? null : (
          <Block
            space={"between"}
            style={{ marginVertical: 15, paddingHorizontal: 0 }}
          >
            <ScrollView>
            {blockList&&blockList.map((i,index)=>{return(

              <UnblockUser data={i} key={index} navigation={navigation} />
            )})}

            </ScrollView>

          </Block>
        )}
      </Block>
    );
  };

  if((myblog_loading)==true){
  return <Loading/>
  }
else{

  return (
    <View
      showsVerticalScrollIndicator={false}
     style={styles.settings}
    >
      <Block center style={styles.title}>
        {(blog_loading)==false?null:<ActivityIndicator style={{marginBottom: 10,}} color={argonTheme.COLORS.PRIMARY}/>}
        <Text
          style={{ fontFamily: "open-sans-bold",  }}
          size={theme.SIZES.BASE}
          color={argonTheme.COLORS.TEXT}
        >
          Profile Settings
        </Text>
        {ProfileFunc()}
        <Text
          style={{ fontFamily: "open-sans-bold", marginTop:3 }}
          size={theme.SIZES.BASE}
          color={argonTheme.COLORS.TEXT}
        >
          Blogs Settings
        </Text>
        {BlogsFunc()}

      </Block>
    </View>
  );
}
}

const styles = StyleSheet.create({
  settings: {
    flex:1,
    paddingVertical: theme.SIZES.BASE / 3,
    backgroundColor: "white",
  },
  title: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2,
  },
  rows: {
    height: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE / 2,
  },
  TitlePress: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titl: {
    width: width * 0.95,
    padding: 10,
    alignSelf: "center",
    marginVertical: 10,
    // backgroundColor: "lightgray",
  },
});
