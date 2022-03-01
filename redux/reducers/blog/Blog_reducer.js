import {Blog_Fetch_FAILED,Blog_Fetch_SUCCESS,Blog_LOADING, SUGGESSION_BLOG_FAILED, SUGGESSION_BLOG_SUCCESS} from './blog_type';

const State = {
    blog_loading: true,
    Blog_info: [],
    SuggestBlog_info: [],
    finish:""
  };
export default Blog_Reducer = (state = State, action) => {

    switch (action.type) {

             case Blog_LOADING:
            return {
                ...state,
                blog_loading: true,
            }

        case Blog_Fetch_SUCCESS:
            let arr=[...state.Blog_info,...action.payload.data]
          let  isFinish=action.payload.finish;
            return {
                ...state,
                Blog_info:arr,
                finish:isFinish,
                blog_loading: false

            }
        case Blog_Fetch_FAILED:
            return {
                ...state,
                blog_loading: false,
            }

            // Suggest blog
            case SUGGESSION_BLOG_SUCCESS:
                return {
                    ...state,
                    SuggestBlog_info:action.payload,
                    blog_loading: false
    
                }
            case SUGGESSION_BLOG_FAILED:
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