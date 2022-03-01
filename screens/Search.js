import React, { useState, useEffect, useRef } from "react";
import {
  Animated,
  FlatList,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { Block, Text, Input, theme } from "galio-framework";

const { width } = Dimensions.get("screen");

import { categories, argonTheme } from "../constants/";
import { Icon } from "../components/";
import Card from "../components/Search_Card";
import { useSelector, useDispatch } from "react-redux";
import { Search_action } from "../redux/reducers/blog/Blog_For_Each_Item_action";
import { NewsSearch_action } from "../redux/reducers/NEWS/NewsAction";
import NewsSearchCard from "../components/NewsSearchCard";
import { FAB } from "react-native-paper";



export default function Search({ navigation,route }) {
  const dispatch = useDispatch();
let {from,val}=route?.params;

console.log(val,from)
  // const [results, setresults] = useState([]);
  const [search, setsearch] = useState(null);
  const [active, setactive] = useState(false);
  const animatedValue = new Animated.Value(0);

  const token_redux = useSelector((state) => state.Blog_For_Each_Item.token_is);
  // console.log(token_redux, "token from search");


  useEffect(() => {
  onsearch(val);
  }, [])


  const scrollRef = useRef();
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const CONTENT_OFFSET_THRESHOLD = 100;
  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }

  const onsearch = (value) => {
console.log(value,"______")
// for news
   if(from=="newsCate_home"){
      console.log("fetch news")
      let token = token_redux;
      var bodyFormData = new FormData();
      bodyFormData.append("search", value);
      bodyFormData.append("token", token);
      console.log(bodyFormData)
      if (value&&value.length > 0) {
        console.log("runinggggggggggg}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}")

        dispatch(NewsSearch_action(bodyFormData, navigation));

      } else {
        return <ActivityIndicator style={{marginTop: 30,}} color={argonTheme.COLORS.PRIMARY} />;
      }

    }
    else{
// for blog
console.log("fetch blog")
      let token = token_redux;
      var bodyFormData = new FormData();
      bodyFormData.append("search", value);
      bodyFormData.append("token", token);
      if (value&&value.length ) {
        dispatch(Search_action(bodyFormData, navigation));

      } else {
        return <ActivityIndicator color={argonTheme.COLORS.PRIMARY} />;
      }
    }
  };
  //fetching search data.
// for blog
  const {SearchData,blog_loading} = useSelector(
    (state) => state.Blog_For_Each_Item
  );
  let blog_data=SearchData
  // for search
  const {NewsSearch,NewsLoading} = useSelector(
    (state) => state.NewsPosts
  );
  // console.log(blog_data,"+++++++++++++++++++++")
  let a=useSelector(
    (state) => state.NewsPosts.NewsSearch
  );
let news_data=NewsSearch;
console.log(a,"------------------")

  // var results = SearchData||NewsSearch;

  const animate = () => {
    animatedValue.setValue(0);

    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // search component.
  const renderSearch = () => {
    const iconSearch = search ? (
      <TouchableWithoutFeedback onPress={(s) => setsearch(s)}>
        <Icon
          size={16}
          color={theme.COLORS.MUTED}
          name="magnifying-glass"
          family="entypo"
        />
      </TouchableWithoutFeedback>
    ) : (
      <Icon
        size={16}
        color={theme.COLORS.MUTED}
        name="magnifying-glass"
        family="entypo"
      />
    );
    // input here
    return (
      <Input
        right
        color="black"
        autoFocus={true}
        autoCorrect={false}
        autoCapitalize="none"
        iconContent={iconSearch}
        defaultValue={search}
        style={[styles.search, active ? styles.shadow : null]}
        placeholder={"What are you looking for?"}
        onBlur={() => setactive(false)}
        value={val}
        onChangeText={onsearch||val}

      />
    );
  };

  const renderNotFound = () => {
    return (
      <Block style={styles.notfound}>
        <Text
          style={{ fontFamily: "open-sans-regular" }}
          size={18}
          color={argonTheme.COLORS.TEXT}
        >
         Nothing......
        </Text>

        {/* <Text size={18} style={{ marginTop: theme.SIZES.BASE, fontFamily: 'open-sans-regular' }} color={argonTheme.COLORS.TEXT}>
          You can see more products from other categories.
        </Text> */}
      </Block>
    );
  };

  //when data present in array.
  const renderBlogResult = (result) => {
    const opacity = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1],
      extrapolate: "clamp",
    });
      console.log("blog card")

      return (
        <Animated.View
          style={{ width: width - theme.SIZES.BASE * 2, opacity }}
          key={`result-${result.title}`}
        >
          <Card S_data={result} horizontal />
        </Animated.View>
      );
    // }
  };
  const renderNewsResult = (result) => {
    const opacity = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1],
      extrapolate: "clamp",
    });
    console.log(result,"OOOOOO")
      return (
        <Animated.View
          style={{ width: width - theme.SIZES.BASE * 2, opacity }}
          key={`result-${result.title}`}
        >
          <NewsSearchCard item={result} horizontal navigation={navigation} />
        </Animated.View>
      );
   
  };
  // get value from handle search statements
  const renderResults = () => {
    animate();
   console.log("news card")
    
  
    if (from !="newsCate_home"){
    console.log("not nes card")
      if (blog_loading) {
        return <ActivityIndicator color={argonTheme.COLORS.PRIMARY} />;
      }
      else if (blog_data === undefined) {

        return (
          <Block style={{ width: width - 40 }}>
          {renderNotFound()}
        </Block>
      );
    }
    else { return (
        <Block style={{ paddingTop: theme.SIZES.BASE * 2 }}>
          {blog_data && blog_data.map((result) => renderBlogResult(result))}
        </Block>
      );}
    
    }


   else if (from =="newsCate_home")
   {
    //  console.log(news_data, "nnnnnnnnnnnnn")
      if (NewsLoading) {
        return <ActivityIndicator color={argonTheme.COLORS.PRIMARY} />;
      }
      else if (news_data === undefined) {
        return (
          <Block style={{ width: width - 40 }}>
          {renderNotFound()}
        </Block>
      )
    }
      else {return (
        <Block style={{ paddingTop: theme.SIZES.BASE * 2 }}>
          {news_data && news_data.map((result) => renderNewsResult(result))}
        </Block>
      );}
    }

  };











  return (
    <Block flex center style={styles.searchContainer}>
      <Block center style={styles.header}>
        {renderSearch()}
      </Block>
      <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef} onScroll={(event) => {
          setContentVerticalOffset(event.nativeEvent.contentOffset.y);
        }} >
        {renderResults()}
      </ScrollView>
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
  searchContainer: {
    width: width,
    paddingHorizontal: theme.SIZES.BASE,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE,
    borderWidth: 1,
    borderRadius: 3,
  },
  fab: {
    position: "absolute",
    margin: 30,
    right: 0,
    bottom: 10,
    backgroundColor: "black",

  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 1,
    elevation: 2,
    zIndex: 2,
  },
  notfound: {
    marginVertical: theme.SIZES.BASE * 2,
  },
  suggestion: {
    height: theme.SIZES.BASE * 1.5,
    marginBottom: theme.SIZES.BASE,
  },
  result: {
    backgroundColor: theme.COLORS.WHITE,
    marginBottom: theme.SIZES.BASE,
    borderWidth: 0,
  },
  resultTitle: {
    flex: 1,
    flexWrap: "wrap",
    paddingBottom: 6,
  },
  resultDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  image: {
    overflow: "hidden",
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
  },
  dealsContainer: {
    justifyContent: "center",
    paddingTop: theme.SIZES.BASE,
  },
  deals: {
    backgroundColor: theme.COLORS.WHITE,
    marginBottom: theme.SIZES.BASE,
    borderWidth: 0,
  },
  dealsTitle: {
    flex: 1,
    flexWrap: "wrap",
    paddingBottom: 6,
  },
  dealsDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageHorizontal: {
    overflow: "hidden",
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
  },
  imageVertical: {
    overflow: "hidden",
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
  },
});
