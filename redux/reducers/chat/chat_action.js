import {
    CHATLIST_LOADING,
    CHATLIST_Fetch_SUCCESS,
    CHATLIST_Fetch_FAILED,

    SEARCH_CHATUSER_LOADING,
    SEARCH_CHATUSER_SUCCESS,
    SEARCH_CHATUSER_FAILED,
} from "./chat_types";

import { fetchChatlist, searchChatUser } from "../../../api/ap-apis";
import { _showAxiosError } from "../../../utils/messages";
import { Alert } from "react-native";

/**
 * Action that will help in fetching chat  for user
 * @param {Object} body  // body = {token ,action}
 * @param {Object} navigation
 * @returns
 */
export const ChatList_fetching_action = (body, navigation) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: CHATLIST_LOADING,
            });
            await fetchChatlist(body)
                .then((response) => {
                    console.log(response.data)
                    if (response.data.status == "error") {
                        dispatch({
                            type: CHATLIST_Fetch_FAILED,
                        });
                        if (response.data.msg == "Invalid Token") {
                            alert("Session expired.Please Login again.");
                        } else if (response.data.msg == "Logged in user id is required") {
                            alert("Something went wrong. Please try again");
                        }
                    } else {
                        dispatch({
                            type: CHATLIST_Fetch_SUCCESS,
                            payload: response ? response.data ? response.data : [] : [],
                        });
                    }
                })
                .catch((err) => {
                    dispatch({
                        type: CHATLIST_Fetch_FAILED,
                    });
                    // console.log(err,"dsadasdsdsdasdas")
                    // _showAxiosError(err);
                });
        } catch (error) {
            dispatch({
                type: CHATLIST_Fetch_FAILED,
            });
            // alert(error,"jjjjj");
        }
    };
};


/**
 * Action that will help in fetching chat  for user
 * @param {Object} body  // body = {token ,action,value}
 * @param {Object} navigation
 * @returns
 */
export const Search_Chatuser_action = (body, navigation) => {
    console.log("Search_Chatuser_action", body)
    return async (dispatch) => {
        try {
            await dispatch({
                type: SEARCH_CHATUSER_LOADING,
            });
            await searchChatUser(body)
                .then((response) => {
                    console.log(response.data, "search action respone")
                    if (response.data.status == "error") {
                        dispatch({
                            type: SEARCH_CHATUSER_FAILED,
                        });
                        if (response.data.msg == "Invalid Token") {
                            alert("Session expired.Please Login again.");
                        } else if (response.data.msg == "Logged in user id is required") {
                            alert("Something went wrong. Please try again");
                        }
                    } else {
                        dispatch({
                            type: SEARCH_CHATUSER_SUCCESS,
                            payload: response.data,
                        });

                    }
                })
                .catch((err) => {
                    dispatch({
                        type: SEARCH_CHATUSER_FAILED,
                    });
                    // console.log(err,"dsadasdsdsdasdas")
                    // _showAxiosError(err);
                });
        } catch (error) {
            dispatch({
                type: SEARCH_CHATUSER_FAILED,
            });
            // alert(error,"jjjjj");
        }
    };
};
