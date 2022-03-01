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
  EMAIL_VERIFY_SUCCESS,
  EMAIL_VERIFY_FAILED,
  SMSCODE_VERIFY_SUCCESS,
  SMSCODE_VERIFY_FAILED,
  EMAILCODE_VERIFY_SUCCESS,
  EMAILCODE_VERIFY_FAILED,
} from "./ap_user_types";

const State = {
  aplogin_loading: false,
  ap_user: {},
  ap_register: {},
  ap_resetpassword: {},
  token:'',
  GenratedCode:{},
  UserLocation:{},
  referMe:"",
  smsVerify:{},
  emailVerify:{},
  smsCodeVerify:{},
  emailcodeVerify:{},


};

export default APUser_Reducer = (state = State, action) => {
  switch (action.type) {
    case AP_LOGIN_LOADING:
      return {
        ...state,
        aplogin_loading: true,
      };
    //LOGIN.
    case AP_LOGIN_SUCCESS:
      // console.log(action.payload,"payyyyyy")
      return {
        ...state,
        // token:action.payload.token,
        ap_user: action.payload,
        aplogin_loading: false,
      };

    case AP_LOGIN_FAILED:
      return {
        ...state,
        aplogin_loading: false,
      };
    //REGISTER
    case AP_REGISTER_SUCCESS:
      return {
        ...state,
        ap_register: action.payload,
        aplogin_loading: false,
      };

    case AP_REGISTER_FAILED:
      return {
        ...state,
        aplogin_loading: false,
      };
    //RESETPASSWORD
    case AP_RESETPASSWORD_SUCCESS:
      return {
        ...state,
        ap_resetpassword: action.payload,
        aplogin_loading: false,
      };

    case AP_RESETPASSWORD_FAILED:
      return {
        ...state,
        aplogin_loading: false,
      };
       //genrate auth code
    case GENCODE_SUCCESS:
      return {
        ...state,
        GenratedCode: action.payload,
        aplogin_loading: false,
      };

    case GENCODE_FAILED:
      return {
        ...state,
        aplogin_loading: false,
      };
      /// user location save
      case USERLOCATION_SUCCESS:
        return {
          ...state,
          UserLocation: action.payload,
          aplogin_loading: false,
        };
  
      case USERLOCATION_FAILED:
        return {
          ...state,
          aplogin_loading: false,
        };
         /// Refer me as in profile builder
      case REFER_SUCCESS:
        return {
          ...state,
          referMe: action.payload,
          aplogin_loading: false,
        };
  
      case REFER_FAILED:
        return {
          ...state,
          aplogin_loading: false,
        };
            /// sms verification
      case SMS_VERIFY_SUCCESS:
        return {
          ...state,
          smsVerify: action.payload,
          aplogin_loading: false,
        };
  
      case SMS_VERIFY_FAILED:
        return {
          ...state,
          aplogin_loading: false,
        };

             /// email verification
      case EMAIL_VERIFY_SUCCESS:
        return {
          ...state,
          emailVerify: action.payload,
          aplogin_loading: false,
        };
  
      case EMAIL_VERIFY_FAILED:
        return {
          ...state,
          aplogin_loading: false,
        };
              /// sms code verification
      case SMSCODE_VERIFY_SUCCESS:
        return {
          ...state,
          smsCodeVerify: action.payload,
          aplogin_loading: false,
        };
  
      case SMSCODE_VERIFY_FAILED:
        return {
          ...state,
          aplogin_loading: false,
        };

             /// email Code verification
      case EMAILCODE_VERIFY_SUCCESS:
        return {
          ...state,
          emailCodeVerify: action.payload,
          aplogin_loading: false,
        };
  
      case EMAILCODE_VERIFY_FAILED:
        return {
          ...state,
          aplogin_loading: false,
        };
    default:
      return {
        ...state,
      };
  }
};
