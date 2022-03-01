import OTPInputView from "@twotalltotems/react-native-otp-input";
import React from "react";
import { Alert, Dimensions, StyleSheet } from "react-native";
import { Block, Text } from "galio-framework";
import { TouchableOpacity } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("window");

export default function OtpScrn({navigation}) {
  return (
    <Block   >
      <Text
        style={{
          fontFamily: "open-sans-bold",
          marginTop: 100,
        alignSelf: 'center',
        }}
        color="#8898AA"

        size={16}
      >
        Step 4/4
      </Text>

   
      <Text
        style={{
          fontFamily: "open-sans-regular",
          marginTop: 200,
        alignSelf: 'center',
        }}
        color="#8898AA"

        size={20}
      >
        Please enter the code
      </Text>
      <Block center middle>
        <OTPInputView
          style={{
            width: "80%",
            height: 200,
            // backgroundColor: "red",
            marginTop: 0,
          }}
          pinCount={6}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged = {code => { this.setState({code})}}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(code) => {
            console.log(`Code is ${code}, you are good to go!`);
          }}
        />
      </Block>
      <TouchableOpacity onPress={()=>{navigation.navigate("RewardStack")}} >
      <Text
        style={{
          fontFamily: "open-sans-regular",
        //   marginTop: 200,
        alignSelf: 'center',
        }}
        color="#8898AA"

        size={20}
      >
        Resend
      </Text>
      </TouchableOpacity>
    </Block>
  );
}

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
    // backgroundColor: "red",

  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    // backgroundColor:"#8898AA" 
    borderColor:"#8898AA"
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});
