import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Block, Text, theme, Radio } from "galio-framework";
import RadioButton from "./RadioButton";

const { width, height } = Dimensions.get("screen");

const PROP = [
	{
		key: 'He/His/They/Them',
		text: 'He/His/They/The',
	},
	{
		key: 'She/Her/They/Them',
		text: 'She/Her/They/Them',
	},
	{
		key: 'Opt nothing',
		text: 'Opt nothing',
	},

];
export default function ReferMe() {
  return (
    <Block style={{ padding: 20 }} flex>
        <Block>
          <Text
            style={{ fontFamily: "open-sans-bold" }}
            size={18}
            color={theme.COLORS.Text}
          >
            Refer as
          </Text>
        </Block>
      <Block  style={{ width: width * 0.95, height: height * 0.3 ,marginTop: 20,}}>
  
        <RadioButton PROP={PROP} />

      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({});
