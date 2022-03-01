/**
 * Rich Editor Example
 * @author tangzehua
 * @since 2019-06-24 14:52
 */
import React, { useEffect, useState } from "react";
import {
  Appearance,
  // Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
} from "react-native";
import {
  actions,
  getContentCSS,
  getContentHtml,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { XMath } from "@wxik/core";
// import { InsertLinkModal } from "./insertLink";
import { EmojiView } from "./emoji";
import { useNavigation } from "@react-navigation/native";
import argonTheme from "../../../constants/Theme";
import { Accordion, Block } from "galio-framework";
// import  argonTheme  from "../constants/Theme";
const { width, height } = Dimensions.get("screen");
import Icon from "../../Icon";
import { Button, Input } from "../../../components";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import {
  AddBlog_fImage_action,
  Htmal_data_AddBlog,
} from "../../../redux/reducers/blog/Blog_For_Each_Item_action";
import { useDispatch, useSelector } from "react-redux";
import mime from "mime";
import axios from "axios";

const phizIcon = require("./assets/phiz.png");
const htmlIcon = require("./assets/html.png");

function Example() {
  const [emojiVisible, setemojiVisible] = useState(false);
  const [disabled, setdisabled] = useState(false);
  const [FontSize, setFontSize] = useState([]);
  const [HiliteColor, setHiliteColor] = useState(null);
  const [count, setcount] = useState(1);

  const navigation = useNavigation();

  const richText = React.createRef();
  const linkModal = React.createRef();
  const scrollRef = React.createRef();
  const theme = theme || Appearance.getColorScheme();

  const [visible, setModalVisible] = useState(false);
  const [Title, setTitle] = useState(null);
  const [Url, setUrl] = useState(null);

  const dispatch = useDispatch();
  //token
  const token_redux = useSelector((state) => state.Blog_For_Each_Item.token_is);
  // console.log(token_redux,"token from redux in Add_blog")

  useEffect(() => {
    Appearance.addChangeListener(themeChange);
    Keyboard.addListener("keyboardDidShow", onKeyShow);
    Keyboard.addListener("keyboardDidHide", onKeyHide);
    return () => {
      Appearance.addChangeListener(themeChange);
      Keyboard.addListener("keyboardDidShow", onKeyShow);
      Keyboard.addListener("keyboardDidHide", onKeyHide);
    };
  }, []);

  //for upload image on server.
  const imageUpload = async (url) => {
    // console.log("object1")
    let image = await url;
    var urlFormData = new FormData();
    urlFormData.append("token", token_redux);
    urlFormData.append("blog_image", {
      uri: image,
      type: mime.getType(image),
      name: image && image.split("/").pop(),
    });
    console.log(urlFormData);
    try {
      axios({
        url: "https://www.shareslate.com/apis/uploadBlogImage.php",

        method: "POST",
        data: urlFormData,
      })
        .then((response) => {
          richText.current?.insertImage(response.data.url);

          console.log(response.data, "apiiiiiiii");
        })
        .catch((error) => {
          console.log("object", error, "________");
        });
    } catch (error) {
      console.log(error, "ERRRRRRRR");
    }
  };

  const videoUpload = async (url) => {
    // console.log("object1")
    let video = await url;

    var urlFormData = new FormData();
    urlFormData.append("token", token_redux);
    urlFormData.append("blog_image", {
      uri: video,
      type: mime.getType(video),
      name: video && video.split("/").pop(),
    });
    console.log(urlFormData);
    try {
      axios({
        url: "https://www.shareslate.com/apis/uploadBlogImage.php",

        method: "POST",

        data: urlFormData,
      })
        .then((response) => {
          richText.current?.insertVideo(response.data.url);

          console.log(response.data, "apiiiiiiii");
        })
        .catch((error) => {
          console.log("object", error, "________");
        });
    } catch (error) {
      console.log(error, "ERRRRRRRR");
    }
  };

  const onPressAddImage = async () => {
    //image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      await imageUpload(result.uri);
    }
  };

  const insertVideo = async () => {
    // expo picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      // console.log(result)
      await videoUpload(result.uri);
    }

    //   richText.current?.insertVideo(
    //     "https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4",
    //     "width: 50%;"
    //   );
  };

  const onSave = async () => {
    // Get the data here and call the interface to save the data
    let html = await richText.current?.getContentHtml();
    let css=await getContentCSS();

    console.log(css);
    dispatch(Htmal_data_AddBlog(html, navigation));

    navigation.navigate("Preview", { html, css });
  };

  const onKeyHide = () => {};

  const onKeyShow = () => {
    TextInput.State.currentlyFocusedInput() && setemojiVisible(false);
  };

  const editorInitializedCallback = () => {
    richText.current?.registerToolbar(function (items) {
      // console.log('Toolbar click, selected items (insert end callback):', items);
    });
  };

  /**
   * theme change to editor color
   * @param colorScheme
   */
  const themeChange = ({ colorScheme }) => {
    const theme = colorScheme;
    // const contentStyle = createContentStyle(theme);
    // setState({theme, contentStyle});
  };

  /**
   * editor change data
   * @param {string} html
   */
  const handleChange = (html) => {
    richHTML = html;
    setState({ a: Math.random });
  };

  /**
   * editor height change
   * @param {number} height
   */
  const handleHeightChange = (height) => {
    console.log("editor height change:", height);
  };

  const insertEmoji = (emoji) => {
    richText.current?.insertText(emoji);
    richText.current?.blurContentEditor();
  };

  const handleEmoji = () => {
    // const {emojiVisible} = state;
    Keyboard.dismiss();
    richText.current?.blurContentEditor();
    setemojiVisible(!emojiVisible);
  };

  const fontSize = () => {
    // 1=  10px, 2 = 13px, 3 = 16px, 4 = 18px, 5 = 24px, 6 = 32px, 7 = 48px;
    const size = [1, 2, 3, 4, 5, 6, 7];
    richText.current?.setFontSize(size[XMath.random(size.length - 1)]);
  };

  const foreColor = () => {
    richText.current?.setForeColor("blue");
  };

  const hiliteColor = () => {
    richText.current?.setHiliteColor("red");
  };

  const insertHTML = () => {
    richText.current?.insertHTML(
      `<span onclick="alert(2)" style="color: blue; padding:0 10px;" contenteditable="false">HTML</span>`
    );
    richText.current?.insertHTML(
      `<div style="padding:10px 0;" contentEditable="false">
                <iframe  width="100%" height="220"  src="https://www.youtube.com/embed/6FrNXgXlCGA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>`
    );
  };

  const onInsertLink = () => {
    // richText.current?.insertLink('Google', 'http://google.com');
    setModalVisible(true);
  };

  const onLinkDone = () => {
    richText.current?.insertLink(Title, Url);
    setModalVisible(false);
  };

  let backgroundColor = "#2e3847";
  let color = "#fff";
  let placeholderColor = "gray";

  const onDisabled = () => {
    setdisabled(!disabled);
  };

  const handlePaste = (data) => {
    console.log("Paste:", data);
  };

  /**
   * @deprecated Android keyCode 229
   * @param data
   */
  const handleKeyUp = (data) => {
    // console.log('KeyUp:', data);
  };

  /**
   * @deprecated Android keyCode 229
   * @param data
   */
  const handleKeyDown = (data) => {
    // console.log('KeyDown:', data);
  };

  /**
   *
   * @param data
   * @param {string} inputType
   */
  const onInput = ({ data, inputType }) => {
    // console.log(inputType, data)
  };

  const handleMessage = ({ type, id, data }) => {
    let index = 0;
    switch (type) {
      case "ImgClick":
        richText.current?.commandDOM(
          `$('#${id}').src="${imageList[XMath.random(imageList.length - 1)]}"`
        );
        break;
      case "TitleClick":
        const color = ["red", "blue", "gray", "yellow", "coral"];

        // command: $ = document.querySelector
        richText.current?.commandDOM(
          `$('#${id}').style.color='${color[XMath.random(color.length - 1)]}'`
        );
        break;
      case "SwitchImage":
        break;
    }
    console.log("onMessage", type, id, data);
  };

  const handleFocus = () => {
    editorFocus = true;
  };

  const handleBlur = () => {
    editorFocus = false;
  };

  const handleCursorPosition = (scrollY) => {
    // Positioning scroll bar
    scrollRef.current.scrollTo({ y: scrollY - 30, animated: true });
  };

  const dark = theme === "dark";
  return (
    <SafeAreaView style={[styles.container, dark && styles.darkBack]}>
      <Modal
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        coverScreen={false}
        isVisible={visible}
        backdropColor={color}
        backdropOpacity={0.3}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={[styles.dialog]}>
          <View style={styles.linkTitle}>
            <Text style={{ color: "#ADB5BD", fontSize: 20 }}>Insert Link</Text>
          </View>

          <Block center width={width * 0.8}>
            <Input
              borderless
              onChangeText={(e) => {
                setTitle(e);
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

          <Block center width={width * 0.8}>
            <Input
              borderless
              onChangeText={(e) => {
                setUrl(e);
              }}
              //   borderless
              placeholder="URL"
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

          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={onLinkDone}>
              <Text style={styles.text}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
<Block center style={{backgroundColor:"#efefef",height:height*.75,width:width*.98,borderRadius:10}}>
      <RichToolbar
        style={[styles.richBarTop, dark && styles.richBarDark]}
        flatContainerStyle={styles.flatStyle}
        editor={richText}
        disabled={disabled}
        selectedIconTint={"#2095F2"}
        disabledIconTint={"#bfbfbf"}
        onPressAddImage={onPressAddImage}
        onInsertLink={onInsertLink}
       
      ></RichToolbar>
<KeyboardAvoidingView   style={{flex:1,borderRadius:10,backgroundColor:"white",padding:5,marginHorizontal:5,marginVertical:5}} behavior={"height"}>
      <ScrollView
        keyboardDismissMode={"none"}
        ref={scrollRef}
        nestedScrollEnabled={true}
        scrollEventThrottle={20}
        
        
      >
        <RichEditor
          // initialFocus={true}
          disabled={disabled}
          // editorStyle={{backgroundColor:"red"}} // default light style
          ref={richText}
          style={styles.rich}
          scrollEnabled={true}
          useContainer={true}
          initialHeight={500}
          editorStyle={{ 
          contentCSSText: `
          position: absolute; 
          top: 0; right: 0; bottom: 0; left: 0;
          `}}
          containerStyle={{width:width,}}
          placeholder={"Start typing here...."}
          editorInitializedCallback={editorInitializedCallback}
          onChange={handleChange}
          onHeightChange={handleHeightChange}
          onPaste={handlePaste}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
          onInput={onInput}
          onMessage={handleMessage}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onCursorPosition={handleCursorPosition}
          pasteAsPlainText={true}
          onSave={onSave}
        />
      </ScrollView>
      </KeyboardAvoidingView>
    
        <RichToolbar
          style={[styles.richBarBottom, dark && styles.richBarDark]}
          flatContainerStyle={styles.flatStyle}
          editor={richText}
          disabled={disabled}
          // iconTint={color}
          selectedIconTint={"#2095F2"}
          disabledIconTint={"#bfbfbf"}
          onPressAddImage={onPressAddImage}
          onInsertLink={onInsertLink}
          // iconSize={24}
          // iconGap={10}

          actions={[
            actions.undo,
            actions.redo,
            actions.insertVideo,
            actions.insertImage,
            actions.setStrikethrough,
            actions.checkboxList,
            actions.insertOrderedList,
            actions.blockquote,
            actions.alignLeft,
            actions.alignCenter,
            actions.alignRight,
            actions.code,
            actions.line,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.foreColor,
            actions.hiliteColor,
            actions.heading1,
            actions.heading4,
            "insertEmoji",
            "insertHTML",
            "fontSize",
            actions.onSave,
          ]} // default defaultActions
          iconMap={{
            insertEmoji: phizIcon,
            [actions.foreColor]: ({ tintColor }) => (
              <Text style={[styles.tib, { color: "blue" }]}>FC</Text>
            ),
            [actions.hiliteColor]: ({ tintColor }) => (
              <Text
                style={[
                  styles.tib,
                  { color: tintColor, backgroundColor: "red" },
                ]}
              >
                BC
              </Text>
            ),
            [actions.heading1]: ({ tintColor }) => (
              <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
            ),
            [actions.heading4]: ({ tintColor }) => (
              <Text style={[styles.tib, { color: tintColor }]}>H3</Text>
            ),

            insertHTML: htmlIcon,
          }}
          insertEmoji={handleEmoji}
          insertHTML={insertHTML}
          insertVideo={insertVideo}
          fontSize={fontSize}
          foreColor={foreColor}
          hiliteColor={hiliteColor}
          onSave={onSave}
        />
        {emojiVisible && <EmojiView onSelect={insertEmoji} />}
</Block>
        
      <TouchableOpacity
        style={{
          alignSelf: "center",
          paddingHorizontal: 90,
          backgroundColor: argonTheme.COLORS.PRIMARY,
          paddingVertical: 10,
          marginLeft: 3,borderRadius:5
        }}
        onPress={onSave}
        navigation={navigation}
      >
        <Text style={{ fontSize: 15, color: "white" }}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",justifyContent:"space-around"
  },
  nav: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 5,
    backgroundColor: "white",
  },
  rich: {
    minHeight: 400,
    // flex: 1,
    // backgroundColor:"green",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "white",
    // borderRadius:10,borderTopRightRadius:10
  },
  topVi: {
    backgroundColor: "#fafafa",
  },
  richBarTop: {
    borderColor: "#efefef",
    // backgroundColor:"red",
    width:width*.97,
    alignSelf:"center",
   
    borderWidth:1,
    borderTopWidth: 1,borderTopLeftRadius:10,borderTopRightRadius:10
  },
  richBarBottom: {
    borderColor: "#efefef",
    // backgroundColor:"green",
 alignSelf:"center",
   
    borderWidth:1,
    borderTopWidth: 1,borderBottomLeftRadius:10,borderBottomRightRadius:10
  },
  richBarDark: {
    backgroundColor: "#191d20",
    borderColor: "#696969",
  },
  scroll: {
    // flex:2,
    // paddingBottom:10,
    backgroundColor: "#ffffff",
  },
  scrollDark: {
    backgroundColor: "#2e3847",
  },
  darkBack: {
    backgroundColor: "#191d20",
  },
  item: {
    margin: 10,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: '#e8e8e8',
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: argonTheme.COLORS.WHITE,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 0.5 },
    shadowRadius: 1,
    shadowOpacity: 0.13,
    elevation: 5,
  },

  input: {
    flex: 1,
    // color:"red"
    color: "#515156",
    // backgroundColor:"white"
  },

  tib: {
    textAlign: "center",
    color: "#515156",
    // color:"red"
  },

  flatStyle: {
    paddingHorizontal: 12,
  },
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#e8e8e8",
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    height: 40,
  },
  linkTitle: {
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#b3b3b3",
  },
  dialog: {
    borderRadius: 5,
    // marginHorizontal: 40,
    paddingHorizontal: 20,
    // backgroundColor:"silver",
    backgroundColor: "#F4F5F7",

    paddingVertical: 10,
  },

  buttonView: {
    flexDirection: "row",
    height: 36,
    paddingVertical: 4,
    justifyContent: "space-between",
    // backgroundColor:"red"
  },
  btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: argonTheme.COLORS.PRIMARY,
    borderRadius: 5,
  },
  text: {
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default Example;
