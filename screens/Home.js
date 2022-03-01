import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  View,
  StyleSheet,
  Alert,
} from "react-native";

import { Block, theme, Text } from "galio-framework";
import { Card, Header, Button } from "../components";
const { width, height } = Dimensions.get("screen");
import { useSelector, useDispatch } from "react-redux";
import { Blog_fetching_action } from "../redux/reducers/blog/Blog_action";
import {
  showCategories_action,
  ShowProfile_action,
} from "../redux/reducers/blog/Blog_For_Each_Item_action";
import { useIsFocused } from "@react-navigation/native";
import { FAB } from "react-native-paper";

// limit for blog fetching
var limit = 0;

function TRENDING({ navigation }) {
  const dispatch = useDispatch();
  const flatListRef = React.useRef();
  const isFocused = useIsFocused();

  
  //getting token
  const { token_is, userId_is, showCategories } = useSelector(
    (state) => state.Blog_For_Each_Item
  );

  // fetching blog post
  const { Blog_info, finish, blog_loading } = useSelector(
    (state) => state.Blog_info
  );

  //profile fectch
  var profiledata = new FormData();
  profiledata.append("token", token_is);
  profiledata.append("userId", userId_is);

  //call starting limit
  const getblog = async () => {
    if (token_is == "") {
      return null;
    } else {
      let token = await token_is;
      var bodyFormData_showCategories = new FormData();
      bodyFormData_showCategories.append("action", "categories");
      bodyFormData_showCategories.append("token", token);
      dispatch(showCategories_action(bodyFormData_showCategories, navigation));
    }
  };

  // calling limit
  let lmt = () => {
    var bodyFormData = new FormData();
    bodyFormData.append("action", "trending");
    bodyFormData.append("token", token_is);
    bodyFormData.append("limit", limit);
    dispatch(Blog_fetching_action(bodyFormData, navigation));
  };
   



  //useEffect
  useEffect(() => {
    dispatch(ShowProfile_action(profiledata, navigation));
    getblog();
    lmt();
  }, [token_is, finish, userId_is, isFocused]);

  // goto top content
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const CONTENT_OFFSET_THRESHOLD = 300;
  const toTop = () => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  //  filtering data
  let blog_data = Blog_info.filter(
    (v, i, a) =>
      a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i
  );

  // flatList render component
  const renderArticles = ({ item, index }) => {
    return <Card item={item} />;
  };

  // button loadMore
  const handleLoadMore = () => {
    limit = limit + 10;
    lmt();
  };

  // SwipeDown to refresh on screen component
  const onRefresh = () => {
    getblog();
    lmt();
  };

  // header component
  const header = () => {
    return (
      <View
        style={[
          {
            backgroundColor: "#F3F2EF",
            zIndex: 200,
            elevation: 50,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
          },
        ]}
      >
        <Header
          title="Home"
          search
          tabs={showCategories}
          navigation={navigation}
        />
      </View>
    );
  };

  // main return
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <FlatList
        data={blog_data}
        renderItem={renderArticles}
        keyExtractor={(item) => item.id}
        scrollEventThrottle={100}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0}
        numColumns={2}
        ref={flatListRef}
        onScroll={(event) => {
          setContentVerticalOffset(event.nativeEvent.contentOffset.y);
        }}
        ListHeaderComponent={header}
        ListHeaderComponentStyle={{ width: width, height: 200 }}
        ListFooterComponent={
          <Block style={{ marginTop: 20, marginBottom: 30, height: 100 }}>
            <Button
              onPress={() => {
                if (finish == "false") {
                  handleLoadMore();
                } else {
                  toTop();
                }
              }}
              touchSoundDisabled={false}
              style={{ marginTop: 10 }}
            >
              {blog_loading == false ? (
                finish == "false" ? (
                  "Show More"
                ) : (
                  "Go to the top"
                )
              ) : (
                <ActivityIndicator color="white" />
              )}
            </Button>
          </Block>
        }
        ListFooterComponentStyle={{ alignItems: "center" }}
        onRefresh={onRefresh}
        refreshing={blog_loading}
      />

      {contentVerticalOffset > CONTENT_OFFSET_THRESHOLD && (
        <FAB
          style={styles.fab}
          small
          icon="arrow-up"
          color="white"
          onPress={() => toTop()}
        />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 20,
    backgroundColor: "black",
  },
});
export default TRENDING;
