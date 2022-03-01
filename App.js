import React,{useState,useEffect,useMemo} from 'react';
import { Alert, Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { Store } from './redux/Store';
// Before rendering any navigation stack
import { enableScreens } from 'react-native-screens';
enableScreens();
import 'array-flat-polyfill'

import Screens from './navigation/Screens';
import { Images, articles, argonTheme } from './constants';



// cache app images
const assetImages = [
  Images.Onboarding,
  Images.LogoOnboarding,
  Images.Logo,
  Images.Pro,
  Images.ArgonLogo,
  Images.iOSLogo,
  Images.androidLogo,
];

// cache product images
articles.map(article => assetImages.push(article.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}



export default function App ({navigation}){

 const [isLoadingComplete, setisLoadingComplete] = useState(false);
 const [fontLoaded, setfontLoaded] = useState(false);

 _loadResourcesAsync = async () => {
  return Promise.all([
    ...cacheImages(assetImages),
  ]);
};

_handleLoadingError = error => {
  console.warn(error);
};

_handleFinishLoading = () => {
  if(fontLoaded) {
    setisLoadingComplete(true );
  }
};

useEffect( () => {
      font();
      setfontLoaded(true);
}, [])


  const  font=async() => {
    await Font.loadAsync({
      'open-sans-regular': require('./assets/font/OpenSans-Regular.ttf'),
      'open-sans-light': require('./assets/font/OpenSans-Light.ttf'),
      'open-sans-bold': require('./assets/font/OpenSans-Bold.ttf'),
    });
  }
  
    if(!isLoadingComplete) {
      try {
        return (
          <AppLoading
            startAsync={_loadResourcesAsync}
            onError={_handleLoadingError}
            onFinish={_handleFinishLoading}
          />
          );
      } catch (error) {
        console.log(error,"!isLoadingComplete ")
      }
      
    } else {

console.log("app.js nav to screen")


        return (
          <Provider store={Store}>
        <NavigationContainer>

          <GalioProvider theme={argonTheme}>
            <Screens  />
          </GalioProvider>
        </NavigationContainer>
          </Provider>
      );
 
    
  }
  


}
