import React, { useImperativeHandle, forwardRef, useState, useEffect, useMemo } from "react";

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from "expo-ads-admob";
import { useDispatch, useSelector } from "react-redux";
import AdsInsert_action, {
  AdsLimit_action, GetCoins_action,
} from "../redux/reducers/Ads/AdsAction";
import { Alert } from "react-native";

const AdReward = (props, ref) => {
  useImperativeHandle(ref, () => ({
    // methods connected to `ref`
    ads: () => {
      AdsCheck();
    },
  }));
var triger=false;
  const dispatch = useDispatch();
  const { token_is } = useSelector((state) => state.Blog_For_Each_Item);
  const {getCoins,adsLoading,adsLimit}=useSelector((state)=>state.Ads)

  //insert ads
  const inssertAds = async () => {
    console.log("object1")
    var inserData = new FormData();
    inserData.append("token", token_is);
    inserData.append("property", "ads");
    inserData.append("action", "insert");
    inserData.append("type", "reward");
    await dispatch(AdsInsert_action(inserData));
    await GetCoin()
  };

useEffect(() => {
}, [getCoins,triger])
  const GetCoin = () => {
    var inserLimit = new FormData();
    inserLimit.append("token", token_is);
    inserLimit.append("action", "get");
    inserLimit.append("property", "ads");
    dispatch(GetCoins_action(inserLimit));
  };
  //check Ads limit.
  const AdsCheck = async () => {
    var inserLimit = new FormData();
    inserLimit.append("token", token_is);
    inserLimit.append("action", "check");
    inserLimit.append("property", "ads");
    await dispatch(AdsLimit_action(inserLimit));
    showAds();
  };

  const showAds = async () => {
    let lm = await adsLimit;
    if (lm.limit == false) {
      Alert.alert("Today's ads limit is exceeds");
      
    } else if (lm.limit == true) {
      triger=true;
      showRewardAds();
    }
  };


  // REWARD AD
  const adUnitID = Platform.select({
    ios: "ca-app-pub-3686012001393355/9473917452",
    android: "ca-app-pub-3686012001393355/4664443903",
   //test id
    // ios: 'ca-app-pub-3940256099942544/1712485313',
    // android: 'ca-app-pub-3940256099942544/5224354917',
  });

  const showRewardAds = async () => {
    await AdMobRewarded.setAdUnitID(adUnitID); 
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();
    AdMobRewarded.addEventListener("rewardedVideoUserDidEarnReward",async () => {
      if (triger==true){
       await inssertAds();
      //  console.log(triger,"true")
        // console.log("lllkkkkkkkkkkllllllllllll")
        triger=false;
      }else{
      //  console.log(triger,"false")

        // console.log("pppppppppp")
        
      }
    });
  
  };
};

export default forwardRef(AdReward);
