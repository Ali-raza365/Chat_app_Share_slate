import { ActivityApi, NewsSearch, News_Api, showNewsCategories } from "../../../api/ap-apis";
import { _showAxiosError } from "../../../utils/messages";
import {
  NEWSPOST_SUCCESS,
  NEWSPOST_FAILED,
  NEWS_LOADING,
  NEWS_BUTTON_SUCCESS,
  NEWS_BUTTON_FAILED,
  BTN_CATE_DATA_SUCCESS,
  BTN_CATE_DATA_FAILED,
  NEWS_SEARCH_SUCCESS,
  NEWS_SEARCH_FAILED,ACTIVITY_FAILED,ACTIVITY_SUCCESS,
} from "./NewsType";

/**
 * Action that will help in fetchung news post./
 * @param {Object} details
 * @param {Object} fcmDetails
 * @param {Object} navigation
 * @returns
 */
export default function NewsPost_action(bodyFormData, navigation) {
  return async (dispatch) => {
    try {
      await dispatch({
        type: NEWS_LOADING,
      });

      await News_Api(bodyFormData)
        .then((response) => {
          //   console.log(response.data.data,"NEWSPOST_ACTION");
          if (response.data.status == "error") {
            dispatch({
              type: NEWSPOST_FAILED,
            });
            // _showAxiosError(response.data.msg);
             if(response.data.msg=="Invalid Token"){

                        alert("Session expired.Please Login again.");
                    } else if(response.data.msg=="Logged in user id is required"){
            
                        alert("Something went wrong. Please try again");
                    }
            console.log("rrrrrrrrrrrrrrrrrrrrrrrrr");
          } else {
            dispatch({
              type: NEWSPOST_SUCCESS,
              payload: response.data,
            });
          }
        })
        .catch((err) => {
          dispatch({
            type: NEWSPOST_FAILED,
          });
          console.log(err, "NEWSPOST_ACTION .catch");
          // _showAxiosError(err);
        });
    } catch (error) {
      dispatch({
        type: NEWSPOST_FAILED,
      });
      // alert(error);
    }
  };
}

/**
 * Action that will help in fetching Button showCategories
 * @param {Object} details
 * @param {Object} navigation
 * @returns
 */
export const showNewsButtonCate_action = (bodyFormData, navigation) => {
  return async (dispatch) => {
    try {
      await dispatch({
        type: NEWS_LOADING,
      });

      await showNewsCategories(bodyFormData)
        .then((response) => {
          // console.log(response.data, "belongs to showNewsButtonCate_action ");
          if (response.data.status == "error") {
            dispatch({
              type: NEWS_BUTTON_FAILED,
            });
            // _showAxiosError(response.data.msg);
             if(response.data.msg=="Invalid Token"){

                        alert("Session expired.Please Login again.");
                    } else if(response.data.msg=="Logged in user id is required"){
            
                        alert("Something went wrong. Please try again");
                    }
          } else {
            dispatch({
              type: NEWS_BUTTON_SUCCESS,
              payload: response.data.data,
            });
          }
        })
        .catch((err) => {
          dispatch({
            type: NEWS_BUTTON_FAILED,
          });
          // console.log(err, "belongs to showNewsButtonCate_action");
          // _showAxiosError(err);
        });
    } catch (error) {
      dispatch({
        type: NEWS_BUTTON_FAILED,
      });
      // alert(error);
    }
  };
};



/**
 * Action that will help in fetchung button news post./
 * @param {Object} details
 * @param {Object} fcmDetails
 * @param {Object} navigation
 * @returns
 */
 export const NewsBtn_CatePost_action=(bodyFormData, navigation) =>{
  return async (dispatch) => {
    try {
      await dispatch({
        type: NEWS_LOADING,
      });

      await News_Api(bodyFormData)
        .then((response) => {
            console.log(response.data.data,"NEWSCteBtnPOST_ACTION");
          if (response.data.status == "error") {
            dispatch({
              type: BTN_CATE_DATA_FAILED,
            });
            // _showAxiosError(response.data.msg);
             if(response.data.msg=="Invalid Token"){

                        alert("Session expired.Please Login again.");
                    } else if(response.data.msg=="Logged in user id is required"){
            
                        alert("Something went wrong. Please try again");
                    }
            console.log("rrrrrrrrrrrrrrrrrrrrrrrrr");
          } else {
            dispatch({
              type: BTN_CATE_DATA_SUCCESS,
              payload: response.data.data,
            });
          }
        })
        .catch((err) => {
          dispatch({
            type: BTN_CATE_DATA_FAILED,
          });
          console.log(err, "NEWSCteBtnPOST_ACTION .catch");
          // _showAxiosError(err);
        });
    } catch (error) {
      dispatch({
        type: BTN_CATE_DATA_FAILED,
      });
      // alert(error);
    }
  };
}





/**
 * Action that will help in fetchung search news post./
 * @param {Object} details
 * @param {Object} fcmDetails
 * @param {Object} navigation
 * @returns
 */
 export const NewsSearch_action=(bodyFormData, navigation) =>{
  return async (dispatch) => {
    try {
      await dispatch({
        type: NEWS_LOADING,
      });

      await NewsSearch(bodyFormData)
        .then((response) => {
            // console.log(response.data.data,"NewsSearch_action");
          if (response.data.status == "error") {
            dispatch({
              type: NEWS_SEARCH_FAILED,
            });
            // _showAxiosError(response.data.msg);
             if(response.data.msg=="Invalid Token"){

                        alert("Session expired.Please Login again.");
                    } else if(response.data.msg=="Logged in user id is required"){
            
                        alert("Something went wrong. Please try again");
                    }
          } else {
            dispatch({
              type: NEWS_SEARCH_SUCCESS,
              payload: response.data.data,
            });
          }
        })
        .catch((err) => {
          dispatch({
            type: NEWS_SEARCH_FAILED,
          });
          console.log(err, "NewsSearch_action .catch");
          // _showAxiosError(err);
        });
    } catch (error) {
      dispatch({
        type: NEWS_SEARCH_FAILED,
      });
      // alert(error);
    }
  };
}




/**
 * Action that will help in Check activity of blog or news post./
 * @param {Object} details
 * @param {Object} fcmDetails
 * @param {Object} navigation
 * @returns
 */
 export const Activity_action=(bodyFormData, navigation) =>{
  return async (dispatch) => {
    try {
      await dispatch({
        type: NEWS_LOADING,
      });

      await ActivityApi(bodyFormData)
        .then((response) => {
            console.log(response.data,"Activity_action");
          if (response.data.status == "error") {
            dispatch({
              type: ACTIVITY_FAILED,
            });
            // _showAxiosError(response.data.msg);
             if(response.data.msg=="Invalid Token"){

                        alert("Session expired.Please Login again.");
                    } else if(response.data.msg=="Logged in user id is required"){
            
                        alert("Something went wrong. Please try again");
                    }
          } else {
            dispatch({
              type: ACTIVITY_SUCCESS,
              payload: response.data.data,
            });
          }
        })
        .catch((err) => {
          dispatch({
            type: ACTIVITY_FAILED,
          });
          console.log(err, "Activity_action .catch");
          // _showAxiosError(err);
        });
    } catch (error) {
      dispatch({
        type: ACTIVITY_FAILED,
      });
      // alert(error);
    }
  };
}



