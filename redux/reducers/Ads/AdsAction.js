import { InsertAds, GetCoins, AdsCheck, AdsRewardState, eligibleReward } from "../../../api/ap-apis";
import { _showAxiosError } from "../../../utils/messages";
import {
  ADS_LOADING,
  INSERT_ADS_SUCCESS,
  INSERT_ADS_FAILED,
  GET_COINS_SUCCESS,
  GET_COINS_FAILED,
  ADS_LIMIT_SUCCESS,
  ADS_LIMIT_FAILED,
  REWARD_STATEMENT_SUCCESS,
  REWARD_STATEMENT_FAILED,
  ADS_ELIGIBLE_FAILED,
  ADS_ELIGIBLE_SUCCESS
} from "./AdsType";

/**
 * Action that will help in insertAds./
 * @param {Object} details
 * @param {Object} fcmDetails
 * @param {Object} navigation
 * @returns
 */
export default function AdsInsert_action(bodyFormData, navigation) {
  return async (dispatch) => {
    try {
      await dispatch({
        type: ADS_LOADING,
      });

      await InsertAds(bodyFormData)
        .then((response) => {
            console.log(response.data,"insertAds");
          if (response.data.status == "error") {
            dispatch({
              type: INSERT_ADS_FAILED,
            });
            _showAxiosError(response.data.msg);
          } else {
            dispatch({
              type: INSERT_ADS_SUCCESS,
              payload: response.data.data,
            });
          }
        })
        .catch((err) => {
          dispatch({
            type: INSERT_ADS_FAILED,
          });
          console.log(err, "insertAds .catch");
          _showAxiosError(err);
        });
    } catch (error) {
      dispatch({
        type: INSERT_ADS_FAILED,
      });
      alert(error);
    }
  };
}

/**
 * Action that will help in Getting coins
 * @param {Object} details
 * @param {Object} navigation
 * @returns
 */
export const GetCoins_action = (bodyFormData, navigation) => {
  return async (dispatch) => {
    try {
      await dispatch({
        type: ADS_LOADING,
      });

      await GetCoins(bodyFormData)
        .then((response) => {
          // console.log(response.data, "belongs to Getting coins ACTION ");
          if (response.data.status == "error") {
            dispatch({
              type: GET_COINS_FAILED,
            });
            _showAxiosError(response.data.msg);
          } else {
            dispatch({
              type: GET_COINS_SUCCESS,
              payload: response.data,
            });
          }
        })
        .catch((err) => {
          dispatch({
            type: GET_COINS_FAILED,
          });
          // console.log(err, "belongs to Getting coins ACTION");
          _showAxiosError(err);
        });
    } catch (error) {
      dispatch({
        type: GET_COINS_FAILED,
      });
      alert(error);
    }
  };
};





/**
 * Action that will help in Getting AdsLimit
 * @param {Object} details
 * @param {Object} navigation
 * @returns
 */
 export const AdsLimit_action = (bodyFormData, navigation) => {
  return async (dispatch) => {
    try {
      await dispatch({
        type: ADS_LOADING,
      });

      await AdsCheck(bodyFormData)
        .then((response) => {
          // console.log(response.data, "belongs to Getting AdsLimit ACTION ");
          if (response.data.status == "error") {
            dispatch({
              type: ADS_LIMIT_FAILED,
            });
            _showAxiosError(response.data.msg);
          } else {
            dispatch({
              type: ADS_LIMIT_SUCCESS,
              payload: response.data,
            });
          }
        })
        .catch((err) => {
          dispatch({
            type: ADS_LIMIT_FAILED,
          });
          // console.log(err, "belongs to Getting AdsLimit ACTION");
          _showAxiosError(err);
        });
    } catch (error) {
      dispatch({
        type: ADS_LIMIT_FAILED,
      });
      alert(error);
    }
  };
};



/**
 * Action that will help in  Ads history
 * @param {Object} details
 * @param {Object} navigation
 * @returns
 */
 export const Reward_history_action = (bodyFormData, navigation) => {
   console.log("object")
  return async (dispatch) => {
    try {
      await dispatch({
        type: ADS_LOADING,
      });

      await AdsRewardState(bodyFormData)
        .then((response) => {
          // console.log(response.data, "belongs to Getting Ads history ACTION ");
          if (response.data.status == "error") {
            dispatch({
              type: REWARD_STATEMENT_FAILED,
            });
       
            _showAxiosError(response.data.msg);
          } else {
            dispatch({
              type: REWARD_STATEMENT_SUCCESS,
              payload: response.data,
            });
          }
        })
        .catch((err) => {
          dispatch({
            type: REWARD_STATEMENT_FAILED,
          });
          // console.log(err, "belongs to Getting Ads history ACTION");
          // _showAxiosError(err);
        });
    } catch (error) {
      dispatch({
        type: REWARD_STATEMENT_FAILED,
      });
      // alert(error);
    }
  };
};



/**
 * Action that will help in  Ads eligible
 * @param {Object} details
 * @param {Object} navigation
 * @returns
 */
 export const Reward_Eligible_action = (bodyFormData, navigation) => {
 return async (dispatch) => {
   try {
     await dispatch({
       type: ADS_LOADING,
     });

     await eligibleReward(bodyFormData)
       .then((response) => {
         // console.log(response.data, "belongs to Getting Reward_Eligible_action ");
         if (response.data.status == "error") {
           dispatch({
             type: ADS_ELIGIBLE_FAILED,
           });
           if(response.data.msg=="Not Eligible")
           {
      navigation.navigate("EmailVerify")

             console.log(response.data.msg)
           }else{

              _showAxiosError(response.data.msg);
           }
         } else {
           dispatch({
             type: ADS_ELIGIBLE_SUCCESS,
             payload: response.data,
           });
           if(response.data.msg=="Successfully eligible for reward!")
           {
    navigation.navigate("RewardStack")

           }else{

return null           }
         }
       })
       .catch((err) => {
         dispatch({
           type: ADS_ELIGIBLE_FAILED,
         });
         // console.log(err, "belongs to Getting Reward_Eligible_action");
         _showAxiosError(err);
       });
   } catch (error) {
     dispatch({
       type: ADS_ELIGIBLE_FAILED,
     });
     alert(error);
   }
 };
};
