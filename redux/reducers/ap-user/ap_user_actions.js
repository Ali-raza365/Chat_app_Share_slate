import {
  AP_LOGIN_LOADING,
  AP_LOGIN_SUCCESS,
  AP_LOGIN_FAILED,
  AP_REGISTER_SUCCESS,
  AP_REGISTER_FAILED,
  AP_RESETPASSWORD_SUCCESS,
  AP_RESETPASSWORD_FAILED,
  GENCODE_SUCCESS,
  GENCODE_FAILED,
  USERLOCATION_SUCCESS,
  USERLOCATION_FAILED,
  REFER_SUCCESS,
  REFER_FAILED,
  SMS_VERIFY_SUCCESS,
  SMS_VERIFY_FAILED,
  EMAIL_VERIFY_FAILED,
  EMAIL_VERIFY_SUCCESS,
  SMSCODE_VERIFY_SUCCESS,
  SMSCODE_VERIFY_FAILED,
  EMAILCODE_VERIFY_SUCCESS,
  EMAILCODE_VERIFY_FAILED,
} from "./ap_user_types";
import {NavigationActions} from 'react-navigation';

import {
  _LOGIN_API,
  register,
  resetpassword,
  GenCode,
  Userlocation,
  Smsverify,
  emailverify,
} from "../../../api/ap-apis";
import { _showAxiosError } from "../../../utils/messages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, DevSettings } from "react-native";
import { GuestId_Action } from "../App_Realated/AppActon";
import { useDispatch } from "react-redux";
import { CommonActions } from "@react-navigation/routers";

/**
 * Action that will help in logging in for ap user
 * @param {Object} details
 * @param {Object} fcmDetails
 * @param {Object} navigation
 * @returns
 */
export const _onAPLogin = (details, navigation, guest) => {
  const store_user_token = async (value) => {
    try {
      await AsyncStorage.setItem("@user_token", value).catch((e) => {
        console.log(e, "Error in saving");
      });
    } catch (e) {
      console.log(e, "token saving error");
    }
  };

  const store_user_type = async (value) => {
    try {
      await AsyncStorage.setItem("@user_type", value).catch((e) => {
        console.log(e, "Error in saving");
      });
    } catch (e) {
      console.log(e, "type saving error");
    }
  };
  const store_user_id = async (value) => {
    console.log(String(value))
    try {
      await AsyncStorage.removeItem("@user_id");

      await AsyncStorage.setItem("@user_id", String(value)).catch((e) => {
        console.log(e, "Error in saving");
      });
    } catch (e) {
      console.log(e, "user_id saving error");
    }
  };

  return async (dispatch) => {
    try {
      await dispatch({
        type: AP_LOGIN_LOADING,
      });
      
      await _LOGIN_API(details)
        .then((response) => {
          console.log(response,"*%*%%*%%*%*%*")
          if (response.data.status == "error") {
            dispatch({
              type: AP_LOGIN_FAILED,
            });
            _showAxiosError(response.data.msg);
          } else {
            dispatch({
              type: AP_LOGIN_SUCCESS,
              payload: response.data,
            });

            dispatch({
              type: "toke_saved",
              payload: response.data.token,
            });
            dispatch({
              type: "USERID_SAVE",
              payload: response.data.user_id,
            });
            console.log(response.data);
            if (response.data.user_id == "-1") {
              dispatch({
                type: "GUEST_ID_SAVE",
                payload: response.data.user_id,
              });
              console.log("type is -1");

              store_user_token(response.data.token);
              store_user_type("-1");
              store_user_id(response.data.user_id);

              navigation.navigate("App");
            } 
            else  if (response.data.type == "1") {
              console.log("type is 1");
              dispatch({
                type: "GUEST_ID_SAVE",
                payload: response.data.type,
              });
              store_user_token(response.data.token);
              store_user_type(response.data.type);
              store_user_id(response.data.user_id);

              navigation.navigate("App");
            }
             else {
              dispatch({
                type: "GUEST_ID_SAVE",
                payload: response.data.type,
              });
              store_user_token(response.data.token);
              store_user_type(response.data.type);
              store_user_id(response.data.user_id);
              
              navigation.navigate("ProfileBuilder");
            }
          }
        })
        .catch((err) => {
          dispatch({
            type: AP_LOGIN_FAILED,
          });
          _showAxiosError(err);
          // console.log(err," _showAxiosError")
        });
    } catch (error) {
      dispatch({
        type: AP_LOGIN_FAILED,
      });
      alert(error);
    }
  };
};
// register user
export const Register_User = (details, navigation,guest,param) => {
  const store_user_token = async (value) => {
    try {
      await AsyncStorage.setItem("@user_token", value).catch((e) => {
        console.log(e, "Error in saving");
      });
    } catch (e) {
      console.log(e, "token saving error");
    }
  };
  const store_user_type = async () => {
    const value="0";
    try {
      await AsyncStorage.setItem("@user_type", value).catch((e) => {
        console.log(e, "Error in saving");
      });
    } catch (e) {
      console.log(e, "type saving error");
    }
  };
  const store_user_id = async (value) => {
    try {
      await AsyncStorage.removeItem("@user_id");
      await AsyncStorage.setItem("@user_id", String(value)).catch((e) => {
        console.log(e, "Error in saving");
      });
    } catch (e) {
      console.log(e, "user_id saving error");
    }
  };
 
  return async (dispatch) => {
    try {
      await dispatch({
        type: AP_LOGIN_LOADING,
      });

      await register(details)
        .then((response) => {
          // console.log(response,"rrrrrrrrrr");
          if (response.data.status == "error") {
            dispatch({
              type: AP_REGISTER_FAILED,
            });
            _showAxiosError(response.data.message);
          } else {
            dispatch({
              type: "toke_saved",
              payload: response.data.token,
            });
            dispatch({
              type: "USERID_SAVE",
              payload: response.data.user_id,
            });
            dispatch({
              type: AP_REGISTER_SUCCESS,
              payload: response.data,
            });
            // Alert.alert("Register successfully!");
            Alert.alert(
              "Registration successful!                           Let's build your profile"
            );
            store_user_token(response.data.token);
            store_user_type();
            store_user_id(response.data.user_id)
            navigation.navigate("ProfileBuilder",{value:param},)
          }
        })
        .catch((err) => {
          dispatch({
            type: AP_REGISTER_FAILED,
          });
          _showAxiosError(err);
          // console.log(err," _showAxiosError")
        });
    } catch (error) {
      dispatch({
        type: AP_REGISTER_FAILED,
      });
      alert(error);
    }
  
  
  
  
  };

};
//reset password.
export const Reset_Password = (details, navigation) => {
  const showAlert = (data) =>
    Alert.alert(
      "Verification Alert",
      data,
      [
        {
          text: "ok",
          onPress: () => navigation.navigate("Login"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );

  return async (dispatch) => {
    try {
      await dispatch({
        type: AP_LOGIN_LOADING,
      });

      await resetpassword(details)
        .then((response) => {
          if (response.data.status == "error") {
            dispatch({
              type: AP_RESETPASSWORD_FAILED,
            });
            _showAxiosError(response.data.msg);
          } else {
            dispatch({
              type: AP_RESETPASSWORD_SUCCESS,
              payload: response.data,
            });
            showAlert(response.data.msg);
          }
        })
        .catch((err) => {
          dispatch({
            type: AP_RESETPASSWORD_FAILED,
          });
          _showAxiosError(err);
        });
    } catch (error) {
      dispatch({
        type: AP_RESETPASSWORD_FAILED,
      });
      alert(error);
    }
  };
};

//genrate code for authenticator.
export const GenrateCodeAuth = (details, navigation) => {
  const showAlert = (data) => Alert.alert("genrated code Alert");

  return async (dispatch) => {
    try {
      await dispatch({
        type: AP_LOGIN_LOADING,
      });

      await GenCode(details)
        .then((response) => {
          // console.log(response.data,"rrrrrrrrrr");
          if (response.data.status == "error") {
            dispatch({
              type: GENCODE_FAILED,
            });
            // _showAxiosError(response.data.msg);
            if (response.data.msg == "Invalid Token") {
              alert("Session expired.Please Login again.");
            } else if (response.data.msg == "Logged in user id is required") {
              alert("Something went wrong. Please try again");
            }
          } else {
            dispatch({
              type: GENCODE_SUCCESS,
              payload: response.data,
            });
            // showAlert(response.data.msg)
          }
        })
        .catch((err) => {
          dispatch({
            type: GENCODE_FAILED,
          });
          _showAxiosError(err);
        });
    } catch (error) {
      dispatch({
        type: GENCODE_FAILED,
      });
      // alert(error);
    }
  };
};

export const UserLoaction = (details, navigation) => {
  return async (dispatch) => {
    try {
      await dispatch({
        type: AP_LOGIN_LOADING,
      });

      await Userlocation(details)
        .then((response) => {
          if (response.data.status == "error") {
            dispatch({
              type: USERLOCATION_FAILED,
            });
            _showAxiosError(response.data.msg);
          } else {
            dispatch({
              type: USERLOCATION_SUCCESS,
              payload: response.data,
            });
         
          }
        })
        .catch((err) => {
          dispatch({
            type: USERLOCATION_FAILED,
          });
          _showAxiosError(err);
          // console.log(err," _showAxiosError")
        });
    } catch (error) {
      dispatch({
        type: USERLOCATION_FAILED,
      });
      alert(error);
    }
  };
};

///refer me as
export const ReferMe_action = (refer) => {
  console.log(refer, "000000000000");
  return async (dispatch) => {
    try {
      if (refer == null) {
        dispatch({
          type: REFER_FAILED,
        });
        console.log("failed in if condition ReferMe_action");
      } else {
        dispatch({
          type: REFER_SUCCESS,
          payload: refer,
        });
      }
    } catch (error) {
      dispatch({
        type: REFER_FAILED,
      });
      console.log(error, "error in saving ReferMe_action");
      alert(error);
    }
  };
};

/**
 * Action that will help in fetching sms verification code
 * @param {Object} details
 * @param {Object} navigation
 * @returns
 */
export const SmsVerify_action = (bodyFormData, navigation, Guest_id) => {
  return async (dispatch) => {
    try {
      await dispatch({
        type: AP_LOGIN_LOADING,
      });

      await Smsverify(bodyFormData)
        .then((response) => {
          console.log(response.data, "belongs to SmsVerify_action ");
          if (response.data.status == "error") {
            dispatch({
              type: SMS_VERIFY_FAILED,
            });
            // _showAxiosError(response.data.msg);
            if (response.data.msg == "Invalid Token") {
              alert("Session expired.Please Login again.");
            } else if (response.data.msg == "Logged in user id is required") {
              alert("Something went wrong. Please try again");
            }else{Alert.alert(response.data.msg)}
            console.log("belongs to SmsVerify_action");
          } else {
            dispatch({
              type: SMS_VERIFY_SUCCESS,
              payload: response.data,
            });
           
          }
        })
        .catch((err) => {
          dispatch({
            type: SMS_VERIFY_FAILED,
          });
          console.log(err, "belongs to SmsVerify_action");
          // _showAxiosError(err);
        });
    } catch (error) {
      dispatch({
        type: SMS_VERIFY_FAILED,
      });
      // alert(error);
    }
  };
};

/**
 * Action that will help in fetching EMAIL verification code
 * @param {Object} details
 * @param {Object} navigation
 * @returns
 */
export const EmailVerify_action = (bodyFormData, navigation, Guest_id) => {
  
  return async (dispatch) => {
    try {
      await dispatch({
        type: AP_LOGIN_LOADING,
      });

      await emailverify(bodyFormData)
        .then((response) => {
          console.log(response.data, "belongs to EMAILVerify_action ");
          if (response.data.status == "error") {
            dispatch({
              type: EMAIL_VERIFY_FAILED,
            });
            // _showAxiosError(response.data.msg);
            if (response.data.msg == "Invalid Token") {
              alert("Session expired.Please Login again.");
            } else if (response.data.msg == "Logged in user id is required") {
              alert("Something went wrong. Please try again");
            }
            console.log("belongs to EMAIL Verify_action");
          } else {
            dispatch({
              type: EMAIL_VERIFY_SUCCESS,
              payload: response.data,
            });
          
          }
        })
        .catch((err) => {
          dispatch({
            type: EMAIL_VERIFY_FAILED,
          });
          console.log(err, "belongs to EMAIL Verify_action");
          // _showAxiosError(err);
        });
    } catch (error) {
      dispatch({
        type: EMAIL_VERIFY_FAILED,
      });
      // alert(error);
    }
  };
};


/**
 * Action that will help in fetching sms Code verification 
 * @param {Object} details
 * @param {Object} navigation
 * @returns
 */
var smsres=null;
 export const SmsCodeVerify_action = (bodyFormData, navigation, Guest_id) => {
  return async (dispatch) => {
    try {
      await dispatch({
        type: AP_LOGIN_LOADING,
      });

      await Smsverify(bodyFormData)
        .then((response) => {
          console.log(response.data, "belongs to sms Code verification ");
          if (response.data.status == "error") {
            dispatch({
              type: SMSCODE_VERIFY_FAILED,
            });
            // _showAxiosError(response.data.msg);
            if (response.data.msg == "Invalid Token") {
              alert("Session expired.Please Login again.");
            } else if (response.data.msg == "Logged in user id is required") {
              alert("Something went wrong. Please try again");
            }
            else if(response.data.msg=="Already verified!"){
              smsres=response.data.msg;
              // Alert.alert("Contact already verified")
            }
            else if(response.data.msg=="Invalid Code"){
              Alert.alert("Invalid contact code")
            }
            else{
              Alert.alert(response.data.msg)}
          } else {
            dispatch({
              type: SMSCODE_VERIFY_SUCCESS,
              payload: response.data,
            });
            smsres=response.data.msg;

            // Alert.alert("Contact code is "+response.data.msg)
          }
        })
        .catch((err) => {
          dispatch({
            type: SMSCODE_VERIFY_FAILED,
          });
          console.log(err, "belongs to sms Code verification");
          // _showAxiosError(err);
        });
    } catch (error) {
      dispatch({
        type: SMSCODE_VERIFY_FAILED,
      });
      // alert(error);
    }
  };
};

/**
 * Action that will help in fetching EMAIL Code verification code
 * @param {Object} details
 * @param {Object} navigation
 * @returns
 */
export const EmailCodeVerify_action = (bodyFormData, navigation, Guest_id,) => {
 
  const merge = async (navigation) => {
    let value = "1";
    if (Guest_id == -1) {
      await AsyncStorage.removeItem("@user_type");
      await AsyncStorage.setItem("@user_type", value);
    navigation.dispatch(CommonActions.navigate("App"));

    } else {
      navigation.navigate("RewardStack");
    }
  };

 
  return async (dispatch) => {
    try {
      await dispatch({
        type: AP_LOGIN_LOADING,
      });

      await emailverify(bodyFormData)
        .then((response) => {
          if (response.data.status == "error") {

            dispatch({
              type: EMAILCODE_VERIFY_FAILED,
            });
            if (response.data.msg == "Invalid Token") {
              alert("Session expired.Please Login again.");
            } else if (response.data.msg == "Logged in user id is required") {
              alert("Something went wrong. Please try again");
            }
            else if(response.data.msg=="Already verified!"){
              // if(smsres=="Already verified!"||smsres=="Successfully verified!"){
                
                // smsres=null;

                merge(navigation)

              // }else{
              //   return null;
              // }
            }else if(response.data.msg=="Invalid Code"){
              Alert.alert("Invalid email code")
            }
            else{
            
              Alert.alert(response.data.msg)
            }
            console.log("belongs to EMAIL Verify_action");
          } else {
            dispatch({
              type: EMAILCODE_VERIFY_SUCCESS,
              payload: response.data,
            });
            // if(smsres=="Already verified!"||smsres=="Successfully verified!"){
              // if(smsres=="Successfully verified!"&&response.data.msg=="Successfully verified!")
              Alert.alert("You have successfully enrolled in Share Slate Rewards Program")

              
              // smsres=null;
                
              merge(navigation)


            // }else{
              // return null;
            // }

          

          }
        })
        .catch((err) => {
          dispatch({
            type: EMAILCODE_VERIFY_FAILED,
          });
          console.log(err, "belongs to  EmailCodeVerify_action");
        });
    } catch (error) {
      dispatch({
        type: EMAILCODE_VERIFY_FAILED,
      });
    }
  };
};
