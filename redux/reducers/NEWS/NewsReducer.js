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


  const State = {
      NewsLoading: true,
      NewsPosts: [],
      NewsButtonCate:[],
      BtnCatData:[],
    finish:"",
    NewsSearch:[],Activity:{},

    };
  export const NewsReducer = (state = State, action) => {
  
      switch (action.type) {
  
               case NEWS_LOADING:
              return {
                  ...state,
                  NewsLoading: true,
              }
  
          case NEWSPOST_SUCCESS:
              let arr=[...state.NewsPosts,...action.payload.data]
          let  isFinish=action.payload.finish;
              return {
                  ...state,
                  NewsPosts:arr,
                finish:isFinish,

                  NewsLoading: false
  
              }
          case NEWSPOST_FAILED:
              return {
                  ...state,
                  NewsLoading: false,
              }
                     ////// showCategories of button in news
            case NEWS_BUTTON_SUCCESS:
                return {
                    ...state,
                    NewsButtonCate: action.payload,
                    NewsLoading: false,
                        
                }
            case NEWS_BUTTON_FAILED:
                return {
                    ...state,
                    NewsLoading: false,
                }
                //button category data item fetching.
                case BTN_CATE_DATA_SUCCESS:
                    return {
                        ...state,
                        BtnCatData: action.payload,
                        NewsLoading: false,
                            
                    }
                case BTN_CATE_DATA_FAILED:
                    return {
                        ...state,
                        NewsLoading: false,
                    }
                     //search api for news.
                case NEWS_SEARCH_SUCCESS:
                    return {
                        ...state,
                        NewsSearch: action.payload,
                        NewsLoading: false,
                            
                    }
                case NEWS_SEARCH_FAILED:
                    return {
                        ...state,
                        NewsLoading: false,
                    }
                    //
                     //search api for news.
                case ACTIVITY_SUCCESS:
                    return {
                        ...state,
                        Activity: action.payload,
                        NewsLoading: false,
                            
                    }
                case ACTIVITY_FAILED:
                    return {
                        ...state,
                        NewsLoading: false,
                    }
          default:
              return {
                  ...state,
              }
      }
  }