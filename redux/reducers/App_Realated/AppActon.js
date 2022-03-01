import { _showAxiosError } from '../../../utils/messages';
import {ACTIVE_ID_SUCCESS,ACTIVE_ID_FAILED,GUEST_ID_SUCCESS, GUEST_ID_FAILED, LOCATION_SAVE_FAILED, LOCATION_SAVE_SUCCESS} from './AppReducer';


/**
 * Action that will help in saving activeId
 * @param {Object} ActiveId 
 * @returns 
 */
export const ActiveId_Action = (id) => {
    return async (dispatch) => {
      try {
        if (id == null) {
          dispatch({
            type: ACTIVE_ID_FAILED,
            
          });
          console.log("failed in if condition")
        } else {
          dispatch({
            type: ACTIVE_ID_SUCCESS,
            payload: id,
          });
        }
      } catch (error) {
        dispatch({
          type: ACTIVE_ID_FAILED,
        });
        console.log(error, "error in saving Active id");
        alert(error);
      }
    };
  };
  



/**
 * Action that will help in saving GUEST ID
 * @param {Object} ActiveId 
 * @returns 
 */
export const GuestId_Action = (id) => {
  return async (dispatch) => {
    try {
      if (id == null) {
        dispatch({
          type: GUEST_ID_FAILED,
          
        });
        console.log("failed in if saving GUEST ID")
      } else {
        dispatch({
          type: GUEST_ID_SUCCESS,
          payload: id,
        });
      }
    } catch (error) {
      dispatch({
        type: GUEST_ID_FAILED,
      });
      console.log(error, "error in saving  GUEST ID");
      alert(error);
    }
  };
};


/**
 * Action that will help in saving Location value
 * @param {Object} ActiveId 
 * @returns 
 */
 export const Location_Action = (val) => {
   console.log(val,"___________________")
  return async (dispatch) => {
    try {
      if (val == null) {
        dispatch({
          type: LOCATION_SAVE_FAILED,
          
        });
        console.log("failed in if saving Location")
      } else {
        dispatch({
          type: LOCATION_SAVE_SUCCESS,
          payload: val,
        });
      }
      
    } catch (error) {
      dispatch({
        type: LOCATION_SAVE_FAILED,
      });
      console.log(error, "error in saving  Location value");
      alert(error);
    }
  };
};

