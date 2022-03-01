//this is 1st screen after splash screen.

import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
  View,
  Text,TouchableOpacity, Alert 
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
// import * as from 'react-native-animatable';
import { block } from "react-native-reanimated";
const { height, width } = Dimensions.get("screen");
import { Block,  theme } from "galio-framework";


export default function Pro({navigation}){
 
    // const { navigation } = this.props;

    return (
      <LinearGradient colors={['#607d8b', '#607d8b', '#607d8b']} style={styles.container} >
      {/* <ImageBackground source={require("../assets/circle.png")}style={{width:70,height:70,alignSelf:"flex-end"}}></ImageBackground> */}
       
      <ImageBackground source={require("../assets/circle.png")}style={{width:200,height:200}}></ImageBackground>

        <View animation="fadeInUp" duration={800} delay={1000} style={styles.container1}>
          <Text animation="rubberBand" iterationCount={2} direction="alternate"
            style={{
              fontFamily: "open-sans-regular",
              color: "white",
              fontSize: 40,
            }}
          >
            SHARE SLATE .
          </Text>
          <Text   
            right
            style={{
              fontFamily: "open-sans-regular",
              color: "white",
              fontSize: 13,
              alignSelf: "flex-end",
              marginBottom: 10,
            }}
          >
            Your Space. Your Way
          </Text>
        </View>
        <Text animation="rotate" duration={800} delay={100} iterationCount={2}
          center
          size={16}
          color="rgba(255,255,255,0.6)"
          style={{
            marginTop: 35,
            fontFamily: "open-sans-regular",
            alignSelf: "flex-start",marginLeft:30,
            color: "white",
          }}
        >
          New way of connecting with your{"\n"}friends,family and circle.!
        </Text>

        <View style={styles.padded} >
          <TouchableOpacity activeOpacity={.6}
            style={styles.button}
            onPress={() => navigation.navigate("Account")}
          >
            <Text style={{ fontFamily: "open-sans-bold", color: "white" ,fontSize: 14 }} >
              REGISTER
            </Text>
          </TouchableOpacity >

          <TouchableOpacity activeOpacity={.6}
            style={styles.button}
            onPress={() =>{
              // Alert.alert("hi")
               navigation.navigate("Login")
              }}
          >
            <Text style={{ fontFamily: "open-sans-bold", color: "white" ,fontSize: 14 }} >
              LOGIN
            </Text>
          </TouchableOpacity  >
        </View>
        </LinearGradient>
    );//1242 2436
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width,
    paddingHorizontal: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  container1:{ backgroundColor: "transparent", alignSelf: "center" },
  padded: { width:"100%", height:"10%", alignSelf: "flex-end",justifyContent:"space-between" ,marginTop:50},
  button: {
    width: "100%",
    height: 35,borderRadius:5,
    justifyContent:"center",alignItems:"center",
    shadowOpacity: 0,backgroundColor: "#59ADFF",marginTop:10
  },
});
