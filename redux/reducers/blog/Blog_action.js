import {
  Blog_Fetch_FAILED,
  Blog_Fetch_SUCCESS,
  Blog_LOADING,
  SUGGESSION_BLOG_FAILED,
  SUGGESSION_BLOG_SUCCESS,
} from "./blog_type";

import { Blog } from "../../../api/ap-apis";
import { _showAxiosError } from "../../../utils/messages";
import { Alert } from "react-native";

/**
 * Action that will help in fetching blog   for ap user
 * @param {Object} details
 * @param {Object} fcmDetails
 * @param {Object} navigation
 * @returns
 */
export const Blog_fetching_action = (bodyFormData, navigation) => {
  return async (dispatch) => {
    try {
      await dispatch({
        type: Blog_LOADING,
      });

      await Blog(bodyFormData)
        .then((response) => {
          if (response.data.status == "error") {
            dispatch({
              type: Blog_Fetch_FAILED,
            });
            if (response.data.msg == "Invalid Token") {
              alert("Session expired.Please Login again.");
            } else if (response.data.msg == "Logged in user id is required") {
              alert("Something went wrong. Please try again");
            }
          } else {
            dispatch({
              type: Blog_Fetch_SUCCESS,
              payload: response.data,
            });
          }
        })
        .catch((err) => {
          dispatch({
            type: Blog_Fetch_FAILED,
          });
          // console.log(err,"dsadasdsdsdasdas")
          // _showAxiosError(err);
        });
    } catch (error) {
      dispatch({
        type: Blog_Fetch_FAILED,
      });
      // alert(error,"jjjjj");
    }
  };
};

/**
 * Action that will help in fetching blog   for ap user
 * @param {Object} details
 * @param {Object} fcmDetails
 * @param {Object} navigation
 * @returns
 */
export const SuggestBlog_action = (bodyFormData, navigation) => {
  return async (dispatch) => {
    try {
      await dispatch({
        type: Blog_LOADING,
      });

      await Blog(bodyFormData)
        .then((response) => {
          if (response.data.status == "error") {
            dispatch({
              type: SUGGESSION_BLOG_FAILED,
            });
            if (response.data.msg == "Invalid Token") {
              alert("Session expired.Please Login again.");
            } else if (response.data.msg == "Logged in user id is required") {
              alert("Something went wrong. Please try again");
            } else {
              Alert.alert(response.data.msg);
            }
          } else {
            dispatch({
              type: SUGGESSION_BLOG_SUCCESS,
              payload: response.data.data,
            });
          }
        })
        .catch((err) => {
          dispatch({
            type: SUGGESSION_BLOG_FAILED,
          });
        });
    } catch (error) {
      dispatch({
        type: SUGGESSION_BLOG_FAILED,
      });
    }
  };
};
