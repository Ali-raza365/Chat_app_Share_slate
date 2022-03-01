import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, FlatList, Animated, Text } from "react-native";
import { Block, theme } from "galio-framework";
import { useSelector, useDispatch } from "react-redux";
import { showCategories_Item_action } from "../redux/reducers/blog/Blog_For_Each_Item_action";

const { width } = Dimensions.get("screen");
import argonTheme from "../constants/Theme";
import { ActiveId_Action } from "../redux/reducers/App_Realated/AppActon";

export default function Tabs({ data, onChange, navigation, onPress,initialIndex }) {
  // console.log(data,"ppppppppppppppppppp")
  const dispatch = useDispatch();
  const state = useSelector((state) => state.ActiveId_Reducer);
  let isActive;
  useEffect(() => {
  }, [state, isActive]);

  let animatedValue = new Animated.Value(1);

  const animate = () => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false, // color not supported
    }).start();
  };

  let menuRef = React.createRef();
  const onScrollToIndexFailed = () => {
    menuRef.current.scrollToIndex({
      index: 0,
      viewPosition: 0.5,
    });
  };

  let selectMenu = (id) => {
    // for home's header
    if (data) {
      menuRef.current.scrollToIndex({
        index: data.findIndex((item) => item.id === id),
        viewPosition: 0.5,
      });
      onPress("BlogsCateScrn", id, data);
      animate();
    } else {
      // for category header.
      menuRef.current.scrollToIndex({
        index: data.findIndex((item) => item.id === id),
        viewPosition: 0.5,
      });

      onChange && onChange(id);
      animate();
    }
  };

  const renderItem = (item) => {
      isActive = state.active_id === item.name;
      // console.log(isActive,state.active_id,item.name,"aaaaaaaaaaaaaaaaa")

    const textColor = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        argonTheme.COLORS.TEXT,
        isActive ? argonTheme.COLORS.WHITE : argonTheme.COLORS.TEXT,
      ],
      extrapolate: "clamp",
    });

    const containerStyles = [
      styles.titleContainer,
      !isActive && { backgroundColor: argonTheme.COLORS.SECONDARY },
      isActive && styles.containerShadow,
    ];
    if (item.name == "newsCate_home") {
      return null;
    } else {
      return (
        <Block style={containerStyles}>
          <Animated.Text
            style={[
              styles.menuTitle,
              { color: textColor },
              { fontFamily: "open-sans-bold" },
            ]}
            onPress={() => {
              dispatch(ActiveId_Action(item.name));
              selectMenu(item.id);
            }}
          >
            {item.name || item.title}
          </Animated.Text>
        </Block>
      );
    }
  };

  const renderMenu = () => {
    // here button are showed and props is showcategories or the button names
    return (
      <FlatList
        data={data}
        horizontal={true}
        ref={menuRef}
        extraData={state.active_id}
        keyExtractor={(item, index) => item.id}
        showsHorizontalScrollIndicator={false}
        onScrollToIndexFailed={onScrollToIndexFailed}
        renderItem={({ item }) => renderItem(item)}
        contentContainerStyle={styles.menu}
      />
    );
  };

  return <Block style={styles.container}>{renderMenu()}</Block>;
}

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: theme.COLORS.WHITE,
    zIndex: 2,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
  },
  menu: {
    paddingHorizontal: theme.SIZES.BASE * 2.5,
    paddingTop: 8,
    paddingBottom: 16,
  },
  titleContainer: {
    alignItems: "center",
    backgroundColor: argonTheme.COLORS.ACTIVE,
    borderRadius: 4,
    marginRight: 9,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  containerShadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  menuTitle: {
    fontWeight: "600",
    fontSize: 14,
    
    paddingVertical: 8,
    paddingHorizontal: 12,
    color: argonTheme.COLORS.MUTED,
  },
});
