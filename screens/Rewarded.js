import React from "react";
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import argonTheme from "../constants/Theme";
import Icon from "../components/Icon";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

const { height, width } = Dimensions.get("screen");

import Constants from 'expo-constants';

const testID = 'google-test-id';
const productionID = 'my-id';
// Is a real device and running in production.
// const adUnitID = Constants.isDevice && !__DEV__ ? productionID : testID;
const adUnitID = Platform.select({
  // https://developers.google.com/admob/ios/test-ads
  ios: 'ca-app-pub-3940256099942544/1712485313',
  // https://developers.google.com/admob/android/test-ads
  android: 'ca-app-pub-3940256099942544/5224354917',
});


export default function Reward() {
   // REWARD AD
   const showRewardAds=async()=> {
    setTestDeviceIDAsync("EMULATOR")
     console.log("object")
     await AdMobRewarded.setAdUnitID(adUnitID); // Test ID, Replace with your-admob-unit-id
    //  await AdMobRewarded.rewardedVideoDidLoad(e=>{console.log(e,"lllll")})

     await AdMobRewarded.requestAdAsync();
     await AdMobRewarded.showAdAsync();
  }
  return (
    <Block style={styles.container}>
      <Block center space="around" style={styles.coinContainer}>
        <Image style={styles.img} source={require("../assets/dollar.png")} />
        <Text
          style={{ fontFamily: "open-sans-regular" }}
          size={30}
          color={"#8898AA"}
        >
          20
        </Text>
      </Block>
      <TouchableOpacity
        onPress={() => {
          showRewardAds()
        }}
      >
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
            textDecorationLine: "underline",
          }}
          size={16}
          color={"#8898AA"}
        >
          Earn more coins
        </Text>
      </TouchableOpacity>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: "white",
    paddingHorizontal: 20,
    marginTop:10
  },
  coinContainer: {
    width: width * 0.9,
    height: height * 0.25,
    // backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 130,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 0 },
    // elevation: 1,
    borderWidth: 1,
    borderColor: argonTheme.COLORS.BORDER_COLOR,
  },
  img: { width: width * 0.4, height: height * 0.15, borderColor: 30 },
});
