/*
    File that will contains api related to ap zone
*/

import axios from "axios";
export const BASE_URL = 'https://sandbox.shareslate.com/';
export const BASE_URL_blog = "https://www.shareslate.com/";

/**
 * Login API for ap user
 * @param {Object} details 
 * @returns 
 */
// https://www.shareslate.com/apis/checklogin.php
export const _LOGIN_API = (details) => {
    // console.log(details,"detailsssssssssssssssss")
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + 'apis/checklogin.php',
                method: 'POST',
                data: details,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error)
                })
        } catch (error) {
            reject(error);
        }
    })
}


/**
 * register API for ap user
 * @param {Object} details 
 * @returns 
 */
// https://www.shareslate.com/apis/register.php
export const register = (details) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + 'apis/register.php',
                method: 'POST',
                data: details,
            })
                .then((response) => {
                    console.log(response.data)
                    resolve(response);
                })
                .catch((error) => {
                    reject(error)
                })
        } catch (error) {
            reject(error);
        }
    })
}

/**
 * Blog API for show blog_post
 * @param {Object} bodyFormData 
 * @returns 
 */

//  https://www.shareslate.com/apis/showBlogs.php
export const Blog = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "apis/showBlogs.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}




/**
 * Blog API for Blog_For_Each_Item
 * @param {Object} bodyFormData 
 * @returns 
 */

export const Blog_For_Each_Item = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "apis/blogDetail.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}






/**
 * Blog API for post Blog_Comment
 * @param {Object} bodyFormData 
 * @returns 
 */
// https://www.shareslate.com/apis/addComment.php

export const Posting_Comment = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "apis/addComment.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);

                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}




/**
 * Show comment api
 * @param {Object} bodyFormData 
 * @returns 
 */
//

export const Show_Comment = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/showComment.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}




/**
 * showCategories for button api
 * @param {Object} bodyFormData 
 * @returns 
 */
//https://www.shareslate.com/apis/showCategories.php

export const showCategories = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/showCategories.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                    // console.log(response.data)
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}




/**
* showCategories_Item for button api
* @param {Object} bodyFormData 
* @returns 
*/
//https://www.shareslate.com/apis/showBlogs.php

export const showCategories_Item = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/showBlogs.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                    // console.log(response.data)
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}




/**
* ShowNotification api
*  * @param {Object} bodyFormData 
* @returns 
*/
//https://www.shareslate.com/apis/notifications.php

export const ShowNotification = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/notifications.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                    // console.log(response.data)
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}



/**
* showProfile api
*  * @param {Object} bodyFormData 
* @returns 
*/
//https://www.shareslate.com/apis/showProfile.php

export const ShowProfile = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/showProfile.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                    // console.log(response.data,"+++++")
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}

/**
* updateProfile api
*  * @param {Object} bodyFormData 
* @returns 
*/
//https://www.shareslate.com/apis/updateProfile.php

export const updateProfile = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/updateProfile.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                    // console.log(response.data)
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}





/**
 * search api
 *  * @param {Object} bodyFormData 
 * @returns 
 */
// https://www.shareslate.com/apis/search.php

export const search = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/search.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                    // console.log(response.data,"apiiiiiiii")
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}




/**
 * resetpassword api
 *  * @param {Object} bodyFormData 
 * @returns 
 */
//https://www.shareslate.com/apis/resetpassword.php


export const resetpassword = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/resetpassword.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                    // console.log(response.data,"apiiiiiiii")
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}




/**
 * addblogfeaturedimage api
 *  * @param {Object} bodyFormData 
 * @returns 
 */
// https://www.shareslate.com/apis/addblogfeaturedimage.php


export const Fimage = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/addblogfeaturedimage.php",
                method: "POST",
                headers: {
                    'Content-Type': 'multipart/form-data',
                },

                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                    // console.log(response.data,"apiiiiiiii")
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}





/**
 * addblog api
 *  * @param {Object} bodyFormData 
 * @returns 
 */
//  https://www.shareslate.com/apis/addblog.php


export const Add_blog = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/addblog.php",
                method: "POST",
                // headers: {
                //   'Content-Type': 'multipart/form-data',
                // },

                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                    // console.log(response.data,"apiiiiiiii")
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}


/**
 * uploadProfileImage api
 *  * @param {Object} bodyFormData 
 * @returns 
 */
//  https://www.shareslate.com/apis/uploadProfileImage.php

export const profileImage = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/uploadProfileImage.php",
                method: "POST",
                headers: {
                    'Content-Type': 'multipart/form-data',
                },

                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                    // console.log(response.data,"apiiiiiiii")
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}

/**
 * uploadCoverImage api
 *  * @param {Object} bodyFormData 
 * @returns 
 */
//  https://www.shareslate.com/apis/uploadCoverImage.php

export const coverImage = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/uploadCoverImage.php",
                method: "POST",
                headers: {
                    'Content-Type': 'multipart/form-data',
                },

                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                    console.log(response.data, "cover apiiiiiiii")
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}


/**
* addProfileBuild api
*  * @param {Object} bodyFormData 
* @returns 
*/
//https://www.shareslate.com/apis/addProfileBuild.php

export const addProfileBuild = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/addProfileBuild.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                    // console.log(response.data)
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}
/**
 * post rating api
 *  * @param {Object} bodyFormData 
 * @returns 
 */
//  https://www.shareslate.com/apis/addRating.php

export const Add_Rating = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/addRating.php",
                method: "POST",
                headers: {
                    'Content-Type': 'multipart/form-data',
                },

                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                    // console.log(response.data,"apiiiiiiii")
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}



/**
 * Blog API for show News_post
 * @param {Object} bodyFormData 
 * @returns 
 */

//  https://www.shareslate.com/apis/news/top.php
export const News_Api = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "apis/news/top.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                    // console.log(response.data.data,"Api of news post")
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}


/**
* showCategories for News button api
* @param {Object} bodyFormData 
* @returns 
*/
//https://www.shareslate.com/apis/news/categories.php

export const showNewsCategories = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/news/categories.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                    // console.log(response.data)
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}

/**
* showCategories for News search api
* @param {Object} bodyFormData 
* @returns 
*/
//https://www.shareslate.com/apis/news/search.php


export const NewsSearch = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/news/search.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                    console.log(response.data)
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}



/**
*  genrate authenticator code api
* @param {Object} bodyFormData 
* @returns 
*/
// https://www.shareslate.com/apis/auth/generateCode.php



export const GenCode = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/auth/generateCode.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                    // console.log(response.data,"api gencode//////////")
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}





//advertisemwnt apies.



/**
*   insert ads  api
* @param {Object} bodyFormData 
* @returns 
*/
//  https://www.shareslate.com/apis/ads/insertAds.php



export const InsertAds = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/ads/insertAds.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                    // console.log(response.data,"api insertAds//////////")
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}


/**
*  getcoins  api
* @param {Object} bodyFormData 
* @returns 
*/
//  https://www.shareslate.com/apis/ads/getcoins.php



export const GetCoins = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/ads/getcoins.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                    // console.log(response.data,"api getcoins//////////")
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}



/**
*   adscheck ads limit  api
* @param {Object} bodyFormData 
* @returns 
*/
// https://www.shareslate.com/apis/ads/adscheck.php



export const AdsCheck = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/ads/adscheck.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                    // console.log(response.data,"api adscheck//////////")
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}



/**
*  on register user location  api
* @param {Object} bodyFormData 
* @returns 
*/
//  https://www.shareslate.com/apis/saveLocation.php


export const Userlocation = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/saveLocation.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                    console.log(response.data, "registered api userLocation//////////")
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}






/**
*  on read news or blog activity api
* @param {Object} bodyFormData 
* @returns 
*/
//  https://www.shareslate.com/apis/insertActivity.php


export const ActivityApi = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/insertActivity.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                    // console.log(response.data,"ActivityApi//////////")
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}



/**
*  on Ads History api
* @param {Object} bodyFormData 
* @returns 
*/

//  https://www.shareslate.com/apis/ads/getStatement.php
export const AdsRewardState = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/ads/getStatement.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                    // console.log(response.data,"ActivityApi//////////")
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}




/**
*  on sms verify api
* @param {Object} bodyFormData 
* @returns 
*/
//  https://www.shareslate.com/apis/auth/smsVerification.php
export const Smsverify = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/auth/smsVerification.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                    // console.log(response.data,"ActivityApi//////////")
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}


/**
*  on email verify api
* @param {Object} bodyFormData 
* @returns 
*/
//  https://www.shareslate.com/apis/auth/emailVerification.php
export const emailverify = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/auth/emailVerification.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                    console.log(response.data, "ActivityApi//////////")
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}





/**
*  on eligibleReward  api
* @param {Object} bodyFormData 
* @returns 
*/
//  https://www.shareslate.com/apis/ads/eligibleReward.php

export const eligibleReward = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/ads/eligibleReward.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}




/**
*  on reportList  api
* @param {Object} bodyFormData 
* @returns 
*/
// https://www.shareslate.com/apis/reportList.php

export const reportList = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/reportList.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}



// blog hide/unhide report

/**
*  on addReport  api
* @param {Object} bodyFormData 
* @returns 
*/
// https://www.shareslate.com/apis/addReport.php

export const addReport = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/addReport.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}


/**
*  on NotIntrested api
* @param {Object} bodyFormData 
* @returns 
*/
// https://www.shareslate.com/apis/hide/addHide.php

export const addHide = (bodyFormData) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/hide/addHide.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}


/**
*  on hideBlog list api
* @param {Object} bodyFormData 
* @returns 
*/
// https://www.shareslate.com/apis/hide/list.php

export const hideBlogList = (token) => {
    var bodyFormData = new FormData();
    bodyFormData.append("token", token);
    bodyFormData.append("action", "list");
    bodyFormData.append("activity", "blog");


    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/hide/list.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                    // console.log(response.data,"+++++++++++++++")
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}


/**
*  on unhide blog api
* @param {Object} bodyFormData 
* @returns 
*/
// https://www.shareslate.com/apis/hide/removeHide.php

export const unhideBlog = (data) => {

    var bodyFormData = new FormData();
    bodyFormData.append("token", data.token);
    bodyFormData.append("activity", data.action);
    bodyFormData.append("activityId", data.blog_id);


    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/hide/removeHide.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                    // console.log(response.data,"api in unhideblog!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}


//  Block/unblock user
/**
*  on block list api
* @param {Object} bodyFormData 
* @returns 
*/
// https://www.shareslate.com/apis/block/list.php

export const blockList = (token) => {
    var bodyFormData = new FormData();
    bodyFormData.append("token", token);
    bodyFormData.append("action", "list");

    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/block/list.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                    // console.log(response.data,"apiiiiiiiiii")
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}


/**
*  on block/unblock user api
* @param {Object} bodyFormData 
* @returns 
*/
// https://www.shareslate.com/apis/block/blockUser.php

export const blockUnblockUser = (data) => {
    var bodyFormData = new FormData();
    bodyFormData.append("token", data.token);
    bodyFormData.append("action", data.action);
    bodyFormData.append("userId", data.id);
    // console.log(bodyFormData,"((((((((")

    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/block/blockUser.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                    console.log(response, "hhhhh")
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}






/**
*   like/unlike comment in blogpost api
* @param {Object} bodyFormData 
* @returns 
*/
// https://www.shareslate.com/apis/blog/commentLike.php

export const LikeCommentApi = (data) => {
    var bodyFormData = new FormData();
    bodyFormData.append("token", data.token);
    bodyFormData.append("commentId", data.cid);
    bodyFormData.append("userId", data.uid);
    bodyFormData.append("blogId", data.bid);
    bodyFormData.append("action", data.action);
    console.log(bodyFormData, "((((((((")

    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "/apis/blog/commentLike.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}

// ! ********************** Chat apis start************************************************


//*  https://www.shareslate.com/apis/chat/usersList.php
export const fetchChatlist = (data) => {
    var bodyFormData = new FormData();
    bodyFormData.append("token", data.token);
    bodyFormData.append("action", data.action);

    console.log(bodyFormData, "((((((((")
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "apis/chat/usersList.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}

//* Search Chat user
//*  https://www.shareslate.com/apis/chat/searchUsers.php
export const searchChatUser = (data) => {
    console.log(data)
    var bodyFormData = new FormData();
    bodyFormData.append("token", data.token);
    bodyFormData.append("value", data.value);
    bodyFormData.append("action", data.action);

    // console.log(bodyFormData, "((((((((")
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "apis/chat/searchUsers.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {

                    resolve(response);
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}



//* Show Chat Message
//*  https://www.shareslate.com/apis/chat/showMessages.php
export const _ShowMessage = (data) => {
    console.log(data)
    var bodyFormData = new FormData();
    bodyFormData.append("token", data.token);
    bodyFormData.append("receiver_id", data.receiver_id);
    bodyFormData.append("action", data.action);

    // console.log(bodyFormData, "((((((((")
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "apis/chat/showMessages.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {

                    resolve(response);
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}
//* Send Chat Message
//* https://www.shareslate.com/apis/chat/sendMessage.php
export const _SendMessage = (data) => {
    console.log(data)
    var bodyFormData = new FormData();
    bodyFormData.append("token", data.token);
    bodyFormData.append("receiver_id", data.receiver_id);
    bodyFormData.append("message", data.message);
    bodyFormData.append("type", data.type);
    bodyFormData.append("room_id", data.type);

    // console.log(bodyFormData, "((((((((")
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "apis/chat/sendMessage.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {

                    resolve(response);
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })
}

//*  Fetch Romm id
//*  https://www.shareslate.com/apis/chat/getRoomId.php
export const _Fetch_roommId = (data) => {
    console.log(data)
    var bodyFormData = new FormData();
    bodyFormData.append("token", data.token);
    bodyFormData.append("receiver_id", data.receiver_id);
    // console.log(bodyFormData, "((((((((")
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL_blog + "apis/chat/getRoomId.php",
                method: "POST",
                data: bodyFormData,
            })
                .then((response) => {

                    resolve(response);
                })
                .catch((error) => {
                    reject(error)

                });
        } catch (error) {
            reject(error);
        }
    })

}



// ! ********************** Chat apis Ends************************************************
