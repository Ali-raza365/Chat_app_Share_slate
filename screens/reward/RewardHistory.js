import React, { useRef, useState,useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { argonTheme } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../../components";
import AdsCheck from "../../components/AdsReward";
const { width, height } = Dimensions.get("window");
import Accordion from "react-native-collapsible/Accordion";
import { ScrollView } from "react-native-gesture-handler";
import { AdsLimit_action, GetCoins_action } from "../../redux/reducers/Ads/AdsAction";

const SECTIONS = [
  {
    id: "1",
    title: "How To Get Your First 500 Loyal Blog Visitors?",
    content:
      "In this guide, I’ll show you how to promote your blog and get traffic. Starting a blog is easy compared to getting people’s attention, promoting content and increasing blog traffic. Here’s what you need to know to promote your blog content and drive traffic.",
  },
  {
    id: "2",
    title: "What should I name my blog and how do I get a domain name?",
    content:
      "There are many strategies for picking a name for your blog. You simply need to spend some time thinking about it and getting creative. One simple solution is calling the blog by your own name. Many have been successful with this approach.",
  },
  {
    id: "3",
    title: "The best traffic sources for blogs?",
    content:
      "Organic search traffic  This is traffic from Google as Google stands for some 90% of all search traffic across the globe. For many blogs, Google drives 50% or more of their total traffic. Google and search engine optimization is a big topic, so I have a special blog SEO guide.",
  },
];

export default function EarnReward({ navigation }) {
  const { getCoins, adsLoading } = useSelector((state) => state.Ads);
  const [activeSections, setactiveSections] = useState([]);
  const [position, setposition] = useState(false);
  const childRef = useRef();
  let id = null;
  const _renderHeader = (section) => {
    return (
      <Block style={styles.header}>
        <Text
          style={{ fontFamily: "open-sans-regular" }}
          size={13}
          bold={true}
          color={"rgba(0,0,0,0.5)"}
        >
          {section.id}. {section.title}
        </Text>
      </Block>
    );
  };

  const _renderContent = (section) => {
    return (
      <Block style={styles.cotnt}>
        <Text
          style={{ fontFamily: "open-sans-regular" }}
          size={12}
          color={"rgba(0,0,0,0.5)"}
        >
          {section.content}
        </Text>
      </Block>
    );
  };
  const { token_is ,userId_is} = useSelector((state) => state.Blog_For_Each_Item);
const dispatch = useDispatch();
   //check getCoins.
   const GetCoin = () => {
    var inserLimit = new FormData();
    inserLimit.append("token", token_is);
    inserLimit.append("action", "get");
    inserLimit.append("property", "ads");
    dispatch(GetCoins_action(inserLimit));
  };
  //check Ads limit.
  const AdsChecklim = async () => {
    var inserLimit = new FormData();
    inserLimit.append("token", token_is);
    inserLimit.append("action", "check");
    inserLimit.append("property", "ads");
    await dispatch(AdsLimit_action(inserLimit));
  };

useEffect(() => {
  GetCoin();
  AdsChecklim();

}, [])


  return (

    <Block center style={styles.container}>
      <Block center space="between" style={styles.container3}>
        <Text
          style={{ fontFamily: "open-sans-bold" }}
          size={17}
          bold={true}
          color={"rgba(0,0,0,0.5)"}
        >
          Coins earned
        </Text>

        <Block center row middle>
          <Text
            style={{ fontFamily: "open-sans-bold" }}
            size={50}
            bold={true}
            color={"rgba(0,0,0,0.5)"}
          >
            {getCoins && getCoins.total}{" "}
          </Text>
          <Image
            style={styles.img}
            source={{
              uri: "https://assets.shareslate.com/media/icon/webp/coins.webp",
            }}
          />
        </Block>
        {getCoins && getCoins.total == "0" ? (
          <Text
            style={{ fontFamily: "open-sans-bold" }}
            size={height < 700 ? 30 : 50}
            color={"rgba(0,0,0,0.5)"}
          >
            Coin
          </Text>
        ) : (
          <Text
            style={{ fontFamily: "open-sans-bold" }}
            size={height < 700 ? 30 : 50}
            color={"rgba(0,0,0,0.5)"}
          >
            Coins
          </Text>
        )}
        <Block center style={{ alignItems: "flex-end" }}>
          <AdsCheck ref={childRef} />

          <Button
            onPress={() => {
              childRef.current.ads();
            }}
            color="primary"
            style={styles.createButton}
          >
            {adsLoading == false ? (
              <Text
                style={{ fontFamily: "open-sans-bold" }}
                size={16}
                color={argonTheme.COLORS.WHITE}
              >
                Earn coin
              </Text>
            ) : (
              <ActivityIndicator color={"white"} />
            )}
          </Button>
        </Block>
      </Block>

      <Block center style={{ alignItems: "flex-end" }}>
        <Button
          onPress={() => {
            navigation.navigate("RewardStatement");
          }}
          color="primary"
          style={styles.RewardStateButton}
        >
          {/* {adsLoading==false? */}
          <Text
            style={{ fontFamily: "open-sans-bold" }}
            size={16}
            color={argonTheme.COLORS.WHITE}
          >
            Reward statement
          </Text>
          {/* // :<ActivityIndicator color={"red"}/>}   */}
        </Button>
      </Block>
      <Block style={styles.container2}>
        <Text
          style={{ fontFamily: "open-sans-regular", paddingLeft: 22 }}
          size={20}
          // bold={true}
          color={"rgba(0,0,0,0.5)"}
        >
          Reward Coins FAQ
        </Text>
        <Text
          style={{ fontFamily: "open-sans-regular", paddingLeft: 22 }}
          size={15}
          // bold={true}
          color={"rgba(0,0,0,0.5)"}
        >
          {"\n"}Coming soon...
        </Text>
        {/* <Block  style={styles.accor}>
          <ScrollView style={{marginBottom:100}}>
            <Accordion
              underlayColor="silver"
              sections={SECTIONS}
              onAnimationEnd={()=>{setposition(!position)}}
              activeSections={activeSections}
              // renderSectionTitle={_renderSectionTitle}
              renderHeader={_renderHeader}
              renderContent={_renderContent}
              onChange={_updateSections}
            />
          </ScrollView>
        </Block> */}
      </Block>
    </Block>
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height * 1,
    padding: height * 0.03,
    // backgroundColor: "white",
    // shadowOpacity:.5,shadowOffset:{height:0,width:0},
    // shadowRadius:.5,shadowColor:"black"
  },
  accor: {
    height: height * 0.5,
    width: width * 0.9,
    marginTop: 20,

    // backgroundColor: "red",
  },
  header: {
    // backgroundColor:"green",
    width: width * 0.8,
    height: height * 0.05,
    alignSelf: "center",
    justifyContent: "center",
    paddingLeft: 10,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 0.1,
    marginVertical: 5,
    shadowRadius: 0.1,
    backgroundColor: "rgb(247,247,247)",
  },
  cotnt: {
    width: width * 0.88,
    padding: 5,
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: 27,
  },

  container1: {
    width: width * 0.9,
    height: height * 0.048,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 200,
    shadowRadius: 10,
    backgroundColor: "white",
  },
  container2: {
    width: width * 0.9,
    height: height * 0.33,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 0.5,
    paddingTop: 10,

    backgroundColor: "white",
  },
  createButton: {
    width: width * 0.3,
    // borderRadius: 0,
    // marginBottom:5,
  },
  RewardStateButton: {
    width: width * 0.9,
    // borderRadius:0
  },
  container3: {
    width: width * 0.9,
    // height: height * 0.32,
    height: height * 0.4,

    backgroundColor: "white",
    borderRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 0.1,
    // paddingVertical:height*.03
    paddingTop: height * 0.03,
    paddingBottom: height * 0.03,
  },
  img: { width: width * 0.2, height: height * 0.1, borderColor: 30 },
});
