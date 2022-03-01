import React, { useState } from "react";
import {
  View,
  Platform,
  style,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { Block, Button, Text } from "galio-framework";
import { useDispatch, useSelector } from "react-redux";
import { Reward_history_action } from "../redux/reducers/Ads/AdsAction";
import { Icon, Input } from "../components";

var arg;
const { height, width } = Dimensions.get("window");

export default function DatePick() {
  let date = new Date();
  const [sdate, setsDate] = useState(null);
  const [edate, seteDate] = useState(null);
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    if (arg == "s") {
      setShow(false);
      setsDate(currentDate);
    } else {
      setShow(false);
      seteDate(currentDate);
    }
  };

  const dispatch = useDispatch();
  const { token_is } = useSelector((state) => state.Blog_For_Each_Item);
  let start = moment(sdate).format("YYYY-MM-DD");
  let end = moment(edate).format("YYYY-MM-DD");
  console.log(start, end);
  const AdsHistory = async () => {
    var history = new FormData();
    history.append("token", token_is);
    history.append("action", "statement");
    history.append("filter", "custom");
    history.append("start", start);
    history.append("end", end);

    // console.log(history);

    await dispatch(Reward_history_action(history));
  };

  const showDatepicker = (a) => {
    arg = a;

    if (arg == "s") {
      setShow(true);
    } else {
      setShow(true);
    }
  };

  return (
    <Block style={{ marginTop: 20 }} space={"around"} height={height * 0.33}>
      <Block center>
        <Text
          style={{
            fontFamily: "open-sans-bold",
          }}
          color="#8898AA"
          size={20}
        >
          Custom Date
        </Text>
      </Block>

      <Block middle space={"around"} height={height * 0.15}>
        <Block width={width * 0.8}>
          <Input
            // onChangeText={()=>{showDatepicker("s")}}
            onFocus={() => {
              showDatepicker("s");
            }}
            borderless
            placeholder="Start"
            value={start == "Invalid date" ? "Start" : start}
            iconContent={
              <Icon
                size={16}
                color="#ADB5BD"
                name="calendar-date"
                family="ArgonExtra"
                style={{ paddingRight: 12 }}
              />
            }
          />
        </Block>
        <Block width={width * 0.8}>
          <Input
            // onChangeText={(e)=>{setpassword(e)}}
            onFocus={() => {
              showDatepicker("e");
            }}
            borderless
            value={end == "Invalid date" ? "End" : end}
            placeholder="End"
            iconContent={
              <Icon
                size={16}
                color="#ADB5BD"
                name="calendar-date"
                family="ArgonExtra"
                style={{ paddingRight: 12 }}
              />
            }
          />
        </Block>
      </Block>

      <Block center>
        <Button
          onPress={() => AdsHistory()}
          style={{ borderRadius: 5, height: height * 0.05, width: width * 0.8 }}
        >
          <Text
            style={{
              fontFamily: "open-sans-bold",
            }}
            color="#8898AA"
            color={"white"}
            size={15}
          >
            Search
          </Text>
        </Button>
      </Block>
      {show && (
        <DateTimePicker
          style={{ backgroundColor: "black" }}
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          display={Platform.OS == "ios" ? "inline" : "default"}
          isDarkModeEnabled={Platform.OS == "ios" ? true : false}
          onChange={onChange}
        />
      )}
    </Block>
  );
}
