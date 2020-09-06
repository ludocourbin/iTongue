export const FETCH_IFOLLOWERS = "FETCH_IFOLLOWERS";
export const FETCH_IFOLLOWERS_SUCCESS = "FETCH_IFOLLOWERS_SUCCESS";
export const FETCH_IFOLLOWERS_ERROR = "FETCH_IFOLLOWERS_ERROR";

export const fetchIfollowers = () => ({
    type: FETCH_IFOLLOWERS,
});
export const fetchIfollowersSuccess = (payload) => ({
    type: FETCH_IFOLLOWERS_SUCCESS,
    payload,
});
export const fetchIfollowersError = () => ({
    type: FETCH_IFOLLOWERS_ERROR,
});

export const FETCH_IFOLLOWING = "FETCH_IFOLLOWING";
export const FETCH_IFOLLOWING_SUCCESS = "FETCH_IFOLLOWING_SUCCESS";
export const FETCH_IFOLLOWING_ERROR = "FETCH_IFOLLOWING_ERROR";

export const fetchIfollowing = () => ({
    type: FETCH_IFOLLOWING,
});
export const fetchIfollowingSuccess = (payload) => ({
    type: FETCH_IFOLLOWING_SUCCESS,
    payload,
});
export const fetchIfollowingError = () => ({
    type: FETCH_IFOLLOWING_ERROR,
});

export const SET_SELECTED_USER_TO_FETCH_SUBSCRIPTIONS =
    "SET_SELECTED_USER_TO_FETCH_SUBSCRIPTIONS";

export const setSelectedUserToFetchSubscriptions = (payload) => ({
    type: SET_SELECTED_USER_TO_FETCH_SUBSCRIPTIONS,
    payload,
});

export const FOLLOW_IFOLLOWERS_PAGE = "FOLLOW_IFOLLOWERS_PAGE";
export const FOLLOW_SUCCESS_IFOLLOWERS_PAGE = "FOLLOW_SUCCESS_IFOLLOWERS_PAGE";
export const FOLLOW_ERROR_IFOLLOWERS_PAGE = "FOLLOW_ERROR_IFOLLOWERS_PAGE";

export const followIfollowersPage = (payload) => ({
    type: FOLLOW_IFOLLOWERS_PAGE,
    payload,
});
export const followSuccessIfollowersPage = (payload) => ({
    type: FOLLOW_SUCCESS_IFOLLOWERS_PAGE,
    payload,
});
export const followErrorIfollowersPage = () => ({
    type: FOLLOW_ERROR_IFOLLOWERS_PAGE,
});

export const UNFOLLOW_IFOLLOWERS_PAGE = "UNFOLLOW_IFOLLOWERS_PAGE";
export const UNFOLLOW_SUCCESS_IFOLLOWERS_PAGE = "UNFOLLOW_SUCCESS_IFOLLOWERS_PAGE";
export const UNFOLLOW_ERROR_IFOLLOWERS_PAGE = "UNFOLLOW_ERROR_IFOLLOWERS_PAGE";

export const unfollowIfollowersPage = (payload) => ({
    type: UNFOLLOW_IFOLLOWERS_PAGE,
    payload,
});
export const unfollowSuccessIfollowersPage = (payload) => ({
    type: UNFOLLOW_SUCCESS_IFOLLOWERS_PAGE,
    payload,
});
export const unfollowErrorIfollowersPage = () => ({
    type: UNFOLLOW_ERROR_IFOLLOWERS_PAGE,
});
