import React, { useState } from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  SafeAreaView,
  View,
  Platform,
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
const { height, width } = Dimensions.get("window");
import { Icon, Input } from "../../components";

import argonTheme from "../../constants/Theme";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import { ActivityIndicator, DataTable, Provider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { Reward_history_action } from "../../redux/reducers/Ads/AdsAction";
import DatePick from "../../components/DatePick";
import Modal from "react-native-modal";

export default function RewardStatement() {
  // const [show, setshow] = useState(false);
  const [Value2, setValue2] = useState("recent");
  const [open2, setOpen2] = useState(false);
  let [visible, isModalVisible] = useState(false);

  var arr2 = [
    { label: "Recent", value: "recent" },
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Year", value: "year" },
    { label: "Custom", value: "custom" },
  ];

  React.useEffect(() => {
    AdsHistory();
  }, [Value2, data]);

  const dispatch = useDispatch();
  const { token_is } = useSelector((state) => state.Blog_For_Each_Item);
  const { data } = useSelector((state) => state.Ads.rewardStateData);
  const { adsLoading } = useSelector((state) => state.Ads);
  console.log(data,"jjj")
  // geting history
  const AdsHistory = async () => {
    var history = new FormData();
    history.append("token", token_is);
    history.append("action", "statement");
    history.append("filter", Value2);
    console.log(history);
    if (Value2 == "custom") {
      setModalVisible(true);
    } else {
      await dispatch(Reward_history_action(history));
    }
  };

  const setModalVisible = (visible) => {
    isModalVisible(visible);
  };

  // if(adsLoading){

  //   return( <ActivityIndicator color="red"/>)
  // }
  return (
    <Provider>
      <Block style={styles.container}>
        <Block
          center
          middle
          style={{
            // backgroundColor: "green",
            width: width * 0.9,
            height: height * 0.06,
            // position: "",
            zIndex: 100,
            elevation: 10,
            // flexDirection: 'row',paddingHorizontal:25,
            // borderWidth: 0.5,
          }}
        >
          <DropDownPicker
            listMode={Platform.OS == "ios" ? "SCROLLVIEW" : "MODAL"}
            textStyle={{ color: "#525F7F" }}
            dropDownDirection="AUTO"
            dropDownContainerStyle={{
              backgroundColor: "#DCDCDC",
              borderColor: "white",
            }}
            placeholder="Recent"
            style={{
              borderColor: "rgb(242,243,242)",
              borderWidth: 0.5,
              borderRadius: 5,
              height: 45,
              marginTop: 5,
              width: width * 0.9,
              shadowColor: argonTheme.COLORS.BLACK,
              shadowOffset: { width: 0, height: 0.5 },
              shadowRadius: 1,
              shadowOpacity: 0.13,
              elevation: 210,
              // elevation: 10,
            }}
            open={open2}
            value={Value2}
            items={arr2}
            setOpen={setOpen2}
            setValue={setValue2}
          />
        </Block>

        <Modal
          animationIn={"fadeIn"}
          animationOut={"fadeOut"}
          // coverScreen={false}
          isVisible={visible}
          // backdropColor={color}
          // style={{ backgroundColor: "white" ,width:width*.92,height:height*.2}}
          backdropOpacity={0.3}
          onBackdropPress={() => setModalVisible(false)}
        >
          <Block
            style={{
              backgroundColor: "white",
              borderRadius: 5,
              height: height * 0.37,
            }}
          >
            <DatePick dispatch={dispatch} token_is={token_is} />
          </Block>
        </Modal>

        <Block center style={styles.tablemain}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Source</DataTable.Title>
              <Block
                row
                center
                style={{ width: width * 0.2, paddingHorizontal: width * 0.04 }}
              >
                <Image
                  style={styles.img}
                  source={{
                    uri: "https://assets.shareslate.com/media/icon/webp/coins.webp",
                  }}
                />
                <DataTable.Title numeric>Coin</DataTable.Title>
              </Block>
              <DataTable.Title
                numeric
                style={{ justifyContent: "center", width: width * 0.1 }}
              >
                <Icon
                  size={12}
                  color="#ADB5BD"
                  name="calendar-date"
                  family="ArgonExtra"
                  style={{ paddingRight: 5 }}
                />{" "}
                Date
              </DataTable.Title>
            </DataTable.Header>
            {data==undefined?
            <Block center>

                <DataTable.Title >No statement found</DataTable.Title>
            </Block>
           
          : <ScrollView style={{ marginBottom: 70 }}>
          {data &&
            data.map((i, index) => {
         

              return (
                <DataTable.Row key={index}>
                  <DataTable.Cell>Reward</DataTable.Cell>
                  <DataTable.Cell
                    numeric
                    style={{ width: width * 0.1, justifyContent: "center" }}
                  >
                    {i && i.coin}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>{i && i.date}</DataTable.Cell>
                </DataTable.Row>
              );
            })}
        </ScrollView>}
          
          
          </DataTable>
        </Block>
      </Block>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", marginTop: height * 0.04 },
  mod: {
    backgroundColor: "white",
    minWidth: width * 0.4,
    minHeight: height * 0.1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    margin: 10,
    borderRadius: 5,
    alignSelf: "flex-end",
    elevation: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0.5,
    shadowOpacity: 100,
  },
  tablemain: {
    width: width * 0.9,
    marginTop: 10,
    // backgroundColor: "red",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 0.5 },
    shadowRadius: 1,
    shadowOpacity: 0.13,
    elevation: 2,
    marginBottom: 50,
    // borderWidth: 1,
  },
  cell: {
    width: width * 0.3,
    height: height * 0.05,
    // borderRightWidth: 1,
    backgroundColor: "white",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 0.5 },
    shadowRadius: 1,
    shadowOpacity: 0.13,
    elevation: 2,
  },
  img: { width: width * 0.033, height: height * 0.018, borderColor: 30 },
});
