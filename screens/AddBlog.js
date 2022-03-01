import React, { useState, useEffect, createRef } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  SafeAreaView,
  Modal,
  Pressable,
  View,
  TextInput,
} from "react-native";
import { Block, Checkbox, Text } from "galio-framework";
import argonTheme from "../constants/Theme";
const { width, height } = Dimensions.get("screen");
import Icon from "../components/Icon";
import { Button, Input } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { _onAPLogin } from "../redux/reducers/ap-user/ap_user_actions";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import {
  AddBlog_fImage_action,
  Add_Blog_action,
} from "../redux/reducers/blog/Blog_For_Each_Item_action";
import mime from "mime";
import * as ImageManipulator from "expo-image-manipulator";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
function AddBlog({ navigation }) {
  const [title, settitle] = useState(null);
  const [Value, setValue] = useState(null);
  const [image, setImage] = useState(null);
  const [tag1, settag1] = useState(null);
  const [tag2, settag2] = useState(null);
  const [tag3, settag3] = useState(null);
  const [imagelabel, setimagelabel] = useState(null);
  const [imageUrl, setimageUrl] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [isVisible, setVisible] = useState(false);

  const dispatch = useDispatch();

  //token
  const token_redux = useSelector((state) => state.Blog_For_Each_Item.token_is);
  // console.log(token_redux,"token from redux in Add_blog")

  // addBlog picture id
  const b_id = useSelector((state) => state.Blog_For_Each_Item.Addblog_fimage);
  // console.log(b_id.blog_id,"+++++")

  // addBlog html data
  const data_post = useSelector((state) => state.Blog_For_Each_Item.html_data);
  // console.log(data_post,"@@@@@@@@@@@@@@")
  

  //seting dropDownPicker data
  let obj = {};
  let arr = [];
  let categories = useSelector(
    (state) => state.Blog_For_Each_Item.showCategories
  );
  let a = () => {
    categories.map((p) => {
      obj = { ...obj, label: p.name, value: p.id };
      arr = [...arr, obj];
    });
  };
  a();
  // console.log(categories)

  const addBlogData = async () => {
    var data = new FormData();
    data.append("token", token_redux);
    data.append("blog_id", b_id.blog_id);
    data.append("title", title);
    data.append("category", Value);
    data.append("description", data_post);
    data.append("featuredLabel", imagelabel);
    data.append("featuredSource", imageUrl);
    data.append("tag1", tag1);
    data.append("tag2", tag2);
    data.append("tag3", tag3);
    console.log(data, "fffffffffffffffffff");
    dispatch(Add_Blog_action(data, navigation));
  };

  //image picker
  const pickImage = async () => {
    // //     console.log("piker");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // allowsMultipleSelection:true,
      // aspect: [{],
      quality: 1,
    });
    if (!result.cancelled) {
      // console.log(result.uri)
      // setImage(result.uri )
      img(result.uri);
    }
  };

  const img = async (uri) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 600, height: 300 } }],
      { format: ImageManipulator.SaveFormat.PNG }
    );
    setImage(manipResult.uri);
    console.log(manipResult, "IIIIIIII");

    if (image == null) {
      first_image(manipResult.uri);
      setImage(manipResult.uri);
    } else {
      // for replace image
      already_Exist(manipResult.uri);
      setImage(manipResult.uri);
    }
  };

  const already_Exist = async (data) => {
    console.log(data, "--", id);
    let image = await data;
    let id = await b_id.blog_id;
    var replace_image = new FormData();
    replace_image.append("token", token_redux);
    replace_image.append("blog_id", id);
    replace_image.append("featured_image", {
      uri: image,
      type: mime.getType(image),
      name: image && image.split("/").pop(),
    });
    // console.log(id, "aaaaaaaaaa");

    dispatch(AddBlog_fImage_action(replace_image, navigation));
  };

  const first_image = async (data) => {
    let image = await data;

    //for first time upload image
    var replace_image = new FormData();
    replace_image.append("token", token_redux);
    replace_image.append("featured_image", {
      uri: image,
      type: mime.getType(image),
      name: image && image.split("/").pop(),
    });
    console.log(replace_image);
    await dispatch(AddBlog_fImage_action(replace_image, navigation));
    // console.log(pic,"PPPPPPPPPPP")
  };

  return (
    // <KeyboardAvoidingView behavior={"height"}
    // keyboardVerticalOffset={2}
    //  style={{ flex: 1,backgroundColor:"white" }}>
    //   <StatusBar hidden />
      <ScrollView>
        <Block style={styles.registerContainer}>
          <Block flex space="between">
            <Block>
              <Text
                style={{
                  fontFamily: "open-sans-regular",
                  textAlign: "center",marginTop:5
                }}
                color="#8898AA"
                // color={"black"}
                size={30}
              >
                Create Blog
              </Text>
            </Block>

            <Block center width={width * 0.9}>
              <Input
                borderless
                // value={title}
                onChangeText={(e) => {
                  settitle(e);
                }}
                //   borderless
                placeholder="Title"
                iconContent={
                  <Icon
                    size={16}
                    color="#ADB5BD"
                    name="create"
                    family="FontAwesome5"
                    style={styles.inputIcons}
                  />
                }
              />
            </Block>

            <Block center middle width={width * 0.9} height={70}>
              <DropDownPicker
                listMode="MODAL"
                textStyle={{ color: "#8898AA" }}
                placeholder="Categories"
                style={{
                  borderColor: "#8898AA",
                  borderWidth: 0,
                  borderRadius: 5,
                  height: 45,
                  width: width * 0.9,
                  shadowColor: '#171717',
                  shadowOffset: {width: 0, height: 0},
                  shadowOpacity: 0.2,
                  shadowRadius: 1,
                  elevation: 1,
                  zIndex:10,
                  // borderWidth:.2
                }}
                open={open}
                value={Value}
                items={arr}
                setOpen={setOpen}
                setValue={setValue}
              />
            </Block>

            <TouchableOpacity
              onPress={() => {
                pickImage();
              }}
              activeOpacity={0.7}
              style={{
                alignSelf: "center",
                justifyContent: "space-between",
                alignItems: "center",
                width: width * 0.9,
                height:height<812? (height * 0.1) / 2:(height * 0.1) / 3,
                flexDirection:"row",
                borderRadius: 5,
                backgroundColor: argonTheme.COLORS.WHITE,
                shadowColor: argonTheme.COLORS.BLACK,
                shadowOffset: { width: 0, height: 0.5 },
                shadowRadius: 1,
                shadowOpacity: 0.13,
                elevation: 2,
              }}
            >
              <Image
                source={{ uri: "https://assets.shareslate.com/media/icon/upload.png" }}
                style={{
                  width:  "8%",
                  height: "80%",
                  // resizeMode: "contain",
                  alignSelf: "center",marginLeft:10
                }}
              />

              <Text
                style={{
                  fontFamily: "open-sans-regular",
                  textAlign: "center",
                  alignSelf: "center",marginRight:width*.33
                }}
                color="#8898AA"
                size={13}
              >
                Upload media
              </Text>
            </TouchableOpacity>

            <Block row style={{ paddingLeft: 20 }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Text
                  size={14}
                  style={{
                    fontFamily: "open-sans-regular",
                    fontWeight: "bold",
                    color: "#3366BB",
                  }}
                >
                  click here{" "}
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: "open-sans-regular",
                  alignSelf: "center",
                }}
                size={13}
                color="#8898AA"
              >
                if your content is copyright
              </Text>
            </Block>

            <Block row center space="between" width={width * 0.9}>
              <Block width={width * 0.38}>
                <Input
                  borderless
                  onChangeText={(e) => {
                    settag1(e);
                  }}
                  // borderless
                  placeholder="Tag 1"
                  iconContent={
                    <Icon
                      size={16}
                      color="#ADB5BD"
                      name="tag"
                      family="FontAwesome5"
                      style={styles.inputIcons}
                    />
                  }
                />
              </Block>
              <Block width={width * 0.38}>
                <Input
                  borderless
                  onChangeText={(e) => {
                    settag2(e);
                  }}
                  // borderless
                  placeholder="Tag 2"
                  iconContent={
                    <Icon
                      size={16}
                      color="#ADB5BD"
                      name="tag"
                      family="FontAwesome5"
                      style={styles.inputIcons}
                    />
                  }
                />
              </Block>
            </Block>

            <Block center width={width * 0.9}>
              <Input
                borderless
                onChangeText={(e) => {
                  settag3(e);
                }}
                // borerless
                placeholder="Tag 3"
                iconContent={
                  <Icon
                    size={16}
                    color="#ADB5BD"
                    name="tag"
                    family="FontAwesome5"
                    style={styles.inputIcons}
                  />
                }
              />
            </Block>

            <TouchableOpacity onPress={() => navigation.navigate("Editor")}>
              <Block
                center
                style={styles.passwordCheck}
                width={width * 0.9}
                height={height * 0.2}
              >
                <Text
                  style={{
                    fontFamily: "open-sans-regular",
                    // fontWeight: "bold",
                    // marginBottom:5,
                  }}
                  size={15}
                  color="#8898AA"
                >
                  Discription
                </Text>
              </Block>
            </TouchableOpacity>

            <Block center>
              <Button
                onPress={() => {
                  addBlogData();
                }}
                color="primary"
                style={styles.createButton}
              >
                {/* <ActivityIndicator size="small" color="#0000ff" /> */}
                <Text
                  style={{ fontFamily: "open-sans-bold" }}
                  size={14}
                  color={argonTheme.COLORS.WHITE}
                >
                  Post
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Block center width={width * 0.8}>
                  <Input
                    borderless
                    onChangeText={(e) => {
                      setimagelabel(e);
                    }}
                    //   borderless
                    placeholder="Image label"
                    iconContent={
                      <Icon
                        size={16}
                        color="#ADB5BD"
                        name="create"
                        family="FontAwesome5"
                        style={styles.inputIcons}
                      />
                    }
                  />
                </Block>
                <Block center width={width * 0.8}>
                  <Input
                    borderless
                    onChangeText={(e) => {
                      setimageUrl(e);
                    }}
                    //   borderless
                    placeholder="Image url"
                    iconContent={
                      <Icon
                        size={16}
                        color="#ADB5BD"
                        name="link"
                        family="FontAwesome5"
                        style={styles.inputIcons}
                      />
                    }
                  />
                </Block>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Add</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
     
      </ScrollView>
    // </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width,
    height: height < 812 ? height : height * 0.8,
    // backgroundColor: "#F4F5F7",
    // backgroundColor:"green",
  },

  inputIcons: {
    marginRight: 12,
  },
  passwordCheck: {
    paddingLeft: 20,
    paddingTop: 13,
    // elevation:1,
    borderRadius: 5,
    alignItems: "flex-start",
    // justifyContent: "center",
    backgroundColor: argonTheme.COLORS.WHITE,
    // flexDirection:"row"
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 0.5 },
    shadowRadius: 1,
    shadowOpacity: 0.13,
    // elevation: 2,
  },
  createButton: {
    width: width * 0.3,
    // marginTop: 25,
    // marginBottom: 40,
  },
  title: {
    fontWeight: "bold",
    alignSelf: "center",
    paddingVertical: 10,
    // backgroundColor: "red",
  },
  root: {
    backgroundColor: "red",
    // width: width*.8,
    height: height * 0.8,
  },
  // text area style
  toolbar: {
    width: width * 0.4,
  },
  editor: {
    // flex: 1,
    width: width * 0.9,
    // height: height * 0.5,
    // padding: 0,
    borderColor: "red",
    borderWidth: 2,
    // marginHorizontal: 30,
    // marginVertical: 5,
    // backgroundColor: 'white',
    // backgroundColor: "green",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    // backgroundColor: "red",
  },
  modalView: {
    width: width * 0.9,
    height: height * 0.3,
    // margin: 20,
    backgroundColor: "white",
    // borderRadius: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    // padding: 20,
    alignSelf: "flex-end",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 20,
    elevation: 2,
    color: argonTheme.COLORS.BUTTON_COLOR,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: argonTheme.COLORS.ACTIVE,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default AddBlog;
