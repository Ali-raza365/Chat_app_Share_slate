import React from "react";
import {
    ScrollView,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Linking,
    ImageBackground,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { DrawerItem as DrawerCustomItem } from "../components/index";
import GuestDrwaer from "../components/GuestDrawerItem";

import { useSelector } from "react-redux";

const { width, height } = Dimensions.get("screen");

function CustomDrawerContent({
    drawerPosition,
    navigation,
    profile,
    focused,
    state,
    ...rest
}) {

    const { Guest_id } = useSelector(state => state.ActiveId_Reducer)
    const screens = ["TRENDING", "BLOGS", "NEWS", "MY PROFILE"];

    if (Guest_id != -1) {
        return (
            <Block
                style={styles.container}
                forceInset={{ top: "always", horizontal: "never" }}
            >
                <Block style={styles.header}>
                    <Image resizeMode="contain"
                        style={styles.logo}
                        source={{
                            uri: "https://assets.shareslate.com/media/logo/logo-dark.png",
                        }}
                    />
                </Block>
                <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        {screens.map((item, index) => {
                            return (
                                <DrawerCustomItem
                                    title={item}
                                    key={index}
                                    navigation={navigation}
                                    focused={state.index === index ? true : false}
                                />
                            );
                        })}
                        <DrawerCustomItem title="DESK" navigation={navigation} />
                        <DrawerCustomItem title="Connect" navigation={navigation} />

                        <Block
                            flex
                            style={{ marginTop: 10, marginVertical: 8, paddingHorizontal: 8 }}
                        >
                            <Block
                                style={{
                                    borderColor: "rgba(0,0,0,0.2)",
                                    width: width,
                                    borderWidth: StyleSheet.hairlineWidth,
                                }}
                            />
                        </Block>
                        <DrawerCustomItem title="Reward" navigation={navigation} />
                        <DrawerCustomItem title="Payment" navigation={navigation} />

                        {/* <DrawerCustomItem title="Authenticate" navigation={navigation} /> */}

                        {/* <DrawerCustomItem title="About" navigation={navigation} /> */}
                        <DrawerCustomItem title="Privacy policy" navigation={navigation} />
                        <DrawerCustomItem
                            title="Terms & conditions"
                            navigation={navigation}
                        />
                        <DrawerCustomItem title="Logout" navigation={navigation} />
                    </ScrollView>
                </Block>
            </Block>
        );
    }
    else {

        return (
            <Block
                style={styles.container}
                forceInset={{ top: "always", horizontal: "never" }}
            >
                <Block style={styles.header}>
                    <Image resizeMode="contain"
                        style={styles.logo}
                        source={{
                            uri: "https://assets.shareslate.com/media/logo/logo-dark.png",
                        }}
                    />
                </Block>
                <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        {screens.map((item, index) => {
                            return (
                                <GuestDrwaer
                                    title={item}
                                    key={index}
                                    navigation={navigation}
                                    focused={state.index === index ? true : false}
                                />
                            );
                        })}
                        <GuestDrwaer title="DESK" navigation={navigation} />
                        <GuestDrwaer title="CHAT" navigation={navigation} />

                        <Block
                            flex
                            style={{ marginTop: 10, marginVertical: 8, paddingHorizontal: 8 }}
                        >
                            <Block
                                style={{
                                    borderColor: "rgba(0,0,0,0.2)",
                                    width: width,
                                    borderWidth: StyleSheet.hairlineWidth,
                                }}
                            />
                        </Block>
                        <GuestDrwaer title="Reward" navigation={navigation} />


                        {/* <GuestDrwaer title="About" navigation={navigation} /> */}
                        <GuestDrwaer title="Privacy policy" navigation={navigation} />
                        <GuestDrwaer
                            title="Terms & conditions"
                            navigation={navigation}
                        />
                        <GuestDrwaer title="Login" navigation={navigation} />
                        <GuestDrwaer title="Register" navigation={navigation} />

                    </ScrollView>
                </Block>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: width * .8,
        // backgroundColor:"red",
        height: height * 0.20,
        justifyContent: "center",
    },
    logo: {
        width: width * 0.56,
        height: height * 0.05,
        alignSelf: "center"
    },
});

export default CustomDrawerContent;
