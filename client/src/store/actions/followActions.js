// FOLLOW

export const FOLLOW = "FOLLOW";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_ERROR = "FOLLOW_ERROR";

export const follow = (payload) => ({
    type: FOLLOW,
    payload,
});

export const followSuccess = (payload) => ({
    type: FOLLOW_SUCCESS,
    payload,
});

export const followError = (payload) => ({
    type: FOLLOW_ERROR,
    payload,
});

// UNFOLLOW
export const UNFOLLOW = "UNFOLLOW";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_ERROR = "UNFOLLOW_ERROR";

export const unFollow = (payload) => ({
    type: UNFOLLOW,
    payload,
});

export const unFollowSuccess = (payload) => ({
    type: UNFOLLOW_SUCCESS,
    payload,
});

export const unFollowError = (payload) => ({
    type: UNFOLLOW_ERROR,
    payload,
});