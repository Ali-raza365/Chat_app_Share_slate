import { Block } from 'galio-framework';
import React, { Component } from 'react';
import { StyleSheet, Text, View ,Dimensions} from 'react-native';
import { WebView } from 'react-native-webview';


const { width,height } = Dimensions.get("screen");


export default function MyWebComponent ({route}){
    let source=route.params;
        // console.log(source,"}}}}}}}}}}}}}}}");
    return(
 <Block  style={{width:width,height:height,}}>
      <WebView source={{ uri: source }} />
 </Block>
    )
}