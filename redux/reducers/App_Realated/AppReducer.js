export const ACTIVE_ID_SUCCESS="ACTIVE_ID_SAVE";
export const ACTIVE_ID_FAILED="ACTIVE_ID_NOT_SAVE";
export const ACTIVE_ID_LOADING="ACTIVE_ID_NOT_SAVE";
export const GUEST_ID_SUCCESS="GUEST_ID_SAVE";
export const GUEST_ID_FAILED="GUEST_ID_NOT_SAVE";
export const LOCATION_SAVE_SUCCESS="LOCATION_SAVE_SUCCESS";
export const LOCATION_SAVE_FAILED="LOCATION_SAVE_FAILED";

const State = {
    Loading: true,
    active_id: null,
    Guest_id:null,
    LocationPicked:null,
  };
export default ActiveId_Reducer = (state = State, action) => {

    switch (action.type) {

             case ACTIVE_ID_LOADING:
            return {
                ...state,
                Loading: true,
            }

        case ACTIVE_ID_SUCCESS:
            return {
                ...state,
                active_id:action.payload,
                Loading: false

            }
        case ACTIVE_ID_FAILED:
            return {
                ...state,
                Loading: false,
                
                
            }
            // Guest id 
            case GUEST_ID_SUCCESS:
                return {
                    ...state,
                    Guest_id:action.payload,
                    Loading: false
    
                }
            case GUEST_ID_FAILED:
                return {
                    ...state,
                    Loading: false,
                    
                    
                }

                 // REFER ME
            case LOCATION_SAVE_SUCCESS:
                return {
                    ...state,
                    LocationPicked:action.payload,
                    Loading: false
    
                }
            case LOCATION_SAVE_FAILED:
                return {
                    ...state,
                    Loading: false,
                    
                    
                }
     
        default:
            return {
                ...state,
            }
    }
}