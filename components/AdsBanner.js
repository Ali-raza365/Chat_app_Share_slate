import { Block } from 'galio-framework';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';
export default function AdsBanner() {
    const adUnitID = Platform.select({
        // https://developers.google.com/admob/ios/test-ads
        ios: 'ca-app-pub-3686012001393355/6795783221',
        // https://developers.google.com/admob/android/test-ads
        android: 'ca-app-pub-3686012001393355/6795783221',
      });
    return (
        <Block style={styles.container}>

        <AdMobBanner
        bannerSize="mediumRectangle"
        adUnitID={adUnitID} // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds // true or false
        onDidFailToReceiveAdWithError={(e)=>console.log(e)}
        />
        </Block>
    )
}

const styles = StyleSheet.create({
    container:{margin: 10,}
})
