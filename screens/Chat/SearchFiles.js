import React, { useState, useEffect, useRef } from "react";
import {
    Animated,
    FlatList,
    Dimensions,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ActivityIndicator,
    ImageBackground,
} from "react-native";
import { Block, Text, Input, theme } from "galio-framework";

const { width } = Dimensions.get("screen");

import { categories, argonTheme } from "../../constants/";
import { Icon } from "../../components/";
import Card from "../../components/Search_Card";
import { useSelector, useDispatch } from "react-redux";
import { Search_action } from "../../redux/reducers/blog/Blog_For_Each_Item_action";
import { NewsSearch_action } from "../../redux/reducers/NEWS/NewsAction";
import NewsSearchCard from "../../components/NewsSearchCard";
import { FAB } from "react-native-paper";
import Images from "../../constants/Images";
import ProfileCard from "../../components/ProfileCard";
import IconExtra from "../../components/Icon";

const from = "sdsas"
const val = "sdsas"
const dummyData = [
    {
        id: 1,
        avatar: Images.ProfileChat,
        message: `Hey there! How are you today? Can we me et and talk? Thanks!`,
        time: `10:31 PM`,
        title: "File 1",
        // count: 22,
    },
    {
        id: 2,
        message: `Sure, just let me finish something and I’ll call you.`,
        time: `10:34 PM`,
        title: "File 2",
        // count: false,
    },
    {
        id: 3,
        avatar: Images.ProfileChat,
        message: `OK. Cool! See you!`,
        time: `10:35 PM`,
        title: "File 3",
        // count: 2,
    },
    {
        id: 4,
        message: `Bye bye`,
        time: `10:36 PM`,
        status: false,
        title: "File 4",
        // count: 9,
    },
    {
        id: 5,
        avatar: Images.ProfileChat,
        message: `That great message`,
        time: `10:36 PM`,
        status: false,
        title: "File 5",
        // // count: 9,
    },
    {
        id: 6,
        message: `Thanks`,
        time: `10:36 PM`,
        status: false,
        title: "File 6",
        // // count: 9,
    },
    {
        id: 7,
        message: `Okay`,
        time: `10:36 PM`,
        status: false,
        title: "File 7",
        // count: 2,
    },
    {
        id: 8,
        avatar: Images.ProfileChat,
        message: `??`,
        time: `10:36 PM`,
        status: false,
        title: "docs 8",

    },

]
export default function ChatSearch({ navigation, route }) {
    const dispatch = useDispatch();
    // let { from, val } = route?.params;

    // let { from, val } = route?.params;



    // console.log(val, from)
    const [results, setresults] = useState([]);
    const [search, setsearch] = useState("");
    const [active, setactive] = useState(true);
    const animatedValue = new Animated.Value(0);

    const token_redux = useSelector((state) => state.Blog_For_Each_Item.token_is);
    // console.log(token_redux, "token from search");


    useEffect(() => {
        // onsearch(val);
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
        console.log(value, "______")
        setsearch(value);
        // // for news
        // if (from == "newsCate_home") {
        //     console.log("fetch news")
        //     let token = token_redux;
        //     var bodyFormData = new FormData();
        //     bodyFormData.append("search", value);
        //     bodyFormData.append("token", token);
        //     console.log(bodyFormData)
        //     if (value && value.length > 0) {
        //         console.log("runinggggggggggg}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}")

        //         dispatch(NewsSearch_action(bodyFormData, navigation));

        //     } else {
        //         return <ActivityIndicator style={{ marginTop: 30, }} color={argonTheme.COLORS.PRIMARY} />;
        //     }

        // }
        // else {
        //     // for blog
        //     console.log("fetch blog")
        //     let token = token_redux;
        //     var bodyFormData = new FormData();
        //     bodyFormData.append("search", value);
        //     bodyFormData.append("token", token);
        //     if (value && value.length) {
        //         dispatch(Search_action(bodyFormData, navigation));

        //     } else {
        //         return <ActivityIndicator color={argonTheme.COLORS.PRIMARY} />;
        //     }
        // }
    };
    //fetching search data.
    // for blog
    const { SearchData, blog_loading } = useSelector(
        (state) => state.Blog_For_Each_Item
    );
    let blog_data = SearchData
    // for search
    const { NewsSearch, NewsLoading } = useSelector(
        (state) => state.NewsPosts
    );
    // console.log(blog_data,"+++++++++++++++++++++")
    let a = useSelector(
        (state) => state.NewsPosts.NewsSearch
    );
    let news_data = NewsSearch;
    console.log(a, "------------------")

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
            <Block row
                style={{
                    height: 80,
                    alignItems: 'center',
                    marginLeft: 10
                }}
            >
                <Input
                    left
                    color="black"
                    autoFocus={false}
                    autoCorrect={false}
                    autoCapitalize="none"
                    iconContent={iconSearch}
                    defaultValue={search}
                    style={[styles.search, active ? styles.shadow : null]}
                    placeholder={" Search"}
                    onFocus={() => setactive(true)}
                    onBlur={() => setactive(false)}
                    placeholderTextColor={argonTheme.COLORS.MUTED}
                    value={search}
                    onChangeText={onSearchTextChange}
                />
                <Block center row style={{}}>
                    <Text
                        style={{
                            color: "#5e72e3",
                            fontSize: 17,
                            paddingHorizontal: 5,
                        }}
                    >Cancel</Text>
                </Block>
            </Block >
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

        // }
    };
    const renderNewsResult = (result) => {
        const opacity = animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1],
            extrapolate: "clamp",
        });
        console.log(result, "OOOOOO")
        return (
            <Animated.View
                style={{ width: width - theme.SIZES.BASE * 2, opacity }}
                key={`result-${result.title}`}
            >
                <NewsSearchCard item={result} horizontal navigation={navigation} />
            </Animated.View>
        );

    };

    const onSearchTextChange = (searchtext) => {
        if (searchtext == "") {
            setactive(true)
        } else {
            setactive(false)
        }
        setsearch(searchtext)
        let searchArr = []
        searchArr = [...dummyData]
        // let searchArr = [...data.displayArray]
        let arr = []

        searchArr.forEach((item, index) => {
            if (item.title.toLowerCase().includes(searchtext.trim().toLowerCase()))
                arr.push(item);
        });
        // const [results, setresults] = useState([]);
        setresults(arr)
    }
    const renderChatList = (data, index) => {
        return (
            <Block width={width * .95}>
                <Block row style={styles.close}>
                    <Block style={{ borderRadius: 100, }}>
                        <ImageBackground
                            source={{
                                uri:
                                    //  message.avatar ? message.avatar  :
                                    "https://i.pinimg.com/474x/9f/23/b2/9f23b2cd56484cdbe6d6581e799290a5.jpg",
                            }}
                            // style={styles.coment_user_dp}
                            style={{
                                width: 60,
                                height: 60,
                                // borderWidth: 1,
                                // borderColor: "red",
                                borderRadius: 10,
                                overflow: "hidden"
                                // borderRadius: 20,
                            }}
                        >
                        </ImageBackground>
                    </Block>
                    <Block
                        row
                        style={{
                            flexDirection: "column",
                        }}
                    >
                        <Text
                            style={{
                                marginLeft: 15,
                                fontWeight: "bold",
                                fontSize: 16,
                                color: argonTheme.COLORS.BLACK,
                            }}
                        >
                            {data.title}
                        </Text>
                        <Text
                            style={{
                                marginLeft: 15,
                                fontSize: 16,
                                marginTop: 10,
                                color: argonTheme.COLORS.MUTED,
                            }}
                        >
                            {new Date().toDateString()}
                        </Text>
                    </Block>
                </Block>
            </Block>
        )
    }
    // get value from handle search statements
    const renderResults = () => {
        animate();
        return (<Block width={width}
        // left
        // style={{ paddingRight: 10 }}
        >
            <FlatList
                data={search ? results : dummyData}
                style={{ flex: 1, marginBottom: 15, }}
                renderItem={({ item, index }) => renderChatList(item, index)}
                showsVerticalScrollIndicator={true}
                keyExtractor={(item, index) => `${index}-${item.id}`}
                ListEmptyComponent={renderNotFound()}
            // ListHeaderComponent={renderHeader}
            // ListFooterComponent={this.renderFooter()}
            />

        </Block>)

    };


    return (
        <Block flex style={styles.searchContainer}>
            {/* <Block center style={styles.header}> */}
            {renderSearch()}
            {/* </Block> */}
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
        flex: 1,
        // marginHorizontal: 10,
        // paddingHorizontal: theme.SIZES.BASE,
        // backgroundColor: theme.COLORS.MUTED
    },
    search: {
        height: 48,
        width: width / 1.3,
        justifyContent: 'center',
        marginRight: 10,
        // marginHorizontal: theme.SIZES.BASE + 2,
        // marginBottom: theme.SIZES.BASE,
        // borderWidth: 1,

        borderRadius: 8,
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
    filterRowStyles: {
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        // backgroundColor: 'cyan',
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderWidth: 1,
        borderTopWidth: 0,
        borderColor: 'gray',
    },
    filterTitle: {
        paddingLeft: 10,
    },
    close: {
        width: "90%",
        height: 70,
        marginTop: 7,
        marginLeft: 15,
        paddingTop: 10,
        // backgroundColor: "red"
    },
});
