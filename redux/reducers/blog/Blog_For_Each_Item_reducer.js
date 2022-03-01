import {
    Blog_LOADING,
    toke_saved,toke_notSaved,
    Blog_For_Each_Item_Fetch_FAILED,
    Blog_For_Each_Item_Fetch_SUCCESS,
    Blog_Comment_Fetch_SUCCESS,
    Blog_Comment_Fetch_FAILED,
    Blog_Comment_Add_SUCCESS,
    Blog_Comment_Add_FAILED,
    showCategories_FAILED,
    showCategories_SUCCESS,
    showCategories_Item_FAILED,
    showCategories_Item_SUCCESS,
    ShowNotification_FAILED,
    ShowNotification_SUCCESS,
    updateProfile_SUCCESS,
    ProfileBuild_FAILED,
    ProfileBuild_SUCCESS,
    updateProfile_FAILED,
    ShowProfile_SUCCESS,
    ShowProfile_FAILED,
    Search_SUCCESS,
    Search_FAILED,
    ADDBLOG_FIMAGE_SUCCESS,
    ADDBLOG_FIMAGE_FAILED,
    HTML_SUCCESS,
    HTML_FAILED,
   ADD_BLOG_SUCCESS,
   ADD_BLOG_FAILED,
   PROFILE_IMAGE_SUCCESS,
   PROFILE_IMAGE_FAILED,
   COVER_IMAGE_SUCCESS,
   COVER_IMAGE_FAILED,
   ADD_BLOG_RATING_SUCCESS,
   ADD_BLOG_RATING_FAILED,
   REPORT_LIST_SUCCESS,
   REPORT_LIST_FAILED,
   ADD_REPORT_SUCCESS,
   ADD_REPORT_FAILED,
   HIDE_BLOG_SUCCESS,
   HIDE_BLOG_FAILED,
   USERID_SAVE,
   USERID_NOTSAVE,
   HIDE_BLOG_LIST_SUCCESS,
   HIDE_BLOG_LIST_FAILED,
   LIKECOMMENT_SUCCESS,
   LIKECOMMENT_FAILED,
} from './Blog_For_Each_Item_type';

 const State = {
    blog_loading: true,
    token_is:"",
    userId_is:"",
    Blog_For_Each_Item_info: [],
    Blog_Comment:[],
    Add_Blog_Comment: {},
    showCategories:[],
    showCategories_Item:[],
    ShowNotification:[],
    updateProfile:[],
    ProfileBuild:[],
    ShowProfile:[],
    SearchData:[],
    Addblog_fimage:{},
    html_data:[],
    ADD_BLOG_DATA:[],
    PROFILE_IMAGE:{},
    COVER_IMAGE:{},
    Addrate:"",
    reportList:[],
    addReport:{},
    hideBlog:{},
    hideBlogList:[],
    likeComment:[],

  };
export default  Blog_For_Each_Item_reducer = (state = State, action) => {
    switch (action.type) {

             case Blog_LOADING:
            return {
                ...state,
                blog_loading: true,
            }

            //token
            case toke_saved:
                return {
                    ...state,
                    token_is: action.payload,
                    blog_loading: false,
                        
                }
            case toke_notSaved:
                return {
                    ...state,
                    blog_loading: false,
                }
                 //UserId
            case USERID_SAVE:
                return {
                    ...state,
                    userId_is: action.payload,
                    blog_loading: false,
                        
                }
            case USERID_NOTSAVE:
                return {
                    ...state,
                    blog_loading: false,
                }
     //    Blog_For_Each_Item_Fetch
        case Blog_For_Each_Item_Fetch_SUCCESS:
            return {
                ...state,
                Blog_For_Each_Item_info: action.payload,
                blog_loading: false,
                    
            }
        case Blog_For_Each_Item_Fetch_FAILED:
            return {
                ...state,
                blog_loading: false,
            }
     
//// show comment   case Blog_LOADING:
           

        case Blog_Comment_Fetch_SUCCESS:
            return {
                ...state,             
                Blog_Comment: action.payload,
                blog_loading: false,
                    
            }
        case Blog_Comment_Fetch_FAILED:
            return {
                ...state,
                blog_loading: false,
            }


            ////// add comment 
            case Blog_Comment_Add_SUCCESS:
                return {
                    ...state,
                    Add_Blog_Comment: action.payload,
                    blog_loading: false,
                        
                }
            case Blog_Comment_Add_FAILED:
                return {
                    ...state,
                    blog_loading: false,
                }
                  ////// showCategories 
            case showCategories_SUCCESS:
                return {
                    ...state,
                    showCategories: action.payload,
                    blog_loading: false,
                        
                }
            case showCategories_FAILED:
                return {
                    ...state,
                    blog_loading: false,
                }

               // showCategories_Item
               case showCategories_Item_SUCCESS:
                return {
                    ...state,
                    showCategories_Item: action.payload,
                    blog_loading: false,
                        
                }
            case showCategories_Item_FAILED:
                return {
                    ...state,
                    blog_loading: false,
                }
                   // ShowNotification
               case ShowNotification_SUCCESS:
                return {
                    ...state,
                    ShowNotification: action.payload,
                    blog_loading: false,
                        
                }
            case ShowNotification_FAILED:
                return {
                    ...state,
                    blog_loading: false,
                }
                 // updateProfile
               case updateProfile_SUCCESS:
                return {
                    ...state,
                    updateProfile: action.payload,
                    blog_loading: false,
                        
                }
            case updateProfile_FAILED:
                return {
                    ...state,
                    blog_loading: false,
                }
                 // PROFILE BUILD
               case ProfileBuild_SUCCESS:
                return {
                    ...state,
                    ProfileBuild: action.payload,
                    blog_loading: false,
                        
                }
            case ProfileBuild_FAILED:
                return {
                    ...state,
                    blog_loading: false,
                }
                  // ShowProfile

               case ShowProfile_SUCCESS:
                return {
                    ...state,
                    Showprofile: action.payload,
                    blog_loading: false,
                        
                }
            case ShowProfile_FAILED:
                return {
                    ...state,
                    blog_loading: false,
                }
                  // search
               case Search_SUCCESS:
                return {
                    ...state,
                    SearchData: action.payload,
                    blog_loading: false,
                        
                }
            case Search_FAILED:
                return {
                    ...state,
                    blog_loading: false,
                }
                   // addblog_fimage
               case ADDBLOG_FIMAGE_SUCCESS:
                return {
                    ...state,
                    Addblog_fimage: action.payload,
                    blog_loading: false,
                        
                }
            case ADDBLOG_FIMAGE_FAILED:
                return {
                    ...state,
                    blog_loading: false,
                }
                 // addblog_HTML
               case HTML_SUCCESS:
                return {
                    ...state,
                    html_data: action.payload,
                    blog_loading: false,
                        
                }
            case HTML_FAILED:
                return {
                    ...state,
                    blog_loading: false,
                }
                    // Add_blog
               case ADD_BLOG_SUCCESS:
                return {
                    ...state,
                    ADD_BLOG_DATA: action.payload,
                    blog_loading: false,
                        
                }
            case ADD_BLOG_FAILED:
                return {
                    ...state,
                    blog_loading: false,
                }
                     // PROFILE_IMAGE
               case PROFILE_IMAGE_SUCCESS:
                console.log(action.payload,"pppppppppppppp")

                return {
                    ...state,
                    PROFILE_IMAGE: action.payload,
                    blog_loading: false,
                        
                }
            case PROFILE_IMAGE_FAILED:
                return {
                    ...state,
                    blog_loading: false,
                }
                 // COVER IMAGE
               case COVER_IMAGE_SUCCESS:
                console.log(action.payload,"pppppppppppppp")

                return {
                    ...state,
                    COVER_IMAGE: action.payload,
                    blog_loading: false,
                        
                }
            case COVER_IMAGE_FAILED:
                return {
                    ...state,
                    blog_loading: false,
                }
                 // ADDRATING
               case ADD_BLOG_RATING_SUCCESS:
                return {
                    ...state,
                    Addrate: action.payload,
                    blog_loading: false,
                        
                }
            case ADD_BLOG_RATING_FAILED:
                return {
                    ...state,
                    blog_loading: false,
                }
                  // Report list
               case REPORT_LIST_SUCCESS:
                return {
                    ...state,
                    reportList: action.payload,
                    blog_loading: false,
                        
                }
            case REPORT_LIST_FAILED:
                return {
                    ...state,
                    blog_loading: false,
                }
                    //Add Report 
               case ADD_REPORT_SUCCESS:
                return {
                    ...state,
                    addReport: action.payload,
                    blog_loading: false,
                        
                }
            case ADD_REPORT_FAILED:
                return {
                    ...state,
                    blog_loading: false,
                }
                //HIDE  BLOG 
               case HIDE_BLOG_SUCCESS:
                return {
                    ...state,
                    hideBlog: action.payload,
                    blog_loading: false,
                        
                }
            case HIDE_BLOG_FAILED:
                return {
                    ...state,
                    blog_loading: false,
                }
                  //HIDE  BLOG  LIST
               case HIDE_BLOG_LIST_SUCCESS:
                return {
                    ...state,
                    hideBlogList: action.payload,
                    blog_loading: false,
                        
                }
            case HIDE_BLOG_LIST_FAILED:
                return {
                    ...state,
                    blog_loading: false,
                }
                  //like comment
               case LIKECOMMENT_SUCCESS:
                return {
                    ...state,
                    likeComment: action.payload,
                    blog_loading: false,
                        
                }
            case LIKECOMMENT_FAILED:
                return {
                    ...state,
                    blog_loading: false,
                }
        default:
            return {
                ...state,
            }
    }
}


