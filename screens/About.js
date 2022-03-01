import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Block, Text, theme } from "galio-framework";

import argonTheme from "../constants/Theme";

export default class About extends React.Component {
  render() {
    return (
      <Block flex style={{ backgroundColor: "white" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.about}
          overScrollMode="always"
        >
               <Text
            style={{ fontFamily: "open-sans-bold",textAlign:"center",marginBottom: 20,}}
            size={20}
            color={argonTheme.COLORS.PRIMARY}
          >About Share Slate</Text>
          <Text
            style={{ fontFamily: "open-sans-regular",}}
            size={16}
            color={argonTheme.COLORS.TEXT}
          >
            Create, share & collaborate with your circle. Share Slate (from
            Share Slate Inc.) allows you to create and share your photos, video,
            stories and documents with your friends and followers.{"\n"}{"\n"}Share slate
            provides you features like messaging, wall post, commenting, sharing
            and, much more. You can make Audio-Video calls with screen sharing
            sessions with your circle. With APPLICATIONS, you can create, edit,
            upload, and share documents to collaborate with your circle.{"\n"}{"\n"}
            APPLICATIONS is compatible with MS Office documents which allows you
            to work on non-Share Slate originated document formats.{"\n"}{"\n"}CLOUDLAP
            lets you create and access the virtual machines at affordable
            prices. You can choose the Operating system as per your need from
            our pool of OS.{"\n"}{"\n"}Share Slate FLICK lets you watch, upload, and share
            videos online. You can subscribe to users to keep yourself updated
            with latest from your network.{"\n"}{"\n"}CODES lets you upload and share your
            code repositories with public or your private circle.{"\n"}{"\n"}With Share
            Slate, earning opportunities are endless. You can earn coins for
            many of the activities you do on Share Slate. Any money earned in
            the form of coins will be deposited into your Share Slate Wallet.
            You can link the Share Slate Wallet with your payment processing
            accounts such PayPal, Stripe...etc. to withdraw money into your
            account at the end of every month. Shop for products that suits your
            personal or professional style with Share Slate online store.{"\n"}{"\n"}We
            respect your privacy; hence we do not sell your data to any third
            party to show targeted ads.{"\n"}{"\n"}The ads which you see are non-targeted
            and are not used for user profiling purposes.
          </Text>
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  about: {
    padding: theme.SIZES.BASE,
  },
});
