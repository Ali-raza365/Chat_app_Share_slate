import React, { useEffect, useRef,useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { showCategories_Item_action } from "../redux/reducers/blog/Blog_For_Each_Item_action";
import { Blog_fetching_For_Each_Item_action } from "../redux/reducers/blog/Blog_For_Each_Item_action";
import Loading from "../constants/loading";
import { Activity_action, NewsBtn_CatePost_action } from "../redux/reducers/NEWS/NewsAction";
import AdInterstial from '../components/AdsInterstial'
import { ActiveId_Action } from "../redux/reducers/App_Realated/AppActon";
import { FAB } from "react-native-paper";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";

const { width } = Dimensions.get("screen");
// main function
export default function Categories({ navigation, route }) {



  var tabId_nav = route.params?.title
  // console.log(tabId_nav,"+++++++++++++++}}}}}}}}}")
  var tabId = route.params?.tabId;
  var tabid_home = route.params;
  var arr = route.params?.data;
  let custom_id;
  if (tabId || (tabid_home && tabid_home.tabId == null)) {
    custom_id = 1;
  }
  const adsInter=useRef()
  const dispatch = useDispatch();
  const scrollRef = useRef();
 const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const CONTENT_OFFSET_THRESHOLD = 100;
  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }
  




  let action = "categories";
  //token
  const token_redux = useSelector((state) => state.Blog_For_Each_Item.token_is);

  //bodyform data for button category details dispatch.
  const homeTabDetail = async () => {
    let token = token_redux;
    var bodyFormData = new FormData();
    bodyFormData.append("action", action);
    bodyFormData.append("token", token);
    bodyFormData.append("category_id", tabId || tabid_home.tabId || custom_id);
    await dispatch(showCategories_Item_action(bodyFormData, navigation));
  };

  const newsTabDetail = async () => {
    let token = token_redux;
    var bodyFormData = new FormData();
    bodyFormData.append("action", action);
    bodyFormData.append("token", token);
    bodyFormData.append("category_id", tabId || tabid_home.tabId || custom_id);
    await dispatch(NewsBtn_CatePost_action(bodyFormData, navigation));
  };

  const fetchNavDetail = () => {
    if ("title" in tabid_home) {
      homeTabDetail();
    } else if (
      tabid_home &&
      tabid_home.data.slice(-1)[0].name == "newsCate_home"
    ) {
      newsTabDetail();
    } else {
      homeTabDetail();
    }
  };
  useEffect(() => {
    fetchNavDetail();

  }, [tabId, tabid_home, arr]);

  //fetch_item_data for button name type
  const fetch_item_data_for_CustomBlog = async(id) => {
    let blogID = id;
    var activedata = new FormData();
    activedata.append("action", "add");
    activedata.append("activity", "4");
    activedata.append("activity_id", blogID);
    activedata.append("token", token_redux);
    dispatch(
      await Activity_action(activedata, navigation)
     );
    var bodyFormData1 = new FormData();
    bodyFormData1.append("blogID", blogID);
    bodyFormData1.append("token", token_redux);
    bodyFormData1.append("category_id", tabId || tabid_home);

    dispatch(
      Blog_fetching_For_Each_Item_action(bodyFormData1, navigation, blogID)
    );
  };

  const onpressCard = (id, item) => {
    if ("title" in tabid_home) {
      fetch_item_data_for_CustomBlog(id);
    } else if (
      tabid_home &&
      tabid_home.data.slice(-1)[0].name == "newsCate_home"
    ) {
    } else {
      fetch_item_data_for_CustomBlog(id);
    }
  };

  //render Button Categories
  const renderCategories = () => {
    const blogdata = useSelector(
      (state) => state.Blog_For_Each_Item.showCategories_Item
    );
    const Load = useSelector((state) => state.Blog_For_Each_Item.blog_loading);
    const { BtnCatData, NewsLoading } = useSelector((state) => state.NewsPosts);

    if ("title" in tabid_home) {
      if (Load) {
        return <Loading />;
      } else if (blogdata.length == 0) {
        return <Text style={{marginTop: 20,}} >No blogs for this category yet</Text>;
      }
      return (
        <ScrollView
        ref={scrollRef}
        onScroll={(event) => {
          setContentVerticalOffset(event.nativeEvent.contentOffset.y);
        }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          <Block flex>
            {(blogdata && blogdata).map((category) => {
              return (
                <TouchableWithoutFeedback
                  key={`category-${category.id}`}
                  onPress={() => onpressCard(category.id)}
                >
                  <Block flex card style={[styles.category, styles.shadow]}>
                  <ContentLoader
                    speed={2}
                    style={styles.imageBlock}
                    // viewBox="0 0 400 160"
                    backgroundColor="silver"
                    foregroundColor="#ecebeb"
                  >
                    <ImageBackground
                      source={{ uri: category.featured_image }}
                      style={[
                        styles.imageBlock,
                        {
                          width: width - theme.SIZES.BASE * 2,
                          height: 252,
                        },
                      ]}
                      imageStyle={{
                        width: width - theme.SIZES.BASE * 2,
                        height: 252,
                      }}
                    >
                      <Block style={styles.categoryTitle}>
                        <Text
                          style={{ fontFamily: "open-sans-bold" }}
                          size={18}
                          color={theme.COLORS.WHITE}
                        >
                          {category.title}
                        </Text>
                      </Block>
                    </ImageBackground>
                    </ContentLoader>
                  </Block>
                </TouchableWithoutFeedback>
              );
            })}
          </Block>
        </ScrollView>
      );
    } else if (
      tabid_home &&
      tabid_home.data.slice(-1)[0].name == "newsCate_home"
    ) {
      if (NewsLoading) {
        return <Loading />;
      } else if (BtnCatData.length == 0) {
        return <Text style={{marginTop: 20,}} >No blogs for this category yet</Text>;
      }

      const activityNews = async (id,url) => {
        let token = await token_redux;
    
        var activedata = new FormData();
        activedata.append("action", "add");
        activedata.append("activity", "5");
        activedata.append("activity_id", id);
        activedata.append("token", token);
       await dispatch(await Activity_action(activedata, navigation));
  await adsInter.current.ads()  

        navigation.navigate("MyWebComponent", url);
      };

      return (
        <ScrollView
        ref={scrollRef}
        onScroll={(event) => {
          setContentVerticalOffset(event.nativeEvent.contentOffset.y);
        }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          <Block flex>
            {(BtnCatData && BtnCatData).map((category) => {
              return (
                <TouchableWithoutFeedback
                  key={`category-${category.id}`}
                  onPress={() =>
                    // navigation.navigate("MyWebComponent", category.source_url)
                    activityNews(category.id,category.source_url)
                    // console.log(category.id)
                  }
                >
                  <Block flex card style={[styles.category, styles.shadow]}>
                  <ContentLoader
                    speed={2}
                    style={styles.imageBlock}
                    // viewBox="0 0 400 160"
                    backgroundColor="silver"
                    foregroundColor="#ecebeb"
                  >
                    <ImageBackground
                      source={{ uri: category.image }}
                      style={[
                        styles.imageBlock,
                        {
                          width: width - theme.SIZES.BASE * 2,
                          height: 252,
                        },
                      ]}
                      imageStyle={{
                        width: width - theme.SIZES.BASE * 2,
                        height: 252,
                      }}
                    >
                      <Block style={styles.categoryTitle}>
                        <Text
                          style={{ fontFamily: "open-sans-bold" }}
                          size={18}
                          color={theme.COLORS.WHITE}
                        >
                          {category.title}gggggg
                        </Text>
                      </Block>
                    </ImageBackground>
                    </ContentLoader>
                  </Block>
                </TouchableWithoutFeedback>
              );
            })}
          </Block>
        </ScrollView>
      );
    } else {
      if (Load) {
        return <Loading />;
      } else if (blogdata.length == 0) {
        return <Text style={{marginTop: 20,}}>No blogs for this category yet</Text>;
      }
      return (
        <ScrollView
        ref={scrollRef}
        onScroll={(event) => {
          setContentVerticalOffset(event.nativeEvent.contentOffset.y);
        }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          <Block flex>
            {(blogdata && blogdata).map((category) => {
              return (
                <TouchableWithoutFeedback
                  key={`category-${category.id}`}
                  onPress={() => onpressCard(category.id)}
                >
                  <Block flex card style={[styles.category, styles.shadow]}>
                  <ContentLoader
                    speed={2}
                    style={styles.imageBlock}
                    // viewBox="0 0 400 160"
                    backgroundColor="silver"
                    foregroundColor="#ecebeb"
                  >
                    <ImageBackground
                      source={{ uri: category.featured_image }}
                      style={[
                        styles.imageBlock,
                        {
                          width: width - theme.SIZES.BASE * 2,
                          height: 252,
                        },
                      ]}
                      imageStyle={{
                        width: width - theme.SIZES.BASE * 2,
                        height: 252,
                      }}
                    >
                      <Block style={styles.categoryTitle}>
                        <Text
                          style={{ fontFamily: "open-sans-bold" }}
                          size={18}
                          color={theme.COLORS.WHITE}
                        >
                          {category.title}
                        </Text>
                      </Block>
                    </ImageBackground>
                    </ContentLoader>
                  </Block>
                </TouchableWithoutFeedback>
              );
            })}
          </Block>
        </ScrollView>
      );
    }
  };


  // Header button type
  const as = useSelector((state) => state.Blog_For_Each_Item.showCategories);
  //main return
  return (
    <Block flex center style={styles.categories}>
      <Header
        title="Categories"
        back
        tabs={arr || as}
        navigation={navigation}
        navActiveid={tabId_nav}
      />
      <AdInterstial ref={adsInter}/>

      {renderCategories()}
     {contentVerticalOffset > CONTENT_OFFSET_THRESHOLD && (
        <FAB
          style={styles.fab}
          small
          icon="arrow-up"
          color="white"
          onPress={() => onPressTouch()}
        />
      )}
    </Block>
  );
}

const styles = StyleSheet.create({
  categories: {
    width,
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 20,
    backgroundColor: "black",
  },
  categoryList: {
    justifyContent: "center",
    backgroundColor: "white",
    paddingTop: theme.SIZES.BASE * 1.5,
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginHorizontal: theme.SIZES.BASE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0,
  },
  categoryTitle: {
    height: "100%",
    paddingHorizontal: theme.SIZES.BASE,
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageBlock: {
    overflow: "hidden",
    borderRadius: 4,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});
