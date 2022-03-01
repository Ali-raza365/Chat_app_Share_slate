import React, { useEffect } from "react";
import { ScrollView, Alert } from "react-native";
import { Block } from "galio-framework";
import { Notification } from "../components";
import { Blog_fetching_For_Each_Item_action, ShowNotification_action } from "../redux/reducers/blog/Blog_For_Each_Item_action";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../constants/loading";
import { Activity_action } from "../redux/reducers/NEWS/NewsAction";

export default function PersonalNotifications({ navigation }) {
  const dispatch = useDispatch();
  //getting token
  const {token_is,ShowNotification,blog_loading} = useSelector((state) => state.Blog_For_Each_Item);
  // console.log(ShowNotification,"||||||||||||||||||||")


  var bodyFormData = new FormData();
  bodyFormData.append("token", token_is);
  bodyFormData.append("action", "show");
  useEffect(() => {
    dispatch(ShowNotification_action(bodyFormData, navigation));
  }, []);


  const fetch_item_data = async (id) => {
    let blogID = id;
    var activedata = new FormData();
    activedata.append("action", "add");
    activedata.append("activity", "4");
    activedata.append("activity_id", blogID);
    activedata.append("token", token_is);
    dispatch(
      await Activity_action(activedata, navigation)
     );

    var bodyFormData = new FormData();
    bodyFormData.append("blogID", blogID);
    bodyFormData.append("token", token_is);
    console.log(bodyFormData)
    dispatch(
     await Blog_fetching_For_Each_Item_action(bodyFormData, navigation, blogID)
    );
  };
 
  if (blog_loading ==true) {
    return (
      <Loading />
    )
  }
  return (
    <Block middle flex style={{backgroundColor: "white",}}>
      <Block flex style={{ width: "90%", }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {ShowNotification &&
            ShowNotification.map((item, index) => {
              return (
                <Notification
                  key={index}
                  time={item.date}
                  body={item.title}
                  msg={item.message}
                  author={item.author}
                  url={item.featured_image}
                  iconName="ship"
                  iconFamily="font-awesome"
                  style={{ marginTop: 15 }}
                  // onPress={() => fetch_item_data(item.id)}
                />
              );
            })}

          <Block style={{ marginBottom: 20 }} />
        </ScrollView>
      </Block>
    </Block>
  );
}
