import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
  StatusBar,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  View,
  Platform,
  addons,
} from "react-native";
import { Block, theme, Text } from "galio-framework";
import { Header, Button } from "../../components";
import NewsCard from "../../components/NewsCard";
const { width } = Dimensions.get("screen");
import { useSelector, useDispatch } from "react-redux";

import NewsPost_action, {
  showNewsButtonCate_action,
} from "../../redux/reducers/NEWS/NewsAction";
import { ActiveId_Action } from "../../redux/reducers/App_Realated/AppActon";
import { FAB } from "react-native-paper";
var limit = 0;

function News({ navigation }) {
  const dispatch = useDispatch();
  //getting token
  const token_redux = useSelector((state) => state.Blog_For_Each_Item.token_is);
  // Header button type
  let name = "newsCate_home";
  let { NewsButtonCate, NewsPosts, NewsLoading, finish } = useSelector(
    (state) => state.NewsPosts
  );
  // let finish = useSelector(
  //   (state) => state.NewsPosts
  // );

  let arr = (NewsButtonCate = [
    ...NewsButtonCate,
    { name: name, id: "news_id" },
  ]);

  let newsBlog_data =
    NewsPosts &&
    NewsPosts.filter(
      (v, i, a) =>
        a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i
    );

  useEffect(() => {
    dispatch(ActiveId_Action(""));
    getblog();
  }, []);

  const getblog = async (e) => {
    // post request for fetching NewsBloglist
    let token = await token_redux;
    var bodyFormData = new FormData();
    bodyFormData.append("action", "top");
    bodyFormData.append("token", token);
    bodyFormData.append("limit", limit);
    dispatch(NewsPost_action(bodyFormData, navigation));
    //showCategories on button dispatch?
    var bodyFormData_showCategories = new FormData();
    bodyFormData_showCategories.append("action", "categories");
    bodyFormData_showCategories.append("token", token);
    dispatch(
      showNewsButtonCate_action(bodyFormData_showCategories, navigation)
    );
  };
  const flatListRef = React.useRef();
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const CONTENT_OFFSET_THRESHOLD = 200;
  const toTop = () => {
    // use current
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };
  const onRefresh = () => {
    getblog();
  };
  const renderArticles = ({ item }) => {
    return <NewsCard item={item} />;
  };

  const handleLoadMore = () => {
    limit = limit + 10;
    getblog();
  };
  console.log(finish);
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
          title="News"
          search
          forSearch="News"
          back
          tabs={arr}
          navigation={navigation}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <FlatList
        data={newsBlog_data}
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
              {NewsLoading == false ? (
                // "Show More"
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
        refreshing={NewsLoading}
        onRefresh={onRefresh}
      ></FlatList>
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
export default News;
