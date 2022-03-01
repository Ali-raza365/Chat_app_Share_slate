import {
  AUTHER_PROFILE_FAILED,
  AUTHER_PROFILE_SUCCESS,
  BLOCKLIST_FAILED,
  BLOCKLIST_SUCCESS,
  BLOCKUSER_FAILED,
  BLOCKUSER_SUCCESS,
  MYBLOG_FETCH_FAILED,
  MYBLOG_FETCH_SUCCESS,
  MYBLOG_LOADING,
  UNBLOCKUSER_FAILED,
  UNBLOCKUSER_SUCCESS,
} from "./myBlogType";

const State = {
  myblog_loading: true,
  myBlog_data: [],
  autherProfile: [],
  blockList:[],
  unblockUser:{},
  blockUser:{},
  finish: "",
};
export default function myBlog_Reducer(state = State, action) {
  switch (action.type) {
    case MYBLOG_LOADING:
      return {
        ...state,
        myblog_loading: true,
      };

    case MYBLOG_FETCH_SUCCESS:
      return {
        ...state,
        myBlog_data: action.payload,
        myblog_loading: false,
      };
    case MYBLOG_FETCH_FAILED:
      return {
        ...state,
        myblog_loading: false,
      };

    //auther profile
    case AUTHER_PROFILE_SUCCESS:
      return {
        ...state,
        autherProfile: action.payload,
        myblog_loading: false,
      };
    case AUTHER_PROFILE_FAILED:
      return {
        ...state,
        myblog_loading: false,
      };
 //blockList
 case BLOCKLIST_SUCCESS:
  return {
    ...state,
    blockList: action.payload,
    myblog_loading: false,
  };
case BLOCKLIST_FAILED:
  return {
    ...state,
    myblog_loading: false,
  };
  //blockUser
 case BLOCKUSER_SUCCESS:
  return {
    ...state,
    blockUser: action.payload,
    myblog_loading: false,
  };
case BLOCKUSER_FAILED:
  return {
    ...state,
    myblog_loading: false,
  };
 //unblockUser
 case UNBLOCKUSER_SUCCESS:
  return {
    ...state,
    unblockUser: action.payload,
    myblog_loading: false,
  };
case UNBLOCKUSER_FAILED:
  return {
    ...state,
    myblog_loading: false,
  };

    default:
      return {
        ...state,
      };
  }
}
