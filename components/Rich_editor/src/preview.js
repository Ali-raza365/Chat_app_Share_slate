// @flow
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, StyleSheet, View, SafeAreaView,Text, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import argonTheme from "../../../constants/Theme";

export default function Preview(html,css) {
  const navigation = useNavigation()
  const onHome = () => {
    navigation.push("Editor");

  };
  let data=html.route.params;
// let a=html;
  console.log("_______",data,"+++++++++");
 
  html = `<html>
            <head>
                <meta name="viewport" content="user-scalable=1.0,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
                ${data.css} 
            
                </head>
            <body>
            ${data.html} 
            </body>
        </html>`;
  return (
    <SafeAreaView style={styles.container}>
    
      <WebView
        useWebKit={true}
        scrollEnabled={false}
        hideKeyboardAccessoryView={true}
        keyboardDisplayRequiresUserAction={false}
        originWhitelist={["*"]}
        dataDetectorTypes={"none"}
        domStorageEnabled={false}
        bounces={false}
        javaScriptEnabled={true}
        source={{ html }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  nav: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 5,backgroundColor:"white"
  },
});
