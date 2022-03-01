import React from "react";
import { StyleSheet, TouchableWithoutFeedback,Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Block, Text } from "galio-framework";
import Icon from "./Icon";
import { argonTheme } from "../constants";
import moment from "moment";
import Loading from '../constants/loading'
import { useSelector } from "react-redux";
export default function Notification ({ 
  body,onPress,url,title,msg,author,time,
  style,
  system,
  transparent}) {
// console.log(body)
    const iconContainer = [
      styles.iconContainer,
      // { backgroundColor: color || argonTheme.COLORS.PRIMARY },
      system && { width: 34, height: 34 },
      !system && styles.iconShadow
    ];

    const container = [
      styles.card,
      !transparent && { backgroundColor: argonTheme.COLORS.WHITE },
      !transparent && styles.cardShadow,
      system && { height: 78 },
      style
    ];



    return (
      <Block style={container} middle>
        <TouchableWithoutFeedback onPress={onPress}>
          <Block row style={{ width: "95%" }}>
            <Block top flex={system ? 0.12 : 0.2} middle>
              <Block middle style={iconContainer}>
                <Image style={{width:45,height:45,borderRadius:30}} source={{uri:url}} />
              </Block>
            </Block>
            <Block flex style={{ paddingRight: 3, paddingLeft: 12 }}>
              {system && (
                <Block row space="between" style={{ height: 18 }}>
                  <Text color={argonTheme.COLORS.MUTED} style={{ fontFamily: 'open-sans-bold' }} size={13}>{title}</Text>
                  <Block row style={{ marginTop: 3 }}>
                    <Icon
                      family="material-community"
                      name="clock"
                      size={12}
                      color={argonTheme.COLORS.MUTED}
                    />
                    <Text
                      color={argonTheme.COLORS.MUTED}
                      style={{
                        fontFamily: "open-sans-regular",
                        marginLeft: 3,
                        marginTop: -3
                      }}
                      size={12}
                    >
                      {time}
                    </Text>
                  </Block>
                </Block>
              )}
              <Text
                color={argonTheme.COLORS.TEXT}
                numberOfLines={3}
                
                size={system ? 13 : 14}
                style={{ fontFamily: system ? "open-sans-bold" : "open-sans-regular" }}
              >
                {msg }{" "}
               {/* <TouchableOpacity style={{backgroundColor:"green"}}> */}
                 
                <Text
                // color={"red"}
                color={argonTheme.COLORS.PRIMARY}

                size={system ? 13 : 14}
                style={{ fontFamily: system ? "open-sans-bold" : "open-sans-regular" }}
              >
                {body}
              </Text>
               {/* </TouchableOpacity> */}
              </Text>

            <Text
               color={argonTheme.COLORS.TEXT}
                size={system ? 13 : 14}
                style={{ fontFamily: system ? "open-sans-bold" : "open-sans-regular" }}
              >
                By {author}
              </Text>
            </Block>
            {!system && (
              <Block row flex={0.2} style={{ marginTop: 3 }}>
                <Icon
                  family="material-community"
                  name="clock"
                  size={12}
                  color={argonTheme.COLORS.MUTED}
                />
                <Text
                  color={argonTheme.COLORS.MUTED}
                  style={{
                    fontFamily: "open-sans-regular",
                    marginLeft: 3,
                    marginTop: -2
                  }}
                  size={12}
                >
                  {/* {time} */}
                  {moment(time).fromNow()}

                </Text>
              </Block>
            )}
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }



Notification.propTypes = {
  body: PropTypes.string,
  color: PropTypes.string,
  iconColor: PropTypes.string,
  iconFamily: PropTypes.string,
  iconName: PropTypes.string,
  iconSize: PropTypes.number,
  onPress: PropTypes.func,
  style: PropTypes.object,
  system: PropTypes.bool,
  time: PropTypes.string,
  title: PropTypes.string,
  transparent: PropTypes.bool,
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 46,
    height: 46,
    // borderRadius: 23,
    marginTop: 5
  },
  iconShadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2
  },
  card: {
    zIndex: 2,
    height: 120,
    // width:320,
    borderRadius: 6,paddingRight:5
  },
  cardShadow: {
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2
  }
});
