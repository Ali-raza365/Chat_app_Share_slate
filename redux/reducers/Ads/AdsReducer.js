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
  ADS_ELIGIBLE_SUCCESS,
  ADS_ELIGIBLE_FAILED,

} from "./AdsType";

const State = {
  adsLoading: false,
  insertAds: {},
  getCoins: {},
  adsLimit: {},
  rewardStateData:[],
  adsEligible:{}
};
export const Ads = (state = State, action) => {
  switch (action.type) {
    case ADS_LOADING:
      return {
        ...state,
        adsLoading: true,
      };

    case INSERT_ADS_SUCCESS:
      return {
        ...state,
        insertAds: action.payload,
        adsLoading: false,
      };
    case INSERT_ADS_FAILED:
      return {
        ...state,
        adsLoading: false,
      };
    ////// GETCOINS 
    case GET_COINS_SUCCESS:
      return {
        ...state,
        getCoins: action.payload,
        adsLoading: false,
      };
    case GET_COINS_FAILED:
      return {
        ...state,
        adsLoading: false,
      };
    //Ads limits
    case ADS_LIMIT_SUCCESS:
      return {
        ...state,
        adsLimit: action.payload,
        adsLoading: false,
      };
    case ADS_LIMIT_FAILED:
      return {
        ...state,
        adsLoading: false,
      };
  //Ads Reward statement
  case REWARD_STATEMENT_SUCCESS:
    return {
      ...state,
      rewardStateData: action.payload,
      adsLoading: false,
    };
  case REWARD_STATEMENT_FAILED:
    return {
      ...state,
      adsLoading: false,
    };
 //Ads Reward Eligible
 case ADS_ELIGIBLE_SUCCESS:
  return {
    ...state,
    adsEligible: action.payload,
    adsLoading: false,
  };
case ADS_ELIGIBLE_FAILED:
  return {
    ...state,
    adsLoading: false,
  };

    default:
      return {
        ...state,
      };
  }
};
