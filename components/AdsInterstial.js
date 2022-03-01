import React, { useImperativeHandle, forwardRef, useState, useEffect, useMemo } from "react";

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from "expo-ads-admob";


const AdInterstial = (props, ref) => {
  useImperativeHandle(ref, () => ({
    // methods connected to `ref`
    ads: () => {
        ShowInters();
    },
  }));


 
//  adsInterstitial
  const adUnitID = Platform.select({
    // https://developers.google.com/admob/ios/test-ads
    ios: 'ca-app-pub-3686012001393355/6060657763',
    // https://developers.google.com/admob/android/test-ads
    android: 'ca-app-pub-3686012001393355/6060657763',
  });

  const ShowInters = async () => {
    await AdMobInterstitial.setAdUnitID(adUnitID); // Test ID, Replace with your-admob-unit-id
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
    await AdMobInterstitial.showAdAsync();
  };
};

export default forwardRef(AdInterstial);
