import {
    CHATLIST_LOADING,
    CHATLIST_Fetch_SUCCESS,
    CHATLIST_Fetch_FAILED,


    SEARCH_CHATUSER_LOADING,
    SEARCH_CHATUSER_SUCCESS,
    SEARCH_CHATUSER_FAILED,
} from "./chat_types";

const State = {
    fetch_chatlist_loading: false,
    search_chatuser_loading: false,
    chatLists: [],
    Searchchatuser: [],
};
export default Chat_Reducer = (state = State, action) => {
    switch (action.type) {
        case CHATLIST_LOADING:
            return {
                ...state,
                fetch_chatlist_loading: true,
            };

        case CHATLIST_Fetch_SUCCESS:
            return {
                ...state,
                chatLists: action.payload.data,
                fetch_chatlist_loading: false,
            };
        case CHATLIST_Fetch_FAILED:
            return {
                ...state,
                fetch_chatlist_loading: false,
            };

        case SEARCH_CHATUSER_LOADING:
            return {
                ...state,
                search_chatuser_loading: true,
            };

        case SEARCH_CHATUSER_SUCCESS:
            return {
                ...state,
                Searchchatuser: action.payload.data ? action.payload.data : [],
                search_chatuser_loading: false,
            };
        case SEARCH_CHATUSER_FAILED:
            return {
                ...state,
                search_chatuser_loading: false,
            };

        default:
            return {
                ...state,
            };
    }
};
