/*
    File that will contain all functions related to error handling and logging
*/

// import { _gotoAuthStack } from "../navigation/NavigationService";

/**
 * Function that will show alert having reason
 * @param {String} reason 
 */
export const _showMessageWithReason = (reason) => {
    alert("Something is going wrong while " + reason);
}

/**
 * Function that will show axios error
 * @param {Object} err 
 */
export const _showAxiosError = (err) => {
    // console.log(err,"+++___________showAxiosError")
    if (err.response) {
        if(err.response.status == 413)
            alert('Attachment size should be less than 1MB');
        else if(err.response.data)
            alert(JSON.stringify(err.response.data,));
        else
            alert('Something is going wrong. Please try again');
    } 
    else if (err.request) {
        alert('Server is not responding. Please try again');
    } 
    else{
        alert(err)
    }
    // else {
    //     if(err=="Invalid Token"){

    //         alert("Session expired.Please Login again.");
    //     } if(err=="Logged in user id is required"){

    //         alert("Something went wrong. Please try again");
    //     }
       
    // }
}
